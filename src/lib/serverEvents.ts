import { getDinnerTabsEnv } from "@/lib/cloudflare";

type EventPayload = {
	eventName?: string;
	props?: Record<string, unknown>;
};

function text(value: unknown, fallback = ""): string {
	return typeof value === "string" ? value : fallback;
}

function stringArray(value: unknown): string[] {
	return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function countBucket(value: number): string {
	if (value < 20) return "below_threshold";
	if (value < 50) return "20+";
	if (value < 100) return "50+";
	return "100+";
}

export async function persistEvent(payload: EventPayload, visitorId: string) {
	const env = await getDinnerTabsEnv();
	const db = env?.DB;
	if (!db || !payload.props) return { persisted: false, reason: "D1 not bound" };
	const props = payload.props;
	const id = crypto.randomUUID();
	const createdAt = new Date().toISOString();
	const citySlug = text(props.citySlug, "unknown");
	const date = text(props.date, "unknown");
	const dateBucket = text(props.dateBucket, "unknown");
	const timeBucket = text(props.timeBucket, "dinner");
	const timeWindowLabel = text(props.timeWindowLabel, "around dinner");
	const partySizeBucket = text(props.partySizeBucket, "unknown");
	const normalizedTags = JSON.stringify(stringArray(props.normalizedTags));
	const sourceIds = JSON.stringify(stringArray(props.sourceIds));

	if (payload.eventName === "search_submitted") {
		await db
			.prepare(
				`insert into search_events (id, created_at, anonymous_visitor_id, city_slug, date, time_bucket, time_window_label, party_size_bucket, normalized_tags)
				 values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			)
			.bind(id, createdAt, visitorId, citySlug, date, timeBucket, timeWindowLabel, partySizeBucket, normalizedTags)
			.run();
		await incrementTrend(db, citySlug, date, timeBucket, timeWindowLabel, partySizeBucket, normalizedTags, "search_count");
		return { persisted: true };
	}

	if (payload.eventName === "launch_best_tabs_clicked" || payload.eventName === "launch_all_tabs_clicked" || payload.eventName === "source_link_clicked") {
		await db
			.prepare(
				`insert into source_launch_events (id, created_at, launch_session_id, anonymous_visitor_id, city_slug, date, time_bucket, party_size_bucket, normalized_tags, launch_mode, source_ids)
				 values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			)
			.bind(id, createdAt, text(props.launchSessionId, id), visitorId, citySlug, date, timeBucket, partySizeBucket, normalizedTags, text(props.launchMode, "single-source"), sourceIds)
			.run();
		await incrementTrend(db, citySlug, date, timeBucket, timeWindowLabel, partySizeBucket, normalizedTags, "launch_count");
		for (const sourceId of stringArray(props.sourceIds)) {
			await incrementSourceInsight(db, citySlug, dateBucket, timeBucket, partySizeBucket, normalizedTags, sourceId, "opened_count");
		}
		return { persisted: true };
	}

	if (payload.eventName === "source_checkin_saved" || payload.eventName === "source_feedback_submitted") {
		const sourceId = text(props.sourceId);
		const reaction = text(props.sourceReaction);
		const outcome = text(props.sourceOutcome);
		await db
			.prepare(
				`insert into source_feedback_events (id, created_at, launch_session_id, source_id, anonymous_visitor_id, city_slug, date, date_bucket, time_bucket, time_window_label, party_size_bucket, normalized_tags, source_outcome, source_reaction, outcome, most_useful_source_id)
				 values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			)
			.bind(id, createdAt, text(props.launchSessionId, id), sourceId, visitorId, citySlug, date, dateBucket, timeBucket, timeWindowLabel, partySizeBucket, normalizedTags, outcome, reaction, text(props.outcome), text(props.mostUsefulSourceId))
			.run();
		await incrementTrend(db, citySlug, date, timeBucket, timeWindowLabel, partySizeBucket, normalizedTags, "feedback_count");
		if (sourceId) {
			if (reaction === "thumbs_up") await incrementSourceInsight(db, citySlug, dateBucket, timeBucket, partySizeBucket, normalizedTags, sourceId, "thumbs_up_count");
			if (reaction === "thumbs_down") await incrementSourceInsight(db, citySlug, dateBucket, timeBucket, partySizeBucket, normalizedTags, sourceId, "thumbs_down_count");
			if (outcome === "found_something" || outcome === "good_options") {
				await incrementSourceInsight(db, citySlug, dateBucket, timeBucket, partySizeBucket, normalizedTags, sourceId, "positive_checkin_count");
			}
			if (outcome === "maybe_revisit") await incrementSourceInsight(db, citySlug, dateBucket, timeBucket, partySizeBucket, normalizedTags, sourceId, "maybe_revisit_count");
			if (outcome === "nothing_good") await incrementSourceInsight(db, citySlug, dateBucket, timeBucket, partySizeBucket, normalizedTags, sourceId, "nothing_good_count");
		}
		return { persisted: true };
	}

	return { persisted: false, reason: "event ignored" };
}

async function incrementTrend(
	db: D1Database,
	citySlug: string,
	date: string,
	timeBucket: string,
	timeWindowLabel: string,
	partySizeBucket: string,
	normalizedTags: string,
	field: "search_count" | "launch_count" | "feedback_count",
) {
	const key = `${citySlug}:${date}:${timeBucket}:${partySizeBucket}:${normalizedTags}`;
	await db
		.prepare(
			`insert into trend_buckets (bucket_key, city_slug, date, time_bucket, time_window_label, party_size_bucket, normalized_tags, ${field}, updated_at)
			 values (?, ?, ?, ?, ?, ?, ?, 1, ?)
			 on conflict(bucket_key) do update set ${field} = ${field} + 1, updated_at = excluded.updated_at`,
		)
		.bind(key, citySlug, date, timeBucket, timeWindowLabel, partySizeBucket, normalizedTags, new Date().toISOString())
		.run();
}

async function incrementSourceInsight(
	db: D1Database,
	citySlug: string,
	dateBucket: string,
	timeBucket: string,
	partySizeBucket: string,
	normalizedTags: string,
	sourceId: string,
	field: "opened_count" | "thumbs_up_count" | "thumbs_down_count" | "positive_checkin_count" | "maybe_revisit_count" | "nothing_good_count",
) {
	const key = `${citySlug}:${dateBucket}:${timeBucket}:${partySizeBucket}:${normalizedTags}:${sourceId}`;
	await db
		.prepare(
			`insert into source_insight_buckets (bucket_key, city_slug, date_bucket, time_bucket, party_size_bucket, normalized_tags, source_id, ${field}, updated_at)
			 values (?, ?, ?, ?, ?, ?, ?, 1, ?)
			 on conflict(bucket_key) do update set ${field} = ${field} + 1, updated_at = excluded.updated_at`,
		)
		.bind(key, citySlug, dateBucket, timeBucket, partySizeBucket, normalizedTags, sourceId, new Date().toISOString())
		.run();
}

export function getVisitorCookie(request: Request): string | null {
	const cookie = request.headers.get("cookie");
	const match = cookie?.match(/(?:^|;\s*)dt_visitor=([^;]+)/);
	return match ? decodeURIComponent(match[1]) : null;
}

export function visitorResponseHeaders(visitorId: string): HeadersInit {
	return {
		"set-cookie": `dt_visitor=${encodeURIComponent(visitorId)}; Path=/; Max-Age=15552000; SameSite=Lax; Secure; HttpOnly`,
		"cache-control": "no-store",
	};
}

export function bucketCount(count: number): string {
	return countBucket(count);
}

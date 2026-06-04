import { getPartySizeBucket, getTimeBucket } from "@/lib/dateUtils";
import { getDinnerTabsEnv } from "@/lib/cloudflare";
import { fallbackTrend } from "@/lib/insights";
import type { SearchIntent, TrendBucket } from "@/lib/types";

type TrendRow = {
	city_slug: string;
	date: string;
	time_bucket: string;
	time_window_label: string;
	party_size_bucket: string;
	normalized_tags: string;
	search_count: number;
	launch_count: number;
	feedback_count: number;
	most_opened_source_ids: string;
	updated_at: string;
};

export async function getTrendForIntent(intent: SearchIntent): Promise<TrendBucket> {
	const env = await getDinnerTabsEnv();
	const fallback = fallbackTrend(intent);
	if (!env?.DB) return fallback;
	const normalizedTags = JSON.stringify(intent.cuisineTags.length ? intent.cuisineTags : [intent.query]);
	const row = await env.DB.prepare(
		`select city_slug, date, time_bucket, time_window_label, party_size_bucket, normalized_tags, search_count, launch_count, feedback_count, most_opened_source_ids, updated_at
		 from trend_buckets
		 where city_slug = ? and date = ? and time_bucket = ? and party_size_bucket = ? and normalized_tags = ?
		 limit 1`,
	)
		.bind(intent.city.slug, intent.date, getTimeBucket(intent.preferredTime), getPartySizeBucket(intent.partySize), normalizedTags)
		.first<TrendRow>();
	if (!row) return fallback;
	return {
		citySlug: row.city_slug,
		date: row.date,
		timeBucket: row.time_bucket as TrendBucket["timeBucket"],
		timeWindowLabel: row.time_window_label,
		partySizeBucket: row.party_size_bucket as TrendBucket["partySizeBucket"],
		normalizedTags: JSON.parse(row.normalized_tags) as string[],
		searchCount: row.search_count,
		launchCount: row.launch_count,
		feedbackCount: row.feedback_count,
		mostOpenedSourceIds: JSON.parse(row.most_opened_source_ids) as string[],
		updatedAt: row.updated_at,
	};
}

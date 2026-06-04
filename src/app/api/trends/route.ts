import { NextResponse } from "next/server";
import { getDinnerTabsEnv } from "@/lib/cloudflare";

export async function GET(request: Request) {
	const url = new URL(request.url);
	const citySlug = url.searchParams.get("city") ?? "chicago";
	const date = url.searchParams.get("date") ?? "2026-06-20";
	const env = await getDinnerTabsEnv();
	if (!env?.DB) {
		return NextResponse.json({ ok: true, source: "fallback", trends: [] });
	}
	const results = await env.DB.prepare(
		`select city_slug, date, time_bucket, time_window_label, party_size_bucket, normalized_tags, search_count, launch_count, feedback_count, most_opened_source_ids, updated_at
		 from trend_buckets
		 where city_slug = ? and date = ?
		 order by search_count desc
		 limit 12`,
	)
		.bind(citySlug, date)
		.all();
	return NextResponse.json({ ok: true, source: "d1", trends: results.results });
}

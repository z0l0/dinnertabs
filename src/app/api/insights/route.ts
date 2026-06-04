import { NextResponse } from "next/server";
import { getDinnerTabsEnv } from "@/lib/cloudflare";

export async function GET(request: Request) {
	const url = new URL(request.url);
	const citySlug = url.searchParams.get("city") ?? "chicago";
	const env = await getDinnerTabsEnv();
	if (!env?.DB) {
		return NextResponse.json({ ok: true, source: "fallback", sourceInsights: [] });
	}
	const results = await env.DB.prepare(
		`select source_id, sum(opened_count) as opened_count, sum(thumbs_up_count) as thumbs_up_count, sum(thumbs_down_count) as thumbs_down_count
		 from source_insight_buckets
		 where city_slug = ?
		 group by source_id
		 order by thumbs_up_count desc, opened_count desc
		 limit 12`,
	)
		.bind(citySlug)
		.all();
	return NextResponse.json({ ok: true, source: "d1", sourceInsights: results.results });
}

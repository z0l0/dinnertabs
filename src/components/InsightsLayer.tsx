import { Flame, ThumbsUp, TrendingUp, Utensils } from "lucide-react";
import type { PublicInsightSummary, SearchIntent, TrendBucket } from "@/lib/types";
import { sourceName } from "@/lib/sourceAdapters";

type InsightsLayerProps = {
	intent: SearchIntent;
	trend: TrendBucket;
	insights: PublicInsightSummary[];
};

const icons = [Flame, TrendingUp, ThumbsUp, Utensils];

export function InsightsLayer({ intent, trend, insights }: InsightsLayerProps) {
	const showTrend = trend.searchCount >= 20;
	const showRecentActivity = trend.searchCount > 0 && trend.searchCount < 20;
	return (
		<section className="space-y-4">
			{showTrend ? (
				<div className="rounded-2xl border hairline bg-[#123c38] p-5 text-white">
					<div className="flex flex-wrap items-start justify-between gap-4">
						<div>
							<p className="text-sm font-medium text-[#b9d7d2]">High DinnerTabs interest</p>
							<h2 className="mt-2 text-2xl font-semibold">
								{trend.searchCount}+ DinnerTabs users searched similar {intent.city.name} dinner tabs recently.
							</h2>
							<p className="mt-2 text-sm text-[#cfe4df]">
								Based on DinnerTabs searches, not restaurant availability or table scarcity.
							</p>
						</div>
						<div className="rounded-xl bg-white/10 px-4 py-3 text-sm">
							<p>{trend.timeWindowLabel}</p>
							<p>{trend.normalizedTags.join(" · ")}</p>
						</div>
					</div>
					<div className="mt-4 flex flex-wrap gap-2 text-sm">
						{trend.mostOpenedSourceIds.map((id) => (
							<span key={id} className="rounded-full bg-white/12 px-3 py-1">
								{sourceName(id)}
							</span>
						))}
					</div>
				</div>
			) : showRecentActivity ? (
				<div className="rounded-2xl border hairline bg-[#fffdf8] p-5 shadow-sm">
					<p className="text-sm font-medium text-[#0f766e]">Recent DinnerTabs activity</p>
					<h2 className="mt-2 text-2xl font-semibold">
						Someone searched a similar {intent.city.name} dinner tab for this date and time.
					</h2>
					<p className="mt-2 text-sm text-[#625b51]">
						Counts stay hidden until enough similar searches exist. This is DinnerTabs activity only, not restaurant availability.
					</p>
				</div>
			) : null}
			<div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
				{insights.map((insight, index) => {
					const Icon = icons[index % icons.length];
					return (
						<article key={insight.module} className="rounded-2xl border hairline bg-[#fffdf8] p-4 shadow-sm">
							<div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#e6f2ee] text-[#0f766e]">
								<Icon size={18} />
							</div>
							<h3 className="font-semibold text-[#161513]">{insight.title}</h3>
							<div className="mt-3 flex flex-wrap gap-2">
								{insight.items.map((item) => (
									<span key={`${insight.module}-${item.label}`} className="rounded-full border hairline bg-white px-3 py-1 text-sm">
										{item.label}
									</span>
								))}
							</div>
							<p className="mt-3 text-xs leading-5 text-[#746d63]">{insight.disclaimer}</p>
						</article>
					);
				})}
			</div>
		</section>
	);
}

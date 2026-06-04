import { sources } from "@/data/sources";
import type { GeneratedSourceLink, LaunchMode, SearchIntent, SourceAdapter } from "@/lib/types";

function supportsCountry(adapter: SourceAdapter, intent: SearchIntent): boolean {
	return adapter.countries.includes("GLOBAL") || adapter.countries.includes(intent.city.country);
}

export function generateSourceLinks(intent: SearchIntent): GeneratedSourceLink[] {
	return sources
		.filter((source) => source.isEnabled && supportsCountry(source, intent))
		.map((source) => {
			const rankScore = intent.city.sourcePriorityOverrides?.[source.id] ?? source.defaultRank;
			return {
				sourceId: source.id,
				sourceName: source.name,
				href: source.buildUrl(intent),
				label: `Open ${source.name}`,
				description: source.description,
				bestFor: source.bestFor,
				category: source.category,
				paramSupport: source.paramSupport,
				confidenceLabel: source.confidenceLabel,
				rankScore,
				launchGroup: source.launchGroup,
				legalNote: `Opens ${source.name} in a new tab. Complete any reservation at the source.`,
			};
		})
		.sort((a, b) => b.rankScore - a.rankScore);
}

export function filterLinksByMode(links: GeneratedSourceLink[], mode: LaunchMode): GeneratedSourceLink[] {
	if (mode === "all") return links;
	if (mode === "direct-hunt") return links.filter((link) => link.launchGroup === "direct-hunt" || link.sourceId === "google-maps");
	if (mode === "single-source") return links.slice(0, 1);
	return links.slice(0, 7);
}

export function sourceName(sourceId: string): string {
	return sources.find((source) => source.id === sourceId)?.name ?? sourceId;
}

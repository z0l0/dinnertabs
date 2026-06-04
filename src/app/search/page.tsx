import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Footer } from "@/components/Footer";
import { InsightsLayer } from "@/components/InsightsLayer";
import { ResultsWorkspace } from "@/components/ResultsWorkspace";
import { SearchForm } from "@/components/SearchForm";
import { TopNav } from "@/components/TopNav";
import { displayDate, displayTime } from "@/lib/dateUtils";
import { buildFallbackInsights } from "@/lib/insights";
import { parseNaturalLanguage, searchUrl } from "@/lib/naturalLanguage";
import { getTrendForIntent } from "@/lib/serverInsights";
import { generateSourceLinks } from "@/lib/sourceAdapters";

type SearchPageProps = {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function toUrlSearchParams(raw: Record<string, string | string[] | undefined>) {
	const params = new URLSearchParams();
	for (const [key, value] of Object.entries(raw)) {
		if (typeof value === "string") params.set(key, value);
	}
	return params;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
	const params = toUrlSearchParams(await searchParams);
	const rawPhrase = params.get("raw")?.trim();
	if (rawPhrase) {
		const rawIntent = parseNaturalLanguage(rawPhrase, params);
		redirect(searchUrl(rawIntent));
	}
	const phrase = `${params.get("q") ?? "dinner"} ${params.get("city") ?? "chicago"} ${params.get("date") ?? ""} ${params.get("time") ?? ""} ${params.get("party") ?? ""} people`;
	const intent = parseNaturalLanguage(phrase, params);
	const links = generateSourceLinks(intent);
	const trend = await getTrendForIntent(intent);
	const insights = buildFallbackInsights(intent);

	return (
		<>
			<TopNav />
			<main className="shell py-8 md:py-10">
				<Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#625b51]">
					<ChevronLeft size={16} />
					Edit search
				</Link>
				<section className="mb-6 grid gap-5 xl:grid-cols-[1fr_390px]">
					<div>
						<p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">Your tab set is ready</p>
						<h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-6xl">
							{intent.city.name} · {displayDate(intent.date)}
						</h1>
						<p className="mt-3 text-lg text-[#625b51]">
							{displayTime(intent.preferredTime)} · {intent.partySize} people · {intent.query}
						</p>
					</div>
					<Suspense>
						<SearchForm initialQuery={`${intent.date} ${intent.partySize} people ${intent.preferredTime} ${intent.query} ${intent.city.name}`} compact />
					</Suspense>
				</section>
				<div className="mb-6">
					<InsightsLayer intent={intent} trend={trend} insights={insights} />
				</div>
				<ResultsWorkspace intent={intent} links={links} />
			</main>
			<Footer />
		</>
	);
}

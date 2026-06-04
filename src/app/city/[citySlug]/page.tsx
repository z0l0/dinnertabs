import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { SearchForm } from "@/components/SearchForm";
import { TopNav } from "@/components/TopNav";
import { cities } from "@/data/cities";
import { generateSourceLinks } from "@/lib/sourceAdapters";
import { parseNaturalLanguage } from "@/lib/naturalLanguage";

type CityPageProps = {
	params: Promise<{ citySlug: string }>;
};

export function generateStaticParams() {
	return cities.map((city) => ({ citySlug: city.slug }));
}

export default async function CityPage({ params }: CityPageProps) {
	const { citySlug } = await params;
	const city = cities.find((item) => item.slug === citySlug);
	if (!city) notFound();
	const intent = parseNaturalLanguage(`June 20 4 people 6pm steakhouse ${city.name}`);
	const links = generateSourceLinks({ ...intent, city });
	return (
		<>
			<TopNav />
			<main className="shell py-12">
				<section className="grid gap-8 lg:grid-cols-[1fr_420px]">
					<div>
						<p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">City tabs</p>
						<h1 className="mt-3 text-5xl font-semibold tracking-tight">Open restaurant reservation searches in {city.name}</h1>
						<p className="mt-5 text-lg leading-8 text-[#625b51]">
							Build one {city.name} dinner search and open source tabs across reservation marketplaces, maps, guides, and direct booking finders.
						</p>
						<div className="mt-8 grid gap-3 sm:grid-cols-2">
							{links.slice(0, 8).map((link) => (
								<div key={link.sourceId} className="rounded-xl border hairline bg-[#fffdf8] p-4">
									<p className="font-semibold">{link.sourceName}</p>
									<p className="mt-1 text-sm text-[#625b51]">{link.confidenceLabel}</p>
								</div>
							))}
						</div>
					</div>
					<SearchForm compact initialQuery={`June 20 4 guys 6pm steakhouse ${city.name}`} />
				</section>
			</main>
			<Footer />
		</>
	);
}

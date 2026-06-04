import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { SearchForm } from "@/components/SearchForm";
import { TopNav } from "@/components/TopNav";
import { sources } from "@/data/sources";

type SourcePageProps = {
	params: Promise<{ sourceSlug: string }>;
};

export function generateStaticParams() {
	return sources.map((source) => ({ sourceSlug: source.slug }));
}

export default async function SourcePage({ params }: SourcePageProps) {
	const { sourceSlug } = await params;
	const source = sources.find((item) => item.slug === sourceSlug);
	if (!source) notFound();
	return (
		<>
			<TopNav />
			<main className="shell py-12">
				<Link href="/sources" className="text-sm font-medium text-[#625b51]">
					Back to sources
				</Link>
				<section className="mt-6 grid gap-8 lg:grid-cols-[1fr_420px]">
					<div>
						<p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">Source explainer</p>
						<h1 className="mt-3 text-5xl font-semibold tracking-tight">{source.name}</h1>
						<p className="mt-5 text-lg leading-8 text-[#625b51]">{source.description}</p>
						<div className="mt-6 flex flex-wrap gap-2">
							{source.bestFor.map((item) => (
								<span key={item} className="rounded-full border hairline bg-[#fffdf8] px-3 py-2 text-sm">
									{item}
								</span>
							))}
						</div>
						<div className="mt-8 rounded-2xl border hairline bg-[#fffdf8] p-5">
							<h2 className="text-xl font-semibold">What DinnerTabs can prefill</h2>
							<div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
								{Object.entries(source.paramSupport).map(([key, value]) => (
									<div key={key} className="flex items-center justify-between rounded-xl bg-[#f7f4ee] px-3 py-2">
										<span>{key}</span>
										<span className={value ? "text-[#0f766e]" : "text-[#a6402d]"}>{value ? "Yes" : "Manual"}</span>
									</div>
								))}
							</div>
							<p className="mt-4 text-sm text-[#625b51]">
								DinnerTabs is not affiliated with or endorsed by {source.name}. The source opens in a new tab and you complete any reservation there.
							</p>
						</div>
					</div>
					<SearchForm compact initialQuery="June 20 4 guys 6pm steakhouse Chicago" />
				</section>
			</main>
			<Footer />
		</>
	);
}

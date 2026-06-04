import Link from "next/link";
import { Footer } from "@/components/Footer";
import { TopNav } from "@/components/TopNav";
import { sources } from "@/data/sources";

export default function SourcesPage() {
	return (
		<>
			<TopNav />
			<main className="shell py-12">
				<h1 className="text-5xl font-semibold tracking-tight">Reservation sources</h1>
				<p className="mt-4 max-w-2xl text-lg leading-8 text-[#625b51]">
					DinnerTabs opens public source links in new tabs. Each source has different prefill support and manual steps.
				</p>
				<div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
					{sources.map((source) => (
						<Link key={source.id} href={`/sources/${source.slug}`} className="rounded-2xl border hairline bg-[#fffdf8] p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
							<p className="text-xl font-semibold">{source.name}</p>
							<p className="mt-2 text-sm leading-6 text-[#625b51]">{source.description}</p>
							<p className="mt-4 text-sm font-medium text-[#0f766e]">{source.confidenceLabel}</p>
						</Link>
					))}
				</div>
			</main>
			<Footer />
		</>
	);
}

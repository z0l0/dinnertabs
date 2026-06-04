import { Footer } from "@/components/Footer";
import { TopNav } from "@/components/TopNav";
import { cities } from "@/data/cities";
import { sources } from "@/data/sources";

export default function AdminPage() {
	return (
		<>
			<TopNav />
			<main className="shell py-12">
				<p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">Simple admin</p>
				<h1 className="mt-3 text-5xl font-semibold tracking-tight">DinnerTabs control room</h1>
				<p className="mt-4 max-w-3xl text-lg leading-8 text-[#625b51]">
					V1 admin is intentionally simple and config-driven. Raw private user notes are not shown here. Public insights should use thresholded summaries.
				</p>
				<div className="mt-8 grid gap-4 lg:grid-cols-3">
					<div className="rounded-2xl border hairline bg-[#fffdf8] p-5">
						<p className="text-sm text-[#625b51]">Configured sources</p>
						<p className="mt-2 text-4xl font-semibold">{sources.length}</p>
					</div>
					<div className="rounded-2xl border hairline bg-[#fffdf8] p-5">
						<p className="text-sm text-[#625b51]">Configured cities</p>
						<p className="mt-2 text-4xl font-semibold">{cities.length}</p>
					</div>
					<div className="rounded-2xl border hairline bg-[#fffdf8] p-5">
						<p className="text-sm text-[#625b51]">Public insight threshold</p>
						<p className="mt-2 text-4xl font-semibold">20+</p>
					</div>
				</div>
				<section className="mt-8 rounded-2xl border hairline bg-[#fffdf8] p-5">
					<h2 className="text-2xl font-semibold">Insight rules</h2>
					<div className="mt-4 grid gap-3 md:grid-cols-2">
						{[
							"Popular times are based on DinnerTabs searches only.",
							"Source helpfulness comes from DinnerTabs check-ins and thumbs.",
							"Place mentions require explicit anonymous sharing and review.",
							"No public module may imply table scarcity or availability.",
						].map((rule) => (
							<div key={rule} className="rounded-xl bg-[#f7f4ee] p-4 text-sm text-[#4c463d]">
								{rule}
							</div>
						))}
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}

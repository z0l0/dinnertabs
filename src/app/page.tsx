import { ArrowRight, Gauge, MessageSquareText, Search, ShieldCheck, Sparkles } from "lucide-react";
import { Footer } from "@/components/Footer";
import { TopNav } from "@/components/TopNav";

export default function Home() {
	return (
		<>
			<TopNav />
			<main>
				<section className="shell grid min-h-[calc(100vh-64px)] content-center gap-10 py-12 md:grid-cols-[1.1fr_0.9fr] md:py-20">
					<div className="space-y-8">
						<div className="inline-flex items-center gap-2 rounded-full border hairline bg-[#fffdf8] px-3 py-2 text-sm text-[#625b51]">
							<Sparkles size={16} className="text-[#d97706]" />
							One search. All your reservation tabs.
						</div>
						<div className="space-y-5">
							<h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-tight text-[#161513] md:text-7xl">
								Find the table without rebuilding the search everywhere.
							</h1>
							<p className="max-w-2xl text-lg leading-8 text-[#625b51]">
								Enter once, open the right reservation source tabs, save quick notes, and see first-party DinnerTabs interest
								signals without scraping or pretending to know availability.
							</p>
						</div>
						<form
							action="/search"
							method="get"
							className="rounded-2xl border hairline bg-[#fffdf8] p-4 shadow-sm md:p-6"
						>
							<label className="block text-sm font-medium text-[#4c463d]" htmlFor="raw">
								Dinner search
							</label>
							<div className="mt-2 grid gap-3 md:grid-cols-[1fr_auto]">
								<input
									id="raw"
									name="raw"
									className="focus-ring h-14 w-full rounded-xl border hairline bg-white px-4 text-base text-[#161513] shadow-inner outline-none"
									defaultValue="June 20 4 guys 6pm steakhouse Chicago"
									placeholder="June 20 4 guys 6pm steakhouse Chicago"
								/>
								<input type="hidden" name="flex" value="90" />
								<button
									type="submit"
									className="focus-ring inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-[#0f766e] px-6 font-semibold text-white shadow-sm transition hover:bg-[#0b4f4a]"
								>
									<Search size={19} />
									Build my tabs
								</button>
							</div>
							<div className="mt-4 flex flex-wrap gap-2 text-sm">
								<span className="inline-flex items-center gap-2 rounded-full border hairline bg-white px-3 py-2">
									<span className="h-2 w-2 rounded-full bg-[#0f766e]" />
									Chicago
								</span>
								<span className="rounded-full border hairline bg-white px-3 py-2">Sat, Jun 20, 2026</span>
								<span className="rounded-full border hairline bg-white px-3 py-2">6:00 PM</span>
								<span className="rounded-full border hairline bg-white px-3 py-2">4 people</span>
								<span className="rounded-full border hairline bg-white px-3 py-2">steakhouse</span>
							</div>
						</form>
						<div className="grid gap-3 text-sm text-[#4c463d] sm:grid-cols-3">
							<div className="rounded-xl border hairline bg-[#fffdf8]/80 p-4">
								<Gauge className="mb-3 text-[#0f766e]" size={22} />
								<p className="font-semibold text-[#161513]">Fast tab sets</p>
								<p className="mt-1">OpenTable, Google Maps, DoorDash, Resy, Tock, Michelin, direct-site finders, and more.</p>
							</div>
							<div className="rounded-xl border hairline bg-[#fffdf8]/80 p-4">
								<MessageSquareText className="mb-3 text-[#0f766e]" size={22} />
								<p className="font-semibold text-[#161513]">Your 2 cents</p>
								<p className="mt-1">Thumbs up, nothing good, maybe revisit, and local notes for each source.</p>
							</div>
							<div className="rounded-xl border hairline bg-[#fffdf8]/80 p-4">
								<ShieldCheck className="mb-3 text-[#0f766e]" size={22} />
								<p className="font-semibold text-[#161513]">Legally boring</p>
								<p className="mt-1">No scraping, no tab inspection, no booking claims. Just user-controlled source links.</p>
							</div>
						</div>
					</div>
					<aside className="rounded-2xl border hairline bg-[#111c1a] p-5 text-white shadow-xl md:self-center">
						<div className="rounded-xl bg-[#20312d] p-4">
							<p className="text-sm text-[#b9c8c2]">Live example</p>
							<p className="mt-2 text-2xl font-semibold">Chicago · Jun 20 · 6 PM · 4 people</p>
							<p className="mt-1 text-[#d9e4df]">Steakhouse search command center</p>
						</div>
						<div className="mt-5 space-y-3">
							{["OpenTable", "Google Maps", "DoorDash", "Resy", "Tock", "Michelin"].map((source, index) => (
								<div key={source} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/8 px-4 py-3">
									<span>{source}</span>
									<span className="rounded-full bg-white/12 px-2 py-1 text-xs text-[#d9e4df]">{index < 3 ? "Best tab" : "Check"}</span>
								</div>
							))}
						</div>
						<a
							href="/search?city=chicago&date=2026-06-20&time=18%3A00&party=4&q=steakhouse&flex=90"
							className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-semibold text-[#111c1a]"
						>
							Open the demo search
							<ArrowRight size={18} />
						</a>
					</aside>
				</section>
			</main>
			<Footer />
		</>
	);
}

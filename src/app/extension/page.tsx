import { Footer } from "@/components/Footer";
import { TopNav } from "@/components/TopNav";

export default function ExtensionPage() {
	return (
		<>
			<TopNav />
			<main className="shell py-12">
				<h1 className="text-5xl font-semibold tracking-tight">Browser extension roadmap</h1>
				<p className="mt-5 max-w-2xl text-lg leading-8 text-[#625b51]">
					A future extension can make tab launching and side-panel notes even smoother. It will keep the same guardrails: no scraping, no DOM reading, no auto-booking.
				</p>
			</main>
			<Footer />
		</>
	);
}

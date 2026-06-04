import { Footer } from "@/components/Footer";
import { TopNav } from "@/components/TopNav";

type LegalPageProps = {
	title: string;
	intro: string;
	sections: Array<{ heading: string; body: string[] }>;
};

export function LegalPage({ title, intro, sections }: LegalPageProps) {
	return (
		<>
			<TopNav />
			<main className="shell max-w-4xl py-12">
				<p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">DinnerTabs policy</p>
				<h1 className="mt-3 text-5xl font-semibold tracking-tight">{title}</h1>
				<p className="mt-5 text-lg leading-8 text-[#625b51]">{intro}</p>
				<div className="mt-10 space-y-6">
					{sections.map((section) => (
						<section key={section.heading} className="rounded-2xl border hairline bg-[#fffdf8] p-6">
							<h2 className="text-xl font-semibold">{section.heading}</h2>
							<div className="mt-4 space-y-3 text-[#625b51]">
								{section.body.map((paragraph) => (
									<p key={paragraph}>{paragraph}</p>
								))}
							</div>
						</section>
					))}
				</div>
			</main>
			<Footer />
		</>
	);
}

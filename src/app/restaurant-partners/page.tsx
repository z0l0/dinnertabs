import { Footer } from "@/components/Footer";
import { TopNav } from "@/components/TopNav";
import { directPartners } from "@/data/directPartners";

export default function RestaurantPartners() {
	return (
		<>
			<TopNav />
			<main className="shell py-12">
				<section className="max-w-3xl">
					<p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0f766e]">Direct partners</p>
					<h1 className="mt-3 text-5xl font-semibold tracking-tight">Get direct booking traffic from high-intent dinner searches.</h1>
					<p className="mt-5 text-lg leading-8 text-[#625b51]">
						DinnerTabs can feature restaurant-owned booking links with clear sponsored labelling. No fake availability claims, no resale, no booking middleman.
					</p>
				</section>
				<div className="mt-8 grid gap-4 md:grid-cols-2">
					{directPartners.map((partner) => (
						<article key={partner.id} className="rounded-2xl border hairline bg-[#fffdf8] p-5">
							<p className="text-sm font-semibold text-[#0f766e]">{partner.sponsorshipLabel}</p>
							<h2 className="mt-2 text-2xl font-semibold">{partner.name}</h2>
							<p className="mt-2 text-[#625b51]">{partner.description}</p>
							<a className="mt-5 inline-block rounded-xl bg-[#161513] px-4 py-3 font-semibold text-white" href={partner.bookingUrl} target="_blank" rel="noopener noreferrer">
								Open restaurant booking page
							</a>
						</article>
					))}
				</div>
			</main>
			<Footer />
		</>
	);
}

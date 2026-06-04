import Link from "next/link";

export function Footer() {
	return (
		<footer className="mt-20 border-t hairline bg-[#fffdf8]/70">
			<div className="shell grid gap-6 py-8 text-sm text-[#625b51] md:grid-cols-[1.5fr_1fr]">
				<div className="space-y-3">
					<p className="font-semibold text-[#161513]">DinnerTabs</p>
					<p>
						DinnerTabs is an independent search launcher. We do not book reservations, sell reservations, show third-party
						availability, scrape booking sites, or represent any third-party booking platform. Each source link opens a third-party
						website where availability, pricing, cancellation rules, deposits, and booking terms are controlled by that source.
					</p>
					<p>
						Third-party names are used only to identify where a link opens. DinnerTabs is not affiliated with or endorsed by any
						third-party booking platform unless explicitly stated.
					</p>
				</div>
				<nav className="grid content-start gap-2 md:justify-end">
					<Link href="/legal">Legal</Link>
					<Link href="/terms">Terms</Link>
					<Link href="/privacy">Privacy</Link>
					<Link href="/cookies">Cookies</Link>
					<Link href="/admin">Admin</Link>
				</nav>
			</div>
		</footer>
	);
}

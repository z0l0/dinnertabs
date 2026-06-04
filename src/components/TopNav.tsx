import Link from "next/link";

export function TopNav() {
	return (
		<header className="border-b hairline bg-[#fffdf8]/80 backdrop-blur">
			<div className="shell flex h-16 items-center justify-between">
				<Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
					<span className="grid h-9 w-9 place-items-center rounded-lg bg-[#0f766e] text-white">DT</span>
					<span>DinnerTabs</span>
				</Link>
				<nav className="hidden items-center gap-5 text-sm text-[#625b51] sm:flex">
					<Link href="/city/chicago">Chicago</Link>
					<Link href="/sources">Sources</Link>
					<Link href="/restaurant-partners">Partners</Link>
				</nav>
			</div>
		</header>
	);
}

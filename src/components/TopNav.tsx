export function TopNav() {
	return (
		<header className="border-b hairline bg-[#fffdf8]/80 backdrop-blur">
			<div className="shell flex h-16 items-center justify-between">
				<a href="/" className="flex items-center gap-2 font-semibold tracking-tight">
					<span className="grid h-9 w-9 place-items-center rounded-lg bg-[#0f766e] text-white">DT</span>
					<span>DinnerTabs</span>
				</a>
				<nav className="hidden items-center gap-5 text-sm text-[#625b51] sm:flex">
					<a href="/city/chicago">Chicago</a>
					<a href="/sources">Sources</a>
					<a href="/restaurant-partners">Partners</a>
				</nav>
			</div>
		</header>
	);
}

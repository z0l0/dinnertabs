"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Clock, Search, UsersRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { cities } from "@/data/cities";
import { displayDate, displayTime } from "@/lib/dateUtils";
import { baseEventProps, trackEvent } from "@/lib/events";
import { parseNaturalLanguage, searchUrl } from "@/lib/naturalLanguage";
import { rememberSearch } from "@/lib/memory";

type SearchFormProps = {
	initialQuery?: string;
	compact?: boolean;
};

export function SearchForm({ initialQuery = "June 20 4 guys 6pm steakhouse Chicago", compact = false }: SearchFormProps) {
	const router = useRouter();
	const [query, setQuery] = useState(initialQuery);
	const intent = useMemo(() => parseNaturalLanguage(query), [query]);

	function submit() {
		const url = searchUrl(intent);
		rememberSearch({
			city: intent.city.name,
			citySlug: intent.city.slug,
			date: intent.date,
			time: intent.preferredTime,
			partySize: intent.partySize,
			query: intent.query,
			searchUrl: url,
			createdAt: new Date().toISOString(),
		});
		void trackEvent("search_submitted", baseEventProps(intent));
		router.push(url);
	}

	return (
		<section className={compact ? "rounded-xl border hairline bg-[#fffdf8] p-4" : "rounded-2xl border hairline bg-[#fffdf8] p-4 shadow-sm md:p-6"}>
			<label className="block text-sm font-medium text-[#4c463d]" htmlFor="dinner-search">
				Dinner search
			</label>
			<div className="mt-2 grid gap-3 md:grid-cols-[1fr_auto]">
				<input
					id="dinner-search"
					className="focus-ring h-14 w-full rounded-xl border hairline bg-white px-4 text-base text-[#161513] shadow-inner outline-none"
					value={query}
					onChange={(event) => setQuery(event.target.value)}
					onKeyDown={(event) => {
						if (event.key === "Enter") submit();
					}}
					placeholder="June 20 4 guys 6pm steakhouse Chicago"
				/>
				<button
					type="button"
					className="focus-ring inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-[#0f766e] px-6 font-semibold text-white shadow-sm transition hover:bg-[#0b4f4a]"
					onClick={submit}
				>
					<Search size={19} />
					Build my tabs
				</button>
			</div>
			<div className="mt-4 flex flex-wrap gap-2 text-sm">
				<span className="inline-flex items-center gap-2 rounded-full border hairline bg-white px-3 py-2">
					<span className="h-2 w-2 rounded-full bg-[#0f766e]" />
					{intent.city.name}
				</span>
				<span className="inline-flex items-center gap-2 rounded-full border hairline bg-white px-3 py-2">
					<CalendarDays size={16} />
					{displayDate(intent.date)}
				</span>
				<span className="inline-flex items-center gap-2 rounded-full border hairline bg-white px-3 py-2">
					<Clock size={16} />
					{displayTime(intent.preferredTime)}
				</span>
				<span className="inline-flex items-center gap-2 rounded-full border hairline bg-white px-3 py-2">
					<UsersRound size={16} />
					{intent.partySize} people
				</span>
				<span className="rounded-full border hairline bg-white px-3 py-2">{intent.query}</span>
			</div>
			<datalist id="cities">
				{cities.map((city) => (
					<option key={city.slug} value={city.name} />
				))}
			</datalist>
		</section>
	);
}

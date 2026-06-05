import { cities, defaultCity, findCity } from "@/data/cities";
import { normalizeDate, normalizeTime } from "@/lib/dateUtils";
import type { SearchIntent } from "@/lib/types";

const cuisineAliases: Record<string, string[]> = {
	steakhouse: ["steakhouse", "steak", "chophouse", "grill", "ribeye", "filet"],
	italian: ["italian", "pasta", "pizza"],
	sushi: ["sushi", "omakase", "japanese"],
	michelin: ["michelin", "bib gourmand", "starred"],
	cocktails: ["cocktails", "drinks", "bar"],
};

function extractParty(input: string): number {
	const match =
		input.match(/\b(?:for|party of|table for)\s+(\d{1,2})\b/i) ??
		input.match(/\b(\d{1,2})\s*(?:people|person|guys|girls|diners|ppl)\b/i);
	return match ? Math.max(1, Math.min(20, Number(match[1]))) : 2;
}

function extractTime(input: string): string {
	const match =
		input.match(/\b(\d{1,2}(?::\d{2})\s*(?:am|pm)?)\b/i) ??
		input.match(/\b(\d{1,2}\s*(?:am|pm))\b/i) ??
		input.match(/\bat\s+(\d{1,2})\b/i);
	if (!match) return "19:30";
	const candidate = normalizeTime(match[1]);
	const hour = Number(candidate.split(":")[0]);
	return hour >= 5 && hour <= 23 ? candidate : "19:30";
}

function extractDate(input: string): string {
	const explicit = input.match(/\b(20\d{2}-\d{2}-\d{2})\b/);
	if (explicit) return normalizeDate(explicit[1]);
	const monthDay = input.match(/\b(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t)?(?:ember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\.?\s+(\d{1,2})(?:st|nd|rd|th)?\b/i);
	if (monthDay) return normalizeDate(`${monthDay[1]} ${monthDay[2]}`);
	const dayFirst = input.match(/\b(\d{1,2})(?:st|nd|rd|th)?\s+(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t)?(?:ember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\.?\b/i);
	if (dayFirst) return normalizeDate(`${dayFirst[2]} ${dayFirst[1]}`);
	if (/\btomorrow\b/i.test(input)) return normalizeDate("tomorrow");
	if (/\b(today|tonight)\b/i.test(input)) return normalizeDate("today");
	if (/\b(weekend|saturday)\b/i.test(input)) return normalizeDate("saturday");
	return normalizeDate();
}

function extractCity(input: string) {
	const lower = input.toLowerCase();
	return cities.find((city) => lower.includes(city.name.toLowerCase()) || lower.includes(city.slug.replace(/-/g, " "))) ?? defaultCity();
}

function extractTags(input: string): string[] {
	const lower = input.toLowerCase();
	const tags = Object.entries(cuisineAliases)
		.filter(([, aliases]) => aliases.some((alias) => lower.includes(alias)))
		.map(([tag]) => tag);
	return [...new Set(tags.length ? tags : lower.includes("dinner") ? ["dinner"] : [])];
}

function cleanupQuery(input: string): string {
	let value = input.toLowerCase();
	for (const city of cities) value = value.replaceAll(city.name.toLowerCase(), "");
	value = value
		.replace(/\b(june|jun|july|jul|august|aug|september|sept|sep|october|oct|november|nov|december|dec|january|jan|february|feb|march|mar|april|apr|may)\s+\d{1,2}(st|nd|rd|th)?\b/g, "")
		.replace(/\b\d{1,2}(st|nd|rd|th)?\s+(june|jun|july|jul|august|aug|september|sept|sep|october|oct|november|nov|december|dec|january|jan|february|feb|march|mar|april|apr|may)\b/g, "")
		.replace(/\b(for|party of|table for)\s+\d{1,2}\b/g, "")
		.replace(/\b\d{1,2}\s*(people|person|guys|girls|diners|ppl)\b/g, "")
		.replace(/\b\d{1,2}(:\d{2})?\s*(am|pm)?\b/g, "")
		.replace(/\b(today|tonight|tomorrow|saturday|weekend|dinner|reservation|reservations|find|need|looking|at|in|on|for|me|us)\b/g, "")
		.replace(/\s+/g, " ")
		.trim();
	if (value.includes("steak")) return "steakhouse";
	return value || "dinner";
}

export function parseNaturalLanguage(input: string, params?: URLSearchParams): SearchIntent {
	const city = findCity(params?.get("city")) ?? extractCity(input);
	const date = normalizeDate(params?.get("date") ?? extractDate(input));
	const preferredTime = normalizeTime(params?.get("time") ?? extractTime(input));
	const partySize = Number(params?.get("party") ?? "") || extractParty(input);
	const query = (params?.get("q") ?? cleanupQuery(input)).trim();
	const cuisineTags = [...new Set([...extractTags(input), ...extractTags(query)])];
	return {
		city,
		date,
		preferredTime,
		timeFlexMinutes: (Number(params?.get("flex")) as SearchIntent["timeFlexMinutes"]) || 90,
		partySize,
		query,
		cuisineTags,
		vibeTags: partySize >= 4 ? ["group dinner"] : [],
		mealPeriod: "dinner",
	};
}

export function searchUrl(intent: SearchIntent): string {
	const params = new URLSearchParams({
		city: intent.city.slug,
		date: intent.date,
		time: intent.preferredTime,
		party: String(intent.partySize),
		q: intent.query,
		flex: String(intent.timeFlexMinutes),
	});
	return `/search?${params.toString()}`;
}

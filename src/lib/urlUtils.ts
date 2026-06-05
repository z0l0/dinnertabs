export function encodeQuery(value: string): string {
	return encodeURIComponent(value.trim().replace(/\s+/g, " "));
}

export function safeOutboundUrl(url: string): string {
	const parsed = new URL(url);
	if (parsed.protocol !== "https:") throw new Error(`Unsafe outbound URL: ${url}`);
	return parsed.toString();
}

export function buildGoogleMapsSearchUrl(query: string, latitude?: number, longitude?: number): string {
	const coordinateSuffix = typeof latitude === "number" && typeof longitude === "number" ? `/@${latitude.toFixed(4)},${longitude.toFixed(4)},13z` : "";
	return safeOutboundUrl(`https://www.google.com/maps/search/${encodeQuery(query)}${coordinateSuffix}`);
}

export function formatDateTimeLocal(date: string, time: string): string {
	return `${date}T${time}:00`;
}

export function sourceSearchText(parts: Array<string | number | undefined | null>): string {
	return parts.filter(Boolean).join(" ");
}

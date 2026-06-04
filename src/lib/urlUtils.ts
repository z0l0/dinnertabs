export function encodeQuery(value: string): string {
	return encodeURIComponent(value.trim().replace(/\s+/g, " "));
}

export function safeOutboundUrl(url: string): string {
	const parsed = new URL(url);
	if (parsed.protocol !== "https:") throw new Error(`Unsafe outbound URL: ${url}`);
	return parsed.toString();
}

export function buildGoogleSearchUrl(query: string): string {
	return safeOutboundUrl(`https://www.google.com/search?q=${encodeQuery(query)}`);
}

export function buildGoogleMapsSearchUrl(query: string): string {
	return safeOutboundUrl(`https://www.google.com/maps/search/${encodeQuery(query)}`);
}

export function formatDateTimeLocal(date: string, time: string): string {
	return `${date}T${time}:00`;
}

export function sourceSearchText(parts: Array<string | number | undefined | null>): string {
	return parts.filter(Boolean).join(" ");
}

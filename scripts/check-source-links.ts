import { parseNaturalLanguage } from "@/lib/naturalLanguage";
import { generateSourceLinks } from "@/lib/sourceAdapters";

function assert(condition: unknown, message: string): asserts condition {
	if (!condition) throw new Error(message);
}

function linksFor(query: string) {
	const intent = parseNaturalLanguage(query);
	const links = generateSourceLinks(intent);
	const bySource = new Map(links.map((link) => [link.sourceId, link]));
	for (const link of links) {
		assert(link.href.startsWith("https://"), `${link.sourceName} must use HTTPS`);
		assert(!link.href.startsWith("https://www.google.com/search"), `${link.sourceName} must not use generic Google Search`);
	}
	return { intent, links, bySource };
}

const chicago = linksFor("June 20 4 guys 6pm steakhouse Chicago");
assert(chicago.intent.city.slug === "chicago", "Chicago natural language parsing failed");
assert(chicago.bySource.get("opentable")?.href.includes("latitude=41.8781"), "Chicago OpenTable must include Chicago latitude");
assert(chicago.bySource.get("resy")?.href.includes("/cities/chicago-il"), "Chicago Resy slug is wrong");
assert(chicago.bySource.get("toast-local")?.href.includes("/cities/chicago-il/"), "Chicago Toast slug is wrong");
assert(chicago.bySource.has("doordash-reservations"), "Chicago should include DoorDash Reservations");

const newYork = linksFor("June 20 4 guys 6pm steakhouse New York");
assert(newYork.intent.city.slug === "new-york", "New York natural language parsing failed");
assert(newYork.bySource.get("opentable")?.href.includes("latitude=40.7128"), "New York OpenTable must include New York latitude");
assert(newYork.bySource.get("resy")?.href.includes("/cities/new-york-ny"), "New York Resy slug is wrong");
assert(newYork.bySource.get("tock")?.href.includes("/city/new-york-city"), "New York Tock slug is wrong");
assert(newYork.bySource.get("toast-local")?.href.includes("/cities/new-york-ny/"), "New York Toast slug is wrong");

const toronto = linksFor("June 20 4 guys 6pm steakhouse Toronto");
assert(toronto.intent.city.slug === "toronto", "Toronto natural language parsing failed");
assert(toronto.bySource.get("opentable")?.href.startsWith("https://www.opentable.ca/"), "Toronto OpenTable must use opentable.ca");
assert(toronto.bySource.get("opentable")?.href.includes("latitude=43.6532"), "Toronto OpenTable must include Toronto latitude");
assert(toronto.bySource.get("resy")?.href.includes("/cities/toronto-on"), "Toronto Resy slug is wrong");
assert(toronto.bySource.get("tock")?.href.includes("/city/toronto"), "Toronto Tock slug is wrong");
assert(toronto.bySource.get("michelin")?.href.includes("/ca/en/ontario/toronto/"), "Toronto Michelin path is wrong");
assert(!toronto.bySource.has("doordash-reservations"), "Toronto should not include DoorDash Reservations");
assert(!toronto.bySource.has("toast-local"), "Toronto should not include Toast Local because toast.app resolves toronto-on to Ohio");

console.log("Source URL checks passed.");

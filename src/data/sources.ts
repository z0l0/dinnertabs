import type { SourceAdapter } from "@/lib/types";
import { buildGoogleMapsSearchUrl, encodeQuery, formatDateTimeLocal, safeOutboundUrl, sourceSearchText } from "@/lib/urlUtils";

export const sources: SourceAdapter[] = [
	{
		id: "opentable",
		name: "OpenTable",
		slug: "opentable",
		category: "reservation-marketplace",
		isEnabled: true,
		countries: ["CA", "US"],
		cityCoverage: "dynamic",
		description: "Broad reservation marketplace with strong date, time, party-size, and keyword support.",
		bestFor: ["Broad coverage", "steakhouses", "group dinners", "mainstream reservation searches"],
		defaultRank: 100,
		launchGroup: "best-starting-points",
		confidenceLabel: "Strong prefill",
		mobileAppLinkRisk: true,
		paramSupport: { city: true, date: true, time: true, partySize: true, query: true, cuisine: true, timeWindow: false },
		buildUrl: (intent) => {
			const url = new URL(`https://www.${intent.city.openTableDomain ?? "opentable.com"}/s`);
			const term = intent.query || intent.city.name;
			url.searchParams.set("dateTime", formatDateTimeLocal(intent.date, intent.preferredTime));
			url.searchParams.set("covers", String(intent.partySize));
			url.searchParams.set("latitude", String(intent.city.latitude));
			url.searchParams.set("longitude", String(intent.city.longitude));
			url.searchParams.set("term", term);
			return safeOutboundUrl(url.toString());
		},
	},
	{
		id: "google-maps",
		name: "Google Maps",
		slug: "google-maps",
		category: "search-engine",
		isEnabled: true,
		countries: ["GLOBAL"],
		cityCoverage: "dynamic",
		description: "Fast discovery layer for direct restaurant sites, Reserve with Google buttons, maps, and neighborhoods.",
		bestFor: ["Direct sites", "neighborhood scanning", "Reserve with Google", "backup options"],
		defaultRank: 96,
		launchGroup: "best-starting-points",
		confidenceLabel: "Partial prefill",
		mobileAppLinkRisk: true,
		paramSupport: { city: true, date: false, time: false, partySize: false, query: true, cuisine: true, timeWindow: false },
		buildUrl: (intent) =>
			buildGoogleMapsSearchUrl(
				sourceSearchText([intent.city.name, intent.query || "restaurant", "reservations", intent.partySize, "people", intent.date, intent.preferredTime]),
				intent.city.latitude,
				intent.city.longitude,
			),
	},
	{
		id: "doordash-reservations",
		name: "DoorDash Reservations",
		slug: "doordash-reservations",
		category: "reservation-marketplace",
		isEnabled: true,
		countries: ["US"],
		cityCoverage: "unknown",
		description: "Useful in supported US cities for DoorDash Going Out and reservation discovery.",
		bestFor: ["US cities", "newer reservation inventory", "DoorDash-connected restaurants"],
		defaultRank: 92,
		launchGroup: "best-starting-points",
		confidenceLabel: "Manual after opening",
		mobileAppLinkRisk: true,
		paramSupport: { city: true, date: false, time: false, partySize: false, query: true, cuisine: true, timeWindow: false },
		isAvailable: (intent) => intent.city.doorDashReservationsSupported === true,
		buildUrl: () => safeOutboundUrl("https://www.doordash.com/dineout?is_reservation=true"),
	},
	{
		id: "resy",
		name: "Resy",
		slug: "resy",
		category: "reservation-marketplace",
		isEnabled: true,
		countries: ["CA", "US"],
		cityCoverage: "dynamic",
		description: "Good for trendier, high-demand, and date-night restaurants in major cities.",
		bestFor: ["High-demand rooms", "date night", "trendier restaurants", "major cities"],
		defaultRank: 88,
		launchGroup: "best-starting-points",
		confidenceLabel: "Partial prefill",
		mobileAppLinkRisk: true,
		paramSupport: { city: true, date: true, time: false, partySize: true, query: false, cuisine: false, timeWindow: false },
		buildUrl: (intent) =>
			intent.city.resySlug
				? safeOutboundUrl(`https://resy.com/cities/${intent.city.resySlug}?date=${intent.date}&seats=${intent.partySize}`)
				: safeOutboundUrl("https://resy.com/cities"),
	},
	{
		id: "tock",
		name: "Tock",
		slug: "tock",
		category: "reservation-marketplace",
		isEnabled: true,
		countries: ["CA", "US"],
		cityCoverage: "dynamic",
		description: "Strong for special occasion dining, tasting menus, experiences, and premium reservations.",
		bestFor: ["Tasting menus", "special occasions", "experiences", "premium dining"],
		defaultRank: 82,
		launchGroup: "premium",
		confidenceLabel: "Manual after opening",
		mobileAppLinkRisk: true,
		paramSupport: { city: true, date: false, time: false, partySize: false, query: false, cuisine: false, timeWindow: false },
		buildUrl: (intent) =>
			intent.city.tockSlug
				? safeOutboundUrl(`https://www.exploretock.com/city/${intent.city.tockSlug}`)
				: safeOutboundUrl("https://www.exploretock.com/"),
	},
	{
		id: "michelin",
		name: "Michelin Guide",
		slug: "michelin",
		category: "guide",
		isEnabled: true,
		countries: ["CA", "US", "GLOBAL"],
		cityCoverage: "dynamic",
		description: "Quality filter for starred, Bib Gourmand, and recommended restaurants, then book at source.",
		bestFor: ["Quality filter", "Michelin", "Bib Gourmand", "special trips"],
		defaultRank: 77,
		launchGroup: "guides-reviews",
		confidenceLabel: "Manual after opening",
		paramSupport: { city: true, date: false, time: false, partySize: false, query: true, cuisine: true, timeWindow: false },
		isAvailable: (intent) => Boolean(intent.city.michelinPath),
		buildUrl: (intent) =>
			safeOutboundUrl(`https://guide.michelin.com${intent.city.michelinPath}`),
	},
	{
		id: "toast-local",
		name: "Toast Local",
		slug: "toast-local",
		category: "reservation-marketplace",
		isEnabled: true,
		countries: ["US"],
		cityCoverage: "dynamic",
		description: "Toast's consumer restaurant discovery and reservation surface where Local by Toast is supported.",
		bestFor: ["Toast restaurants", "local discovery", "reservation and waitlist pages"],
		defaultRank: 73,
		launchGroup: "direct-hunt",
		confidenceLabel: "Manual after opening",
		mobileAppLinkRisk: true,
		paramSupport: { city: true, date: false, time: false, partySize: false, query: false, cuisine: false, timeWindow: false },
		isAvailable: (intent) => Boolean(intent.city.toastCitySlug),
		buildUrl: (intent) =>
			safeOutboundUrl(`https://toast.app/cities/${intent.city.toastCitySlug}/content/popular`),
	},
	{
		id: "yelp",
		name: "Yelp",
		slug: "yelp",
		category: "discovery",
		isEnabled: true,
		countries: ["CA", "US"],
		cityCoverage: "dynamic",
		description: "Reviews and discovery with booking or waitlist links where supported.",
		bestFor: ["Reviews", "discovery", "backup choices", "waitlists"],
		defaultRank: 66,
		launchGroup: "guides-reviews",
		confidenceLabel: "Partial prefill",
		mobileAppLinkRisk: true,
		paramSupport: { city: true, date: false, time: false, partySize: false, query: true, cuisine: true, timeWindow: false },
		buildUrl: (intent) =>
			safeOutboundUrl(
				`https://www.yelp.com/search?find_desc=${encodeQuery(`${intent.query || "restaurants"} reservations`)}&find_loc=${encodeQuery(`${intent.city.name}, ${intent.city.region}`)}`,
			),
	},
];

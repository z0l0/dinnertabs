export type CountryCode = "CA" | "US" | "GLOBAL";

export type City = {
	name: string;
	slug: string;
	region: string;
	country: "CA" | "US";
	latitude: number;
	longitude: number;
	openTableDomain?: "opentable.com" | "opentable.ca";
	resySlug?: string | null;
	tockSlug?: string | null;
	toastCitySlug?: string | null;
	michelinPath?: string | null;
	doorDashReservationsSupported?: boolean;
	sourcePriorityOverrides?: Record<string, number>;
};

export type TimeBucket = "breakfast" | "brunch" | "lunch" | "dinner" | "late";
export type DateBucket = "today" | "tomorrow" | "this_weekend" | "future" | "unknown";
export type PartySizeBucket = "1" | "2" | "3-4" | "5-6" | "7+";

export type SearchIntent = {
	city: City;
	date: string;
	preferredTime: string;
	timeFlexMinutes: 0 | 30 | 60 | 90 | 120;
	partySize: number;
	query: string;
	cuisineTags: string[];
	vibeTags: string[];
	mealPeriod: TimeBucket;
};

export type SourceCategory =
	| "reservation-marketplace"
	| "direct-widget-finder"
	| "discovery"
	| "guide"
	| "search-engine"
	| "direct-partners"
	| "credit-card"
	| "other";

export type SourceParamSupport = {
	city: boolean;
	date: boolean;
	time: boolean;
	partySize: boolean;
	query: boolean;
	cuisine: boolean;
	timeWindow: boolean;
};

export type SourceConfidenceLabel =
	| "Strong prefill"
	| "Partial prefill"
	| "Manual after opening"
	| "Direct partner links";

export type LaunchGroup = "best-starting-points" | "premium" | "direct-hunt" | "guides-reviews" | "partners";

export type GeneratedSourceLink = {
	sourceId: string;
	sourceName: string;
	href: string;
	label: string;
	description: string;
	bestFor: string[];
	category: SourceCategory;
	paramSupport: SourceParamSupport;
	confidenceLabel: SourceConfidenceLabel;
	rankScore: number;
	launchGroup: LaunchGroup;
	mobileAppLinkRisk?: boolean;
	legalNote?: string;
};

export type SourceAdapter = {
	id: string;
	name: string;
	slug: string;
	category: SourceCategory;
	isEnabled: boolean;
	countries: CountryCode[];
	cityCoverage: string[] | "dynamic" | "unknown";
	description: string;
	bestFor: string[];
	paramSupport: SourceParamSupport;
	defaultRank: number;
	launchGroup: LaunchGroup;
	confidenceLabel: SourceConfidenceLabel;
	mobileAppLinkRisk?: boolean;
	isAvailable?: (intent: SearchIntent) => boolean;
	buildUrl: (intent: SearchIntent) => string;
};

export type RecentSearch = {
	city: string;
	citySlug: string;
	date: string;
	time: string;
	partySize: number;
	query: string;
	searchUrl: string;
	createdAt: string;
};

export type LaunchMode = "best" | "all" | "direct-hunt" | "single-source";

export type LaunchSession = {
	id: string;
	searchIntentKey: string;
	launchedAt: string;
	mode: LaunchMode;
	attemptedSourceIds: string[];
	clickedSourceIds: string[];
	returnedAt?: string;
	feedbackPromptShownAt?: string;
};

export type SourceCheckInOutcome =
	| "found_something"
	| "good_options"
	| "maybe_revisit"
	| "nothing_good"
	| "still_checking";

export type SourceReaction = "thumbs_up" | "thumbs_down" | null;

export type SourceResultNote = {
	launchSessionId: string;
	sourceId: string;
	outcome: SourceCheckInOutcome;
	reaction?: SourceReaction;
	note?: string;
	restaurantName?: string;
	possibleTime?: string;
	createdAt: string;
	updatedAt: string;
	storageScope: "local-only";
};

export type TrendBucket = {
	citySlug: string;
	date: string;
	timeBucket: TimeBucket;
	timeWindowLabel: string;
	partySizeBucket: PartySizeBucket;
	normalizedTags: string[];
	searchCount: number;
	launchCount: number;
	feedbackCount: number;
	mostOpenedSourceIds: string[];
	updatedAt: string;
};

export type PublicInsightSummary = {
	module:
		| "popular_time_windows"
		| "most_searched_intents"
		| "most_opened_sources"
		| "source_thumbs_up"
		| "direct_partner_interest"
		| "user_shared_place_mentions";
	title: string;
	items: Array<{ label: string; value?: string; detail?: string }>;
	disclaimer: string;
};

export type RestaurantPartner = {
	id: string;
	name: string;
	slug: string;
	citySlug: string;
	region: string;
	country: "CA" | "US";
	cuisines: string[];
	vibes: string[];
	neighborhoods?: string[];
	priceLevel?: "$" | "$$" | "$$$" | "$$$$";
	bookingUrl: string;
	websiteUrl?: string;
	phone?: string;
	description: string;
	isSponsored: boolean;
	sponsorshipLabel: "Featured Direct Partner" | "Sponsored" | "Partner";
	startsAt?: string;
	endsAt?: string;
	priority: number;
	active: boolean;
	directInventoryEnabled: boolean;
	availabilityNote?: string;
};

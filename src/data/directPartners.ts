import type { RestaurantPartner } from "@/lib/types";

export const directPartners: RestaurantPartner[] = [
	{
		id: "demo-chicago-steakhouse",
		name: "Demo Chicago Steakhouse",
		slug: "demo-chicago-steakhouse",
		citySlug: "chicago",
		region: "IL",
		country: "US",
		cuisines: ["steakhouse", "american"],
		vibes: ["group dinner", "special occasion", "business dinner"],
		neighborhoods: ["River North"],
		priceLevel: "$$$$",
		bookingUrl: "https://example.com/reservations",
		websiteUrl: "https://example.com",
		description: "Development-only direct partner card showing how restaurant-owned links will appear.",
		isSponsored: true,
		sponsorshipLabel: "Featured Direct Partner",
		priority: 100,
		active: true,
		directInventoryEnabled: false,
		availabilityNote: "Check availability on the restaurant's website.",
	},
];

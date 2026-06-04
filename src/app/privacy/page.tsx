import { LegalPage } from "@/components/LegalPage";

export default function Privacy() {
	return (
		<LegalPage
			title="Privacy"
			intro="DinnerTabs is designed to work without accounts. The product remembers useful things on your device and collects privacy-conscious first-party aggregate signals."
			sections={[
				{
					heading: "What DinnerTabs may collect",
					body: [
						"DinnerTabs may collect searches submitted on DinnerTabs, source buttons clicked on DinnerTabs, source launch events, optional source check-ins, and aggregate insight counters.",
						"DinnerTabs may use localStorage and first-party cookies to remember recent searches, source check-ins, preferences, and an opaque browser ID on this device.",
					],
				},
				{
					heading: "What DinnerTabs does not collect",
					body: [
						"DinnerTabs does not read third-party tabs, third-party accounts, third-party cookies, third-party booking confirmations, or browser history.",
						"Free-text notes, restaurant names, and possible times in your scratchpad stay local-only in v1 unless you explicitly choose to share a place anonymously.",
					],
				},
				{
					heading: "Your controls",
					body: [
						"You can reset DinnerTabs memory on this device from the search workspace. Shared search links do not include cookies, local notes, or source answers.",
						"DinnerTabs does not sell personal information or use third-party cookies for cross-site tracking.",
					],
				},
			]}
		/>
	);
}

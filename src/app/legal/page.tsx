import { LegalPage } from "@/components/LegalPage";

export default function Legal() {
	return (
		<LegalPage
			title="Legal posture"
			intro="DinnerTabs is an independent, user-controlled reservation search launcher. This page explains what the product does and what it deliberately does not do."
			sections={[
				{
					heading: "Independent source launcher",
					body: [
						"DinnerTabs generates outbound public source links from a dining search. Users open those links and complete any reservation directly at the third-party source.",
						"Third-party names are used only to identify where a link opens. DinnerTabs is not affiliated with or endorsed by OpenTable, Resy, Tock, SevenRooms, Google, Yelp, DoorDash, Michelin, Toast, or any other booking platform unless explicitly stated.",
					],
				},
				{
					heading: "No scraping or availability claims",
					body: [
						"DinnerTabs does not scrape booking sites, fetch third-party availability, inspect third-party tabs, iframe third-party pages, use hidden browsers, bypass access controls, auto-book, hold, resell, or transfer reservations.",
						"DinnerTabs does not know what happened on third-party sites unless a user voluntarily tells DinnerTabs through a first-party check-in or note.",
					],
				},
				{
					heading: "First-party insights only",
					body: [
						"Trend and insight modules are based on DinnerTabs searches, clicks, launches, and voluntary check-ins. They are not claims about restaurant availability, scarcity, capacity, or total market demand.",
						"Restaurant names in private notes remain local-only in v1 unless a user explicitly chooses to share a place anonymously as a DinnerTabs trend signal.",
					],
				},
			]}
		/>
	);
}

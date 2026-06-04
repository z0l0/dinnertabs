import { LegalPage } from "@/components/LegalPage";

export default function Cookies() {
	return (
		<LegalPage
			title="Cookies and device memory"
			intro="DinnerTabs uses first-party browser storage to make the product feel continuous on the same device."
			sections={[
				{
					heading: "First-party memory",
					body: [
						"DinnerTabs may use localStorage for recent searches, check-ins, scratchpad notes, and preferences.",
						"DinnerTabs may use a first-party cookie named dt_visitor containing only an opaque random ID for returning-browser continuity and aggregate duplicate control.",
					],
				},
				{
					heading: "No cross-site tracking",
					body: [
						"DinnerTabs does not use third-party cookies or track you across other websites.",
						"The dt_visitor cookie does not contain your search text, notes, restaurant names, email, phone number, or booking information.",
					],
				},
				{
					heading: "Reset",
					body: [
						"Use Reset DinnerTabs memory on this device to clear local DinnerTabs storage and expire the first-party visitor cookie.",
					],
				},
			]}
		/>
	);
}

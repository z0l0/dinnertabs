import { LegalPage } from "@/components/LegalPage";

export default function Terms() {
	return (
		<LegalPage
			title="Terms of use"
			intro="Use DinnerTabs as a lawful personal search launcher. Third-party sources control their own booking rules and terms."
			sections={[
				{
					heading: "No booking guarantee",
					body: [
						"DinnerTabs does not guarantee any table, reservation, price, cancellation rule, deposit, search result, or third-party website behavior.",
						"Any booking is completed directly with the third-party source or restaurant and is governed by that source's terms.",
					],
				},
				{
					heading: "Misuse is prohibited",
					body: [
						"You may not use DinnerTabs to scrape, automate, bypass protections, create fake booking activity, evade source rules, resell reservations, or interfere with third-party services.",
						"DinnerTabs may remove or restrict features that appear to be used for abuse, spam, scraping, or reservation resale.",
					],
				},
				{
					heading: "Sponsored links",
					body: [
						"DinnerTabs may show featured or sponsored direct partner links. Sponsored placements will be labelled and do not imply availability unless explicitly supplied by an authorized direct partner in a future version.",
					],
				},
			]}
		/>
	);
}

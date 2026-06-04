import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
	metadataBase: new URL("https://dinnertabs.com"),
	title: {
		default: "DinnerTabs - Open Restaurant Reservation Searches Faster",
		template: "%s - DinnerTabs",
	},
	description:
		"Enter one dining search and open reservation source tabs across OpenTable, Resy, Tock, Google Maps, DoorDash, Michelin, Yelp, direct restaurant websites, and more. Book directly at the source.",
	icons: [{ rel: "icon", url: "/favicon.svg" }],
	openGraph: {
		title: "DinnerTabs",
		description: "Enter once. Open the right tabs. Book at the source.",
		type: "website",
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	colorScheme: "light",
	themeColor: "#f7f4ee",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}

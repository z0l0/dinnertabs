import { getDateBucket, getPartySizeBucket, getTimeBucket } from "@/lib/dateUtils";
import type { SearchIntent } from "@/lib/types";

export async function trackEvent(eventName: string, props: Record<string, unknown>) {
	try {
		await fetch(`/api/events/${eventName}`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ eventName, props }),
			keepalive: true,
		});
	} catch {
		// Analytics must never break the reservation hunt.
	}
}

export function baseEventProps(intent: SearchIntent) {
	return {
		citySlug: intent.city.slug,
		date: intent.date,
		dateBucket: getDateBucket(intent.date),
		timeBucket: getTimeBucket(intent.preferredTime),
		timeWindowLabel: `around ${intent.preferredTime}`,
		partySizeBucket: getPartySizeBucket(intent.partySize),
		normalizedTags: intent.cuisineTags.length ? intent.cuisineTags : [intent.query],
	};
}

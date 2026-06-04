import { addDays, format, isSameDay, nextSaturday, parse, parseISO, startOfDay } from "date-fns";
import type { DateBucket, PartySizeBucket, TimeBucket } from "@/lib/types";

export function today(): Date {
	return startOfDay(new Date());
}

export function normalizeDate(raw?: string | null): string {
	if (!raw) return format(addDays(today(), 1), "yyyy-MM-dd");
	const value = raw.trim().toLowerCase();
	if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
	if (value === "today" || value === "tonight") return format(today(), "yyyy-MM-dd");
	if (value === "tomorrow") return format(addDays(today(), 1), "yyyy-MM-dd");
	if (value.includes("weekend") || value === "saturday") {
		const saturday = nextSaturday(today());
		return format(saturday, "yyyy-MM-dd");
	}
	const monthDay = parse(value, "MMMM d", today());
	if (!Number.isNaN(monthDay.getTime())) {
		const candidate = monthDay < today() ? new Date(monthDay.setFullYear(monthDay.getFullYear() + 1)) : monthDay;
		return format(candidate, "yyyy-MM-dd");
	}
	const shortMonthDay = parse(value, "MMM d", today());
	if (!Number.isNaN(shortMonthDay.getTime())) {
		const candidate =
			shortMonthDay < today() ? new Date(shortMonthDay.setFullYear(shortMonthDay.getFullYear() + 1)) : shortMonthDay;
		return format(candidate, "yyyy-MM-dd");
	}
	return format(addDays(today(), 1), "yyyy-MM-dd");
}

export function displayDate(date: string): string {
	return format(parseISO(date), "EEE, MMM d, yyyy");
}

export function normalizeTime(raw?: string | null): string {
	if (!raw) return "19:30";
	const value = raw.trim().toLowerCase().replace(/\s+/g, "");
	const match = value.match(/^(\d{1,2})(?::?(\d{2}))?(am|pm)?$/);
	if (!match) return "19:30";
	let hour = Number(match[1]);
	const minute = match[2] ? Number(match[2]) : 0;
	const meridian = match[3];
	if (meridian === "pm" && hour < 12) hour += 12;
	if (meridian === "am" && hour === 12) hour = 0;
	if (!meridian && hour > 0 && hour < 11) hour += 12;
	return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
}

export function displayTime(time: string): string {
	const [hourText, minute] = time.split(":");
	let hour = Number(hourText);
	const suffix = hour >= 12 ? "PM" : "AM";
	hour = hour % 12 || 12;
	return `${hour}:${minute} ${suffix}`;
}

export function getTimeBucket(time: string): TimeBucket {
	const hour = Number(time.split(":")[0]);
	if (hour < 10) return "breakfast";
	if (hour < 15) return "brunch";
	if (hour < 17) return "lunch";
	if (hour < 22) return "dinner";
	return "late";
}

export function getDateBucket(date: string): DateBucket {
	const parsed = parseISO(date);
	if (isSameDay(parsed, today())) return "today";
	if (isSameDay(parsed, addDays(today(), 1))) return "tomorrow";
	const diff = parsed.getTime() - today().getTime();
	if (diff >= 0 && diff <= 7 * 24 * 60 * 60 * 1000 && parsed.getDay() === 6) return "this_weekend";
	return Number.isNaN(parsed.getTime()) ? "unknown" : "future";
}

export function getPartySizeBucket(size: number): PartySizeBucket {
	if (size <= 1) return "1";
	if (size === 2) return "2";
	if (size <= 4) return "3-4";
	if (size <= 6) return "5-6";
	return "7+";
}

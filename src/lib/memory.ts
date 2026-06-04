"use client";

import type { LaunchSession, RecentSearch, SourceResultNote } from "@/lib/types";

const MEMORY_KEY = "dinnertabs.memory.v1";

type DeviceMemory = {
	recentSearches: RecentSearch[];
	activeLaunchSessions: LaunchSession[];
	sourceResultNotes: SourceResultNote[];
	dismissedPromptIds: string[];
	updatedAt: string;
};

const emptyMemory: DeviceMemory = {
	recentSearches: [],
	activeLaunchSessions: [],
	sourceResultNotes: [],
	dismissedPromptIds: [],
	updatedAt: new Date(0).toISOString(),
};

export function readMemory(): DeviceMemory {
	if (typeof window === "undefined") return emptyMemory;
	try {
		return { ...emptyMemory, ...JSON.parse(window.localStorage.getItem(MEMORY_KEY) ?? "{}") };
	} catch {
		return emptyMemory;
	}
}

export function writeMemory(memory: DeviceMemory) {
	window.localStorage.setItem(MEMORY_KEY, JSON.stringify({ ...memory, updatedAt: new Date().toISOString() }));
}

export function resetMemory() {
	window.localStorage.removeItem(MEMORY_KEY);
	document.cookie = "dt_visitor=; Max-Age=0; path=/; SameSite=Lax; Secure";
}

export function rememberSearch(search: RecentSearch) {
	const memory = readMemory();
	const recentSearches = [search, ...memory.recentSearches.filter((item) => item.searchUrl !== search.searchUrl)].slice(0, 8);
	writeMemory({ ...memory, recentSearches });
}

export function rememberLaunch(session: LaunchSession) {
	const memory = readMemory();
	writeMemory({
		...memory,
		activeLaunchSessions: [session, ...memory.activeLaunchSessions.filter((item) => item.id !== session.id)].slice(0, 8),
	});
}

export function saveSourceNote(note: SourceResultNote) {
	const memory = readMemory();
	writeMemory({
		...memory,
		sourceResultNotes: [note, ...memory.sourceResultNotes.filter((item) => `${item.launchSessionId}:${item.sourceId}` !== `${note.launchSessionId}:${note.sourceId}`)],
	});
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { Copy, ExternalLink, RotateCcw, Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import { baseEventProps, trackEvent } from "@/lib/events";
import { readMemory, rememberLaunch, rememberSearch, resetMemory, saveSourceNote } from "@/lib/memory";
import { filterLinksByMode, sourceName } from "@/lib/sourceAdapters";
import type { GeneratedSourceLink, LaunchMode, LaunchSession, SearchIntent, SourceCheckInOutcome, SourceReaction, SourceResultNote } from "@/lib/types";

type ResultsWorkspaceProps = {
	intent: SearchIntent;
	links: GeneratedSourceLink[];
};

const outcomeLabels: Record<SourceCheckInOutcome, string> = {
	found_something: "Found something",
	good_options: "Good options",
	maybe_revisit: "Maybe revisit",
	nothing_good: "Nothing good",
	still_checking: "Still checking",
};

const groupLabels: Record<string, string> = {
	"best-starting-points": "Best starting points",
	premium: "Premium / high-demand",
	"direct-hunt": "Direct booking hunt",
	"guides-reviews": "Guides and reviews",
	partners: "Direct partners",
};

function newSession(intent: SearchIntent, mode: LaunchMode, sourceIds: string[]): LaunchSession {
	return {
		id: crypto.randomUUID(),
		searchIntentKey: `${intent.city.slug}:${intent.date}:${intent.preferredTime}:${intent.partySize}:${intent.query}`,
		launchedAt: new Date().toISOString(),
		mode,
		attemptedSourceIds: sourceIds,
		clickedSourceIds: sourceIds,
	};
}

export function ResultsWorkspace({ intent, links }: ResultsWorkspaceProps) {
	const [session, setSession] = useState<LaunchSession | null>(null);
	const [notes, setNotes] = useState<SourceResultNote[]>([]);
	const [activePrompt, setActivePrompt] = useState<string | null>(null);
	const [copied, setCopied] = useState(false);
	const shareUrl = typeof window === "undefined" ? "" : window.location.href;

	useEffect(() => {
		const searchKey = `dt-search-viewed:${intent.city.slug}:${intent.date}:${intent.preferredTime}:${intent.partySize}:${intent.query}`;
		if (!sessionStorage.getItem(searchKey)) {
			sessionStorage.setItem(searchKey, "1");
			rememberSearch({
				city: intent.city.name,
				citySlug: intent.city.slug,
				date: intent.date,
				time: intent.preferredTime,
				partySize: intent.partySize,
				query: intent.query,
				searchUrl: `${window.location.pathname}${window.location.search}`,
				createdAt: new Date().toISOString(),
			});
			void trackEvent("search_submitted", baseEventProps(intent));
		}
		const memory = readMemory();
		setNotes(memory.sourceResultNotes.filter((note) => note.launchSessionId === memory.activeLaunchSessions[0]?.id));
		setSession(memory.activeLaunchSessions[0] ?? null);
		const onFocus = () => {
			const memoryNow = readMemory();
			const latest = memoryNow.activeLaunchSessions[0];
			if (latest?.clickedSourceIds[0]) {
				setSession({ ...latest, returnedAt: new Date().toISOString() });
				setActivePrompt(latest.clickedSourceIds[0]);
				void trackEvent("dinner_tabs_returned_after_launch", { ...baseEventProps(intent), sourceIds: latest.clickedSourceIds });
			}
		};
		window.addEventListener("focus", onFocus);
		document.addEventListener("visibilitychange", onFocus);
		return () => {
			window.removeEventListener("focus", onFocus);
			document.removeEventListener("visibilitychange", onFocus);
		};
	}, [intent]);

	const grouped = useMemo(() => {
		return links.reduce<Record<string, GeneratedSourceLink[]>>((acc, link) => {
			acc[link.launchGroup] = [...(acc[link.launchGroup] ?? []), link];
			return acc;
		}, {});
	}, [links]);

	function launch(mode: LaunchMode, source?: GeneratedSourceLink) {
		const selected = source ? [source] : filterLinksByMode(links, mode);
		const launchSession = newSession(intent, mode, selected.map((link) => link.sourceId));
		setSession(launchSession);
		rememberLaunch(launchSession);
		setActivePrompt(selected[0]?.sourceId ?? null);
		void trackEvent(mode === "all" ? "launch_all_tabs_clicked" : mode === "best" ? "launch_best_tabs_clicked" : "source_link_clicked", {
			...baseEventProps(intent),
			sourceIds: selected.map((link) => link.sourceId),
			launchMode: mode,
		});
		for (const link of selected) {
			window.open(link.href, "_blank", "noopener,noreferrer");
		}
	}

	async function copyLinks() {
		const text = links.map((link) => `${link.sourceName}: ${link.href}`).join("\n");
		await navigator.clipboard.writeText(text);
		setCopied(true);
		window.setTimeout(() => setCopied(false), 1600);
		void trackEvent("copy_all_links_clicked", { ...baseEventProps(intent), sourceIds: links.map((link) => link.sourceId) });
	}

	async function shareSearch() {
		await navigator.clipboard.writeText(shareUrl);
		setCopied(true);
		window.setTimeout(() => setCopied(false), 1600);
	}

	function noteFor(sourceId: string) {
		return notes.find((note) => note.sourceId === sourceId);
	}

	function saveCheckIn(sourceId: string, outcome: SourceCheckInOutcome, reaction: SourceReaction = null, text?: string) {
		const launchSession =
			session ??
			newSession(intent, "single-source", [sourceId]);
		const note: SourceResultNote = {
			launchSessionId: launchSession.id,
			sourceId,
			outcome,
			reaction,
			note: text,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			storageScope: "local-only",
		};
		setSession(launchSession);
		rememberLaunch(launchSession);
		saveSourceNote(note);
		setNotes((current) => [note, ...current.filter((item) => item.sourceId !== sourceId)]);
		setActivePrompt(null);
		void trackEvent("source_checkin_saved", { ...baseEventProps(intent), sourceId, sourceOutcome: outcome, sourceReaction: reaction });
	}

	return (
		<section className="space-y-5">
			<div className="rounded-2xl border hairline bg-[#fffdf8] p-4 shadow-sm md:p-5">
				<div className="flex flex-wrap gap-2">
					<button className="focus-ring rounded-xl bg-[#0f766e] px-4 py-3 font-semibold text-white" onClick={() => launch("best")}>
						Open best tabs
					</button>
					<button className="focus-ring rounded-xl border hairline bg-white px-4 py-3 font-semibold" onClick={() => launch("all")}>
						Open all
					</button>
					<button className="focus-ring rounded-xl border hairline bg-white px-4 py-3 font-semibold" onClick={() => launch("direct-hunt")}>
						Direct hunt
					</button>
					<button className="focus-ring inline-flex items-center gap-2 rounded-xl border hairline bg-white px-4 py-3 font-semibold" onClick={copyLinks}>
						<Copy size={17} />
						Copy links
					</button>
					<button className="focus-ring inline-flex items-center gap-2 rounded-xl border hairline bg-white px-4 py-3 font-semibold" onClick={shareSearch}>
						<Share2 size={17} />
						Share search
					</button>
				</div>
				<p className="mt-3 text-sm text-[#625b51]">
					DinnerTabs opens public source links in new tabs. You complete any reservation directly at the source. DinnerTabs does not read or control those tabs.
				</p>
				{copied ? <p className="mt-2 text-sm font-medium text-[#0f766e]">Copied. No cookie or private notes are included in the share URL.</p> : null}
			</div>

			<div className="grid gap-5 xl:grid-cols-[1fr_310px]">
				<div className="space-y-5">
					{Object.entries(grouped).map(([group, groupLinks]) => (
						<div key={group}>
							<h2 className="mb-3 text-lg font-semibold">{groupLabels[group] ?? group}</h2>
							<div className="grid gap-3 md:grid-cols-2">
								{groupLinks.map((link) => {
									const note = noteFor(link.sourceId);
									const wasOpened = session?.clickedSourceIds.includes(link.sourceId);
									const isPrompting = activePrompt === link.sourceId || (wasOpened && !note);
									return (
										<article key={link.sourceId} className="rounded-2xl border hairline bg-[#fffdf8] p-4 shadow-sm">
											<div className="flex items-start justify-between gap-3">
												<div>
													<p className="text-lg font-semibold">{link.sourceName}</p>
													<p className="mt-1 text-sm leading-6 text-[#625b51]">{link.description}</p>
												</div>
												<span className="whitespace-nowrap rounded-full bg-[#eef7f4] px-2 py-1 text-xs font-medium text-[#0f766e]">{link.confidenceLabel}</span>
											</div>
											<div className="mt-3 flex flex-wrap gap-2">
												{link.bestFor.slice(0, 3).map((item) => (
													<span key={item} className="rounded-full border hairline bg-white px-2 py-1 text-xs text-[#625b51]">
														{item}
													</span>
												))}
											</div>
											<div className="mt-4 flex flex-wrap gap-2">
												<button
													className="focus-ring inline-flex items-center gap-2 rounded-xl bg-[#161513] px-4 py-2.5 font-semibold text-white"
													onClick={() => launch("single-source", link)}
												>
													<ExternalLink size={16} />
													Open
												</button>
												<a
													className="focus-ring inline-flex items-center gap-2 rounded-xl border hairline bg-white px-4 py-2.5 font-semibold"
													href={link.href}
													target="_blank"
													rel="noopener noreferrer"
													onClick={(event) => {
														event.preventDefault();
														launch("single-source", link);
													}}
												>
													New tab
												</a>
											</div>
											{note ? (
												<div className="mt-4 rounded-xl border hairline bg-[#f7f4ee] p-3 text-sm">
													<p className="font-semibold text-[#161513]">{outcomeLabels[note.outcome]}</p>
													<div className="mt-2 flex gap-2">
														{note.reaction === "thumbs_up" ? <ThumbsUp size={16} className="text-[#0f766e]" /> : null}
														{note.reaction === "thumbs_down" ? <ThumbsDown size={16} className="text-[#a6402d]" /> : null}
														{note.note ? <span className="text-[#625b51]">{note.note}</span> : null}
													</div>
												</div>
											) : null}
											{isPrompting ? (
												<div className="mt-4 rounded-xl border border-[#0f766e]/30 bg-[#eef7f4] p-3">
													<p className="text-sm font-semibold">Did you find anything useful on {link.sourceName}?</p>
													<div className="mt-3 flex flex-wrap gap-2">
														<button className="rounded-lg bg-white px-3 py-2 text-sm font-medium" onClick={() => saveCheckIn(link.sourceId, "found_something", "thumbs_up")}>
															Found something
														</button>
														<button className="rounded-lg bg-white px-3 py-2 text-sm font-medium" onClick={() => saveCheckIn(link.sourceId, "maybe_revisit")}>
															Maybe revisit
														</button>
														<button className="rounded-lg bg-white px-3 py-2 text-sm font-medium" onClick={() => saveCheckIn(link.sourceId, "nothing_good", "thumbs_down")}>
															Nothing good
														</button>
														<button className="rounded-lg bg-white px-3 py-2 text-sm font-medium" onClick={() => saveCheckIn(link.sourceId, "still_checking")}>
															Still checking
														</button>
													</div>
												</div>
											) : null}
										</article>
									);
								})}
							</div>
						</div>
					))}
				</div>
				<aside className="space-y-4">
					<div className="rounded-2xl border hairline bg-[#fffdf8] p-4 shadow-sm">
						<h2 className="font-semibold">Your hunt notes</h2>
						<div className="mt-3 space-y-2 text-sm">
							{notes.length ? (
								notes.map((note) => (
									<div key={`${note.launchSessionId}-${note.sourceId}`} className="rounded-xl bg-[#f7f4ee] p-3">
										<p className="font-medium">{sourceName(note.sourceId)}</p>
										<p className="text-[#625b51]">{outcomeLabels[note.outcome]}</p>
									</div>
								))
							) : (
								<p className="text-[#625b51]">Open a source, come back, and DinnerTabs will keep your quick answers here.</p>
							)}
						</div>
					</div>
					<button className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-xl border hairline bg-white px-4 py-3 font-semibold" onClick={() => { resetMemory(); setNotes([]); setSession(null); }}>
						<RotateCcw size={17} />
						Reset DinnerTabs memory
					</button>
					<div className="rounded-2xl border hairline bg-[#fffdf8] p-4 text-sm text-[#625b51]">
						<p className="font-semibold text-[#161513]">Shareable link is clean</p>
						<p className="mt-2">The URL shares city, date, time, party size, and query. It does not include cookies, local notes, or your source answers.</p>
					</div>
				</aside>
			</div>
		</section>
	);
}

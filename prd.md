# PRD / Build Spec: DinnerTabs - Reservation Search Tab Launcher

## 0. Product Bet

Build a production-ready MVP website called **DinnerTabs**.

DinnerTabs is the fastest legally conservative way for a diner to run one restaurant reservation search across the booking sources that matter.

The core product is simple:

1. The user enters one dining intent.
2. DinnerTabs generates source-specific public search links.
3. The user clicks one explicit button to open the selected source tabs.
4. The user flips through those tabs and books directly at the source.
5. When the user returns to DinnerTabs, the app asks for optional feedback about which source helped.

DinnerTabs is **not** a booking platform, availability aggregator, scraper, bot, reservation reseller, browser automation tool, or official integration with any third-party booking platform unless a future written agreement says otherwise.

The v1 experience should feel like a calm reservation search command center:

> Enter once. Open the right tabs. Book at the source.

## 1. North Star User Story

The user says:

> "I need a steakhouse for 4 people in Chicago on June 20."

DinnerTabs should turn that into a clean workflow:

```text
Chicago, IL
Saturday, June 20, 2026
4 people
Steakhouse / chophouse / grill
Dinner window, default 7:30 PM with nearby-time guidance
```

The results should not be a generic wall of links. They should be a ranked launch plan:

1. OpenTable - broadest mainstream reservation search.
2. Google Maps - best for direct restaurant links and Reserve with Google.
3. DoorDash Reservations - relevant in Chicago where supported.
4. Resy - useful for high-demand and trendier restaurants.
5. Tock - useful for premium dining, tasting menus, and experiences.
6. Michelin Guide - useful quality filter, then book at source.
7. SevenRooms finder - Google search for direct SevenRooms booking pages.
8. Toast/direct-site finder - Google search for direct restaurant booking pages.
9. Yelp - reviews plus booking links/waitlist where available.

The user clicks:

```text
Open best tabs
```

DinnerTabs opens the configured tabs in new browser tabs. The user flips through them manually. DinnerTabs does not read those tabs, control those tabs, or know what happened inside them.

When the user returns to DinnerTabs, the page asks:

```text
Did any source help?

[Found a table] [Good options] [No useful options] [Still checking]

Which source was most useful?
[OpenTable] [Google Maps] [DoorDash] [Resy] [Tock] [Michelin] [Restaurant website] [Other]
```

That voluntary feedback becomes the long-term advantage. DinnerTabs gets smarter without scraping or claiming availability.

## 2. Legal and Compliance Posture

This section is mandatory. Build the product around it.

### 2.1 Plain-English Position

DinnerTabs is a user-initiated outbound link launcher and optional first-party feedback tool.

DinnerTabs may remember:

- what the user typed into DinnerTabs
- which DinnerTabs source buttons the user clicked
- which tabs DinnerTabs attempted to open after a user click
- when the DinnerTabs page lost or regained focus
- optional feedback the user chose to submit on DinnerTabs

DinnerTabs must not know:

- what the user saw on OpenTable, Resy, Tock, SevenRooms, Google, DoorDash, Yelp, or any third-party site
- whether a specific restaurant had availability unless directly supplied by an authorized direct partner
- whether the user completed a booking on a third-party site unless the user voluntarily reports it
- any contents of third-party pages, DOMs, network calls, browser history, cookies, logged-in sessions, or accounts

### 2.2 Allowed

The app may:

- Generate absolute HTTPS outbound links to public third-party websites.
- Open third-party links in new tabs only after a clear user click.
- Use plain-text third-party names to identify where each link opens.
- Track first-party click events on DinnerTabs.
- Track aggregate, privacy-preserving search metadata.
- Use the Page Visibility API or focus/blur events only to detect that the DinnerTabs page was left and later revisited.
- Ask the user for optional feedback after they return.
- Use first-party cookies and/or localStorage to remember the same browser for core DinnerTabs functionality.
- Store recent searches and scratchpad data locally in the user's browser.
- Store aggregate source usefulness feedback if the user submits it.
- Display clearly labelled sponsored or featured direct partner links.
- Display direct restaurant booking links only when manually added, submitted by a restaurant, or provided under permission.
- Create SEO-friendly city/source pages explaining how to search faster.

### 2.3 Forbidden

The app must not:

- Scrape any third-party website.
- Fetch, parse, cache, or store third-party availability.
- Use Playwright, Puppeteer, Selenium, browser-use, agents, hidden browsers, or any automated third-party navigation in production.
- Use hidden server-side bots.
- Read, inspect, or interact with the DOM of third-party pages.
- Capture screenshots of third-party pages.
- Use third-party network APIs unless there is a written agreement or official public API permission.
- Reverse-engineer private APIs.
- Bypass CAPTCHAs, logins, rate limits, robots protections, anti-abuse systems, or paywalls.
- Auto-book, auto-hold, transfer, sell, resell, or trade reservations.
- Encourage fake party sizes, fake names, fake accounts, or booking-rule workarounds.
- Iframe third-party websites.
- Use third-party logos by default.
- Use third-party cookies or cross-site tracking pixels.
- Sell or share cookie identifiers for advertising or cross-site profiling.
- Claim affiliation, partnership, endorsement, integration, official status, or "powered by" status with any third-party source unless explicitly configured under written permission.
- Claim real-time or live availability from third-party sources.
- Publicly rank sources using scraped data, third-party performance data, or unsupported benchmarking.

### 2.4 Required Copy

Footer on every page:

```text
DinnerTabs is an independent search launcher. We do not book reservations, sell reservations, show third-party availability, scrape booking sites, or represent any third-party booking platform. Each source link opens a third-party website where availability, pricing, cancellation rules, deposits, and booking terms are controlled by that source.
```

Near launch controls:

```text
DinnerTabs opens public source links in new tabs. You complete any reservation directly at the source. DinnerTabs does not read or control those tabs.
```

Trademark / affiliation:

```text
Third-party names are used only to identify where a link opens. DinnerTabs is not affiliated with or endorsed by OpenTable, Resy, Tock, SevenRooms, Google, Yelp, DoorDash, Michelin, Libro, TouchBistro, Toast, or any other booking platform unless explicitly stated.
```

Feedback prompt disclosure:

```text
Optional feedback helps DinnerTabs learn which sources users found useful. We do not know what happened on third-party sites unless you choose to tell us.
```

First-party memory disclosure:

```text
DinnerTabs may use first-party browser storage to remember your recent searches, source check-ins, and preferences on this device. DinnerTabs does not use third-party cookies or track you across other websites.
```

Sponsored placement disclosure:

```text
Featured Direct Partners may include paid placements. Sponsored links are clearly labelled and matched to your search where possible.
```

### 2.5 Forbidden Language

Do not use these phrases in v1:

- "live availability"
- "real availability"
- "verified availability"
- "available tables"
- "we searched availability"
- "we checked OpenTable"
- "we checked Resy"
- "book every restaurant from one place"
- "aggregate reservations"
- "all tables"
- "guaranteed table"
- "official partner"
- "powered by OpenTable"
- "powered by Resy"

Use these instead:

- "open reservation searches"
- "source tabs"
- "source links"
- "open the right tabs"
- "check availability at the source"
- "book at the source"
- "user-reported helpful"
- "users found this source useful"
- "one search, multiple booking sources"
- "direct partner link"
- "featured direct partner"

### 2.6 Counsel Review

Before public launch, have counsel review:

- homepage claims
- source page copy
- privacy policy
- terms of use
- feedback collection language
- sponsored/direct-partner language
- outbound link handling

The product should be designed so counsel review is boring.

## 3. Positioning

Working name:

```ts
APP_NAME = "DinnerTabs"
APP_TAGLINE = "Enter once. Open the right tabs. Book at the source."
```

Alternative tagline options:

- "One dinner search. All your reservation tabs."
- "Search once. Compare at the source."
- "The fastest way to open restaurant reservation searches."

External positioning:

```text
DinnerTabs helps you open reservation searches across popular booking and discovery sources. It does not book reservations for you or show third-party table status.
```

Internal ambition:

```text
Make tab-hopping feel organized, fast, and weirdly satisfying.
```

## 4. Target Users

Primary user:

- A diner trying to find a reservation without manually rebuilding the same search on many sites.
- Often booking for a group, a date, a client dinner, a trip, or a special occasion.
- Wants speed, broad coverage, and less mental overhead.

Secondary user:

- A restaurant operator or marketer who wants direct booking traffic from high-intent searches.

Early adopter searches:

- "steakhouse for 4 in Chicago on June 20"
- "dinner for 2 in New York tomorrow at 8, Italian"
- "Toronto birthday dinner for 6 Saturday"
- "Michelin dinner in San Francisco this weekend"
- "date night sushi in Miami tonight"

## 5. MVP Scope

### 5.1 Must-Have

Build these in v1:

1. Homepage with a central natural-language search input.
2. Structured fallback fields:
   - city
   - date
   - preferred time
   - party size
   - cuisine / vibe / keyword
   - optional time flexibility
3. Natural-language parser for obvious dining intent.
4. Shareable search URLs.
5. Results page with ranked source tabs.
6. Source adapter system for all URL generation.
7. User-controlled launch buttons:
   - Open best tabs
   - Open all source tabs
   - Open one source
   - Copy all links
8. Source-by-source check-ins after opening a source.
9. Post-return optional feedback prompt.
10. Search session state that records clicked/opened source IDs, not destination-page activity.
11. First-party browser memory for returning-user continuity.
12. Recent searches stored locally.
13. Local scratchpad for "maybe/booked/not useful" notes.
14. First-party DinnerTabs interest signals for city/date/time/search buckets.
15. SEO city and source landing pages.
16. Direct Booking Partners section with strict labelling.
17. Privacy-friendly analytics abstraction.
18. Sitewide legal footer.
19. Mobile-first responsive design.
20. URL adapter test coverage for seeded source links.

### 5.2 Nice-To-Have If Simple

- Dark mode.
- Keyboard shortcuts.
- Share group search link.
- Export/copy search summary.
- "Call restaurant" helper copy.
- Source presets: Best Shot, Premium, Direct Hunt, Reviews.
- "I booked this" local-only note.

### 5.3 Explicitly Out Of Scope For V1

Do not build:

- scraping
- live availability
- server-side crawling
- browser extension
- third-party browser automation
- auto-booking
- alerts
- user accounts
- billing
- Stripe
- restaurant dashboard
- platform APIs
- email/SMS notifications
- resale or transfer features
- urgency/scarcity claims based on DinnerTabs search trends

## 6. Core User Flow

### 6.1 Homepage

Route:

```text
/
```

Visual feel:

- simple like a search engine
- practical like a flight-search tool
- mobile-first
- minimal clutter
- no giant stock restaurant hero
- no dark noisy background
- no overexplaining inside the app UI

Hero:

```text
DinnerTabs
Enter once. Open the right tabs. Book at the source.
```

Search example placeholder:

```text
Steakhouse for 4 in Chicago on June 20
```

Structured fields:

```text
[Chicago] [Jun 20] [7:30 PM] [4 people] [Steakhouse] [Flexible +/- 90 min]
```

Primary CTA:

```text
Build my tab set
```

Secondary CTA:

```text
Open last search
```

Below the search module:

- popular searches
- recent searches
- popular cities
- short legal note

### 6.2 Search Normalization

Normalize search input into:

```ts
type SearchIntent = {
  city: City
  date: string // YYYY-MM-DD
  preferredTime: string // HH:mm
  timeFlexMinutes: 0 | 30 | 60 | 90 | 120
  partySize: number
  query: string
  cuisineTags: string[]
  vibeTags: string[]
  mealPeriod: "breakfast" | "brunch" | "lunch" | "dinner" | "late-night"
}
```

Example:

```ts
{
  city: {
    name: "Chicago",
    slug: "chicago",
    region: "IL",
    country: "US"
  },
  date: "2026-06-20",
  preferredTime: "19:30",
  timeFlexMinutes: 90,
  partySize: 4,
  query: "steakhouse",
  cuisineTags: ["steakhouse", "american"],
  vibeTags: ["group dinner", "special occasion"],
  mealPeriod: "dinner"
}
```

If the user omits a time for dinner searches, default to `19:30` and show that it is editable.

If the user says "June 20" and the year is omitted, choose the next future June 20 and show the full date in the UI.

Redirect to:

```text
/search?city=chicago&date=2026-06-20&time=19:30&party=4&q=steakhouse&flex=90
```

### 6.3 Results Page

Route:

```text
/search
```

Header:

```text
Your tab set is ready
Chicago · Sat Jun 20, 2026 · 7:30 PM · 4 people · Steakhouse
```

Primary launch module:

```text
Open source tabs
[Open best tabs] [Open all] [Copy links]
```

Required explanatory note:

```text
DinnerTabs opens public source links in new tabs. You complete any reservation directly at the source. DinnerTabs does not read or control those tabs.
```

Source list should be ranked and grouped, not flat.

On both desktop and mobile, the primary source controls should be large, tappable pills or compact cards. The user should be able to work down the list one source at a time without losing context.

Groups:

- Best starting points
- Premium / high-demand
- Direct booking hunt
- Guides and reviews
- Direct Booking Partners

Each source card includes:

- source name
- best-for text
- what will be prefilled
- confidence label
- launch status for current search
- source check-in status
- individual open button
- optional "copy link" icon

Confidence labels:

```ts
type SourceConfidenceLabel =
  | "Strong prefill"
  | "Partial prefill"
  | "Manual after opening"
  | "Direct partner links"
```

Do not use "availability confidence."

### 6.4 Tab Launch Behavior

Launch must always be user-initiated.

Buttons:

```text
Open best tabs
Open all source tabs
Open direct-booking hunt
Copy all links
```

`Open best tabs` should be the default. It opens a ranked subset, usually 5 to 7 sources.

`Open all source tabs` opens every enabled source for the city and country.

`Open direct-booking hunt` opens Google/Maps/direct-site finder links and internal direct partner matches.

Implementation:

```ts
type LaunchSession = {
  id: string
  searchIntent: SearchIntent
  launchedAt: string
  mode: "best" | "all" | "direct-hunt" | "single-source"
  attemptedSourceIds: string[]
  clickedSourceIds: string[]
  returnedAt?: string
  feedbackPromptShownAt?: string
}
```

Use `window.open(url, "_blank", "noopener,noreferrer")`.

If multiple tabs are blocked, show:

```text
Your browser may block multiple tabs. Allow popups for DinnerTabs, open sources one by one, or copy all links.
```

The app should mark source cards as:

```text
Not opened
Opened from DinnerTabs
Copied
No good options
Maybe revisit
Found something
```

Do not say:

```text
Visited
Checked
Searched
Availability found
```

### 6.5 Return Detection

DinnerTabs may detect when its own page becomes visible again after a launch session.

DinnerTabs should not depend on detecting that a third-party tab was closed. Because outbound links should use `noopener`, the app may not have a reliable or desirable relationship with the opened tab. The safe behavior is:

```text
The user opened OpenTable from DinnerTabs.
The user later returned to DinnerTabs.
DinnerTabs can ask for an OpenTable check-in because DinnerTabs knows the OpenTable source pill was clicked.
```

Allowed browser signals:

- `document.visibilitychange`
- `window.focus`
- elapsed time since launch

Forbidden:

- browser history inspection
- destination tab inspection
- cross-tab DOM reads
- third-party cookies
- third-party pixels that infer booking activity
- extension-only monitoring in v1

Show feedback prompt when:

- a launch session exists
- at least one source was opened or copied
- the DinnerTabs tab regains focus or becomes visible
- at least 15 seconds have passed since launch
- the user has not dismissed feedback for this session

### 6.6 Source-By-Source Check-Ins

This is a core UX feature. It turns DinnerTabs from a link list into a useful reservation hunt workspace.

After the user opens an individual source, that source pill/card should become an active check-in item. When the user returns to DinnerTabs, show the check-in inline on that source pill/card, not only as a global modal.

Example flow:

```text
1. User searches Chicago · Jun 20 · 6 PM · 4 people.
2. User taps OpenTable.
3. OpenTable opens in a new tab.
4. User manually checks OpenTable.
5. User returns to DinnerTabs.
6. The OpenTable pill asks:

   OpenTable
   Did you find anything useful?
   [Found something] [Maybe revisit] [Nothing good] [Still checking]
   [Thumbs up] [Thumbs down]
   [Add note]
```

The user's previous source answers should remain visible as they continue:

```text
OpenTable · Nothing good
Resy · Maybe revisit · "Check Bavette's again later"
Tock · Not opened
Google Maps · Found something
```

Check-in options:

```ts
type SourceCheckInOutcome =
  | "found_something"
  | "good_options"
  | "maybe_revisit"
  | "nothing_good"
  | "still_checking"
```

Quick source reaction:

```ts
type SourceReaction = "thumbs_up" | "thumbs_down" | null
```

Local note type:

```ts
type SourceResultNote = {
  launchSessionId: string
  sourceId: string
  outcome: SourceCheckInOutcome
  reaction?: SourceReaction
  note?: string
  restaurantName?: string
  possibleTime?: string
  createdAt: string
  updatedAt: string
  storageScope: "local-only"
}
```

UX rules:

- Notes are for the user's own reservation hunt first.
- Notes should persist in localStorage for that search session.
- The source pill should show the current answer and allow editing.
- The user should be able to skip a source.
- Do not require feedback before opening the next source.
- On mobile, keep the check-in compact and thumb-friendly.
- On desktop, show a right-side or top summary of answered sources if the layout allows.

Data rules:

- Aggregate outcome may be sent to analytics if enabled.
- Free-text notes, restaurant names, and possible times stay local-only in v1.
- Do not send note text to D1 or analytics in v1.
- Do not imply DinnerTabs knows whether the user booked unless the user explicitly marks it.

Allowed copy:

```text
Did you find anything useful on OpenTable?
```

```text
Save a note for yourself.
```

Forbidden copy:

```text
We saw you visited OpenTable.
We saw you closed OpenTable.
OpenTable had no availability.
Resy was checked.
```

### 6.7 Optional Global Feedback Prompt

The prompt should be small and respectful, not a blocking survey.

Initial prompt:

```text
Did any source help?
[Found a table] [Good options] [No useful options] [Still checking]
```

Second step:

```text
Which source was most useful?
[OpenTable] [Google Maps] [DoorDash] [Resy] [Tock] [Michelin] [Restaurant website] [Other]
```

Optional details:

```text
Want to remember what you found?
[Restaurant name] [Time] [Booked / Maybe / Not useful]
```

Default behavior:

- source usefulness feedback may be sent as aggregate analytics
- scratchpad details stay local unless explicitly changed in a future version
- user can dismiss permanently for the current search

Feedback data type:

```ts
type SourceFeedback = {
  launchSessionId: string
  sourceId?: string
  citySlug: string
  dateBucket: "today" | "tomorrow" | "this_weekend" | "future" | "unknown"
  timeBucket: "breakfast" | "brunch" | "lunch" | "dinner" | "late"
  partySizeBucket: "1" | "2" | "3-4" | "5-6" | "7+"
  normalizedTags: string[]
  launchMode: LaunchSession["mode"]
  attemptedSourceIds: string[]
  sourceOutcome?: SourceCheckInOutcome
  sourceReaction?: SourceReaction
  mostUsefulSourceId?: string
  outcome?: "found_table" | "good_options" | "no_useful_options" | "still_checking"
  submittedAt: string
}
```

Do not collect:

- full name
- email
- phone
- exact IP address
- third-party account identity
- third-party booking confirmation
- exact restaurant found, unless stored local-only or explicitly consented later

### 6.8 Learning From Feedback

Feedback should improve rankings without overclaiming.

Use feedback primarily to improve the order of DinnerTabs source suggestions. Do not present it as third-party platform performance, market share, conversion rate, inventory size, or availability quality.

Allowed copy after enough data:

```text
DinnerTabs users searching Chicago steakhouses often reported these sources as useful starting points.
```

Allowed labels:

- "User-reported useful"
- "Popular starting point"
- "Often opened for searches like this"
- "Strong fit for this search"

Forbidden labels:

- "Most availability"
- "Best availability"
- "Verified tables"
- "We found tables"
- "Checked by DinnerTabs"

Minimum thresholds before showing aggregate user-reported source rankings:

- at least 20 feedback submissions for city + broad tag, or
- at least 50 feedback submissions for city alone

Before thresholds are reached, use static source ranking and label it:

```text
Recommended starting order
```

Public display of aggregate feedback requires counsel review. V1 may collect source usefulness feedback and source check-in outcomes through the analytics abstraction, but any public leaderboard-style comparison should stay out of scope.

### 6.9 First-Party Trend Signals

DinnerTabs may show trends based only on activity that happened on DinnerTabs.

This feature answers:

```text
Are many DinnerTabs users searching for the same city/date/time/cuisine window?
```

It must not answer:

```text
Are restaurants actually busy?
Are tables almost gone?
Is availability scarce?
```

Allowed trend inputs:

- DinnerTabs searches submitted
- DinnerTabs source tab launches
- DinnerTabs source clicks
- optional DinnerTabs feedback submissions

Forbidden trend inputs:

- third-party availability
- third-party page contents
- third-party booking outcomes unless voluntarily reported on DinnerTabs
- scraped data
- browser history
- third-party cookies or pixels
- inferred scarcity from destination sites

Trend buckets should be coarse enough to be useful without exposing individuals:

```ts
type TrendBucket = {
  citySlug: string
  date: string // YYYY-MM-DD
  timeBucket: "breakfast" | "brunch" | "lunch" | "dinner" | "late"
  timeWindowLabel: string // e.g. "around 8 PM"
  partySizeBucket: "1" | "2" | "3-4" | "5-6" | "7+"
  normalizedTags: string[] // e.g. ["steakhouse"]
  searchCount: number
  launchCount: number
  feedbackCount: number
  mostOpenedSourceIds: string[]
  updatedAt: string
}
```

Allowed labels:

- "Popular on DinnerTabs"
- "High DinnerTabs interest"
- "Spike in DinnerTabs searches"
- "More searches than usual on DinnerTabs"
- "Often opened by users with similar searches"

Allowed copy:

```text
High DinnerTabs interest
112 DinnerTabs users searched similar Chicago dinner tabs for June 20 around 8 PM.
```

```text
This date and time is getting more DinnerTabs searches than usual for Chicago. Open your source tabs to compare options at the source.
```

Forbidden labels and copy:

- "Very busy time"
- "Restaurants are busy"
- "Tables are going fast"
- "Book quick before it's gone"
- "Limited availability"
- "Almost sold out"
- "Hard to get"
- "Only a few tables left"

Trend display thresholds:

- Do not show exact counts below 20 similar searches.
- Below threshold, show static/popular search suggestions instead.
- Round larger counts into friendly ranges if needed, e.g. "100+ searches."
- Do not expose individual search history.

Example for the north star search:

```text
Chicago · Jun 20 · Around 8 PM

High DinnerTabs interest
100+ DinnerTabs users searched similar Chicago dinner tabs recently.

Most opened starting points:
OpenTable · Google Maps · DoorDash · Resy
```

### 6.10 First-Party Browser Memory

DinnerTabs should remember the returning browser so the product feels continuous without requiring accounts.

Use cases:

- restore the user's last search
- show recent searches on the same device
- preserve source-by-source check-ins for an active hunt
- remember dismissed prompts
- remember preferred city, time, party size, and theme
- avoid double-counting obvious repeated event submissions where practical

Storage approach:

- Use localStorage for rich local state: recent searches, source check-ins, scratchpad notes, and UI preferences.
- Use a first-party cookie only when server-side continuity is useful, such as associating coarse anonymous events from the same browser.
- The cookie should contain only a random pseudonymous identifier, not search text, restaurant notes, source notes, names, emails, or phone numbers.
- The cookie must be first-party to the DinnerTabs domain.
- The cookie should be `Secure`, `SameSite=Lax`, and have a reasonable expiration, e.g. 90 to 180 days.
- Provide a clear "Reset DinnerTabs memory on this device" action that clears the localStorage data and expires the first-party cookie.

Cookie proposal:

```text
Name: dt_visitor
Value: random UUID or opaque random ID
Purpose: remember this browser for DinnerTabs-only continuity and aggregate duplicate control
Scope: first-party DinnerTabs domain only
SameSite: Lax
Secure: true
HttpOnly: true if only the server needs it; otherwise keep non-sensitive and readable only if required
Expiration: 180 days max for v1
```

Local storage proposal:

```ts
type DinnerTabsDeviceMemory = {
  schemaVersion: 1
  recentSearches: RecentSearch[]
  activeLaunchSessions: LaunchSession[]
  sourceResultNotes: SourceResultNote[]
  dismissedPromptIds: string[]
  preferences: {
    defaultCitySlug?: string
    defaultPartySize?: number
    defaultTime?: string
    timeFlexMinutes?: 0 | 30 | 60 | 90 | 120
    theme?: "system" | "light" | "dark"
  }
  updatedAt: string
}
```

Privacy rules:

- This is not an account.
- This is not cross-device identity.
- This is not third-party tracking.
- Do not use third-party advertising cookies.
- Do not sync free-text notes to D1 in v1.
- Do not use the visitor cookie to infer anything about third-party booking behavior.
- Disclose first-party browser memory in the privacy policy.
- If non-essential analytics cookies are added later, add a privacy control before enabling them.

Allowed copy:

```text
Remember this search on this device.
```

```text
Reset DinnerTabs memory on this device.
```

Forbidden copy:

```text
Logged in
Account saved
Synced across devices
We remember what you did on OpenTable
```

### 6.11 First-Party Insights Layer

DinnerTabs should turn its own first-party activity into useful public and private insight cards.

The insights layer is one of the product's long-term advantages. It should help users answer:

- what times are getting the most DinnerTabs searches
- what cities/dates/cuisines are most searched
- which sources users most often open for searches like this
- which sources get the most positive check-ins
- which direct partners or explicitly shared restaurant mentions are getting attention

All insight copy must make the source of the data clear:

```text
Based on DinnerTabs searches
Based on DinnerTabs source check-ins
Based on DinnerTabs users who chose to share this
```

Never present DinnerTabs insight data as:

- actual restaurant availability
- actual restaurant capacity
- total market demand
- restaurant sales
- third-party platform performance
- a comprehensive popularity ranking of all restaurants

Insight modules:

```ts
type InsightModule =
  | "popular_time_windows"
  | "most_searched_intents"
  | "most_opened_sources"
  | "source_thumbs_up"
  | "direct_partner_interest"
  | "user_shared_place_mentions"
```

Example modules:

```text
Popular DinnerTabs times for Chicago on Jun 20
6 PM · 8 PM · 7:30 PM
```

```text
Most searched DinnerTabs intents in Chicago this week
Steakhouse · Birthday dinner · Italian · Rooftop · Michelin
```

```text
Sources users marked helpful for Chicago steakhouse searches
OpenTable · Google Maps · DoorDash · Resy
```

```text
Most thumbs-up sources on DinnerTabs for searches like this
OpenTable · DoorDash · Google Maps · Resy
```

```text
Places DinnerTabs users chose to mention
Bavette's · Gibsons · Maple & Ash
```

Safe place data rules:

- Direct partner clicks may count toward direct partner interest.
- Restaurant names typed into local notes stay local-only by default.
- To use a user-entered restaurant name in public aggregate place insights, the UI must ask for explicit consent, such as "Share this place anonymously as a DinnerTabs trend signal."
- Do not show user-shared place mentions until minimum thresholds are met.
- Do not show negative place-level sentiment in public v1 insights.
- Do not claim that mentioned places have availability.
- Do not claim a place is popular generally; say it was "mentioned on DinnerTabs" or "saved by DinnerTabs users."
- Normalize place names carefully and allow admin suppression/merge controls before public display.

Allowed place copy:

```text
Places DinnerTabs users chose to mention for searches like this.
```

Forbidden place copy:

```text
Most popular restaurants in Chicago.
Restaurants with the most availability.
Restaurants people booked.
Restaurants that are filling up.
```

Insight thresholds:

- Public time/search/source insights require at least 20 similar events.
- Public place mention insights require at least 10 consenting mentions and admin review in v1.
- Show ranges or rounded counts rather than precise low counts.
- Allow internal admin/debug views to show raw counts only to the site owner.
- Public pages should use cached summaries, not expensive live aggregations on every request.

## 7. Source Adapter System

All source links must be generated through source adapters. Do not hardcode outbound URL generation in UI components.

### 7.1 Types

```ts
export type CountryCode = "CA" | "US" | "GLOBAL"

export type SourceCategory =
  | "reservation-marketplace"
  | "direct-widget-finder"
  | "discovery"
  | "guide"
  | "search-engine"
  | "direct-partners"
  | "credit-card"
  | "other"

export type SourceParamSupport = {
  city: boolean
  date: boolean
  time: boolean
  partySize: boolean
  query: boolean
  cuisine: boolean
  timeWindow: boolean
}

export type GeneratedSourceLink = {
  sourceId: string
  sourceName: string
  href: string
  label: string
  description: string
  bestFor: string[]
  category: SourceCategory
  paramSupport: SourceParamSupport
  confidenceLabel: "Strong prefill" | "Partial prefill" | "Manual after opening" | "Direct partner links"
  rankScore: number
  launchGroup: "best-starting-points" | "premium" | "direct-hunt" | "guides-reviews" | "partners"
  legalNote?: string
}

export type SourceAdapter = {
  id: string
  name: string
  slug: string
  category: SourceCategory
  isEnabled: boolean
  countries: CountryCode[]
  cityCoverage: string[] | "dynamic" | "unknown"
  description: string
  bestFor: string[]
  paramSupport: SourceParamSupport
  defaultRank: number
  buildUrl: (intent: SearchIntent) => string
}
```

### 7.2 URL Helpers

Create robust helpers:

```ts
function encodeQuery(value: string): string
function formatDateYYYYMMDD(date: string): string
function formatDateTimeLocal(date: string, time: string): string
function formatTimeHHMM(time: string): string
function buildGoogleSearchUrl(query: string): string
function buildGoogleMapsSearchUrl(query: string): string
function safeOutboundUrl(url: string): string
```

Rules:

- All outbound links must be absolute HTTPS URLs.
- All outbound links must use `target="_blank"` and `rel="noopener noreferrer"`.
- If a URL pattern is uncertain, use a safe Google search fallback and mark as manual.
- URL templates must be easy to update in config.
- Add unit tests for every source adapter.

## 8. Initial Sources

Seed these source adapters. URL patterns must be treated as configurable and tested before launch.

### 8.1 OpenTable

ID:

```text
opentable
```

Countries:

```text
CA, US
```

Best for:

- broad restaurant search
- mainstream availability searches
- city/date/time/party searches
- steakhouse and group dinner searches

Initial URL strategy:

```text
https://www.opentable.com/s?dateTime={YYYY-MM-DDTHH:mm:00}&covers={partySize}&term={queryOrCity}
```

Use `opentable.ca` for Canadian cities.

Confidence:

```text
Partial prefill or Strong prefill if tested.
```

### 8.2 Google Maps

ID:

```text
google-maps
```

Countries:

```text
GLOBAL
```

Best for:

- broad discovery
- direct restaurant websites
- Reserve with Google buttons
- maps/neighborhood decisions

URL:

```text
https://www.google.com/maps/search/{encodedQuery}
```

Example query:

```text
Chicago steakhouse reservations 4 people June 20 7:30 PM
```

Confidence:

```text
Partial prefill
```

### 8.3 DoorDash Reservations

ID:

```text
doordash-reservations
```

Countries:

```text
US initially, configurable by city
```

Best for:

- cities where DoorDash Reservations / Going Out is active
- SevenRooms-powered reservation inventory
- potential rewards/credits where available

Initial strategy:

- Use configured public DoorDash Reservations URL if a stable city URL exists.
- Otherwise use Google search fallback:

```text
https://www.google.com/search?q=DoorDash+Reservations+{city}+{query}+restaurant
```

Confidence:

```text
Manual after opening
```

Notes:

- DoorDash availability by city changes. Keep city support config-driven.

### 8.4 Resy

ID:

```text
resy
```

Countries:

```text
CA, US
```

Best for:

- trendier restaurants
- high-demand restaurants
- date night
- major cities

URL:

```text
https://resy.com/cities/{resyCitySlug}?date={YYYY-MM-DD}&seats={partySize}
```

Do not promise query/time prefill unless tested.

Confidence:

```text
Partial prefill
```

### 8.5 Tock

ID:

```text
tock
```

Countries:

```text
CA, US
```

Best for:

- tasting menus
- premium restaurants
- experiences
- wineries
- special events

URL:

```text
https://www.exploretock.com/city/{tockCitySlug}
```

Confidence:

```text
Manual after opening
```

### 8.6 Michelin Guide

ID:

```text
michelin
```

Countries:

```text
CA, US, GLOBAL
```

Best for:

- quality filtering
- Michelin-starred restaurants
- Bib Gourmand
- recommended restaurants

Use known city URLs where configured.

Fallback:

```text
https://www.google.com/search?q=site%3Aguide.michelin.com+{city}+{query}+restaurant
```

Confidence:

```text
Manual after opening
```

### 8.7 SevenRooms Finder

ID:

```text
sevenrooms-finder
```

Category:

```text
direct-widget-finder
```

Best for:

- direct restaurant booking pages
- restaurant groups
- high-end hospitality groups

URL:

```text
https://www.google.com/search?q=site%3Asevenrooms.com%2Freservations+{city}+{query}+restaurant+reservation
```

Confidence:

```text
Manual after opening
```

### 8.8 Toast / Direct-Site Finder

ID:

```text
toast-direct-finder
```

Category:

```text
direct-widget-finder
```

Best for:

- restaurants with direct booking links
- Google Reserve / Toast-connected restaurants
- official restaurant websites

URLs:

```text
https://www.google.com/search?q=site%3Atoasttab.com+{city}+{query}+restaurant+reservation
https://www.google.com/search?q={city}+{query}+official+restaurant+reservations
```

Confidence:

```text
Manual after opening
```

### 8.9 Yelp

ID:

```text
yelp
```

Countries:

```text
CA, US
```

Best for:

- reviews
- waitlist/booking links where supported
- discovery

URL:

```text
https://www.yelp.com/search?find_desc={query}+restaurants+reservations&find_loc={city}
```

Confidence:

```text
Partial prefill
```

### 8.10 Libro

ID:

```text
libro
```

Countries:

```text
CA
```

URL:

```text
https://www.google.com/search?q=site%3Alibroreserve.com+{city}+restaurant+reservation+{query}
```

Confidence:

```text
Manual after opening
```

### 8.11 TouchBistro Dine

ID:

```text
touchbistro-dine
```

Countries:

```text
CA, US
```

URL:

```text
https://www.google.com/search?q=site%3Atbdine.com+{city}+{query}+reservation
```

Confidence:

```text
Manual after opening
```

### 8.12 Direct Booking Partners

ID:

```text
direct-partners
```

This is an internal DinnerTabs section, not an outbound platform.

It may show restaurant direct booking links only when:

- manually added by the site owner
- submitted by a restaurant
- provided by a sponsor/partner
- permission is clear

Never show third-party availability here unless a future direct partner explicitly provides it and the data is labelled as partner-provided.

## 9. Source Ranking

Ranking should combine static fit and user-reported usefulness.

Initial static ranking factors:

- city support
- country support
- cuisine fit
- source category
- parameter support
- confidence label
- launch mode
- direct partner priority

Example Chicago steakhouse default order:

```text
1. OpenTable
2. Google Maps
3. DoorDash Reservations
4. Resy
5. Tock
6. Michelin Guide
7. SevenRooms Finder
8. Toast / Direct-Site Finder
9. Yelp
```

When enough feedback exists, adjust ranking with user-reported usefulness. Never rank by scraped availability.

## 10. City Data

Seed city data in static config.

Required initial cities:

Canada:

- Toronto, ON
- Montreal, QC
- Vancouver, BC
- Calgary, AB
- Ottawa, ON

United States:

- Chicago, IL
- New York, NY
- Los Angeles, CA
- Miami, FL
- San Francisco, CA
- Las Vegas, NV
- Boston, MA
- Washington, DC

City type:

```ts
export type City = {
  name: string
  slug: string
  region: string
  country: "CA" | "US"
  latitude: number
  longitude: number
  openTableDomain?: "opentable.com" | "opentable.ca"
  resySlug?: string | null
  tockSlug?: string | null
  michelinPath?: string | null
  doorDashReservationsSupported?: boolean
  sourcePriorityOverrides?: Record<string, number>
}
```

## 11. Direct Booking Partners

Build the data model now, even without billing.

```ts
export type RestaurantPartner = {
  id: string
  name: string
  slug: string
  citySlug: string
  region: string
  country: "CA" | "US"
  cuisines: string[]
  vibes: string[]
  neighborhoods?: string[]
  priceLevel?: "$" | "$$" | "$$$" | "$$$$"
  bookingUrl: string
  websiteUrl?: string
  phone?: string
  description: string
  isSponsored: boolean
  sponsorshipLabel: "Featured Direct Partner" | "Sponsored" | "Partner"
  startsAt?: string
  endsAt?: string
  priority: number
  active: boolean
  directInventoryEnabled: boolean
  availabilityNote?: string
}
```

Partner matching:

- active is true
- city matches
- cuisine/vibe roughly matches, or query is empty
- sponsorship dates are valid
- sort by exact match, sponsorship, priority, name

Partner card CTA:

```text
Open restaurant booking page
```

Never:

```text
Book now on DinnerTabs
```

## 12. Analytics and Privacy

Use a privacy-friendly analytics abstraction:

```ts
trackEvent(eventName: string, props: Record<string, unknown>)
```

Track:

- search_submitted
- source_link_clicked
- launch_best_tabs_clicked
- launch_all_tabs_clicked
- copy_all_links_clicked
- dinner_tabs_returned_after_launch
- feedback_prompt_shown
- source_checkin_prompt_shown
- source_checkin_saved
- source_feedback_submitted
- place_signal_shared
- insight_module_viewed
- direct_partner_clicked
- recent_search_clicked
- trending_search_clicked
- trend_signal_shown
- trend_bucket_updated
- city_page_viewed
- source_page_viewed

Search event props:

- anonymousVisitorId, only if first-party memory is enabled
- citySlug
- date
- dateBucket
- timeBucket
- timeWindowLabel
- partySizeBucket
- normalizedTags
- launchMode
- sourceIds

Trend event props:

- citySlug
- date
- timeBucket
- partySizeBucket
- normalizedTags
- searchCountBucket
- launchCountBucket
- mostOpenedSourceIds

Insight event props:

- module
- citySlug
- dateBucket
- timeBucket
- normalizedTags
- sourceIds, when source insight
- placeSignalCountBucket, when place insight

Cloudflare storage plan:

- Use Cloudflare D1 for first-party aggregate search, launch, and feedback counters.
- Use Cloudflare Workers Analytics Engine or the analytics abstraction for high-volume event telemetry if configured.
- Use Workers KV only for cached public trend summaries or slowly changing config, not as the source of truth for counters.
- Keep localStorage for recent searches and scratchpad notes.
- Use a first-party cookie only for an opaque DinnerTabs visitor ID when needed for continuity or duplicate control.
- Never send exact scratchpad restaurant names to aggregate analytics in v1.
- Store user-entered place names only when the user explicitly chooses to share that place anonymously as a trend signal.
- Cache public insight summaries separately from raw event tables.

Suggested D1 tables:

```sql
create table search_events (
  id text primary key,
  created_at text not null,
  city_slug text not null,
  date text not null,
  time_bucket text not null,
  time_window_label text not null,
  party_size_bucket text not null,
  normalized_tags text not null
);

create table source_launch_events (
  id text primary key,
  created_at text not null,
  launch_session_id text not null,
  city_slug text not null,
  date text not null,
  time_bucket text not null,
  party_size_bucket text not null,
  normalized_tags text not null,
  launch_mode text not null,
  source_ids text not null
);

create table source_feedback_events (
  id text primary key,
  created_at text not null,
  launch_session_id text not null,
  source_id text,
  city_slug text not null,
  date text not null,
  date_bucket text not null,
  time_bucket text not null,
  time_window_label text not null,
  party_size_bucket text not null,
  normalized_tags text not null,
  source_outcome text,
  source_reaction text,
  outcome text,
  most_useful_source_id text
);

create table trend_buckets (
  bucket_key text primary key,
  city_slug text not null,
  date text not null,
  time_bucket text not null,
  time_window_label text not null,
  party_size_bucket text not null,
  normalized_tags text not null,
  search_count integer not null default 0,
  launch_count integer not null default 0,
  feedback_count integer not null default 0,
  most_opened_source_ids text not null default '[]',
  updated_at text not null
);

create table source_insight_buckets (
  bucket_key text primary key,
  city_slug text not null,
  date_bucket text not null,
  time_bucket text not null,
  party_size_bucket text not null,
  normalized_tags text not null,
  source_id text not null,
  opened_count integer not null default 0,
  thumbs_up_count integer not null default 0,
  thumbs_down_count integer not null default 0,
  positive_checkin_count integer not null default 0,
  maybe_revisit_count integer not null default 0,
  nothing_good_count integer not null default 0,
  updated_at text not null
);

create table user_shared_place_signals (
  id text primary key,
  created_at text not null,
  city_slug text not null,
  date_bucket text not null,
  time_bucket text not null,
  party_size_bucket text not null,
  normalized_tags text not null,
  normalized_place_name text not null,
  display_place_name text not null,
  source_id text,
  consent_version text not null,
  status text not null default 'pending_review'
);

create table public_insight_summaries (
  cache_key text primary key,
  module text not null,
  city_slug text,
  date_bucket text,
  time_bucket text,
  normalized_tags text not null default '[]',
  summary_json text not null,
  event_count integer not null,
  generated_at text not null,
  expires_at text not null
);
```

Do not track:

- names
- emails
- phone numbers
- full IP addresses
- third-party account details
- exact third-party booking outcomes unless voluntarily submitted in a clearly labelled DinnerTabs form
- cross-site activity
- third-party cookies
- advertising identifiers

## 13. Natural-Language Parsing

Use a lightweight parser with `date-fns`.

Examples:

```text
Steakhouse for 4 in Chicago on June 20
Dinner for 2 in Toronto tomorrow at 8 Italian
Toronto Saturday 7:30 4 people steakhouse
Find me sushi in New York tonight for 3
```

Detect:

- party size: "for 4", "4 people", "party of 4"
- city: known city names and common aliases
- date: today, tonight, tomorrow, Friday, Saturday, this weekend, YYYY-MM-DD, month/day
- time: 7, 7pm, 7:30, 19:30
- cuisine/vibe: leftover terms after extracting city/date/time/party

Defaults:

- city: Chicago for US users if no prior local search exists; otherwise last city or Toronto fallback
- date: tomorrow
- time: 19:30
- time flexibility: 90 minutes
- party size: 2
- query: empty

If confidence is low, keep fields editable and do not block submission.

## 14. Pages and Routes

Use Next.js App Router.

Required:

```text
/
/search
/city/[citySlug]
/sources
/sources/[sourceSlug]
/restaurant-partners
/legal
/privacy
/terms
/extension
```

Optional SEO routes:

```text
/find-a-table/[citySlug]
/reservation-tabs/[citySlug]
/search-opentable-resy-tock/[citySlug]
/best-restaurant-booking-sites/[citySlug]
```

Do not create thin duplicate pages. If optional routes exist, canonicalize appropriately.

## 15. UI Components

Use:

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui if available
- lucide-react
- date-fns
- zod

Components:

```text
SearchHero
SearchForm
NaturalLanguageInput
StructuredSearchFields
SourceLaunchPanel
SourceCard
SourceGroup
SourceCheckInPill
SourceCheckInSummary
OpenTabsButton
CopyLinksButton
ReturnFeedbackPrompt
SearchScratchpad
InsightsLayer
InsightCard
PopularTimesInsight
MostSearchedInsight
SourceHelpfulnessInsight
UserSharedPlacesInsight
DirectPartnerSection
DirectPartnerCard
TrendingSearches
RecentSearches
CityLandingPage
SourceLandingPage
FooterDisclaimer
LegalNotice
```

Design:

- Keep the homepage simple and search-first.
- Results should feel organized and utilitarian, not like a marketing page.
- Use compact cards with clear actions.
- Do not nest cards inside cards.
- Make mobile launch/copy actions reliable.
- Use icons for copy/open/share where helpful.
- Keep compliance copy visible but not oppressive.

## 16. SEO Requirements

Homepage title:

```text
DinnerTabs - Open Restaurant Reservation Searches Faster
```

Homepage description:

```text
Enter one dining search and open reservation source tabs across OpenTable, Resy, Tock, Google Maps, DoorDash, Michelin, Yelp, direct restaurant websites, and more. Book directly at the source.
```

City page example:

```text
Open restaurant reservation searches in Chicago
```

City page content:

- H1
- short intro
- prefilled search module
- supported source list
- how tab launching works
- popular searches
- legal disclaimer

Source page content:

- what the source is useful for
- what DinnerTabs can prefill
- where manual searching may still be required
- no-affiliation disclaimer
- CTA to build a tab set

Schema:

- WebSite
- SearchAction
- BreadcrumbList

Do not add Restaurant schema unless building direct partner pages later.

## 17. Privacy and Terms Pages

Privacy page must explain:

- no account required
- DinnerTabs does not book reservations
- outbound links go to third parties
- third-party sites have their own privacy policies
- DinnerTabs records clicked source buttons and optional feedback
- DinnerTabs does not read third-party tabs
- DinnerTabs may detect when its own tab becomes visible again after opening source tabs
- DinnerTabs may use first-party cookies or localStorage to remember recent searches, source check-ins, and preferences on this device
- DinnerTabs does not use third-party cookies for cross-site tracking
- users can reset DinnerTabs memory on this device
- aggregate analytics may be collected
- no sale of personal information
- local scratchpad/recent search data may be stored in browser localStorage

Terms page must explain:

- independent search launcher
- no booking guarantee
- third-party terms control bookings
- no liability for third-party availability, pricing, deposits, cancellations, or errors
- no scraping or misuse through DinnerTabs
- no reservation resale
- sponsored placements may appear and will be labelled

## 18. Tech Stack

Use:

```text
Next.js current stable
TypeScript
Tailwind CSS
shadcn/ui
date-fns
zod
lucide-react
Cloudflare Workers deployment
OpenNext Cloudflare adapter
Wrangler
Cloudflare D1
Workers KV, optional
Workers Analytics Engine, optional
```

Deployment target:

- Deploy the full-stack Next.js app to Cloudflare Workers.
- Use Wrangler for local preview and production deploys.
- Use `workers.dev` or a Cloudflare preview URL for early testing.
- Add a custom domain later through Cloudflare Workers custom domains or routes.
- Keep the app originless on Cloudflare where possible; do not require a separate Node server.
- Avoid Node-only APIs unless supported by the Cloudflare/OpenNext runtime.

Cloudflare bindings:

- `DB`: Cloudflare D1 database for first-party aggregate counters, feedback, and trend buckets.
- `CACHE`: optional Workers KV namespace for cached public trend summaries and config.
- `ANALYTICS`: optional Workers Analytics Engine dataset for non-blocking event telemetry.

Data storage rules:

- Use static config for cities, sources, source ranking defaults, and direct partner seed data.
- Use localStorage for recent searches and scratchpad notes.
- Use a first-party cookie for a pseudonymous visitor ID only if needed for returning-browser continuity or duplicate control.
- Use D1 for aggregate first-party trends and optional feedback.
- If D1 is not configured in a development environment, event submission may be a no-op with a console-safe debug message.
- Do not add Supabase, Postgres, or another database in v1 unless Cloudflare D1 proves insufficient.

Custom domain plan:

- Initial deploy: Cloudflare-generated preview or `workers.dev` URL.
- Public launch: connect the chosen domain or subdomain to the Worker.
- Configure root/www redirect intentionally once the final domain is known.
- Keep app URLs canonical after the domain is connected.

Suggested structure:

```text
/wrangler.jsonc
/migrations/0001_initial.sql

/src/app/page.tsx
/src/app/search/page.tsx
/src/app/api/events/search/route.ts
/src/app/api/events/launch/route.ts
/src/app/api/events/feedback/route.ts
/src/app/api/events/place-signal/route.ts
/src/app/api/trends/route.ts
/src/app/api/insights/route.ts
/src/app/city/[citySlug]/page.tsx
/src/app/sources/page.tsx
/src/app/sources/[sourceSlug]/page.tsx
/src/app/restaurant-partners/page.tsx
/src/app/legal/page.tsx
/src/app/privacy/page.tsx
/src/app/terms/page.tsx
/src/app/extension/page.tsx

/src/components/SearchHero.tsx
/src/components/SearchForm.tsx
/src/components/SourceLaunchPanel.tsx
/src/components/SourceCard.tsx
/src/components/SourceCheckInPill.tsx
/src/components/SourceCheckInSummary.tsx
/src/components/ReturnFeedbackPrompt.tsx
/src/components/SearchScratchpad.tsx
/src/components/InsightsLayer.tsx
/src/components/InsightCard.tsx
/src/components/PopularTimesInsight.tsx
/src/components/MostSearchedInsight.tsx
/src/components/SourceHelpfulnessInsight.tsx
/src/components/UserSharedPlacesInsight.tsx
/src/components/DirectPartnerSection.tsx
/src/components/TrendingSearches.tsx
/src/components/RecentSearches.tsx
/src/components/Footer.tsx

/src/lib/searchIntent.ts
/src/lib/naturalLanguage.ts
/src/lib/sourceAdapters.ts
/src/lib/sourceRanking.ts
/src/lib/launchSession.ts
/src/lib/feedback.ts
/src/lib/sourceCheckIns.ts
/src/lib/trends.ts
/src/lib/insights.ts
/src/lib/placeSignals.ts
/src/lib/cloudflareEnv.ts
/src/lib/dateUtils.ts
/src/lib/urlUtils.ts
/src/lib/analytics.ts
/src/lib/matching.ts

/src/data/cities.ts
/src/data/sources.ts
/src/data/trending.ts
/src/data/directPartners.ts
```

## 19. Acceptance Criteria

The MVP is complete when:

1. User can visit the homepage.
2. User can enter: "Steakhouse for 4 in Chicago on June 20."
3. App parses and displays:
   - Chicago
   - Saturday, June 20, 2026
   - 7:30 PM default dinner time
   - 4 people
   - steakhouse
4. User can edit all parsed fields.
5. User submits and reaches a shareable `/search` URL.
6. Results page shows ranked source groups.
7. At least 8 source cards appear for Chicago.
8. `Open best tabs` opens a ranked subset after a user click.
9. `Open all source tabs` opens all enabled source URLs after a user click or gracefully handles popup blocking.
10. `Copy all links` works.
11. DinnerTabs records which source buttons were clicked/opened from DinnerTabs.
12. DinnerTabs does not inspect, fetch, scrape, iframe, or automate any third-party page.
13. After opening a single source, that source pill/card can show an inline check-in when the user returns.
14. Source check-in options include found something, maybe revisit, nothing good, and still checking.
15. Source check-in notes persist locally for the search session.
16. Previous source answers remain visible while the user checks the next source.
17. Free-text notes, restaurant names, and possible times are local-only in v1.
18. When the user returns to the DinnerTabs tab, optional global feedback prompt can appear.
19. Feedback can be dismissed.
20. Feedback copy clearly says DinnerTabs does not know what happened on third-party sites unless the user tells it.
21. Returning to DinnerTabs on the same device restores recent searches and active source check-ins.
22. User can reset DinnerTabs memory on this device.
23. First-party cookie, if used, stores only an opaque pseudonymous ID.
24. Recent searches appear after use.
25. Local scratchpad can store maybe/booked/not useful notes.
26. High-interest trend module can show DinnerTabs search interest when bucket thresholds are met.
27. Trend module uses safe language: DinnerTabs interest, not restaurant scarcity or table availability.
28. Trend module hides exact counts below threshold.
29. Insights layer can show popular time windows based on DinnerTabs searches.
30. Insights layer can show most searched DinnerTabs intents/tags.
31. Insights layer can show most opened and most positively checked-in sources.
32. Place insights only use direct partner clicks or explicit anonymous user-shared place signals.
33. Public place insights require thresholding and admin review in v1.
34. Insight copy clearly says "on DinnerTabs" or equivalent first-party framing.
35. City page `/city/chicago` works.
36. Source page `/sources/opentable` works.
37. Restaurant partner page exists.
38. Legal, privacy, and terms pages exist.
39. Footer disclaimer appears sitewide.
40. All outbound links use `target="_blank"` and `rel="noopener noreferrer"`.
41. No third-party logos are used by default.
42. No forbidden language appears in the UI.
43. App works on mobile and desktop.
44. No console errors.
45. URL adapter tests pass.
46. D1 migration exists for first-party event, trend, and insight tables.
47. Cloudflare local preview works through Wrangler.
48. Production deploy target is Cloudflare Workers.
49. Configuration supports a future custom domain.
50. Lighthouse performance is high.

## 20. Roadmap

### Phase 1 - Awesome Legal MVP

- Natural-language search.
- Ranked source tabs.
- User-initiated tab launch.
- Copy all links.
- Recent searches.
- Source-by-source check-in pills.
- First-party browser memory for returning-device continuity.
- Reset DinnerTabs memory control.
- Return feedback prompt.
- Local scratchpad.
- First-party DinnerTabs interest trend buckets.
- Insights layer for popular times, searched intents, and source helpfulness.
- Legal/privacy/terms.
- Static city/source config.
- Adapter tests.
- Cloudflare Workers deploy.
- D1 migrations for aggregate events and trends.
- Public insight summaries cached from first-party data.

### Phase 2 - Better Search Intelligence Without Scraping

- Aggregate source usefulness rankings.
- Richer first-party trend cards by city/date/time/cuisine.
- Explicit anonymous place-sharing flow.
- Admin review/merge/suppress controls for public place insights.
- Source presets by city/cuisine.
- Group voting link.
- Better synonym expansion.
- Neighborhood chips.
- Direct booking route directory for manually verified restaurants.
- "Call restaurant" helper mode.
- Custom domain launch and canonical URL cleanup.

### Phase 3 - Browser Extension

- Side-panel scratchpad.
- One-click tab launch with better popup handling.
- User-controlled tab organization.
- Still no third-party scraping, DOM reading, automation, or booking.

### Phase 4 - Direct Partner Growth

- Restaurant-submitted direct booking links.
- Paid featured placements.
- Partner analytics based only on DinnerTabs clicks.
- Optional partner-provided availability if explicitly contracted and labelled.

### Phase 5 - Opt-In Alerts For Direct Partners Only

- Email/SMS alerts only for direct partners or owned inventory.
- Clear opt-in.
- No third-party scraping or monitoring.

## 21. Implementation Priorities

Prioritize:

1. Legally conservative behavior.
2. Fast, satisfying tab launch workflow.
3. Correct source adapter architecture.
4. Clear ranking that helps the user choose where to start.
5. Post-return feedback loop.
6. First-party trend signals that create urgency without implying scarcity.
7. Cloudflare-native deployment and storage.
8. Mobile reliability.
9. Clean UI.
10. Easy config updates.

Build now with static data. Do not overbuild accounts, billing, databases, APIs, scraping, automation, or admin dashboards.

The product should be great from day one because it does one thing extremely well: it turns a messy reservation hunt into one organized, user-controlled tab set.

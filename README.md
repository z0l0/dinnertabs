# DinnerTabs

DinnerTabs is a legally conservative restaurant reservation search tab launcher.

Users enter one dining intent, open ranked public source tabs, leave source-by-source check-ins, and see first-party DinnerTabs interest signals. DinnerTabs does not scrape, inspect third-party tabs, show third-party availability, or book reservations.

## Live

- Cloudflare Workers: https://dinnertabs.tubefeeder.workers.dev
- North star search: `/search?city=chicago&date=2026-06-20&time=18%3A00&party=4&q=steakhouse&flex=90`

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- OpenNext Cloudflare adapter
- Cloudflare Workers
- Cloudflare D1
- Workers KV

## Local Development

```bash
npm install
npm run dev
```

## Checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Cloudflare

```bash
npm run cf-typegen
npm run d1:migrate:local
npm run d1:migrate:remote
npm run deploy
```

## Legal Posture

DinnerTabs opens public source links in new tabs only after user action. It does not read or control those tabs. Trends and insights are based on DinnerTabs first-party activity only, not restaurant availability or scarcity.

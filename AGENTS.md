# card-cockpit — agent context

Hockey-card collection dashboard. Static site + small `server.js`, backed by Supabase
(project `jumfzlqrcffrsazgpsol`, tables prefixed `card_*`, ~130 cards). LIVE at
**coreydemberg-glitch.github.io/card-cockpit**.

## Hard rules
1. **This repo is PUBLIC** (GitHub Pages). NEVER commit secrets, service keys, or session tokens — anything pushed is world-readable immediately. Client code may only use the Supabase anon/publishable key.
2. eBay bid data is refreshed by a scheduled task (`refresh-card-bids`) that drives a real browser — bids are point-in-time snapshots, not live. Label them honestly in UI.
3. More COMC pages remain to be ingested — ingest scripts append to Supabase `card_*` tables; don't fork a second store (no local JSON shadow copies of the DB).

## Style
No emoji in UI — Tabler icons only, one accent + neutrals, flat fills, quiet status text.
Selected/active = Avansai green `#22FF88`.

## Workflow
Local: `npm start` (server.js). Deploy = push to the public GitHub repo (Pages serves it).
Done = verified on the live page → committed + pushed.

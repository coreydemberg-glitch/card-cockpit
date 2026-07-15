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


## Anti-drift doctrine (2026-07-14, learned the hard way)

- Every file an app renders has ONE canonical writer. Before writing such a file,
  find that producer and match its schema exactly (or invoke it). Two writers for
  one file is the bug, even if the data looks right.
- Decision-of-record docs (ENVIRONMENT.md / README contracts) outrank code comments
  and old commit messages. If they conflict, STOP and reconcile — don't obey either.
- Run artifacts (raw pulls, intermediates, backups) go to durable archive dirs inside
  the repo, never /tmp or scratch dirs (a tmp wipe destroyed run data on 07-14).

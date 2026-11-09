# Cards

Open `/cards` using the existing `npm start` server. Two to six people can join
with different nicknames, challenge one another, and play Bluff or no-limit
Texas Hold’em. Poker uses pretend chips only. No account or new service is needed.

## How the code fits together

- `deck.js` creates the cards and securely shuffles them.
- `bluff.js` and `poker.js` are the referees: they check moves and decide results.
  Their `view()` functions deliberately leave out other players’ hidden cards.
- `rooms.js` handles nicknames, invitations, admins, and reconnecting seats.
- `routes.js` serves the page and connects browsers at `/cards/ws`.
- `public/app.js` draws the table. Sorting and dragging change only your view,
  not the cards held by the server. `public/media.js` handles optional calls.

Every move carries a turn number. If a slow browser sends an old move twice,
the referee rejects it instead of playing it twice. A clock supplied to the
room manager lets tests move time forward without waiting 30 real seconds.

## Rules and behavior

Bluff settings choose same-rank claims or same/one up/one down from the latest
claim, plus 0–2 wild jokers. Ace is 1, without King/Ace wrapping. The admin
opens the first pile. Play 1–4 cards, or pass; everyone else gets a five-second
Bluff window. A correct caller wins the call; a truthful player wins a false
call. The winner opens the next pile, and the loser takes the entire pile.
If everyone else passes, discard the pile and its last player opens again.
A last-card play must survive the challenge. Two-player rooms can remove ten
random hidden cards once before dealing; this cancels outstanding invitations
and locks that deal to two players.

Poker includes blinds, dealer rotation, all four betting rounds, all-ins,
short-raise reopening, side pots, ties, and odd chips clockwise from the dealer.
A timeout checks if possible and otherwise folds. Bluff timeouts pass.
Ending an unfinished poker hand refunds its bets. The Rules button includes
a complete guide and illustrated hand rankings.

Only visitors to `/cards` appear in the lobby. A disconnected seat and nickname
are reserved for 60 seconds, while turn timers continue. After that, leaving
ends Bluff without a winner or folds the departing poker hand. Admin passes
to the earliest remaining player. There are no spectators or saved balances.

## Camera and microphone

Click **Join call**, then optionally enable camera or microphone. Joining alone
requests neither device. Leaving the call/table or losing the socket stops all
local tracks. Media is exchanged directly with opted-in room participants;
the application server passes connection details, never audio/video recordings.
Only `/cards` permits microphone access in its HTTP permissions policy.

Calls require HTTPS (or localhost), browser permission, and WebRTC support.
Public STUN discovery uses `stun:stun.l.google.com:19302`. There is intentionally
no TURN relay or paid service; school firewalls, VPNs, and some mobile networks
may block calls. A failed call does not block the game. Use **Play call audio**
if the browser blocks automatic audio playback. Calls are capped at six people
and use modest camera resolution/frame rates.

Connection setup follows [MDN’s negotiation pattern](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Perfect_negotiation),
which handles both people trying to connect at the same time. Poker raising
follows the [Poker TDA rules](https://www.pokertda.com/view-poker-tda-rules/)
for minimum raises and reopening after short all-ins.

## Running and checking

Run `npm run test:cards` for deterministic game, lobby, privacy, and route tests;
run `npm test` for the entire website. The optional socket test needs permission
to listen on localhost and clearly reports when that check is blocked.

For browser QA, use separate browser sessions/devices with unique nicknames.
Check both games, invitations, mobile/tablet layouts, drag and Alt+arrow card
sorting, reconnecting, camera-only/audio-only calls, denied permissions, and
blocked-call behavior. A real two-device test on different networks is needed
to verify camera and microphone connectivity.

## Hosting

Keep one Node process/instance for this version: rooms and presence are in
memory, so multiple instances would have separate lobbies. Restarting or
deploying resets rooms. The existing GitHub-to-Azure workflow deploys this page
with the rest of the website; it does not need a new port or hosting project.

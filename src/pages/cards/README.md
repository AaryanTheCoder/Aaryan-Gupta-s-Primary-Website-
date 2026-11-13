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
  not the cards held by the server. A table drop uses the same checks as Play.
- `public/media.js` handles calls, `public/phone.js` switches Bluff views, and
  `public/voice.js` recognises and confirms spoken ranks.

Every move carries a turn number. If a slow browser sends an old move twice,
the referee rejects it instead of playing it twice. A clock supplied to the
room manager lets tests move time forward without waiting a real minute.
Bluff claims also have their own IDs: a late Bluff click cannot reveal a newer
play, even if the turn changed while the click was travelling to the server.

## Rules and behavior

Bluff settings choose same-rank claims or same/one up/one down from the latest
claim, plus 0–2 wild jokers. Ace is 1, without King/Ace wrapping. The admin
opens the first pile. Play 1–4 cards, or pass. Turns last 60 seconds; the next
turn starts immediately after a play. Everyone except the latest player can
call Bluff until that claim is 60 seconds old, another play replaces it, or the
pile clears. Passing does not restart the claim clock.
A correct caller wins the call; a truthful player wins a false
call. The winner opens the next pile, and the loser takes the entire pile.
If everyone else passes, discard the pile and its last player opens again.
A last-card play must survive a full minute, or all opponents can accept the
final claim to finish early. Two-player rooms can remove ten
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

Bluff requests camera and microphone on entry and plays incoming audio by
default. Browser permission is still required. Each seat is a video tile with
the player's name and card count. Camera, mic, and audio can be turned off;
reconnecting preserves those choices. Poker keeps its original **Join call**
flow and starts both devices off.
Leaving the call/table or losing the socket stops all local tracks.
Media is exchanged directly with room participants;
the application server passes connection details, never audio/video recordings.
Only `/cards` permits microphone access in its HTTP permissions policy.

Calls require HTTPS (or localhost), browser permission, and WebRTC support.
Public STUN discovery uses `stun:stun.l.google.com:19302`. There is intentionally
no TURN relay or paid service; school firewalls, VPNs, and some mobile networks
may block calls. A failed call does not block the game. Use **Play call audio**
in Poker or **Tap to hear audio** in Bluff if automatic playback is blocked.
Calls are capped at six people
and use modest camera resolution/frame rates.

Connection setup follows [MDN’s negotiation pattern](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Perfect_negotiation),
which handles both people trying to connect at the same time. Poker raising
follows the [Poker TDA rules](https://www.pokertda.com/view-poker-tda-rules/)
for minimum raises and reopening after short all-ins.

## Bluff phone and voice modes

Phones are offered a compact layout on entering a Bluff room. It keeps the
table, complete hand, timer, and move buttons in one view. Swipe right or tap
the video tab for feeds and secondary controls; swipe left to return. The
room's phone/desktop switch changes the choice, which is saved on the device.

The creator can enable **Voice declarations** in Bluff settings. A local Vosk
model loads in the waiting room (about 40 MB the first time, then cached).
After Play or a table drop, say one rank in the popup and confirm what it
heard. Cards stay in your hand until confirmation; the turn timer continues.
The recogniser accepts only rank words and aliases, including Ace/one,
Jack/eleven, Queen/twelve, King/thirteen, and plurals. Unknown speech, multiple
ranks, low-confidence results, and ranks forbidden by the rules are rejected.
The popup offers legal-rank buttons when voice is unavailable.

Recognition runs on the device, not a paid speech API. It borrows an existing
local mic track when possible and stops only its own temporary tracks on cancel.
Changing turns, disconnecting, or leaving cancels pending declarations. The
model and patched browser runtime are checked in; see [voice asset notes](VOICE_ASSETS.md).

## Running and checking

Run `npm run test:cards` for game, lobby, privacy, route, simulated UI, and real
WASM/model tests;
run `npm test` for the entire website. The optional socket test needs permission
to listen on localhost and clearly reports when that check is blocked.

For browser QA, use separate browser sessions/devices with unique nicknames.
Check both games, invitations, mobile/tablet layouts, drag and Alt+arrow card
sorting, reconnecting, camera-only/audio-only calls, denied permissions, and
blocked-call behavior. A real two-device test on different networks is needed
to verify camera and microphone connectivity.
DOM tests cover phone view switching and large hand grids, but do not render
pixels. Real phone viewport, autoplay, and permission checks remain necessary.

## Hosting

Keep one Node process/instance for this version: rooms and presence are in
memory, so multiple instances would have separate lobbies. Restarting or
deploying resets rooms. The existing GitHub-to-Azure workflow deploys this page
with the rest of the website; it does not need a new port or hosting project.

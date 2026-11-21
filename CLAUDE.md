# The Friendship Funnel Quiz

Free diagnostic quiz for Melissa's expat friendship business in Bangkok. It tells people where their friendships "leak" in a four-stage funnel and funnels them to a paid playbook and live workshops. Owner: Melissa ("Melly"). Tone: warm, playful, a little cheeky. Audience: adult expats and remote workers in Bangkok.

## Stack
Two pages: `index.html` is the landing page (homepage), `quiz.html` is the quiz. The quiz is a single self-contained file (inline CSS + vanilla JS, no build step, no dependencies). Only external resource is Google Fonts. It was prototyped as a claude.ai artifact; keep it one file unless there is a reason to split.

Run locally: `npm run serve` (or open the HTML files directly). Smoke test (quiz only): `npm install && npx playwright install chromium && npm test`.

## The model
- Funnel stages (index order matters everywhere): 0 Volume, 1 Repeated Exposure, 2 Integration, 3 Deepen.
- 20 questions, 5 per stage, rated 1-5 on a horizontal circle scale (auto-advances on tap). Stage score = 5-25.
- A **goal question** comes first and is not scored. `GSCOPE` maps each goal to the stages that count toward "your leak". Leak = lowest-scoring in-scope stage, ties go to the earlier stage. Goal E ("happy with my social life", `SNAP`) swaps leak language for a "strongest stage" snapshot.
- If the lowest overall stage is out of scope, results show a note saying it matters less for the goal.
- Results: nickname, leak/why/micro-fix cards, trap to avoid, strongest stage, expandable "all four leaks", playbook CTA, share, retake. All four stage scores are always shown.
- Funnel illustration (`funnelSVG`): the result highlights only the focus stage; drips and the "leak?" pill appear only on that stage.

## i18n
`TXT` object keyed `en` / `th` / `zh`, every string including the stage copy and the 20 questions. Keep the three languages in step: any new string needs all three. `lang` is stored in localStorage (try/catch), auto-detected from `navigator.language`, flag dropdown in the top bar. **Thai and Chinese have not been reviewed by native speakers.**

## Design system (from the website mockup)
Navy `#1B2A4A`, bg `#FFF9F4`, tomato `#FF5A3C`, dark red `#C8361B`, peach `#FF8A6E`, blush `#FFB8A6`, cream `#FFE3D8`. Outfit (headings, 800), DM Sans (body), Noto Sans Thai. 2px navy borders, 999px pills, 18-28px radii. Light-only. Mobile-first (max width 520px). Respect `prefers-reduced-motion`. Flags are inline SVG (Windows has no flag emoji).

## Wiring still to do
- `PLAYBOOK_URL` (top of the script) is empty, so the CTA shows an "almost ready" message. Set it to the checkout link.
- No email capture, analytics or backend yet.

## Landing page (`index.html`)
The homepage. Single self-contained file like the quiz, same design tokens, English only for now. Wider layout (max 1080px) than the quiz. Every quiz button links to `quiz.html`. Funnel art is a copy of `funnelSVG` with all four leaks shown; keep the two in step if the art changes. `PLAYBOOK_URL` and `WORKSHOP_URL` at the top of its script are empty, so their buttons show "coming soon" notes. The About section has a placeholder "M" avatar and generic bio for Melissa to replace. Do not add testimonials until there are real ones.

## Conventions
- Brand wordmark: "The Friendship Funnel Quiz". Nicknames render in quotes: You're "The Compartmentalizer" (inner quotes become single).
- Don't add a separate "four steps" list to the start page; the funnel image and one-line caption do that job.
- Don't add a "browse the leaks" link to the start page. Melissa wants people to take the quiz. (`view="leaks"` is only reachable from results.)
- Copy decisions are in `docs/decisions.md`; the full question list is in `docs/questions.md`.

## Open items
- Verify the research claims before citing: "dozens of hours" (Jeffrey Hall's friendship-hours research) and the mere-exposure effect. Written from memory, kept vague on purpose in the free result.
- After about 30-50 takers, check the stage distribution. Integration items may over-flag.
- Native-speaker review of Thai and Chinese.
- Browser tab `<title>` is still "Where's Your Friendship Leak?"; decide whether to match the wordmark.
- Possible later project: a separate TikTok-style archetype quiz.

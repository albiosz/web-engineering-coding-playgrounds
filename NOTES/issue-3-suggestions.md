## Ready-to-paste comment for issue #3 (“Add a new section”)

> Note: I attempted to post this directly as an issue comment, but the GitHub API in this environment returns `403 Resource not accessible by integration` for `addComment`. Copy/paste the text below into issue `#3`.

---

## Code walkthrough (what it currently does)

### Frontend (React + Vite)
- **Entry**: `frontend/src/main.tsx` mounts `<App />` into the `#app` element.
- **Page layout**: `frontend/src/App.tsx` composes the page: `Header`, `Nav`, a `<main>` with one `<article>` (Intro/Table/Habitats/Mating/AboutAuthor/MoreBears) and an `<aside>` (RelatedPages), then `Footer`.
- **Search highlighting**: `frontend/src/components/nav/Nav.tsx`
  - Keeps the search query in React state.
  - On submit: removes previous `.highlight` marks, builds a regex from the query, then **walks the DOM inside every `<article>`** and replaces matching text nodes with `<mark class="highlight">…</mark>`.
- **Comments**: `frontend/src/components/comment-section/CommentSection.tsx`
  - Toggles visibility with a button.
  - Stores comments in component state only (no persistence); validates non-empty inputs; appends a new comment on submit.
- **“More Bears” data**: `frontend/src/components/more-bears/MoreBears.tsx`
  - On mount (`useEffect`), calls `fetchBearData()`.
  - Renders each result via `Bear.tsx` (image + name/binomial + range).
  - `bearDataFetcher.ts` calls `${VITE_API_URL || "http://localhost:8080"}/api/bears`.

### Backend (Spring Boot)
- **API**: `GET /api/bears` in `BearController` delegates to `BearService` → `WikipediaApiClient`.
- **Wikipedia scraping**: `WikipediaApiClient`
  - Calls Wikipedia `action=parse` for page `List_of_ursids` and pulls the **wikitext**.
  - Extracts rows via regex (`name`, `binomial`, `image`, `range`).
  - For each bear row, calls Wikipedia again (`action=query&prop=imageinfo`) to get the **direct image URL**.
  - Falls back to `media/placeholder.svg` if anything fails.
- **CORS**: `WebConfig` reads `cors.allowed.origins` (env `CORS_ALLOWED_ORIGINS`, default `http://localhost:5173`) and allows it for `/api/**`.

---

## Suggestions / improvements (website + code)

### UX / UI
- **Add loading + error states for “More Bears”**: right now a backend failure becomes either an empty list (network error) or an unhandled promise rejection (HTTP non-2xx). Show “Loading…”, “Failed to load”, and a retry button.
- **Responsive layout**: `frontend/style.css` forces `min-width: 1024px`, which breaks mobile. Switch to `max-width` + fluid layout, and add media queries for `<main>` stacking.
- **Consistency**: keep a consistent heading hierarchy (the page mixes `h2`/`h3` across sections).

### Accessibility
- **Comments toggle semantics**: add `aria-expanded` + `aria-controls` to the show/hide button, and consider moving focus into the comment form when opening.
- **Use `<textarea>` for the comment body** (better a11y + UX than a single-line input).
- **Form feedback**: show an inline validation message when name/comment is empty (instead of “silent no-op”).
- **Images**: add `loading="lazy"` and explicit `width/height` (or CSS aspect ratio) to reduce layout shift.

### React / code-quality
- **Avoid direct DOM mutation for search**: the current search walks and rewrites DOM nodes. In React this can fight the virtual DOM and cause hard-to-debug behavior.
  - Prefer a state-driven approach: store the query and render highlighted text in React (or scope highlighting to specific components/strings).
  - If you keep DOM-walking, avoid `innerHTML` and use safe node operations to reduce injection risk.
- **Stable list keys**: comments use `index` as key; use an id/timestamp to avoid incorrect re-rendering when list changes.

### Backend reliability + performance
- **Reduce Wikipedia calls**: current flow is 1 call for wikitext + *N* calls for images.
  - Batch image lookups (one `action=query` request for many file titles) instead of per-bear, or use an API approach that returns thumbnails in fewer requests.
- **Cache results**: add an in-memory cache with TTL (e.g., 1h) for the bear list to avoid hitting Wikipedia on every page load.
- **Error handling**: `fetchWikitext()` returns `""` on failure, which silently becomes an empty list. Prefer throwing a typed exception and returning a structured JSON error.
- **Timeouts/retries**: set HTTP timeouts for Wikipedia calls and consider a small retry policy.

### Small polish
- **OpenAPI contact URL** in `OpenApiConfig` points to `https://github.com/your-repo`; update to the real repo.
- **CORS methods**: only allow what you use (`GET`) to keep it tight.

---

## For this issue (#3): “Even more bears” section
- Implement a new empty section titled **“Even more bears”**.
- If the question is “color of the section”: set the section background to **blue** (ideally as a dedicated CSS class rather than inline styles) and ensure text contrast stays WCAG-compliant.


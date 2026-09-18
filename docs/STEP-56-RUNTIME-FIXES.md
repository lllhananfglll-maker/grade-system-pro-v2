# STEP 56 — Runtime / deploy fixes

## Problems addressed
1. GitHub Pages project deploys broke asset paths when Vite used absolute `base: '/'`.
2. Supabase client sometimes stayed null if `GSP.supabase` was not the CDN global.
3. Attendance composition threw hard errors that could blank the app when a dependency script failed to load.

## Deploy recommendation
- Preferred for GitHub Pages: upload/repo root contents (`index.html`, `js/`, `css/`) without relying solely on a broken empty `dist/`.
- Or run `npm run build` after this fix (with `base: './'`) and publish `dist/`.

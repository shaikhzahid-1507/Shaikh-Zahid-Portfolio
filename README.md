# Shaikh Zahid — Portfolio

A single-page portfolio built around your resume, styled as a "data console" —
SQL-flavored section headers, a typed-query hero, and dashboard-style stat tiles.

## Files
- `index.html` — all content lives here
- `style.css` — design system (colors, type, layout)
- `script.js` — typed query animation, KPI count-up, nav, contact form

## How to use it
1. Unzip the folder.
2. Double-click `index.html` to preview it locally in your browser.
3. To publish it for free, drag the whole folder into
   [Netlify Drop](https://app.netlify.com/drop), or push it to a GitHub repo
   and enable **GitHub Pages** in the repo settings.

## What's already wired in
- Your photo — `profile.jpg`, shown in the About section.
- Your resume — `Shaikh-Zahid-Resume.pdf`, downloadable via the
  "Download resume" button in the hero.
- LinkedIn, GitHub, and Email — live in both the Contact section and the
  footer icons. The Email icon opens your Gmail inbox directly (as
  requested) rather than a mailto link.
- All three project "View project ↗" links — they open the live Streamlit
  apps directly.

Nothing left as a placeholder right now. If you swap any link later,
search `index.html` for the relevant `href` and replace it directly.

## Customizing
- Colors, fonts and spacing are all defined as CSS variables at the top of
  `style.css` under `:root` — change `--accent` for a different highlight
  color, for example.
- Section copy (About, project descriptions) can be edited directly in
  `index.html`.

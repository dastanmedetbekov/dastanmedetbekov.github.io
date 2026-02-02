# AGENTS.md

## Purpose
This file sets the basic rules for writing any content on this site: notes, thoughts, articles, guides, or documentation. The goal is to keep everything simple, readable, and consistent.

## Main Rules
- Use only HTML and CSS. No JavaScript, no frameworks, no dynamic scripts.
- Write in English.
- Structure your content with headings, lists, and code blocks as needed.
- Use semantic HTML tags (header, nav, main, section, article, aside, footer).
- All navigation and layout should be done with HTML and CSS only.
- Use colors and styles from styles.css for all elements.
- Responsive design: make sure your pages look good on desktop and mobile.
- For code or examples, use <pre> and <code> blocks.
- Keep your writing clear and concise.

## Workflow
- For a new page, copy an existing template (like doc-template.html) and update links/content.
- Add new styles only in styles.css.
- Cross-link related pages in the sidebar if needed.

## Restrictions
- No JavaScript, no dynamic forms, no external scripts.
- No inline styles except for quick tweaks.
- No external fonts except those in styles.css.

## News Module
If you write a news post (for example, a new note or update), you should update the main page (index.html) so the news appears in the Latest Posts section.

### How to add a news item:
- Add a new <li> inside the <news> section in index.html.
- Each news item should include:
  - A link to the post
  - The date (in muted style)
  - A short description (1-2 sentences)

#### Example:
```
<li>
  <a href="posts/en/vulkan/started-to-learn.html">Started to Learn Vulkan</a>
  <span class="muted" style="margin-left: 1em;">2026-02-02</span>
  <br>
  <span>Began reading Vulkan documentation. I enjoy working on challenging things because it's interesting.</span>
</li>
```
- Place the newest items at the top of the list.

## Design & Presentation
- Every page and post should not only follow the rules, but also look visually appealing and modern.
- Use headings, spacing, colors, and layout from styles.css to make content easy to read and attractive.
- Avoid leaving pages with only plain text — add structure, style, and visual elements (like sidebar, cards, highlights).
- For new posts (like "Started to Learn Vulkan"), always consider how the page looks: add a header, intro, and use CSS classes for better presentation.
- You can use cards, muted text, colored blocks, or sidebar navigation to make your notes and articles stand out.
- Review and improve the design of each new page, not just the content.

### Example: Better Post Layout
```
<main class="doc-content">
  <header>
    <h1>Started to Learn Vulkan</h1>
    <p class="muted">2026-02-02</p>
  </header>
  <section class="card">
    <p>Began reading Vulkan documentation. I enjoy working on challenging things because it's interesting.</p>
  </section>
</main>
```

## File Path & Linking
- Always check the recursion (folder depth) of your file before adding links to styles.css, index.html, or other pages.
- Use correct relative paths (e.g., ../../styles.css or ../../../index.html) depending on where your file is located.
- This ensures that navigation and styles work from any folder or subfolder.
- When cross-linking pages, always test the links to make sure they work as expected.

---
This file is for your workflow: pure HTML + CSS, no JS, for any kind of content — notes, thoughts, guides, or documentation.

- Always add a "Back to home" link at the end of every page, so you can easily return to the index.
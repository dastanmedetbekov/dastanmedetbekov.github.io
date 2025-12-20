# Posts Directory

This directory contains all blog posts. Each post is an HTML file that uses Markdown for content.

## How to Add a New Post

1. **Create a new HTML file** in this directory (e.g., `my-post.html`)
2. **Copy the template** from `welcome.html` or `markdown-guide.html`
3. **Write your content** inside the `<script type="text/markdown">` tags
4. **Update the homepage** (`../index.html`) to add a link to your new post
5. **Update the post count** in the sidebar navigation

## File Structure

```
posts/
├── welcome.html          # First blog post
├── markdown-guide.html   # Markdown tutorial
├── example-post.md       # Template for new posts
└── README.md            # This file
```

## Markdown Features Supported

All standard Markdown syntax is supported via marked.js:

- Headings (h1-h6)
- Bold, italic, strikethrough
- Lists (ordered and unordered)
- Code blocks with syntax highlighting
- Blockquotes
- Links
- Images
- Tables
- Horizontal rules

## Tips

- Keep filenames lowercase with hyphens (e.g., `my-awesome-post.html`)
- Use descriptive titles for better SEO
- Add relevant tags to help categorize posts
- Include a date in the format `[Month Day, Year]`
- Write in a conversational tone
- Keep posts focused on one main topic

"""Build a small, deterministic post manifest for the static frontend."""

from datetime import date
import json
from pathlib import Path
import re


ROOT = Path(__file__).resolve().parents[1]
POSTS = ROOT / "posts"
OUTPUT = ROOT / "system" / "posts.json"
TEXT_EXTENSIONS = {".md", ".markdown", ".txt", ".html", ".htm"}


def frontmatter(text):
    if not text.startswith("---"):
        return {}, text
    parts = text.split("\n", 1)
    if len(parts) != 2:
        return {}, text
    closing = re.search(r"\n---\s*\n", parts[1])
    if not closing:
        return {}, text
    raw, body = parts[1][: closing.start()], parts[1][closing.end() :]
    values = {}
    for line in raw.splitlines():
        key, separator, value = line.partition(":")
        if separator:
            values[key.strip().lower()] = value.strip().strip("\"'")
    return values, body


def title_from(path, body, metadata):
    if metadata.get("title"):
        return metadata["title"]
    heading = re.search(r"^#\s+(.+?)\s*$", body, re.MULTILINE)
    if heading:
        return heading.group(1).strip("# ")
    html_title = re.search(r"<title[^>]*>\s*(.*?)\s*</title>", body, re.IGNORECASE | re.DOTALL)
    if html_title:
        return re.sub(r"<[^>]+>", "", html_title.group(1)).strip()
    html_heading = re.search(r"<h1[^>]*>\s*(.*?)\s*</h1>", body, re.IGNORECASE | re.DOTALL)
    if html_heading:
        return re.sub(r"<[^>]+>", "", html_heading.group(1)).strip()
    return path.stem.replace("-", " ").replace("_", " ").strip().title()


def post_record(path):
    raw = path.read_text(encoding="utf-8")
    metadata, body = frontmatter(raw)
    html_date = re.search(r'<meta[^>]+(?:name|property)=["\']date["\'][^>]+content=["\']([^"\']+)', body, re.IGNORECASE)
    relative = path.relative_to(ROOT).as_posix()
    language = path.relative_to(POSTS).parts[0]
    modified = date.fromtimestamp(path.stat().st_mtime).isoformat()
    return {
        "path": relative,
        "language": language,
        "slug": path.stem,
        "title": title_from(path, body, metadata),
        "date": metadata.get("date", html_date.group(1) if html_date else modified),
        "section": metadata.get("section", "Notes"),
        "summary": metadata.get("summary", ""),
        "tags": [tag.strip() for tag in metadata.get("tags", "").split(",") if tag.strip()],
        "format": path.suffix.lower().lstrip("."),
    }


def main():
    posts = []
    if POSTS.exists():
        for path in POSTS.rglob("*"):
            if path.is_file() and path.suffix.lower() in TEXT_EXTENSIONS:
                posts.append(post_record(path))
    posts.sort(key=lambda post: (post["date"], post["title"]), reverse=True)
    OUTPUT.write_text(json.dumps(posts, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Built {len(posts)} post(s) into {OUTPUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()

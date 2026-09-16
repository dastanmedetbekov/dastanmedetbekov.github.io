const state = { posts: [], language: "en" };
const list = document.querySelector("#post-list");
const view = document.querySelector("#post-view");
const content = document.querySelector("#post-content");
const selector = document.querySelector("#language-select");
const count = document.querySelector("#post-count");
const empty = document.querySelector("#empty-state");

const languageNames = new Intl.DisplayNames([navigator.language || "en"], { type: "language" });

function languageLabel(code) {
    if (code === "es") return "Esperanto";
    try { return languageNames.of(code) || code.toUpperCase(); }
    catch { return code.toUpperCase(); }
}

function formatDate(value) {
    const parsed = new Date(value);
    if (Number.isNaN(parsed.valueOf())) return value;
    return new Intl.DateTimeFormat(navigator.language || "en", { dateStyle: "medium" }).format(parsed);
}

function renderList() {
    const filtered = state.language === "all"
        ? state.posts
        : state.posts.filter((post) => post.language === state.language);
    list.innerHTML = filtered.map((post) => `
        <a class="post-row" href="?post=${encodeURIComponent(post.path)}">
            <span class="post-title-block">
                <span class="post-title">${escapeHtml(post.title)}</span>
                ${post.summary ? `<span class="post-summary">${escapeHtml(post.summary)}</span>` : ""}
            </span>
            <span class="post-language">${escapeHtml(post.section)} / ${escapeHtml(languageLabel(post.language))}</span>
            <time datetime="${escapeHtml(post.date)}">${escapeHtml(formatDate(post.date))}</time>
        </a>`).join("");
    count.textContent = `${filtered.length} ${filtered.length === 1 ? "note" : "notes"}`;
    empty.hidden = filtered.length !== 0;
}

function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, (character) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
    }[character]));
}

async function openPost(path) {
    const post = state.posts.find((item) => item.path === path);
    if (!post) return;
    const response = await fetch(post.path);
    if (!response.ok) throw new Error("Unable to load this note.");
    const text = await response.text();
    const body = text.replace(/^---[\s\S]*?---\s*\n/, "");
    if (["html", "htm"].includes(post.format)) {
        const documentFragment = new DOMParser().parseFromString(body, "text/html");
        content.innerHTML = documentFragment.body.innerHTML || body;
    } else {
        content.innerHTML = post.format === "txt" ? `<pre>${escapeHtml(body)}</pre>` : marked.parse(body);
    }
    const tags = post.tags?.length ? `<div class="post-tags">${post.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>` : "";
    const titleMarkup = ["html", "htm"].includes(post.format) ? "" : `<h1 class="post-heading">${escapeHtml(post.title)}</h1>`;
    content.insertAdjacentHTML("afterbegin", `<p class="kicker">${escapeHtml(post.section)} / ${escapeHtml(languageLabel(post.language))} / ${escapeHtml(formatDate(post.date))}</p>${titleMarkup}${tags}`);
    list.hidden = true;
    document.querySelector(".intro").hidden = true;
    view.hidden = false;
    document.title = `${post.title} - Notes`;
}

async function load() {
    try {
        const response = await fetch("system/posts.json");
        if (!response.ok) throw new Error("Manifest unavailable");
        state.posts = await response.json();
        const languages = [...new Set(state.posts.map((post) => post.language))].sort();
        selector.innerHTML = `<option value="all">All languages</option>${languages.map((language) => `<option value="${escapeHtml(language)}">${escapeHtml(languageLabel(language))}</option>`).join("")}`;
        if (!languages.includes("en")) state.language = "all";
        selector.value = state.language;
        const requested = new URLSearchParams(location.search).get("post");
        renderList();
        if (requested) await openPost(requested);
    } catch (error) {
        list.innerHTML = `<p class="error">${escapeHtml(error.message)}</p>`;
    }
}

selector.addEventListener("change", (event) => {
    state.language = event.target.value;
    renderList();
});

load();

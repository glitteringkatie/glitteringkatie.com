import { BOOKMARKS } from './data.js';

const PLACEHOLDER_FRONT = "data:image/svg+xml," + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="320" viewBox="0 0 120 320">
  <rect width="120" height="320" fill="#e8e4dd"/>
  <rect x="10" y="10" width="100" height="300" rx="2" fill="none" stroke="#ccc" stroke-width="1" stroke-dasharray="4 3"/>
  <text x="60" y="155" text-anchor="middle" font-family="Georgia, serif" font-size="11" fill="#aaa">front</text>
  <text x="60" y="172" text-anchor="middle" font-family="Georgia, serif" font-size="11" fill="#aaa">image</text>
</svg>`);

const PLACEHOLDER_BACK = "data:image/svg+xml," + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="320" viewBox="0 0 120 320">
  <rect width="120" height="320" fill="#dde4e8"/>
  <rect x="10" y="10" width="100" height="300" rx="2" fill="none" stroke="#bbc" stroke-width="1" stroke-dasharray="4 3"/>
  <text x="60" y="155" text-anchor="middle" font-family="Georgia, serif" font-size="11" fill="#aaa">back</text>
  <text x="60" y="172" text-anchor="middle" font-family="Georgia, serif" font-size="11" fill="#aaa">image</text>
</svg>`);

export function formatVisitDate(d) {
  if (!d) return '';
  if (/^\d{4}$/.test(d)) return d;
  if (/^\d{4}-\d{2}$/.test(d)) {
    const [year, month] = d.split('-');
    const name = new Date(Number(year), Number(month) - 1, 1)
      .toLocaleString('default', { month: 'long' });
    return `${name} ${year}`;
  }
  return d;
}

export function createBookmarkCard(bookmark) {
  const scene = document.createElement("div");
  scene.className = "bookmark-scene";
  scene.id = "card-" + bookmark.id;
  scene.dataset.id = bookmark.id;
  scene.style.setProperty("--color-accent", bookmark.accentColor || "#2c2c2c");
  const rotation = (Math.random() - 0.5) * 14;

  const card = document.createElement("div");
  card.className = "bookmark-card" + (bookmark.backImage != null ? " bookmark-card--flippable" : "");
  card.style.aspectRatio = "3/8";
  card.style.setProperty('--rotation', `${rotation}deg`);

  const front = document.createElement("div");
  front.className = "bookmark-card__face bookmark-card__face--front";
  const frontImg = document.createElement("img");
  frontImg.className = "bookmark-card__image";
  frontImg.alt = "Front of " + bookmark.storeName + " bookmark";
  frontImg.loading = "lazy";
  frontImg.onload = () => {
    card.style.aspectRatio = frontImg.naturalWidth + "/" + frontImg.naturalHeight;
  };
  frontImg.src = bookmark.frontImage || PLACEHOLDER_FRONT;
  front.appendChild(frontImg);
  card.appendChild(front);

  if (bookmark.backImage != null) {
    const back = document.createElement("div");
    back.className = "bookmark-card__face bookmark-card__face--back";
    const backImg = document.createElement("img");
    backImg.className = "bookmark-card__image";
    backImg.src = bookmark.backImage || PLACEHOLDER_BACK;
    backImg.alt = "Back of " + bookmark.storeName + " bookmark";
    backImg.loading = "lazy";
    back.appendChild(backImg);
    card.appendChild(back);
  }

  const caption = document.createElement("div");
  caption.className = "bookmark-caption";

  const nameEl = document.createElement(bookmark.link ? "a" : "span");
  nameEl.className = "bookmark-caption__store";
  nameEl.textContent = bookmark.storeName;
  if (bookmark.link) {
    nameEl.href = bookmark.link;
    nameEl.target = "_blank";
    nameEl.rel = "noopener noreferrer";
  }

  const metaParts = [bookmark.city, formatVisitDate(bookmark.visitDate)].filter(Boolean);
  const metaEl = document.createElement("span");
  metaEl.className = "bookmark-caption__meta";
  metaEl.textContent = metaParts.join(" · ");

  caption.appendChild(nameEl);
  caption.appendChild(metaEl);
  scene.appendChild(caption);
  scene.appendChild(card);

  return scene;
}

export function renderGallery(bookmarks = BOOKMARKS) {
  const grid = document.getElementById("gallery-grid");
  grid.innerHTML = "";
  bookmarks.forEach(bookmark => grid.appendChild(createBookmarkCard(bookmark)));
}

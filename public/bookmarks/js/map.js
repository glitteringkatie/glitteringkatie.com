import { BOOKMARKS } from './data.js';
import { formatVisitDate } from './gallery.js';

let mapInstance = null;
let mapInitialised = false;

export function groupByStore(bookmarks = BOOKMARKS) {
  const storeMap = {};
  bookmarks.forEach(bookmark => {
    const key = bookmark.storeName + "::" + bookmark.city;
    if (!storeMap[key]) {
      storeMap[key] = {
        storeName: bookmark.storeName,
        city: bookmark.city,
        coords: bookmark.coords || null,
        link: bookmark.link || null,
        bookmarks: [],
      };
    }
    storeMap[key].bookmarks.push(bookmark);
  });
  return Object.values(storeMap);
}

export function initMap() {
  if (mapInitialised) return;
  mapInitialised = true;

  mapInstance = L.map("map").setView([39.5, -98.35], 4);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mapInstance);

  const stores = groupByStore();
  stores.forEach(store => { if (store.coords) addStoreMarker(store); });
}

export function showMap() {
  initMap();
  requestAnimationFrame(() => { if (mapInstance) mapInstance.invalidateSize(); });
}

function addStoreMarker(store) {
  const marker = L.marker(store.coords).addTo(mapInstance);
  marker.bindTooltip(store.storeName, { direction: "top", offset: [0, -28] });
  marker.on("click", () => openStoreModal(store));
}

export function openStoreModal(store) {
  const modal = document.getElementById("store-modal");
  modal.querySelector(".store-modal__store-name").textContent = store.storeName;

  const cityEl = modal.querySelector(".store-modal__city");
  cityEl.textContent = store.city;

  const linkEl = modal.querySelector(".store-modal__link");
  if (store.link) {
    linkEl.href = store.link;
    linkEl.textContent = store.link.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
    linkEl.removeAttribute("hidden");
  } else {
    linkEl.setAttribute("hidden", "");
  }

  const container = modal.querySelector(".store-modal__bookmarks");
  container.innerHTML = "";
  store.bookmarks.forEach(bookmark => {
    const entry = document.createElement("div");
    entry.className = "store-modal__entry";

    const images = document.createElement("div");
    images.className = "store-modal__images";

    const makeRotation = () => (Math.random() - 0.5) * 4;

    const makeFigure = (src, alt, label, rotation) => {
      const fig = document.createElement("figure");
      fig.className = "store-modal__figure";
      if (rotation) fig.style.transform = `rotate(${rotation}deg)`;
      const img = document.createElement("img");
      img.src = src;
      img.alt = alt;
      img.className = "store-modal__image";
      fig.appendChild(img);
      if (label) {
        const cap = document.createElement("figcaption");
        cap.className = "store-modal__image-label";
        cap.textContent = label;
        fig.appendChild(cap);
      }
      return fig;
    };

    const hasBoth = !!bookmark.backImage;
    images.appendChild(makeFigure(
      bookmark.frontImage,
      "Front of " + bookmark.storeName + " bookmark",
      hasBoth ? "front" : null,
      hasBoth ? makeRotation() : null
    ));

    if (hasBoth) {
      images.appendChild(makeFigure(
        bookmark.backImage,
        "Back of " + bookmark.storeName + " bookmark",
        "back",
        makeRotation()
      ));
    }

    entry.appendChild(images);

    if (bookmark.notes) {
      const notes = document.createElement("p");
      notes.className = "bookmark-notes";
      notes.textContent = bookmark.notes;
      entry.appendChild(notes);
    }

    container.appendChild(entry);
  });

  modal.removeAttribute("hidden");
  requestAnimationFrame(() => modal.classList.add("store-modal--open"));

  modal.querySelector(".store-modal__backdrop").onclick = closeStoreModal;
  modal.querySelector(".store-modal__close").onclick = closeStoreModal;
}

export function closeStoreModal() {
  const modal = document.getElementById("store-modal");
  modal.classList.remove("store-modal--open");
  modal.addEventListener("transitionend", function handler() {
    modal.setAttribute("hidden", "");
    modal.removeEventListener("transitionend", handler);
  }, { once: true });
}

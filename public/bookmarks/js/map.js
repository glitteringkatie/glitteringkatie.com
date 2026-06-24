import { BOOKMARKS } from './data.js';
import { createBookmarkCard } from './gallery.js';

let mapInstance = null;
let mapInitialised = false;

export function groupByStore(bookmarks = BOOKMARKS) {
  const storeMap = {};
  bookmarks.forEach(bookmark => {
    const key = bookmark.storeName + "::" + (bookmark.address || "");
    if (!storeMap[key]) {
      storeMap[key] = {
        storeName: bookmark.storeName,
        city: bookmark.city,
        address: bookmark.address || null,
        coords: bookmark.coords || null,
        bookmarks: [],
      };
    }
    storeMap[key].bookmarks.push(bookmark);
  });
  return Object.values(storeMap);
}

export async function geocodeAddress(address) {
  const cacheKey = "bm_geocode:" + address;
  const cached = localStorage.getItem(cacheKey);
  if (cached) return JSON.parse(cached);

  const url = "https://nominatim.openstreetmap.org/search?q=" +
    encodeURIComponent(address) + "&format=json&limit=1";

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.length > 0) {
      const coords = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      localStorage.setItem(cacheKey, JSON.stringify(coords));
      return coords;
    }
  } catch (e) {
    console.warn("Geocoding failed for:", address, e);
  }
  return null;
}

async function resolveStoreCoords(stores) {
  let needDelay = false;
  for (const store of stores) {
    if (store.coords || !store.address) continue;
    if (needDelay) await new Promise(r => setTimeout(r, 1100));
    store.coords = await geocodeAddress(store.address);
    needDelay = true;
  }
}

export async function initMap() {
  if (mapInitialised) return;
  mapInitialised = true;

  mapInstance = L.map("map").setView([39.5, -98.35], 4);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mapInstance);

  const stores = groupByStore();
  await resolveStoreCoords(stores);
  stores.forEach(store => { if (store.coords) addStoreMarker(store); });
}

export async function showMap() {
  await initMap();
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
  modal.querySelector(".store-modal__city").textContent = store.city;

  const container = modal.querySelector(".store-modal__bookmarks");
  container.innerHTML = "";
  store.bookmarks.forEach(bookmark => {
    const card = createBookmarkCard(bookmark);
    if (bookmark.notes) {
      const notes = document.createElement("p");
      notes.className = "bookmark-notes";
      notes.textContent = bookmark.notes;
      card.appendChild(notes);
    }
    container.appendChild(card);
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

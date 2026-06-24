import { renderGallery } from './gallery.js';
import { showMap } from './map.js';

const btnGallery  = document.getElementById("btn-gallery");
const btnMap      = document.getElementById("btn-map");
const viewGallery = document.getElementById("view-gallery");
const viewMap     = document.getElementById("view-map");

function switchView(targetView) {
  const isGallery = targetView === "gallery";

  viewGallery.classList.toggle("view--active", isGallery);
  viewMap.classList.toggle("view--active", !isGallery);
  btnGallery.classList.toggle("toggle-btn--active", isGallery);
  btnMap.classList.toggle("toggle-btn--active", !isGallery);
  btnGallery.setAttribute("aria-pressed", String(isGallery));
  btnMap.setAttribute("aria-pressed", String(!isGallery));

  if (!isGallery) showMap();
}

btnGallery.addEventListener("click", () => switchView("gallery"));
btnMap.addEventListener("click",     () => switchView("map"));

function syncHeaderHeight() {
  const h = document.querySelector("header").offsetHeight;
  document.documentElement.style.setProperty("--header-height", h + "px");
}

window.addEventListener("resize", syncHeaderHeight);
renderGallery();
syncHeaderHeight();

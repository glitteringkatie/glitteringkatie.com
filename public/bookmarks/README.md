# Bookmark Collection

A personal website for displaying a physical bookmark collection, with a gallery view and a map of bookstores visited. Lives at `glitteringkatie.com/bookmarks`.

## Running locally

**With the main site (recommended):**

```
cd ~/glitteringkatie.com
npm run dev
```

Then open `http://localhost:3000/bookmarks`.

**Standalone (bookmarks only):**

```
cd ~/glitteringkatie.com/public/bookmarks
python3 -m http.server
```

Then open `http://localhost:8000`. Note: the GK logo in the nav won't load in this mode, but everything else works.

## Adding a new bookmark

Everything lives in `js/data.js`. Add a new object to the `BOOKMARKS` array:

```js
{
  id: "some-unique-id",          // any string, no spaces (e.g. "tattered-cover-001")
  storeName: "Tattered Cover",
  city: "Denver, CO",
  visitDate: "2025-09",          // YYYY-MM, just for your reference
  frontImage: "images/bookmarks/tattered-cover-front.jpg",
  backImage: "images/bookmarks/tattered-cover-back.jpg",  // or null if there's no back
  address: "2526 E Colfax Ave, Denver, CO 80206",
  notes: "Optional note about the bookmark.",
},
```

Drop your photos in `images/bookmarks/`, then refresh the browser. No build step needed. Card height is derived automatically from your image's dimensions.

The first time you open the map view after adding a bookstore, coordinates are looked up automatically from the address and cached in your browser — so the lookup only happens once per address ever.

## Getting coordinates manually

Coordinates are looked up automatically from `address`. If a result is ever wrong, add `coords: [lat, lng]` to that bookmark to override the geocode.

To find coordinates: search the bookstore in Google Maps → right-click the pin → click the coordinates at the top of the context menu to copy.

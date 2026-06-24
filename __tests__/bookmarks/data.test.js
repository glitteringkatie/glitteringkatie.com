import { describe, it, expect } from 'vitest';
import { BOOKMARKS } from '../../public/bookmarks/js/data.js';

describe('BOOKMARKS data', () => {
  it('has at least one bookmark', () => {
    expect(BOOKMARKS.length).toBeGreaterThan(0);
  });

  it('all bookmarks have required fields', () => {
    BOOKMARKS.forEach(bookmark => {
      expect(bookmark.id, `${bookmark.id} missing id`).toBeTruthy();
      expect(bookmark.storeName, `${bookmark.id} missing storeName`).toBeTruthy();
      expect(bookmark.city, `${bookmark.id} missing city`).toBeTruthy();
      expect(bookmark.address, `${bookmark.id} missing address`).toBeTruthy();
    });
  });

  it('all IDs are unique', () => {
    const ids = BOOKMARKS.map(b => b.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('frontImage is null or a non-empty string', () => {
    BOOKMARKS.forEach(bookmark => {
      if (bookmark.frontImage !== null && bookmark.frontImage !== undefined) {
        expect(typeof bookmark.frontImage).toBe('string');
        expect(bookmark.frontImage.length).toBeGreaterThan(0);
      }
    });
  });

  it('backImage is null or a non-empty string', () => {
    BOOKMARKS.forEach(bookmark => {
      if (bookmark.backImage !== null && bookmark.backImage !== undefined) {
        expect(typeof bookmark.backImage).toBe('string');
        expect(bookmark.backImage.length).toBeGreaterThan(0);
      }
    });
  });

  it('coords when provided are valid [lat, lng] pairs', () => {
    BOOKMARKS.forEach(bookmark => {
      if (bookmark.coords) {
        const [lat, lng] = bookmark.coords;
        expect(lat).toBeGreaterThanOrEqual(-90);
        expect(lat).toBeLessThanOrEqual(90);
        expect(lng).toBeGreaterThanOrEqual(-180);
        expect(lng).toBeLessThanOrEqual(180);
      }
    });
  });
});

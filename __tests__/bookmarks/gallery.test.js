import { describe, it, expect } from 'vitest';
import { createBookmarkCard } from '../../public/bookmarks/js/gallery.js';

const stub = (overrides) => ({
  id: 'test-001',
  storeName: "Powell's Books",
  city: 'Portland, OR',
  address: '1005 W Burnside St',
  frontImage: null,
  backImage: null,
  ...overrides,
});

describe('createBookmarkCard', () => {
  it('returns a .bookmark-scene element', () => {
    const el = createBookmarkCard(stub());
    expect(el.classList.contains('bookmark-scene')).toBe(true);
  });

  it('sets id from bookmark id', () => {
    const el = createBookmarkCard(stub({ id: 'strand-001' }));
    expect(el.id).toBe('card-strand-001');
  });

  it('adds --flippable class when backImage is provided', () => {
    const el = createBookmarkCard(stub({ frontImage: 'front.jpg', backImage: 'back.jpg' }));
    expect(el.querySelector('.bookmark-card').classList.contains('bookmark-card--flippable')).toBe(true);
  });

  it('omits --flippable class when backImage is null', () => {
    const el = createBookmarkCard(stub({ backImage: null }));
    expect(el.querySelector('.bookmark-card').classList.contains('bookmark-card--flippable')).toBe(false);
  });

  it('renders both faces when backImage is provided', () => {
    const el = createBookmarkCard(stub({ frontImage: 'front.jpg', backImage: 'back.jpg' }));
    expect(el.querySelectorAll('.bookmark-card__face')).toHaveLength(2);
  });

  it('renders only front face when backImage is null', () => {
    const el = createBookmarkCard(stub());
    expect(el.querySelectorAll('.bookmark-card__face')).toHaveLength(1);
  });

  it('shows store name in caption', () => {
    const el = createBookmarkCard(stub({ storeName: "Powell's Books" }));
    expect(el.querySelector('.bookmark-caption__store').textContent).toBe("Powell's Books");
  });

  it('shows city in caption', () => {
    const el = createBookmarkCard(stub({ city: 'Portland, OR' }));
    expect(el.querySelector('.bookmark-caption__city').textContent).toBe('Portland, OR');
  });

  it('applies accent color as CSS variable', () => {
    const el = createBookmarkCard(stub({ accentColor: '#c0392b' }));
    expect(el.style.getPropertyValue('--color-accent')).toBe('#c0392b');
  });

  it('falls back to default accent color when none provided', () => {
    const el = createBookmarkCard(stub());
    expect(el.style.getPropertyValue('--color-accent')).toBe('#2c2c2c');
  });
});

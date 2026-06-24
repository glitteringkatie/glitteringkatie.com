import { describe, it, expect } from 'vitest';
import { groupByStore } from '../../public/bookmarks/js/map.js';

const stub = (overrides) => ({
  id: 'test-001',
  storeName: 'Test Store',
  city: 'Test City, TS',
  address: '1 Main St',
  frontImage: null,
  backImage: null,
  ...overrides,
});

describe('groupByStore', () => {
  it('returns an empty array for no bookmarks', () => {
    expect(groupByStore([])).toEqual([]);
  });

  it('creates one group per unique store+address', () => {
    const bookmarks = [
      stub({ id: 'a-001', storeName: 'Store A', address: '1 Main St' }),
      stub({ id: 'b-001', storeName: 'Store B', address: '2 Oak Ave' }),
    ];
    expect(groupByStore(bookmarks)).toHaveLength(2);
  });

  it('groups multiple bookmarks from the same store together', () => {
    const bookmarks = [
      stub({ id: 'a-001', storeName: 'Store A', address: '1 Main St' }),
      stub({ id: 'a-002', storeName: 'Store A', address: '1 Main St' }),
      stub({ id: 'b-001', storeName: 'Store B', address: '2 Oak Ave' }),
    ];
    const groups = groupByStore(bookmarks);
    const storeA = groups.find(g => g.storeName === 'Store A');
    expect(storeA.bookmarks).toHaveLength(2);
  });

  it('treats same name at different addresses as different stores', () => {
    const bookmarks = [
      stub({ id: 'a-nyc', storeName: 'Store A', city: 'New York, NY', address: '1 Main St, New York' }),
      stub({ id: 'a-la',  storeName: 'Store A', city: 'Los Angeles, CA', address: '1 Main St, Los Angeles' }),
    ];
    expect(groupByStore(bookmarks)).toHaveLength(2);
  });

  it('each group has the expected shape', () => {
    const bookmarks = [stub()];
    const [group] = groupByStore(bookmarks);
    expect(group).toHaveProperty('storeName');
    expect(group).toHaveProperty('city');
    expect(group).toHaveProperty('address');
    expect(group).toHaveProperty('coords');
    expect(group).toHaveProperty('bookmarks');
    expect(Array.isArray(group.bookmarks)).toBe(true);
  });

  it('preserves explicit coords from the first bookmark in the group', () => {
    const bookmarks = [stub({ coords: [40.7, -74.0] })];
    const [group] = groupByStore(bookmarks);
    expect(group.coords).toEqual([40.7, -74.0]);
  });

  it('sets coords to null when no bookmark has coords', () => {
    const [group] = groupByStore([stub()]);
    expect(group.coords).toBeNull();
  });
});

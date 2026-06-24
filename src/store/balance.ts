import { atom } from 'nanostores';

export type Balance = 'work' | 'balance' | 'life';
export const balanceStore = atom<Balance>('balance');

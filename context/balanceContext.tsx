import { createContext } from 'react';

export const WORK = '1';
export const BALANCE = '2';
export const LIFE = '3';
export type BalanceCategory = typeof WORK | typeof BALANCE | typeof LIFE;

export const BalanceContext = createContext<BalanceCategory>(BALANCE);

export const balanceToString = (balance: BalanceCategory) => {
  if (balance === WORK) {
    return 'work';
  }

  if (balance === LIFE) {
    return 'life';
  }

  return 'balance';
};

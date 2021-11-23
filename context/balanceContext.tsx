import { createContext } from 'react';

export const WORK = "1";
export const BALANCE = "2";
export const LIFE = "3";
export type BalanceCategory = typeof WORK | typeof BALANCE | typeof LIFE;


// interface BalanceContextShape {
//     balanceValue: BalanceCategory;
//     setBalanceValue: React.Dispatch<
//         React.SetStateAction<BalanceCategory>
//     >;
// }

export const BalanceContext = createContext<BalanceCategory>(BALANCE);
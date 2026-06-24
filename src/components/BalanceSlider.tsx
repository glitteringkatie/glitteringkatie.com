import { useStore } from '@nanostores/react';
import { balanceStore, type Balance } from '../store/balance';

const numToBalance = (n: number): Balance => {
  if (n <= 1) return 'work';
  if (n >= 3) return 'life';
  return 'balance';
};

const balanceToNum = (b: Balance): number => {
  if (b === 'work') return 1;
  if (b === 'life') return 3;
  return 2;
};

const backgroundSize: Record<Balance, string> = {
  work: '0% 100%',
  balance: '50% 100%',
  life: '100% 100%',
};

export default function BalanceSlider() {
  const balance = useStore(balanceStore);

  return (
    <div className="flex items-center justify-center">
      <span className="text-warmBlack text-2xl sm:text-4xl font-serif italic">work</span>
      <input
        aria-label="Work/life balance slider"
        type="range"
        min={1}
        max={3}
        value={balanceToNum(balance)}
        style={{ backgroundSize: backgroundSize[balance] }}
        onChange={e => balanceStore.set(numToBalance(Number(e.target.value)))}
      />
      <span className="text-warmBlack text-2xl sm:text-4xl font-serif italic">life</span>
    </div>
  );
}

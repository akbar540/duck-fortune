export type DuckType = 'normal' | 'big' | 'gold';

export interface DuckInfo {
  type: DuckType;
  name: string;
  emoji: string;
  price: number;
  dailyIncome: number;
  color: 'success' | 'info' | 'gold';
}

export interface Ducks {
  normal: number;
  big: number;
  gold: number;
}

export interface HistoryEntry {
  id: string;
  message: string;
  timestamp: Date;
  type: 'purchase' | 'income' | 'topup' | 'withdraw';
}

export interface User {
  username: string;
  balance: number;
  ducks: Ducks;
  history: HistoryEntry[];
}

export const DUCK_INFO: Record<DuckType, DuckInfo> = {
  normal: {
    type: 'normal',
    name: 'Normal ördək',
    emoji: '🦆',
    price: 5,
    dailyIncome: 2,
    color: 'success',
  },
  big: {
    type: 'big',
    name: 'Böyük ördək',
    emoji: '🦆',
    price: 20,
    dailyIncome: 3,
    color: 'info',
  },
  gold: {
    type: 'gold',
    name: 'Qızıl ördək',
    emoji: '🦆',
    price: 50,
    dailyIncome: 5,
    color: 'gold',
  },
};

export const BANKS = [
  'Kapital Bank',
  'Leo Bank',
  'Uni Bank',
  'Bank Of Baku',
  'ATB Bank',
] as const;

export type Bank = typeof BANKS[number];

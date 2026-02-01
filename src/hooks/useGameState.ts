import { useState, useEffect, useCallback } from 'react';
import { User, Ducks, HistoryEntry, DuckType, DUCK_INFO, Bank } from '@/types/game';

const STORAGE_KEYS = {
  USERS: 'duckIncome_users',
  CURRENT_USER: 'duckIncome_currentUser',
};

const createEmptyDucks = (): Ducks => ({ normal: 0, big: 0, gold: 0 });

const generateId = () => Math.random().toString(36).substr(2, 9);

export function useGameState() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (savedUser) {
      setCurrentUser(savedUser);
      loadUser(savedUser);
    }
    setIsLoading(false);
  }, []);

  const loadUser = (username: string) => {
    const usersJson = localStorage.getItem(STORAGE_KEYS.USERS);
    const users: Record<string, User> = usersJson ? JSON.parse(usersJson) : {};
    if (users[username]) {
      setUser(users[username]);
    }
  };

  const saveUser = useCallback((updatedUser: User) => {
    const usersJson = localStorage.getItem(STORAGE_KEYS.USERS);
    const users: Record<string, User> = usersJson ? JSON.parse(usersJson) : {};
    users[updatedUser.username] = updatedUser;
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    setUser(updatedUser);
  }, []);

  const login = (username: string, password: string): boolean => {
    const usersJson = localStorage.getItem(STORAGE_KEYS.USERS);
    const users: Record<string, User> = usersJson ? JSON.parse(usersJson) : {};
    
    if (users[username]) {
      setCurrentUser(username);
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, username);
      setUser(users[username]);
      return true;
    }
    return false;
  };

  const register = (username: string, password: string): boolean => {
    const usersJson = localStorage.getItem(STORAGE_KEYS.USERS);
    const users: Record<string, User> = usersJson ? JSON.parse(usersJson) : {};
    
    if (users[username]) {
      return false; // User already exists
    }

    const newUser: User = {
      username,
      balance: 0,
      ducks: createEmptyDucks(),
      history: [],
    };

    users[username] = newUser;
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, username);
    setCurrentUser(username);
    setUser(newUser);
    return true;
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    setCurrentUser(null);
    setUser(null);
  };

  const addHistoryEntry = useCallback((message: string, type: HistoryEntry['type']) => {
    if (!user) return;
    
    const entry: HistoryEntry = {
      id: generateId(),
      message,
      timestamp: new Date(),
      type,
    };

    const updatedUser = {
      ...user,
      history: [entry, ...user.history],
    };
    saveUser(updatedUser);
  }, [user, saveUser]);

  const buyDuck = useCallback((type: DuckType): boolean => {
    if (!user) return false;
    
    const duckInfo = DUCK_INFO[type];
    if (user.balance < duckInfo.price) return false;

    const updatedUser = {
      ...user,
      balance: user.balance - duckInfo.price,
      ducks: {
        ...user.ducks,
        [type]: user.ducks[type] + 1,
      },
      history: [
        {
          id: generateId(),
          message: `${duckInfo.name} alındı -${duckInfo.price} AZN`,
          timestamp: new Date(),
          type: 'purchase' as const,
        },
        ...user.history,
      ],
    };

    saveUser(updatedUser);
    return true;
  }, [user, saveUser]);

  const collectIncome = useCallback((): number => {
    if (!user) return 0;
    
    const income = 
      user.ducks.normal * DUCK_INFO.normal.dailyIncome +
      user.ducks.big * DUCK_INFO.big.dailyIncome +
      user.ducks.gold * DUCK_INFO.gold.dailyIncome;

    if (income === 0) return 0;

    const updatedUser = {
      ...user,
      balance: user.balance + income,
      history: [
        {
          id: generateId(),
          message: `Gəlir +${income} AZN`,
          timestamp: new Date(),
          type: 'income' as const,
        },
        ...user.history,
      ],
    };

    saveUser(updatedUser);
    return income;
  }, [user, saveUser]);

  const topUp = useCallback((amount: number, bank: Bank): boolean => {
    if (!user || amount <= 0) return false;

    const updatedUser = {
      ...user,
      balance: user.balance + amount,
      history: [
        {
          id: generateId(),
          message: `Balans +${amount} AZN (${bank})`,
          timestamp: new Date(),
          type: 'topup' as const,
        },
        ...user.history,
      ],
    };

    saveUser(updatedUser);
    return true;
  }, [user, saveUser]);

  const withdraw = useCallback((amount: number, bank: Bank): { success: boolean; error?: string } => {
    if (!user) return { success: false, error: 'İstifadəçi tapılmadı' };
    if (amount < 50) return { success: false, error: 'Minimum 50 AZN' };
    if (amount > user.balance) return { success: false, error: 'Kifayət qədər balans yoxdur' };

    const updatedUser = {
      ...user,
      balance: user.balance - amount,
      history: [
        {
          id: generateId(),
          message: `Pul çıxar -${amount} AZN (${bank})`,
          timestamp: new Date(),
          type: 'withdraw' as const,
        },
        ...user.history,
      ],
    };

    saveUser(updatedUser);
    return { success: true };
  }, [user, saveUser]);

  const clearHistory = useCallback(() => {
    if (!user) return;
    saveUser({ ...user, history: [] });
  }, [user, saveUser]);

  const getDailyIncome = () => {
    if (!user) return 0;
    return (
      user.ducks.normal * DUCK_INFO.normal.dailyIncome +
      user.ducks.big * DUCK_INFO.big.dailyIncome +
      user.ducks.gold * DUCK_INFO.gold.dailyIncome
    );
  };

  return {
    user,
    isLoading,
    isLoggedIn: !!currentUser,
    login,
    register,
    logout,
    buyDuck,
    collectIncome,
    topUp,
    withdraw,
    clearHistory,
    getDailyIncome,
  };
}

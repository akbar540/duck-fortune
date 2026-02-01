import { useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { Header } from '@/components/game/Header';
import { BottomNav, TabType } from '@/components/game/BottomNav';
import { LoginScreen } from '@/components/game/screens/LoginScreen';
import { MenuScreen } from '@/components/game/screens/MenuScreen';
import { StatsScreen } from '@/components/game/screens/StatsScreen';
import { HistoryScreen } from '@/components/game/screens/HistoryScreen';
import { ProfileScreen } from '@/components/game/screens/ProfileScreen';
import { toast } from 'sonner';

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>('menu');
  const {
    user,
    isLoading,
    isLoggedIn,
    login,
    register,
    logout,
    buyDuck,
    collectIncome,
    topUp,
    withdraw,
    clearHistory,
  } = useGameState();

  const handleBuyDuck = (type: 'normal' | 'big' | 'gold') => {
    const success = buyDuck(type);
    if (success) {
      toast.success('Ördək alındı! 🦆');
    } else {
      toast.error('Kifayət qədər balans yoxdur');
    }
    return success;
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-bounce text-6xl">🦆</div>
      </div>
    );
  }

  if (!isLoggedIn || !user) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col bg-background">
        <Header balance={0} />
        <LoginScreen onLogin={login} onRegister={register} />
      </div>
    );
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'menu':
        return (
          <MenuScreen
            balance={user.balance}
            ducks={user.ducks}
            onBuyDuck={handleBuyDuck}
          />
        );
      case 'stats':
        return (
          <StatsScreen
            ducks={user.ducks}
            onCollectIncome={collectIncome}
          />
        );
      case 'history':
        return (
          <HistoryScreen
            history={user.history}
            onClearHistory={clearHistory}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            user={user}
            onTopUp={topUp}
            onWithdraw={withdraw}
            onLogout={logout}
          />
        );
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-background">
      <Header balance={user.balance} />
      <main className="flex flex-1 flex-col overflow-hidden">
        {renderScreen()}
      </main>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;

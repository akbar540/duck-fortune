import { useEffect, useState } from 'react';

interface HeaderProps {
  balance: number;
}

export function Header({ balance }: HeaderProps) {
  const [displayBalance, setDisplayBalance] = useState(balance);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (balance === displayBalance) return;

    setIsAnimating(true);
    const diff = balance - displayBalance;
    const steps = 30;
    const increment = diff / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayBalance(balance);
        setIsAnimating(false);
        clearInterval(interval);
      } else {
        setDisplayBalance(prev => prev + increment);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [balance]);

  return (
    <header className="gradient-header px-4 py-4 text-center shadow-lg">
      <div className="flex items-center justify-center gap-2">
        <span className="text-3xl animate-bounce-subtle">🦆</span>
        <h1 className="text-xl font-bold text-primary-foreground">Duck Income</h1>
      </div>
      <div className={`mt-2 text-lg font-semibold text-primary-foreground/90 ${isAnimating ? 'animate-count' : ''}`}>
        Balans: {displayBalance.toFixed(2)} AZN
      </div>
    </header>
  );
}

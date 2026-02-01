import { Button } from '@/components/ui/button';
import { Ducks, DUCK_INFO } from '@/types/game';
import { TrendingUp, Calendar, Coins } from 'lucide-react';
import { toast } from 'sonner';

interface StatsScreenProps {
  ducks: Ducks;
  onCollectIncome: () => number;
}

export function StatsScreen({ ducks, onCollectIncome }: StatsScreenProps) {
  const dailyIncome =
    ducks.normal * DUCK_INFO.normal.dailyIncome +
    ducks.big * DUCK_INFO.big.dailyIncome +
    ducks.gold * DUCK_INFO.gold.dailyIncome;

  const monthlyIncome = dailyIncome * 30;

  const handleCollect = () => {
    const income = onCollectIncome();
    if (income > 0) {
      toast.success(`+${income} AZN gəlir yığıldı!`);
    } else {
      toast.error('Gəlir yoxdur. Əvvəlcə ördək alın!');
    }
  };

  const totalDucks = ducks.normal + ducks.big + ducks.gold;

  return (
    <div className="flex-1 p-4 space-y-4">
      <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
        <span>📊</span> Statistikalar
      </h2>

      <div className="grid gap-4">
        <div className="animate-fade-in rounded-xl bg-card p-5 shadow-card">
          <div className="flex items-center gap-3 text-muted-foreground mb-2">
            <TrendingUp size={20} />
            <span className="text-sm font-medium">Günlük gəlir</span>
          </div>
          <p className="text-3xl font-bold text-success">{dailyIncome} AZN</p>
        </div>

        <div className="animate-fade-in rounded-xl bg-card p-5 shadow-card" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-3 text-muted-foreground mb-2">
            <Calendar size={20} />
            <span className="text-sm font-medium">30 günlük gəlir</span>
          </div>
          <p className="text-3xl font-bold text-info">{monthlyIncome} AZN</p>
        </div>

        <div className="animate-fade-in rounded-xl bg-card p-5 shadow-card" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-3 text-muted-foreground mb-2">
            <Coins size={20} />
            <span className="text-sm font-medium">Sahib olduğun ördəklər</span>
          </div>
          <div className="flex gap-4 mt-2">
            <div className="text-center">
              <p className="text-2xl">🦆</p>
              <p className="text-sm text-muted-foreground">Normal</p>
              <p className="font-bold">{ducks.normal}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl">🦆</p>
              <p className="text-sm text-muted-foreground">Böyük</p>
              <p className="font-bold">{ducks.big}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl">🦆</p>
              <p className="text-sm text-muted-foreground">Qızıl</p>
              <p className="font-bold">{ducks.gold}</p>
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={handleCollect}
        disabled={dailyIncome === 0}
        className="w-full h-14 rounded-xl gradient-header text-primary-foreground font-bold text-lg shadow-button hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        <Coins className="mr-2" />
        Bütün gəlirləri yığ
      </Button>
    </div>
  );
}

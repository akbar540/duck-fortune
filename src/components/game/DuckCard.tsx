import { DuckInfo } from '@/types/game';
import { Button } from '@/components/ui/button';

interface DuckCardProps {
  duck: DuckInfo;
  owned: number;
  onBuy: () => void;
  disabled: boolean;
}

export function DuckCard({ duck, owned, onBuy, disabled }: DuckCardProps) {
  const colorClasses = {
    success: 'bg-success hover:bg-success/90 text-success-foreground',
    info: 'bg-info hover:bg-info/90 text-info-foreground',
    gold: 'gradient-gold hover:opacity-90 text-primary-foreground',
  };

  const borderClasses = {
    success: 'border-success/30',
    info: 'border-info/30',
    gold: 'border-primary/30',
  };

  return (
    <div className={`animate-fade-in rounded-xl border-2 ${borderClasses[duck.color]} bg-card p-4 shadow-card`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{duck.emoji}</span>
          <div>
            <h3 className="font-bold text-card-foreground">{duck.name}</h3>
            <p className="text-sm text-muted-foreground">Qiymət: {duck.price} AZN</p>
            <p className="text-sm text-success font-medium">+{duck.dailyIncome} AZN / gün</p>
          </div>
        </div>
        {owned > 0 && (
          <span className="rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground">
            {owned}x
          </span>
        )}
      </div>
      <Button
        onClick={onBuy}
        disabled={disabled}
        className={`mt-4 w-full ${colorClasses[duck.color]} shadow-button transition-all hover:scale-[1.02] active:scale-[0.98]`}
      >
        Al
      </Button>
    </div>
  );
}

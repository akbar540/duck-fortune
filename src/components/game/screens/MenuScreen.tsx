import { DuckCard } from '@/components/game/DuckCard';
import { DuckType, DUCK_INFO, Ducks } from '@/types/game';

interface MenuScreenProps {
  balance: number;
  ducks: Ducks;
  onBuyDuck: (type: DuckType) => boolean;
}

export function MenuScreen({ balance, ducks, onBuyDuck }: MenuScreenProps) {
  const duckTypes: DuckType[] = ['normal', 'big', 'gold'];

  const handleBuy = (type: DuckType) => {
    onBuyDuck(type);
  };

  return (
    <div className="flex-1 space-y-4 overflow-y-auto p-4">
      <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
        <span>🏪</span> Ördək Mağazası
      </h2>
      {duckTypes.map((type, index) => (
        <div key={type} style={{ animationDelay: `${index * 100}ms` }}>
          <DuckCard
            duck={DUCK_INFO[type]}
            owned={ducks[type]}
            onBuy={() => handleBuy(type)}
            disabled={balance < DUCK_INFO[type].price}
          />
        </div>
      ))}
    </div>
  );
}

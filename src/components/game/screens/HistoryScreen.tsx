import { Button } from '@/components/ui/button';
import { HistoryEntry } from '@/types/game';
import { Trash2, ShoppingCart, Coins, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { toast } from 'sonner';

interface HistoryScreenProps {
  history: HistoryEntry[];
  onClearHistory: () => void;
}

const typeIcons = {
  purchase: <ShoppingCart size={16} className="text-info" />,
  income: <Coins size={16} className="text-success" />,
  topup: <ArrowUpCircle size={16} className="text-secondary" />,
  withdraw: <ArrowDownCircle size={16} className="text-withdraw" />,
};

export function HistoryScreen({ history, onClearHistory }: HistoryScreenProps) {
  const handleClear = () => {
    onClearHistory();
    toast.success('Tarixçə silindi');
  };

  return (
    <div className="flex flex-1 flex-col p-4">
      <h2 className="text-lg font-bold text-foreground flex items-center gap-2 mb-4">
        <span>🧾</span> Tarixçə
      </h2>

      <div className="flex-1 overflow-y-auto">
        {history.length === 0 ? (
          <div className="animate-fade-in rounded-xl bg-card p-8 text-center shadow-card">
            <span className="text-4xl">📭</span>
            <p className="mt-3 text-muted-foreground">Tarixçə boşdur</p>
          </div>
        ) : (
          <div className="space-y-2">
            {history.map((entry, index) => (
              <div
                key={entry.id}
                className="animate-fade-in flex items-center gap-3 rounded-xl bg-card p-4 shadow-card"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                  {typeIcons[entry.type]}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-card-foreground">{entry.message}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(entry.timestamp).toLocaleString('az-AZ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {history.length > 0 && (
        <Button
          onClick={handleClear}
          variant="destructive"
          className="mt-4 w-full rounded-xl"
        >
          <Trash2 className="mr-2" size={18} />
          Bütün tarixçəni sil
        </Button>
      )}
    </div>
  );
}

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { User, Bank, BANKS } from '@/types/game';
import { LogOut, CreditCard, Wallet, MessageCircle, Send } from 'lucide-react';
import { TopUpModal } from '@/components/game/modals/TopUpModal';
import { WithdrawModal } from '@/components/game/modals/WithdrawModal';

interface ProfileScreenProps {
  user: User;
  onTopUp: (amount: number, bank: Bank) => boolean;
  onWithdraw: (amount: number, bank: Bank) => { success: boolean; error?: string };
  onLogout: () => void;
}

export function ProfileScreen({ user, onTopUp, onWithdraw, onLogout }: ProfileScreenProps) {
  const [showTopUp, setShowTopUp] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);

  const handleShareTelegram = () => {
    window.open('https://t.me/unhappyphost', '_blank');
  };

  const handleShareWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send?text=Duck Income oyununda balansım: ${user.balance.toFixed(2)} AZN 🦆`,
      '_blank'
    );
  };

  const handleHelp = () => {
    window.open('https://t.me/unhappyphost', '_blank');
  };

  return (
    <div className="flex-1 p-4 space-y-4">
      <div className="animate-fade-in rounded-2xl bg-card p-6 shadow-card text-center">
        <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-4xl">
          👤
        </div>
        <h3 className="text-xl font-bold text-card-foreground">{user.username}</h3>
        <p className="mt-2 text-2xl font-bold text-secondary">{user.balance.toFixed(2)} AZN</p>
      </div>

      <div className="animate-fade-in grid grid-cols-2 gap-3" style={{ animationDelay: '100ms' }}>
        <Button
          onClick={() => setShowTopUp(true)}
          className="h-14 rounded-xl gradient-header text-primary-foreground font-semibold shadow-button"
        >
          <CreditCard className="mr-2" size={18} />
          Artır
        </Button>
        <Button
          onClick={() => setShowWithdraw(true)}
          className="h-14 rounded-xl bg-withdraw hover:bg-withdraw/90 text-withdraw-foreground font-semibold"
        >
          <Wallet className="mr-2" size={18} />
          Çıxar
        </Button>
      </div>

      <div className="animate-fade-in rounded-xl bg-card p-4 shadow-card" style={{ animationDelay: '200ms' }}>
        <p className="text-sm font-medium text-muted-foreground mb-3">Paylaş</p>
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={handleShareTelegram}
            variant="outline"
            className="h-11 rounded-xl border-2"
          >
            <Send className="mr-2" size={16} />
            Telegram
          </Button>
          <Button
            onClick={handleShareWhatsApp}
            variant="outline"
            className="h-11 rounded-xl border-2"
          >
            <MessageCircle className="mr-2" size={16} />
            WhatsApp
          </Button>
        </div>
      </div>

      <Button
        onClick={handleHelp}
        className="w-full h-12 rounded-xl gradient-info text-info-foreground font-semibold"
        style={{ animationDelay: '300ms' }}
      >
        <MessageCircle className="mr-2" size={18} />
        Yardım üçün Telegram
      </Button>

      <Button
        onClick={onLogout}
        variant="outline"
        className="w-full h-12 rounded-xl border-2 border-destructive/30 text-destructive hover:bg-destructive/10"
      >
        <LogOut className="mr-2" size={18} />
        Çıxış
      </Button>

      <TopUpModal
        open={showTopUp}
        onClose={() => setShowTopUp(false)}
        onConfirm={onTopUp}
      />

      <WithdrawModal
        open={showWithdraw}
        onClose={() => setShowWithdraw(false)}
        onConfirm={onWithdraw}
        balance={user.balance}
      />
    </div>
  );
}

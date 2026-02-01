import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bank, BANKS } from '@/types/game';
import { toast } from 'sonner';

interface WithdrawModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (amount: number, bank: Bank) => { success: boolean; error?: string };
  balance: number;
}

export function WithdrawModal({ open, onClose, onConfirm, balance }: WithdrawModalProps) {
  const [amount, setAmount] = useState('');
  const [bank, setBank] = useState<Bank>(BANKS[0]);

  const handleConfirm = () => {
    const value = parseFloat(amount);
    if (!value || value <= 0) {
      toast.error('Düzgün məbləğ daxil edin');
      return;
    }
    const result = onConfirm(value, bank);
    if (result.success) {
      toast.success(`${value} AZN çıxarıldı`);
      setAmount('');
      onClose();
    } else {
      toast.error(result.error || 'Xəta baş verdi');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm rounded-2xl border-0 shadow-modal">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">💸 Pul çıxar</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="rounded-xl bg-muted p-3 text-center">
            <p className="text-sm text-muted-foreground">Mövcud balans</p>
            <p className="text-xl font-bold text-foreground">{balance.toFixed(2)} AZN</p>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Məbləğ (AZN)</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Minimum 50 AZN"
              className="mt-2 h-12 rounded-xl text-lg"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Bank seç</label>
            <Select value={bank} onValueChange={(v) => setBank(v as Bank)}>
              <SelectTrigger className="mt-2 h-12 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {BANKS.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 h-12 rounded-xl"
            >
              Ləğv et
            </Button>
            <Button
              onClick={handleConfirm}
              className="flex-1 h-12 rounded-xl bg-withdraw hover:bg-withdraw/90 text-withdraw-foreground font-semibold"
            >
              Çıxar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bank, BANKS } from '@/types/game';
import { toast } from 'sonner';

interface TopUpModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (amount: number, bank: Bank) => boolean;
}

export function TopUpModal({ open, onClose, onConfirm }: TopUpModalProps) {
  const [amount, setAmount] = useState('');
  const [bank, setBank] = useState<Bank>(BANKS[0]);

  const handleConfirm = () => {
    const value = parseFloat(amount);
    if (!value || value <= 0) {
      toast.error('Düzgün məbləğ daxil edin');
      return;
    }
    if (onConfirm(value, bank)) {
      toast.success(`+${value} AZN balansa əlavə edildi`);
      setAmount('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm rounded-2xl border-0 shadow-modal">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">💳 Balansı artır</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
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

          <div>
            <label className="text-sm font-medium text-muted-foreground">Məbləğ (AZN)</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="mt-2 h-12 rounded-xl text-lg"
            />
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
              className="flex-1 h-12 rounded-xl gradient-header text-primary-foreground font-semibold"
            >
              Təsdiqlə
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

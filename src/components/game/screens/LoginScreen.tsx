import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface LoginScreenProps {
  onLogin: (username: string, password: string) => boolean;
  onRegister: (username: string, password: string) => boolean;
}

export function LoginScreen({ onLogin, onRegister }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      toast.error('Bütün sahələri doldurun');
      return;
    }
    if (!onLogin(username, password)) {
      toast.error('İstifadəçi tapılmadı. Əvvəlcə qeydiyyatdan keçin.');
    }
  };

  const handleRegister = () => {
    if (!username || !password) {
      toast.error('Bütün sahələri doldurun');
      return;
    }
    if (password.length < 3) {
      toast.error('Şifrə ən az 3 simvol olmalıdır');
      return;
    }
    if (onRegister(username, password)) {
      toast.success('Qeydiyyat uğurla tamamlandı!');
    } else {
      toast.error('Bu istifadəçi adı artıq mövcuddur');
    }
  };

  const handleForgotPassword = () => {
    toast.info('Şifrəni bərpa etmək üçün dəstəklə əlaqə saxlayın');
  };

  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <div className="w-full max-w-sm animate-fade-in rounded-2xl bg-card p-6 shadow-card">
        <div className="mb-6 text-center">
          <span className="text-5xl">🔐</span>
          <h2 className="mt-2 text-xl font-bold text-card-foreground">Giriş / Qeydiyyat</h2>
        </div>

        <div className="space-y-4">
          <Input
            placeholder="İstifadəçi adı"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="h-12 rounded-xl border-input bg-muted/50"
          />
          <Input
            type="password"
            placeholder="Şifrə"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 rounded-xl border-input bg-muted/50"
          />

          <Button
            onClick={handleLogin}
            className="h-12 w-full rounded-xl gradient-header text-primary-foreground font-semibold shadow-button hover:opacity-90"
          >
            Daxil ol
          </Button>

          <Button
            onClick={handleRegister}
            variant="outline"
            className="h-12 w-full rounded-xl border-2 border-primary/30 font-semibold hover:bg-primary/10"
          >
            Qeydiyyat
          </Button>

          <button
            onClick={handleForgotPassword}
            className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Şifrəni unutdun?
          </button>
        </div>
      </div>
    </div>
  );
}

import { Store, BarChart3, History, User } from 'lucide-react';

export type TabType = 'menu' | 'stats' | 'history' | 'profile';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
  { id: 'menu', label: 'Menyu', icon: <Store size={20} /> },
  { id: 'stats', label: 'Statistika', icon: <BarChart3 size={20} /> },
  { id: 'history', label: 'Tarixçə', icon: <History size={20} /> },
  { id: 'profile', label: 'Profil', icon: <User size={20} /> },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="flex border-t border-border bg-card">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex flex-1 flex-col items-center gap-1 py-3 text-xs font-medium transition-colors ${
            activeTab === tab.id
              ? 'text-secondary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}

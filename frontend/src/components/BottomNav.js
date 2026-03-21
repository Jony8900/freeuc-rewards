import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Home, Gift, Coins, User, Users, Shield, Globe } from 'lucide-react';

export function BottomNav() {
  const { t, toggleLanguage, language } = useLanguage();
  const { isAdmin } = useAuth();

  const navItems = [
    { path: '/', icon: Home, label: t('home') },
    { path: '/redeem', icon: Coins, label: t('redeem') },
    { path: '/referrals', icon: Users, label: t('referrals') },
    { path: '/profile', icon: User, label: t('profile') },
  ];

  if (isAdmin) {
    navItems.push({ path: '/admin', icon: Shield, label: t('admin') });
  }

  return (
    <nav className="fixed bottom-0 start-0 end-0 glass border-t border-white/10 safe-area-bottom z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            data-testid={`nav-${item.path.replace('/', '') || 'home'}`}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-2 transition-colors ${
                isActive ? 'text-[#F39C12]' : 'text-[#8A8A93] hover:text-white'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span className="text-[10px] uppercase tracking-[0.1em]">{item.label}</span>
          </NavLink>
        ))}
        <button
          onClick={toggleLanguage}
          data-testid="language-toggle"
          className="flex flex-col items-center gap-1 px-3 py-2 text-[#8A8A93] hover:text-white transition-colors"
        >
          <Globe className="w-5 h-5" />
          <span className="text-[10px] uppercase tracking-[0.1em]">{language === 'ar' ? 'EN' : 'AR'}</span>
        </button>
      </div>
    </nav>
  );
}

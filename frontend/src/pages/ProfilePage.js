import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { User, Gamepad2, Calendar, LogOut, Coins, TrendingUp, Gift, Shield } from 'lucide-react';

export function ProfilePage() {
  const { t } = useLanguage();
  const { user, logout, isAdmin } = useAuth();

  const stats = [
    { icon: Coins, label: t('points'), value: user?.points || 0, color: 'text-[#F39C12]' },
    { icon: TrendingUp, label: t('totalEarned'), value: user?.total_earned || 0, color: 'text-green-500' },
    { icon: Gift, label: t('totalRedeemed'), value: user?.total_redeemed || 0, color: 'text-blue-500' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0C] pb-24 noise-bg">
      <div className="relative z-10 p-4">
        {/* Header */}
        <h1 className="font-display text-2xl text-white mb-6 flex items-center gap-2">
          <User className="w-6 h-6" />
          {t('myProfile')}
        </h1>

        {/* Profile Card */}
        <div className="bg-[#141419] border border-[#27272A] rounded-sm p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-[#F39C12] flex items-center justify-center">
              <span className="font-display text-3xl text-black">
                {user?.username?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display text-xl text-white">{user?.username}</h2>
                {isAdmin && (
                  <span className="px-2 py-0.5 bg-[#F39C12]/20 text-[#F39C12] text-xs rounded-sm flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    Admin
                  </span>
                )}
              </div>
              <p className="text-[#8A8A93] text-sm">{user?.email}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-[#8A8A93]">
              <Gamepad2 className="w-5 h-5" />
              <span className="text-white" data-testid="profile-pubg-id">{user?.pubg_id}</span>
            </div>
            <div className="flex items-center gap-3 text-[#8A8A93]">
              <Calendar className="w-5 h-5" />
              <span>{t('memberSince')}: {new Date(user?.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-6">
          <h2 className="text-sm uppercase tracking-[0.2em] text-[#8A8A93] mb-3">
            {t('statistics')}
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-[#141419] border border-[#27272A] rounded-sm p-4 text-center"
              >
                <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
                <p className="font-display text-xl text-white">{stat.value}</p>
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#8A8A93]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Referral Code */}
        <div className="bg-[#141419] border border-[#27272A] rounded-sm p-4 mb-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[#8A8A93] mb-2">
            {t('yourReferralCode')}
          </p>
          <p className="font-display text-xl text-[#F39C12]" data-testid="profile-referral-code">
            {user?.referral_code}
          </p>
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          data-testid="logout-btn"
          className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 py-4 rounded-sm uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-2 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          {t('logout')}
        </button>
      </div>
    </div>
  );
}

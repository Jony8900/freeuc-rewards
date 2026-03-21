import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Play, Coins, TrendingUp, Gift, Tv } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export function HomePage() {
  const { t, isRTL } = useLanguage();
  const { user, updateUser, refreshUser } = useAuth();
  const [watchingAd, setWatchingAd] = useState(false);
  const [adProgress, setAdProgress] = useState(0);

  useEffect(() => {
    refreshUser();
  }, []);

  const watchAd = async () => {
    setWatchingAd(true);
    setAdProgress(0);
    
    // Simulate ad watching (5 seconds)
    const interval = setInterval(() => {
      setAdProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4;
      });
    }, 200);

    // Wait for ad to complete
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    try {
      const response = await axios.post(`${API}/ads/watch`);
      updateUser({ 
        points: response.data.new_balance,
        total_earned: (user?.total_earned || 0) + response.data.points_earned
      });
      toast.success(t('pointsEarned', { points: response.data.points_earned }));
    } catch (error) {
      toast.error(t('error'));
    } finally {
      setWatchingAd(false);
      setAdProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] pb-24 noise-bg">
      <div className="relative z-10 p-4">
        {/* Points Balance Card */}
        <div className="bg-gradient-to-br from-[#141419] to-[#0A0A0C] border border-[#27272A] rounded-sm p-6 mb-6 tracing-beam">
          <p className="text-xs uppercase tracking-[0.2em] text-[#8A8A93] mb-2 text-center">
            {t('yourBalance')}
          </p>
          <div className="flex items-center justify-center gap-3">
            <Coins className="w-10 h-10 text-[#F39C12]" />
            <span className="font-display text-6xl text-[#F39C12] gold-glow" data-testid="points-balance">
              {user?.points || 0}
            </span>
          </div>
          <p className="text-center text-[#8A8A93] text-sm mt-2">{t('points')}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-[#141419] border border-[#27272A] rounded-sm p-4 text-center">
            <TrendingUp className="w-5 h-5 text-green-500 mx-auto mb-2" />
            <p className="font-display text-xl text-white">{user?.total_earned || 0}</p>
            <p className="text-[10px] uppercase tracking-[0.15em] text-[#8A8A93]">{t('totalEarned')}</p>
          </div>
          <div className="bg-[#141419] border border-[#27272A] rounded-sm p-4 text-center">
            <Gift className="w-5 h-5 text-[#F39C12] mx-auto mb-2" />
            <p className="font-display text-xl text-white">{user?.total_redeemed || 0}</p>
            <p className="text-[10px] uppercase tracking-[0.15em] text-[#8A8A93]">{t('totalRedeemed')}</p>
          </div>
          <div className="bg-[#141419] border border-[#27272A] rounded-sm p-4 text-center">
            <Tv className="w-5 h-5 text-blue-500 mx-auto mb-2" />
            <p className="font-display text-xl text-white">{user?.ads_watched || 0}</p>
            <p className="text-[10px] uppercase tracking-[0.15em] text-[#8A8A93]">{t('adsWatched')}</p>
          </div>
        </div>

        {/* Watch Ad Card */}
        <div 
          className={`relative bg-gradient-to-br from-[#1a1a1f] to-[#141419] border border-[#27272A] rounded-sm overflow-hidden ${watchingAd ? '' : 'card-hover cursor-pointer'}`}
          onClick={!watchingAd ? watchAd : undefined}
          data-testid="watch-ad-card"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F39C12]/10 to-transparent" />
          
          {/* Progress bar */}
          {watchingAd && (
            <div 
              className="absolute bottom-0 start-0 h-1 bg-[#F39C12] transition-all duration-200"
              style={{ width: `${adProgress}%` }}
            />
          )}
          
          <div className="relative p-6 flex items-center justify-between">
            <div>
              <h3 className="font-display text-2xl text-white mb-1">
                {watchingAd ? t('watchingAd') : t('watchAd')}
              </h3>
              <p className="text-[#8A8A93] text-sm">+10 {t('points')}</p>
            </div>
            
            <div className={`w-16 h-16 rounded-full bg-[#F39C12] flex items-center justify-center ${!watchingAd ? 'pulse-gold' : ''}`}>
              {watchingAd ? (
                <div className="w-8 h-8 spinner" />
              ) : (
                <Play className="w-8 h-8 text-black" fill="black" />
              )}
            </div>
          </div>
        </div>

        {/* Ad Simulation Modal */}
        {watchingAd && (
          <div className="fixed inset-0 z-50 flex items-center justify-center ad-overlay">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#F39C12]/20 flex items-center justify-center">
                <Tv className="w-10 h-10 text-[#F39C12] animate-pulse" />
              </div>
              <p className="text-white font-display text-2xl mb-2">{t('watchingAd')}</p>
              <p className="text-[#8A8A93]">{Math.round(adProgress)}%</p>
              <div className="w-48 h-2 bg-[#27272A] rounded-full mx-auto mt-4 overflow-hidden">
                <div 
                  className="h-full bg-[#F39C12] transition-all duration-200"
                  style={{ width: `${adProgress}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

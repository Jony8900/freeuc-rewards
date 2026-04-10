import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Play, TrendingUp, Gift, Tv, Clock, AlertCircle, Star, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { Logo } from '../components/Logo';
import { DailyBonusModal } from '../components/DailyBonusModal';
import { AdBanner } from '../components/AdsManager';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export function HomePage() {
  const { t, language } = useLanguage();
  const { user, updateUser, refreshUser } = useAuth();
  const [watchingAd, setWatchingAd] = useState(false);
  const [adProgress, setAdProgress] = useState(0);
  const [adStatus, setAdStatus] = useState(null);
  const [cooldown, setCooldown] = useState(0);
  const [levelInfo, setLevelInfo] = useState(null);
  const [showDailyBonus, setShowDailyBonus] = useState(false);

  const isRTL = language === 'ar';

  const fetchAdStatus = useCallback(async () => {
    try {
      const response = await axios.get(`${API}/ads/status`);
      setAdStatus(response.data);
      setCooldown(response.data.cooldown_remaining || 0);
    } catch (error) {
      console.error('Failed to fetch ad status:', error);
    }
  }, []);

  const fetchLevel = useCallback(async () => {
    try {
      const response = await axios.get(`${API}/user/level`);
      setLevelInfo(response.data);
    } catch (error) {
      console.error('Failed to fetch level:', error);
    }
  }, []);

  const checkDailyBonus = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/daily-bonus/status`);
      if (!res.data.already_claimed) {
        setShowDailyBonus(true);
      }
    } catch (err) {
      console.error('Failed to check daily bonus:', err);
    }
  }, []);

  useEffect(() => {
    refreshUser();
    fetchAdStatus();
    fetchLevel();
    checkDailyBonus();
  }, [refreshUser, fetchAdStatus, fetchLevel, checkDailyBonus]);

  // Cooldown timer
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => {
        setCooldown(prev => {
          if (prev <= 1) {
            fetchAdStatus();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown, fetchAdStatus]);

  const watchAd = async () => {
    if (!adStatus?.can_watch) {
      if (adStatus?.ads_remaining_today === 0) {
        toast.error(isRTL ? 'لقد وصلت للحد اليومي. عد غداً!' : 'Daily limit reached. Come back tomorrow!');
      } else if (adStatus?.ads_remaining_this_hour === 0) {
        toast.error(isRTL ? 'لقد وصلت للحد الساعي. انتظر قليلاً!' : 'Hourly limit reached. Wait a bit!');
      } else if (cooldown > 0) {
        toast.error(isRTL ? `انتظر ${cooldown} ثانية` : `Wait ${cooldown} seconds`);
      }
      return;
    }

    setWatchingAd(true);
    setAdProgress(0);
    
    const duration = (adStatus?.ad_duration || 5) * 1000;
    const interval = 100;
    const increment = (interval / duration) * 100;

    const progressInterval = setInterval(() => {
      setAdProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    await new Promise(resolve => setTimeout(resolve, duration));
    
    try {
      const response = await axios.post(`${API}/ads/watch`);
      updateUser({ 
        points: response.data.new_balance,
        total_earned: (user?.total_earned || 0) + response.data.points_earned
      });
      toast.success(response.data.message);
      fetchAdStatus();
      fetchLevel();
    } catch (error) {
      const message = error.response?.data?.detail || (isRTL ? 'حدث خطأ' : 'An error occurred');
      toast.error(message);
    } finally {
      setWatchingAd(false);
      setAdProgress(0);
    }
  };

  const canWatch = adStatus?.can_watch && cooldown === 0;

  return (
    <div className="min-h-screen bg-[#0A0A0C] pb-24 noise-bg">
      {/* Daily Bonus Modal */}
      {showDailyBonus && (
        <DailyBonusModal onClose={() => { setShowDailyBonus(false); refreshUser(); }} />
      )}

      <div className="relative z-10 p-4">
        {/* Daily Bonus Button */}
        <button
          onClick={() => setShowDailyBonus(true)}
          data-testid="daily-bonus-btn"
          className="w-full mb-4 py-2.5 rounded-sm bg-gradient-to-r from-[#F39C12]/20 to-[#E67E22]/20 border border-[#F39C12]/30 flex items-center justify-center gap-2 hover:from-[#F39C12]/30 hover:to-[#E67E22]/30 transition-all"
        >
          <Gift className="w-4 h-4 text-[#F39C12]" />
          <span className="text-[#F39C12] text-sm font-semibold">
            {isRTL ? 'المكافأة اليومية' : 'Daily Bonus'}
          </span>
        </button>

        {/* Points Balance Card */}
        <div className="bg-gradient-to-br from-[#141419] to-[#0A0A0C] border border-[#27272A] rounded-sm p-6 mb-6 tracing-beam">
          <p className="text-xs uppercase tracking-[0.2em] text-[#8A8A93] mb-2 text-center">
            {t('yourBalance')}
          </p>
          <div className="flex items-center justify-center gap-3">
            <Logo size={48} />
            <span className="font-display text-6xl text-[#F39C12] gold-glow" data-testid="points-balance">
              {user?.points?.toLocaleString() || 0}
            </span>
          </div>
          <p className="text-center text-[#8A8A93] text-sm mt-2">{t('points')}</p>
        </div>

        {/* Level Card */}
        {levelInfo && (
          <div className="bg-[#141419] border border-[#27272A] rounded-sm p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5" style={{ color: levelInfo.color }} />
                <span className="text-white font-semibold">
                  {isRTL ? levelInfo.name_ar : levelInfo.name_en}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-sm" style={{ backgroundColor: levelInfo.color + '20', color: levelInfo.color }}>
                  Lv.{levelInfo.level}
                </span>
              </div>
              <span className="text-[#F39C12] text-sm font-display">
                x{levelInfo.multiplier}
              </span>
            </div>
            {levelInfo.next_level && (
              <>
                <div className="w-full h-2 bg-[#27272A] rounded-full overflow-hidden mb-2">
                  <div 
                    className="h-full transition-all duration-500 rounded-full"
                    style={{ width: `${levelInfo.progress_to_next}%`, backgroundColor: levelInfo.color }}
                  />
                </div>
                <div className="flex justify-between text-xs text-[#8A8A93]">
                  <span className="flex items-center gap-1">
                    <ChevronUp className="w-3 h-3" />
                    {isRTL ? levelInfo.next_level.name_ar : levelInfo.next_level.name_en}
                  </span>
                  <span>{levelInfo.progress_to_next}%</span>
                </div>
              </>
            )}
            {!levelInfo.next_level && (
              <p className="text-xs text-center" style={{ color: levelInfo.color }}>
                {isRTL ? 'أعلى مستوى!' : 'Max Level!'}
              </p>
            )}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-[#141419] border border-[#27272A] rounded-sm p-4 text-center">
            <TrendingUp className="w-5 h-5 text-green-500 mx-auto mb-2" />
            <p className="font-display text-xl text-white">{user?.total_earned?.toLocaleString() || 0}</p>
            <p className="text-[10px] uppercase tracking-[0.15em] text-[#8A8A93]">{t('totalEarned')}</p>
          </div>
          <div className="bg-[#141419] border border-[#27272A] rounded-sm p-4 text-center">
            <Gift className="w-5 h-5 text-[#F39C12] mx-auto mb-2" />
            <p className="font-display text-xl text-white">{user?.total_redeemed?.toLocaleString() || 0}</p>
            <p className="text-[10px] uppercase tracking-[0.15em] text-[#8A8A93]">{t('totalRedeemed')}</p>
          </div>
          <div className="bg-[#141419] border border-[#27272A] rounded-sm p-4 text-center">
            <Tv className="w-5 h-5 text-blue-500 mx-auto mb-2" />
            <p className="font-display text-xl text-white">{user?.ads_watched || 0}</p>
            <p className="text-[10px] uppercase tracking-[0.15em] text-[#8A8A93]">{t('adsWatched')}</p>
          </div>
        </div>

        {/* Daily Ad Status */}
        {adStatus && (
          <div className="bg-[#141419] border border-[#27272A] rounded-sm p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#8A8A93] text-sm">
                {isRTL ? 'الإعلانات اليومية' : 'Daily Ads'}
              </span>
              <span className="text-[#F39C12] font-display">
                {adStatus.ads_watched_today}/{adStatus.daily_limit}
              </span>
            </div>
            <div className="w-full h-2 bg-[#27272A] rounded-full overflow-hidden mb-2">
              <div 
                className="h-full bg-[#F39C12] transition-all duration-300"
                style={{ width: `${(adStatus.ads_watched_today / adStatus.daily_limit) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-[#8A8A93]">
              <span>
                {isRTL ? `متبقي: ${adStatus.ads_remaining_today}` : `Remaining: ${adStatus.ads_remaining_today}`}
              </span>
              <span>
                {isRTL ? `هذه الساعة: ${adStatus.ads_watched_this_hour}/${adStatus.hourly_limit}` : `This hour: ${adStatus.ads_watched_this_hour}/${adStatus.hourly_limit}`}
              </span>
            </div>
          </div>
        )}

        {/* Watch Ad Card */}
        <div 
          className={`relative bg-gradient-to-br from-[#1a1a1f] to-[#141419] border rounded-sm overflow-hidden ${
            canWatch ? 'border-[#27272A] card-hover cursor-pointer' : 'border-red-500/30 opacity-70'
          }`}
          onClick={canWatch && !watchingAd ? watchAd : undefined}
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
                {watchingAd ? (isRTL ? 'جاري المشاهدة...' : 'Watching...') : t('watchAd')}
              </h3>
              <p className="text-[#8A8A93] text-sm">+{adStatus?.points_per_ad || 10} {t('points')}</p>
              
              {/* Cooldown or limit warning */}
              {!canWatch && !watchingAd && (
                <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                  {cooldown > 0 ? (
                    <>
                      <Clock className="w-4 h-4" />
                      <span>{isRTL ? `انتظر ${cooldown} ثانية` : `Wait ${cooldown}s`}</span>
                    </>
                  ) : adStatus?.ads_remaining_today === 0 ? (
                    <>
                      <AlertCircle className="w-4 h-4" />
                      <span>{isRTL ? 'انتهى الحد اليومي' : 'Daily limit reached'}</span>
                    </>
                  ) : adStatus?.ads_remaining_this_hour === 0 ? (
                    <>
                      <Clock className="w-4 h-4" />
                      <span>{isRTL ? 'انتظر للساعة القادمة' : 'Wait for next hour'}</span>
                    </>
                  ) : null}
                </div>
              )}
            </div>
            
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              canWatch ? 'bg-[#F39C12] pulse-gold' : 'bg-[#27272A]'
            }`}>
              {watchingAd ? (
                <div className="w-8 h-8 spinner" />
              ) : cooldown > 0 ? (
                <span className="font-display text-xl text-white">{cooldown}</span>
              ) : (
                <Play className={`w-8 h-8 ${canWatch ? 'text-black' : 'text-[#8A8A93]'}`} fill={canWatch ? 'black' : 'currentColor'} />
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
              <p className="text-white font-display text-2xl mb-2">
                {isRTL ? 'جاري مشاهدة الإعلان...' : 'Watching Ad...'}
              </p>
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

        {/* AdSense Banner */}
        <div className="mt-4" data-testid="adsense-home-banner">
          <AdBanner slot="auto" format="auto" />
        </div>

        {/* Footer Links */}
        <div className="mt-6 mb-4 border-t border-[#27272A] pt-4">
          <div className="flex flex-wrap justify-center gap-3 text-xs text-[#8A8A93]">
            <a href="/about" className="hover:text-[#F39C12] transition-colors">{isRTL ? 'حول التطبيق' : 'About'}</a>
            <span>|</span>
            <a href="/faq" className="hover:text-[#F39C12] transition-colors">{isRTL ? 'الأسئلة الشائعة' : 'FAQ'}</a>
            <span>|</span>
            <a href="/guides" className="hover:text-[#F39C12] transition-colors">{isRTL ? 'الأدلة' : 'Guides'}</a>
            <span>|</span>
            <a href="/privacy-policy" className="hover:text-[#F39C12] transition-colors">{isRTL ? 'الخصوصية' : 'Privacy'}</a>
          </div>
        </div>
      </div>
    </div>
  );
}

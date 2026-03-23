import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Gift, Check, Lock, Star, X } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export function DailyBonusModal({ onClose }) {
  const { language } = useLanguage();
  const { refreshUser } = useAuth();
  const [status, setStatus] = useState(null);
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);

  const isRTL = language === 'ar';

  const fetchStatus = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/daily-bonus/status`);
      setStatus(res.data);
      if (res.data.already_claimed) setClaimed(true);
    } catch (err) {
      console.error('Failed to fetch daily bonus:', err);
    }
  }, []);

  useEffect(() => { fetchStatus(); }, [fetchStatus]);

  const claimBonus = async () => {
    if (claiming || claimed) return;
    setClaiming(true);
    try {
      const res = await axios.post(`${API}/daily-bonus/claim`);
      toast.success(res.data.message);
      setClaimed(true);
      refreshUser();
      fetchStatus();
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Error');
    } finally {
      setClaiming(false);
    }
  };

  if (!status) return null;

  const days = [1, 2, 3, 4, 5, 6, 7];
  const currentDay = status.current_day;
  const bonuses = status.bonuses;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" data-testid="daily-bonus-modal">
      <div className="bg-[#141419] border border-[#27272A] rounded-lg w-full max-w-sm overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Header */}
        <div className="bg-gradient-to-b from-[#F39C12]/20 to-transparent p-4 relative">
          <button onClick={onClose} className="absolute top-3 left-3 text-[#8A8A93] hover:text-white" data-testid="close-daily-bonus">
            <X className="w-5 h-5" />
          </button>
          <div className="text-center">
            <Gift className="w-10 h-10 text-[#F39C12] mx-auto mb-2" />
            <h2 className="text-xl font-display text-white">
              {isRTL ? 'مكافأة يومية' : 'Daily Bonus'}
            </h2>
            <p className="text-[#8A8A93] text-sm mt-1">
              {isRTL ? `اليوم ${currentDay} من 7` : `Day ${currentDay} of 7`}
            </p>
          </div>
        </div>

        {/* Days Grid */}
        <div className="p-4">
          <div className="grid grid-cols-7 gap-1.5 mb-4">
            {days.map((day, i) => {
              const isToday = day === currentDay;
              const isPast = day < currentDay || (claimed && day === currentDay);
              const isFuture = day > currentDay || (!claimed && day === currentDay && day > 1 && status.streak === 0);
              const isClaimable = isToday && !claimed;

              return (
                <div
                  key={day}
                  data-testid={`bonus-day-${day}`}
                  className={`flex flex-col items-center p-1.5 rounded-md border transition-all ${
                    isPast && (day < currentDay || claimed)
                      ? 'bg-[#F39C12]/10 border-[#F39C12]/30'
                      : isClaimable
                      ? 'bg-[#F39C12]/20 border-[#F39C12] animate-pulse'
                      : 'bg-[#0A0A0C] border-[#27272A]'
                  }`}
                >
                  <span className="text-[10px] text-[#8A8A93] mb-0.5">
                    {isRTL ? `ي${day}` : `D${day}`}
                  </span>
                  <div className="w-6 h-6 flex items-center justify-center">
                    {isPast && (day < currentDay || claimed) ? (
                      <Check className="w-4 h-4 text-[#F39C12]" />
                    ) : isClaimable ? (
                      <Star className="w-4 h-4 text-[#F39C12]" />
                    ) : (
                      <Lock className="w-3 h-3 text-[#8A8A93]/50" />
                    )}
                  </div>
                  <span className={`text-[10px] font-bold ${
                    isPast && (day < currentDay || claimed) ? 'text-[#F39C12]' : isClaimable ? 'text-white' : 'text-[#8A8A93]/50'
                  }`}>
                    +{bonuses[i]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Claim Button */}
          {!claimed ? (
            <button
              onClick={claimBonus}
              disabled={claiming}
              data-testid="claim-daily-bonus"
              className="w-full py-3 rounded-md bg-[#F39C12] text-black font-bold text-sm transition-all hover:bg-[#E67E22] disabled:opacity-50"
            >
              {claiming 
                ? (isRTL ? 'جاري الاستلام...' : 'Claiming...') 
                : (isRTL ? `استلم +${status.today_bonus} نقطة` : `Claim +${status.today_bonus} Points`)}
            </button>
          ) : (
            <div className="w-full py-3 rounded-md bg-[#27272A] text-center">
              <p className="text-[#F39C12] font-bold text-sm flex items-center justify-center gap-2">
                <Check className="w-4 h-4" />
                {isRTL ? 'تم استلام مكافأة اليوم!' : 'Today\'s bonus claimed!'}
              </p>
            </div>
          )}

          {/* Streak Info */}
          <p className="text-center text-[#8A8A93] text-xs mt-3">
            {isRTL 
              ? 'سجّل دخول كل يوم للحصول على مكافآت أكبر!' 
              : 'Login daily for bigger rewards!'}
          </p>
        </div>
      </div>
    </div>
  );
}

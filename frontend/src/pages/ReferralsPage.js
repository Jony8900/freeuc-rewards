import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Users, Copy, Check, Share2, Gift } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export function ReferralsPage() {
  const { t, isRTL } = useLanguage();
  const { user } = useAuth();
  const [referralData, setReferralData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchReferrals();
  }, []);

  const fetchReferrals = async () => {
    try {
      const response = await axios.get(`${API}/referrals`);
      setReferralData(response.data);
    } catch (error) {
      console.error('Failed to fetch referrals:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(referralData?.referral_code || '');
    setCopied(true);
    toast.success(t('copied'));
    setTimeout(() => setCopied(false), 2000);
  };

  const shareCode = () => {
    const message = t('shareMessage', { code: referralData?.referral_code });
    if (navigator.share) {
      navigator.share({
        title: 'PUBG UC Rewards',
        text: message,
      });
    } else {
      navigator.clipboard.writeText(message);
      toast.success(t('copied'));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0C] flex items-center justify-center">
        <div className="w-10 h-10 spinner" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0C] pb-24 noise-bg">
      <div className="relative z-10 p-4">
        {/* Header */}
        <h1 className="font-display text-2xl text-white mb-6 flex items-center gap-2">
          <Users className="w-6 h-6" />
          {t('referrals')}
        </h1>

        {/* Referral Code Card */}
        <div 
          className="bg-gradient-to-br from-[#1a1a1f] to-[#141419] border border-[#27272A] rounded-sm p-6 mb-6 tracing-beam"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/7080348/pexels-photo-7080348.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundBlendMode: 'overlay' }}
        >
          <div className="bg-black/70 -m-6 p-6 rounded-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-[#8A8A93] mb-2">
              {t('yourReferralCode')}
            </p>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-display text-3xl text-[#F39C12] tracking-wider" data-testid="referral-code">
                {referralData?.referral_code}
              </span>
              <button
                onClick={copyCode}
                data-testid="copy-code-btn"
                className="p-2 bg-[#27272A] hover:bg-[#F39C12] hover:text-black rounded-sm transition-colors"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-green-400 text-sm flex items-center gap-2">
              <Gift className="w-4 h-4" />
              {t('referralBonus', { bonus: referralData?.bonus_per_referral || 200 })}
            </p>
          </div>
        </div>

        {/* Share Button */}
        <button
          onClick={shareCode}
          data-testid="share-btn"
          className="w-full bg-[#F39C12] hover:bg-[#E67E22] text-black font-semibold py-4 rounded-sm uppercase tracking-[0.2em] text-sm mb-6 flex items-center justify-center gap-2 transition-colors"
        >
          <Share2 className="w-5 h-5" />
          {t('inviteFriends')}
        </button>

        {/* Stats */}
        <div className="bg-[#141419] border border-[#27272A] rounded-sm p-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-[#8A8A93]">{t('friendsReferred')}</span>
            <span className="font-display text-2xl text-[#F39C12]" data-testid="referred-count">
              {referralData?.referred_count || 0}
            </span>
          </div>
        </div>

        {/* Referred Users List */}
        <div>
          <h2 className="text-sm uppercase tracking-[0.2em] text-[#8A8A93] mb-3">
            {t('friendsReferred')}
          </h2>
          
          {referralData?.referred_users?.length === 0 ? (
            <div className="bg-[#141419] border border-[#27272A] rounded-sm p-6 text-center">
              <Users className="w-10 h-10 text-[#8A8A93] mx-auto mb-2" />
              <p className="text-[#8A8A93]">{t('noReferrals')}</p>
            </div>
          ) : (
            <div className="space-y-2">
              {referralData?.referred_users?.map((friend) => (
                <div
                  key={friend.id}
                  className="bg-[#141419] border border-[#27272A] rounded-sm p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#F39C12]/20 flex items-center justify-center">
                      <span className="text-[#F39C12] font-semibold">
                        {friend.username?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-white">{friend.username}</span>
                  </div>
                  <span className="text-[#8A8A93] text-sm">
                    {new Date(friend.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

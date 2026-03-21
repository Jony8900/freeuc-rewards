import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Coins, CheckCircle, Clock, XCircle, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export function RedeemPage() {
  const { t } = useLanguage();
  const { user, updateUser, refreshUser } = useAuth();
  const [packages, setPackages] = useState([]);
  const [redemptions, setRedemptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [redeeming, setRedeeming] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [packagesRes, redemptionsRes] = await Promise.all([
        axios.get(`${API}/packages`),
        axios.get(`${API}/redemptions/my`)
      ]);
      setPackages(packagesRes.data);
      setRedemptions(redemptionsRes.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRedeem = async (pkg) => {
    if (user.points < pkg.points_cost) {
      toast.error(t('notEnoughPoints'));
      return;
    }

    setRedeeming(pkg.id);
    try {
      await axios.post(`${API}/redeem`, { package_id: pkg.id });
      toast.success(t('redeemSuccess'));
      updateUser({ points: user.points - pkg.points_cost });
      await fetchData();
      await refreshUser();
    } catch (error) {
      const message = error.response?.data?.detail || t('error');
      toast.error(message);
    } finally {
      setRedeeming(null);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'approved':
        return 'status-approved';
      case 'rejected':
        return 'status-rejected';
      default:
        return 'status-pending';
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
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-2xl text-white">{t('ucPackages')}</h1>
          <div className="flex items-center gap-2 bg-[#141419] border border-[#27272A] rounded-sm px-3 py-2">
            <Coins className="w-4 h-4 text-[#F39C12]" />
            <span className="font-display text-lg text-[#F39C12]" data-testid="current-points">{user?.points || 0}</span>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {packages.map((pkg) => {
            const canAfford = user?.points >= pkg.points_cost;
            return (
              <div
                key={pkg.id}
                className={`bg-[#141419] border rounded-sm overflow-hidden card-hover ${
                  canAfford ? 'border-[#27272A]' : 'border-[#27272A]/50 opacity-60'
                }`}
                data-testid={`package-${pkg.id}`}
              >
                <div className="p-4">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#F39C12]/20 flex items-center justify-center">
                    <Coins className="w-6 h-6 text-[#F39C12]" />
                  </div>
                  <h3 className="font-display text-xl text-white text-center mb-1">{pkg.name}</h3>
                  <p className="text-[#F39C12] text-sm text-center font-semibold">
                    {t('pointsCost', { points: pkg.points_cost })}
                  </p>
                </div>
                <button
                  onClick={() => handleRedeem(pkg)}
                  disabled={!canAfford || redeeming === pkg.id}
                  data-testid={`redeem-btn-${pkg.id}`}
                  className={`w-full py-3 text-sm uppercase tracking-[0.2em] transition-colors ${
                    canAfford
                      ? 'bg-[#F39C12] text-black hover:bg-[#E67E22]'
                      : 'bg-[#27272A] text-[#8A8A93] cursor-not-allowed'
                  }`}
                >
                  {redeeming === pkg.id ? (
                    <span className="inline-block w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : canAfford ? (
                    t('redeemNow')
                  ) : (
                    t('notEnoughPoints')
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Redemption History */}
        <div>
          <h2 className="font-display text-xl text-white mb-4 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            {t('redeemHistory')}
          </h2>
          
          {redemptions.length === 0 ? (
            <div className="bg-[#141419] border border-[#27272A] rounded-sm p-6 text-center">
              <ShoppingBag className="w-10 h-10 text-[#8A8A93] mx-auto mb-2" />
              <p className="text-[#8A8A93]">No redemptions yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {redemptions.map((redemption) => (
                <div
                  key={redemption.id}
                  className="bg-[#141419] border border-[#27272A] rounded-sm p-4 flex items-center justify-between"
                  data-testid={`redemption-${redemption.id}`}
                >
                  <div>
                    <h4 className="text-white font-semibold">{redemption.package_name}</h4>
                    <p className="text-[#8A8A93] text-sm">{redemption.uc_amount} UC</p>
                    <p className="text-[#8A8A93] text-xs mt-1">
                      {new Date(redemption.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-sm text-xs uppercase ${getStatusClass(redemption.status)}`}>
                      {t(redemption.status)}
                    </span>
                    {getStatusIcon(redemption.status)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

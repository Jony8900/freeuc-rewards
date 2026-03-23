import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, Coins, ShoppingBag, BarChart3, 
  CheckCircle, XCircle, Clock, Settings,
  Shield, TrendingUp, Package
} from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export function AdminPage() {
  const { t, language } = useLanguage();
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [redemptions, setRedemptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  const isRTL = language === 'ar';

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const fetchData = async () => {
    try {
      const [statsRes, usersRes, redemptionsRes] = await Promise.all([
        axios.get(`${API}/admin/stats`),
        axios.get(`${API}/admin/users`),
        axios.get(`${API}/admin/redemptions`)
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
      setRedemptions(redemptionsRes.data);
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
      toast.error(t('error'));
    } finally {
      setLoading(false);
    }
  };

  const updateRedemption = async (id, status) => {
    try {
      await axios.put(`${API}/admin/redemptions/${id}`, { status });
      toast.success(`Redemption ${status}`);
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.detail || t('error'));
    }
  };

  const toggleAdmin = async (userId) => {
    try {
      await axios.put(`${API}/admin/users/${userId}/toggle-admin`);
      toast.success('Admin status updated');
      fetchData();
    } catch (error) {
      toast.error(t('error'));
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0A0A0C] flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-white font-display text-xl">Admin Access Required</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0C] flex items-center justify-center">
        <div className="w-10 h-10 spinner" />
      </div>
    );
  }

  const filteredRedemptions = statusFilter === 'all' 
    ? redemptions 
    : redemptions.filter(r => r.status === statusFilter);

  const tabs = [
    { id: 'dashboard', label: t('dashboard'), icon: BarChart3 },
    { id: 'users', label: t('users'), icon: Users },
    { id: 'redemptions', label: t('redemptions'), icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0C] pb-24 noise-bg">
      <div className="relative z-10 p-4">
        {/* Header */}
        <h1 className="font-display text-2xl text-white mb-6 flex items-center gap-2">
          <Shield className="w-6 h-6 text-[#F39C12]" />
          {t('admin')}
        </h1>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => navigate('/admin/settings')}
            data-testid="go-to-settings"
            className="bg-[#141419] border border-[#27272A] rounded-sm p-4 flex items-center gap-3 hover:border-[#F39C12] transition-colors"
          >
            <Settings className="w-6 h-6 text-[#F39C12]" />
            <span className="text-white text-sm">{isRTL ? 'إعدادات التطبيق' : 'App Settings'}</span>
          </button>
          <button
            onClick={() => navigate('/admin/packages')}
            data-testid="go-to-packages"
            className="bg-[#141419] border border-[#27272A] rounded-sm p-4 flex items-center gap-3 hover:border-[#F39C12] transition-colors"
          >
            <Package className="w-6 h-6 text-[#F39C12]" />
            <span className="text-white text-sm">{isRTL ? 'إدارة الباقات' : 'Manage Packages'}</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              data-testid={`admin-tab-${tab.id}`}
              className={`flex items-center gap-2 px-4 py-2 rounded-sm text-sm uppercase tracking-[0.15em] whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#F39C12] text-black'
                  : 'bg-[#141419] text-[#8A8A93] hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#141419] border border-[#27272A] rounded-sm p-4">
              <Users className="w-6 h-6 text-blue-500 mb-2" />
              <p className="font-display text-2xl text-white" data-testid="stat-total-users">{stats?.total_users || 0}</p>
              <p className="text-xs uppercase tracking-[0.15em] text-[#8A8A93]">{t('totalUsers')}</p>
            </div>
            <div className="bg-[#141419] border border-[#27272A] rounded-sm p-4">
              <Coins className="w-6 h-6 text-[#F39C12] mb-2" />
              <p className="font-display text-2xl text-white" data-testid="stat-total-points">{stats?.total_points_distributed || 0}</p>
              <p className="text-xs uppercase tracking-[0.15em] text-[#8A8A93]">{t('totalPointsDistributed')}</p>
            </div>
            <div className="bg-[#141419] border border-[#27272A] rounded-sm p-4">
              <ShoppingBag className="w-6 h-6 text-green-500 mb-2" />
              <p className="font-display text-2xl text-white" data-testid="stat-total-redemptions">{stats?.total_redemptions || 0}</p>
              <p className="text-xs uppercase tracking-[0.15em] text-[#8A8A93]">{t('redemptions')}</p>
            </div>
            <div className="bg-[#141419] border border-[#27272A] rounded-sm p-4">
              <Clock className="w-6 h-6 text-yellow-500 mb-2" />
              <p className="font-display text-2xl text-white" data-testid="stat-pending">{stats?.pending_redemptions || 0}</p>
              <p className="text-xs uppercase tracking-[0.15em] text-[#8A8A93]">{t('pendingRedemptions')}</p>
            </div>
            <div className="col-span-2 bg-[#141419] border border-[#27272A] rounded-sm p-4">
              <TrendingUp className="w-6 h-6 text-purple-500 mb-2" />
              <p className="font-display text-2xl text-white" data-testid="stat-ads-watched">{stats?.total_ads_watched || 0}</p>
              <p className="text-xs uppercase tracking-[0.15em] text-[#8A8A93]">{t('adsWatched')}</p>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-3">
            {users.map((u) => (
              <div
                key={u.id}
                className="bg-[#141419] border border-[#27272A] rounded-sm p-4"
                data-testid={`admin-user-${u.id}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold">{u.username}</span>
                      {u.is_admin && (
                        <span className="px-2 py-0.5 bg-[#F39C12]/20 text-[#F39C12] text-xs rounded-sm">
                          Admin
                        </span>
                      )}
                    </div>
                    <p className="text-[#8A8A93] text-sm">{u.email}</p>
                    <p className="text-[#8A8A93] text-xs">ID: {u.pubg_id}</p>
                  </div>
                  <button
                    onClick={() => toggleAdmin(u.id)}
                    data-testid={`toggle-admin-${u.id}`}
                    className={`p-2 rounded-sm transition-colors ${
                      u.is_admin
                        ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30'
                        : 'bg-[#F39C12]/20 text-[#F39C12] hover:bg-[#F39C12]/30'
                    }`}
                  >
                    <Shield className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex gap-4 text-sm">
                  <span className="text-[#F39C12]">{u.points} pts</span>
                  <span className="text-[#8A8A93]">Earned: {u.total_earned}</span>
                  <span className="text-[#8A8A93]">Refs: {u.referred_count}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Redemptions Tab */}
        {activeTab === 'redemptions' && (
          <div>
            {/* Filter */}
            <div className="mb-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                data-testid="redemption-filter"
                className="bg-[#141419] border border-[#27272A] text-white px-4 py-2 rounded-sm text-sm"
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="space-y-3">
              {filteredRedemptions.length === 0 ? (
                <div className="bg-[#141419] border border-[#27272A] rounded-sm p-6 text-center">
                  <ShoppingBag className="w-10 h-10 text-[#8A8A93] mx-auto mb-2" />
                  <p className="text-[#8A8A93]">No redemptions</p>
                </div>
              ) : (
                filteredRedemptions.map((r) => (
                  <div
                    key={r.id}
                    className="bg-[#141419] border border-[#27272A] rounded-sm p-4"
                    data-testid={`admin-redemption-${r.id}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="text-white font-semibold">{r.username}</span>
                        <p className="text-[#8A8A93] text-sm">ID: {r.pubg_id}</p>
                        <p className="text-[#F39C12] font-semibold">{r.package_name} ({r.uc_amount} UC)</p>
                        <p className="text-[#8A8A93] text-xs mt-1">
                          {new Date(r.created_at).toLocaleString()}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-sm text-xs uppercase ${
                        r.status === 'approved' ? 'status-approved' :
                        r.status === 'rejected' ? 'status-rejected' : 'status-pending'
                      }`}>
                        {t(r.status)}
                      </span>
                    </div>

                    {r.status === 'pending' && (
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => updateRedemption(r.id, 'approved')}
                          data-testid={`approve-${r.id}`}
                          className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-green-500 py-2 rounded-sm text-sm uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-colors"
                        >
                          <CheckCircle className="w-4 h-4" />
                          {t('approve')}
                        </button>
                        <button
                          onClick={() => updateRedemption(r.id, 'rejected')}
                          data-testid={`reject-${r.id}`}
                          className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-500 py-2 rounded-sm text-sm uppercase tracking-[0.15em] flex items-center justify-center gap-2 transition-colors"
                        >
                          <XCircle className="w-4 h-4" />
                          {t('reject')}
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

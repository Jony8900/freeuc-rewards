import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { User, Gamepad2, Calendar, LogOut, Coins, TrendingUp, Gift, Shield, Edit2, Lock, Save, X, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export function ProfilePage() {
  const { t, language } = useLanguage();
  const { user, logout, isAdmin, refreshUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
  
  const [profileData, setProfileData] = useState({
    email: user?.email || '',
    username: user?.username || '',
    pubg_id: user?.pubg_id || ''
  });
  
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });

  const isRTL = language === 'ar';

  const handleProfileSave = async () => {
    setSaving(true);
    try {
      await axios.put(`${API}/auth/update-profile`, null, {
        params: {
          email: profileData.email,
          username: profileData.username,
          pubg_id: profileData.pubg_id
        }
      });
      toast.success(isRTL ? 'تم تحديث الملف الشخصي' : 'Profile updated');
      await refreshUser();
      setEditMode(false);
    } catch (error) {
      toast.error(error.response?.data?.detail || (isRTL ? 'فشل التحديث' : 'Update failed'));
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.new_password !== passwordData.confirm_password) {
      toast.error(isRTL ? 'كلمة المرور الجديدة غير متطابقة' : 'Passwords do not match');
      return;
    }
    
    if (passwordData.new_password.length < 6) {
      toast.error(isRTL ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters');
      return;
    }

    setSaving(true);
    try {
      await axios.put(`${API}/auth/change-password`, null, {
        params: {
          current_password: passwordData.current_password,
          new_password: passwordData.new_password
        }
      });
      toast.success(isRTL ? 'تم تغيير كلمة المرور بنجاح' : 'Password changed successfully');
      setShowPasswordForm(false);
      setPasswordData({ current_password: '', new_password: '', confirm_password: '' });
    } catch (error) {
      toast.error(error.response?.data?.detail || (isRTL ? 'فشل تغيير كلمة المرور' : 'Password change failed'));
    } finally {
      setSaving(false);
    }
  };

  const stats = [
    { icon: Coins, label: t('points'), value: user?.points?.toLocaleString() || 0, color: 'text-[#F39C12]' },
    { icon: TrendingUp, label: t('totalEarned'), value: user?.total_earned?.toLocaleString() || 0, color: 'text-green-500' },
    { icon: Gift, label: t('totalRedeemed'), value: user?.total_redeemed?.toLocaleString() || 0, color: 'text-blue-500' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0C] pb-24 noise-bg">
      <div className="relative z-10 p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-2xl text-white flex items-center gap-2">
            <User className="w-6 h-6" />
            {t('myProfile')}
          </h1>
          {!editMode && !showPasswordForm && (
            <button
              onClick={() => setEditMode(true)}
              className="p-2 bg-[#27272A] hover:bg-[#F39C12] hover:text-black text-white rounded-sm transition-colors"
            >
              <Edit2 className="w-5 h-5" />
            </button>
          )}
        </div>

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

          {editMode ? (
            /* Edit Profile Form */
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-[#8A8A93] mb-2">
                  {isRTL ? 'اسم المستخدم' : 'Username'}
                </label>
                <input
                  type="text"
                  value={profileData.username}
                  onChange={(e) => setProfileData(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full bg-[#0A0A0C] border border-[#27272A] rounded-sm px-3 py-2 text-white focus:border-[#F39C12]"
                />
              </div>
              <div>
                <label className="block text-xs text-[#8A8A93] mb-2">
                  {isRTL ? 'البريد الإلكتروني' : 'Email'}
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full bg-[#0A0A0C] border border-[#27272A] rounded-sm px-3 py-2 text-white focus:border-[#F39C12]"
                />
              </div>
              <div>
                <label className="block text-xs text-[#8A8A93] mb-2">
                  {isRTL ? 'معرف اللاعب' : 'Player ID'}
                </label>
                <input
                  type="text"
                  value={profileData.pubg_id}
                  onChange={(e) => setProfileData(prev => ({ ...prev, pubg_id: e.target.value }))}
                  className="w-full bg-[#0A0A0C] border border-[#27272A] rounded-sm px-3 py-2 text-white focus:border-[#F39C12]"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleProfileSave}
                  disabled={saving}
                  className="flex-1 bg-[#F39C12] hover:bg-[#E67E22] text-black py-2 rounded-sm flex items-center justify-center gap-2 transition-colors"
                >
                  {saving ? <div className="w-4 h-4 spinner" /> : <Save className="w-4 h-4" />}
                  {isRTL ? 'حفظ' : 'Save'}
                </button>
                <button
                  onClick={() => {
                    setEditMode(false);
                    setProfileData({
                      email: user?.email || '',
                      username: user?.username || '',
                      pubg_id: user?.pubg_id || ''
                    });
                  }}
                  className="flex-1 bg-[#27272A] hover:bg-[#3a3a3a] text-white py-2 rounded-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <X className="w-4 h-4" />
                  {isRTL ? 'إلغاء' : 'Cancel'}
                </button>
              </div>
            </div>
          ) : (
            /* View Profile */
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
          )}
        </div>

        {/* Change Password Section */}
        {!editMode && (
          <div className="bg-[#141419] border border-[#27272A] rounded-sm p-4 mb-6">
            {showPasswordForm ? (
              <div className="space-y-4">
                <h3 className="text-[#F39C12] font-semibold flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  {isRTL ? 'تغيير كلمة المرور' : 'Change Password'}
                </h3>
                
                <div>
                  <label className="block text-xs text-[#8A8A93] mb-2">
                    {isRTL ? 'كلمة المرور الحالية' : 'Current Password'}
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.current ? 'text' : 'password'}
                      value={passwordData.current_password}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, current_password: e.target.value }))}
                      className="w-full bg-[#0A0A0C] border border-[#27272A] rounded-sm px-3 py-2 text-white focus:border-[#F39C12]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                      className="absolute end-3 top-1/2 -translate-y-1/2 text-[#8A8A93]"
                    >
                      {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs text-[#8A8A93] mb-2">
                    {isRTL ? 'كلمة المرور الجديدة' : 'New Password'}
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.new ? 'text' : 'password'}
                      value={passwordData.new_password}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, new_password: e.target.value }))}
                      className="w-full bg-[#0A0A0C] border border-[#27272A] rounded-sm px-3 py-2 text-white focus:border-[#F39C12]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                      className="absolute end-3 top-1/2 -translate-y-1/2 text-[#8A8A93]"
                    >
                      {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs text-[#8A8A93] mb-2">
                    {isRTL ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirm ? 'text' : 'password'}
                      value={passwordData.confirm_password}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, confirm_password: e.target.value }))}
                      className="w-full bg-[#0A0A0C] border border-[#27272A] rounded-sm px-3 py-2 text-white focus:border-[#F39C12]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                      className="absolute end-3 top-1/2 -translate-y-1/2 text-[#8A8A93]"
                    >
                      {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={handlePasswordChange}
                    disabled={saving}
                    className="flex-1 bg-[#F39C12] hover:bg-[#E67E22] text-black py-2 rounded-sm flex items-center justify-center gap-2"
                  >
                    {saving ? <div className="w-4 h-4 spinner" /> : <Save className="w-4 h-4" />}
                    {isRTL ? 'تغيير' : 'Change'}
                  </button>
                  <button
                    onClick={() => {
                      setShowPasswordForm(false);
                      setPasswordData({ current_password: '', new_password: '', confirm_password: '' });
                    }}
                    className="flex-1 bg-[#27272A] hover:bg-[#3a3a3a] text-white py-2 rounded-sm flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    {isRTL ? 'إلغاء' : 'Cancel'}
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowPasswordForm(true)}
                className="w-full flex items-center justify-between text-white hover:text-[#F39C12] transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  {isRTL ? 'تغيير كلمة المرور' : 'Change Password'}
                </span>
                <Edit2 className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Statistics */}
        {!editMode && !showPasswordForm && (
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
        )}

        {/* Referral Code */}
        {!editMode && !showPasswordForm && (
          <div className="bg-[#141419] border border-[#27272A] rounded-sm p-4 mb-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[#8A8A93] mb-2">
              {t('yourReferralCode')}
            </p>
            <p className="font-display text-xl text-[#F39C12]" data-testid="profile-referral-code">
              {user?.referral_code}
            </p>
          </div>
        )}

        {/* Logout Button */}
        {!editMode && !showPasswordForm && (
          <button
            onClick={logout}
            data-testid="logout-btn"
            className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 py-4 rounded-sm uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            {t('logout')}
          </button>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSettings } from '../contexts/SettingsContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  Settings, Save, Palette, Type, Image, 
  DollarSign, Mail, MessageCircle, Shield,
  RefreshCw, Check
} from 'lucide-react';
import { toast } from 'sonner';

export function SettingsPage() {
  const { language } = useLanguage();
  const { settings, updateSettings, refreshSettings } = useSettings();
  const { isAdmin } = useAuth();
  const [formData, setFormData] = useState(settings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setSaved(false);
  };

  const handleSocialChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      social_links: {
        ...prev.social_links,
        [platform]: value
      }
    }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    const success = await updateSettings(formData);
    if (success) {
      toast.success(language === 'ar' ? 'تم حفظ الإعدادات بنجاح' : 'Settings saved successfully');
      setSaved(true);
      refreshSettings();
    } else {
      toast.error(language === 'ar' ? 'فشل حفظ الإعدادات' : 'Failed to save settings');
    }
    setSaving(false);
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

  const isRTL = language === 'ar';

  return (
    <div className="min-h-screen bg-[#0A0A0C] pb-24 noise-bg">
      <div className="relative z-10 p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-2xl text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#F39C12]" />
            {isRTL ? 'إعدادات التطبيق' : 'App Settings'}
          </h1>
          <button
            onClick={handleSave}
            disabled={saving}
            data-testid="save-settings-btn"
            className={`flex items-center gap-2 px-4 py-2 rounded-sm text-sm uppercase tracking-[0.15em] transition-colors ${
              saved 
                ? 'bg-green-500/20 text-green-500' 
                : 'bg-[#F39C12] text-black hover:bg-[#E67E22]'
            }`}
          >
            {saving ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : saved ? (
              <Check className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {isRTL ? 'حفظ' : 'Save'}
          </button>
        </div>

        {/* App Identity */}
        <div className="bg-[#141419] border border-[#27272A] rounded-sm p-4 mb-4">
          <h2 className="text-[#F39C12] text-sm uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <Type className="w-4 h-4" />
            {isRTL ? 'هوية التطبيق' : 'App Identity'}
          </h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#8A8A93] mb-2">
                  {isRTL ? 'اسم التطبيق (إنجليزي)' : 'App Name (English)'}
                </label>
                <input
                  type="text"
                  value={formData.app_name || ''}
                  onChange={(e) => handleChange('app_name', e.target.value)}
                  data-testid="app-name-input"
                  className="w-full bg-[#0A0A0C] border border-[#27272A] rounded-sm px-3 py-2 text-white text-sm focus:border-[#F39C12]"
                />
              </div>
              <div>
                <label className="block text-xs text-[#8A8A93] mb-2">
                  {isRTL ? 'اسم التطبيق (عربي)' : 'App Name (Arabic)'}
                </label>
                <input
                  type="text"
                  value={formData.app_name_ar || ''}
                  onChange={(e) => handleChange('app_name_ar', e.target.value)}
                  data-testid="app-name-ar-input"
                  className="w-full bg-[#0A0A0C] border border-[#27272A] rounded-sm px-3 py-2 text-white text-sm focus:border-[#F39C12]"
                  dir="rtl"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#8A8A93] mb-2">
                  {isRTL ? 'الشعار (إنجليزي)' : 'Tagline (English)'}
                </label>
                <input
                  type="text"
                  value={formData.tagline || ''}
                  onChange={(e) => handleChange('tagline', e.target.value)}
                  className="w-full bg-[#0A0A0C] border border-[#27272A] rounded-sm px-3 py-2 text-white text-sm focus:border-[#F39C12]"
                />
              </div>
              <div>
                <label className="block text-xs text-[#8A8A93] mb-2">
                  {isRTL ? 'الشعار (عربي)' : 'Tagline (Arabic)'}
                </label>
                <input
                  type="text"
                  value={formData.tagline_ar || ''}
                  onChange={(e) => handleChange('tagline_ar', e.target.value)}
                  className="w-full bg-[#0A0A0C] border border-[#27272A] rounded-sm px-3 py-2 text-white text-sm focus:border-[#F39C12]"
                  dir="rtl"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#8A8A93] mb-2 flex items-center gap-2">
                <Image className="w-3 h-3" />
                {isRTL ? 'رابط الشعار (اختياري)' : 'Logo URL (optional)'}
              </label>
              <input
                type="url"
                value={formData.logo_url || ''}
                onChange={(e) => handleChange('logo_url', e.target.value)}
                placeholder="https://example.com/logo.png"
                className="w-full bg-[#0A0A0C] border border-[#27272A] rounded-sm px-3 py-2 text-white text-sm focus:border-[#F39C12]"
              />
            </div>
          </div>
        </div>

        {/* Colors */}
        <div className="bg-[#141419] border border-[#27272A] rounded-sm p-4 mb-4">
          <h2 className="text-[#F39C12] text-sm uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <Palette className="w-4 h-4" />
            {isRTL ? 'الألوان' : 'Colors'}
          </h2>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-[#8A8A93] mb-2">
                {isRTL ? 'اللون الرئيسي' : 'Primary Color'}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={formData.primary_color || '#F39C12'}
                  onChange={(e) => handleChange('primary_color', e.target.value)}
                  className="w-10 h-10 rounded-sm cursor-pointer border-0"
                />
                <input
                  type="text"
                  value={formData.primary_color || '#F39C12'}
                  onChange={(e) => handleChange('primary_color', e.target.value)}
                  className="flex-1 bg-[#0A0A0C] border border-[#27272A] rounded-sm px-2 py-1 text-white text-xs"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-[#8A8A93] mb-2">
                {isRTL ? 'اللون الثانوي' : 'Secondary Color'}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={formData.secondary_color || '#E67E22'}
                  onChange={(e) => handleChange('secondary_color', e.target.value)}
                  className="w-10 h-10 rounded-sm cursor-pointer border-0"
                />
                <input
                  type="text"
                  value={formData.secondary_color || '#E67E22'}
                  onChange={(e) => handleChange('secondary_color', e.target.value)}
                  className="flex-1 bg-[#0A0A0C] border border-[#27272A] rounded-sm px-2 py-1 text-white text-xs"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-[#8A8A93] mb-2">
                {isRTL ? 'لون الخلفية' : 'Background'}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={formData.background_color || '#0A0A0C'}
                  onChange={(e) => handleChange('background_color', e.target.value)}
                  className="w-10 h-10 rounded-sm cursor-pointer border-0"
                />
                <input
                  type="text"
                  value={formData.background_color || '#0A0A0C'}
                  onChange={(e) => handleChange('background_color', e.target.value)}
                  className="flex-1 bg-[#0A0A0C] border border-[#27272A] rounded-sm px-2 py-1 text-white text-xs"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Points Settings */}
        <div className="bg-[#141419] border border-[#27272A] rounded-sm p-4 mb-4">
          <h2 className="text-[#F39C12] text-sm uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            {isRTL ? 'إعدادات النقاط' : 'Points Settings'}
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#8A8A93] mb-2">
                {isRTL ? 'نقاط لكل إعلان' : 'Points per Ad'}
              </label>
              <input
                type="number"
                value={formData.points_per_ad || 10}
                onChange={(e) => handleChange('points_per_ad', parseInt(e.target.value) || 0)}
                data-testid="points-per-ad-input"
                className="w-full bg-[#0A0A0C] border border-[#27272A] rounded-sm px-3 py-2 text-white text-sm focus:border-[#F39C12]"
              />
            </div>
            <div>
              <label className="block text-xs text-[#8A8A93] mb-2">
                {isRTL ? 'مكافأة الإحالة' : 'Referral Bonus'}
              </label>
              <input
                type="number"
                value={formData.referral_bonus || 200}
                onChange={(e) => handleChange('referral_bonus', parseInt(e.target.value) || 0)}
                data-testid="referral-bonus-input"
                className="w-full bg-[#0A0A0C] border border-[#27272A] rounded-sm px-3 py-2 text-white text-sm focus:border-[#F39C12]"
              />
            </div>
          </div>
        </div>

        {/* Contact & Social */}
        <div className="bg-[#141419] border border-[#27272A] rounded-sm p-4">
          <h2 className="text-[#F39C12] text-sm uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            {isRTL ? 'التواصل' : 'Contact & Social'}
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-[#8A8A93] mb-2 flex items-center gap-2">
                <Mail className="w-3 h-3" />
                {isRTL ? 'البريد الإلكتروني' : 'Contact Email'}
              </label>
              <input
                type="email"
                value={formData.contact_email || ''}
                onChange={(e) => handleChange('contact_email', e.target.value)}
                placeholder="support@example.com"
                className="w-full bg-[#0A0A0C] border border-[#27272A] rounded-sm px-3 py-2 text-white text-sm focus:border-[#F39C12]"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-[#8A8A93] mb-2">Telegram</label>
                <input
                  type="text"
                  value={formData.social_links?.telegram || ''}
                  onChange={(e) => handleSocialChange('telegram', e.target.value)}
                  placeholder="@username"
                  className="w-full bg-[#0A0A0C] border border-[#27272A] rounded-sm px-3 py-2 text-white text-sm focus:border-[#F39C12]"
                />
              </div>
              <div>
                <label className="block text-xs text-[#8A8A93] mb-2">WhatsApp</label>
                <input
                  type="text"
                  value={formData.social_links?.whatsapp || ''}
                  onChange={(e) => handleSocialChange('whatsapp', e.target.value)}
                  placeholder="+966..."
                  className="w-full bg-[#0A0A0C] border border-[#27272A] rounded-sm px-3 py-2 text-white text-sm focus:border-[#F39C12]"
                />
              </div>
              <div>
                <label className="block text-xs text-[#8A8A93] mb-2">Instagram</label>
                <input
                  type="text"
                  value={formData.social_links?.instagram || ''}
                  onChange={(e) => handleSocialChange('instagram', e.target.value)}
                  placeholder="@username"
                  className="w-full bg-[#0A0A0C] border border-[#27272A] rounded-sm px-3 py-2 text-white text-sm focus:border-[#F39C12]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Preview Note */}
        <div className="mt-6 text-center">
          <p className="text-[#8A8A93] text-xs">
            {isRTL 
              ? '* بعض التغييرات تتطلب إعادة تحميل الصفحة لتظهر' 
              : '* Some changes require page reload to take effect'}
          </p>
        </div>
      </div>
    </div>
  );
}

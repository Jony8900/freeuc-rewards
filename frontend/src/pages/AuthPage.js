import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Gamepad2, Coins } from 'lucide-react';
import { toast } from 'sonner';

export function AuthPage() {
  const { t, isRTL } = useLanguage();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    pubg_id: '',
    referral_code: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        toast.success(t('success'));
      } else {
        await register(formData);
        toast.success(t('success'));
      }
    } catch (error) {
      const message = error.response?.data?.detail || t('error');
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] flex flex-col items-center justify-center p-4 noise-bg">
      {/* Background Image */}
      <div 
        className="fixed inset-0 opacity-20 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.pexels.com/photos/6125333/pexels-photo-6125333.jpeg)' }}
      />
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <Coins className="w-12 h-12 text-[#F39C12]" />
            <h1 className="font-display text-4xl text-white tracking-tight">PUBG UC</h1>
          </div>
          <p className="text-[#8A8A93] text-sm uppercase tracking-[0.2em]">
            {isRTL ? 'اربح UC مجاناً' : 'EARN FREE UC'}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-[#141419] border border-[#27272A] rounded-sm p-6">
          {/* Tabs */}
          <div className="flex mb-6 border-b border-[#27272A]">
            <button
              onClick={() => setIsLogin(true)}
              data-testid="login-tab"
              className={`flex-1 pb-3 text-sm uppercase tracking-[0.2em] transition-colors ${
                isLogin ? 'text-[#F39C12] border-b-2 border-[#F39C12]' : 'text-[#8A8A93]'
              }`}
            >
              {t('login')}
            </button>
            <button
              onClick={() => setIsLogin(false)}
              data-testid="register-tab"
              className={`flex-1 pb-3 text-sm uppercase tracking-[0.2em] transition-colors ${
                !isLogin ? 'text-[#F39C12] border-b-2 border-[#F39C12]' : 'text-[#8A8A93]'
              }`}
            >
              {t('register')}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-[#8A8A93] mb-2">
                    {t('username')}
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required={!isLogin}
                    data-testid="username-input"
                    className="w-full bg-[#0A0A0C] border border-[#27272A] rounded-sm px-4 py-3 text-white focus:border-[#F39C12] transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-[#8A8A93] mb-2">
                    {t('pubgId')}
                  </label>
                  <div className="relative">
                    <Gamepad2 className="absolute start-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A8A93]" />
                    <input
                      type="text"
                      name="pubg_id"
                      value={formData.pubg_id}
                      onChange={handleChange}
                      required={!isLogin}
                      data-testid="pubg-id-input"
                      className="w-full bg-[#0A0A0C] border border-[#27272A] rounded-sm ps-11 pe-4 py-3 text-white focus:border-[#F39C12] transition-colors"
                    />
                  </div>
                </div>
              </>
            )}
            
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-[#8A8A93] mb-2">
                {t('email')}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                data-testid="email-input"
                className="w-full bg-[#0A0A0C] border border-[#27272A] rounded-sm px-4 py-3 text-white focus:border-[#F39C12] transition-colors"
              />
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-[#8A8A93] mb-2">
                {t('password')}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  data-testid="password-input"
                  className="w-full bg-[#0A0A0C] border border-[#27272A] rounded-sm px-4 py-3 text-white focus:border-[#F39C12] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute end-3 top-1/2 -translate-y-1/2 text-[#8A8A93] hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-xs uppercase tracking-[0.2em] text-[#8A8A93] mb-2">
                  {t('referralCode')}
                </label>
                <input
                  type="text"
                  name="referral_code"
                  value={formData.referral_code}
                  onChange={handleChange}
                  data-testid="referral-code-input"
                  className="w-full bg-[#0A0A0C] border border-[#27272A] rounded-sm px-4 py-3 text-white focus:border-[#F39C12] transition-colors"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              data-testid="auth-submit-button"
              className="w-full bg-[#F39C12] hover:bg-[#E67E22] text-black font-semibold py-3 rounded-sm uppercase tracking-[0.2em] text-sm transition-colors disabled:opacity-50 pulse-gold"
            >
              {loading ? (
                <span className="inline-block w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                isLogin ? t('login') : t('register')
              )}
            </button>
          </form>

          <p className="text-center text-[#8A8A93] text-sm mt-6">
            {isLogin ? t('noAccount') : t('hasAccount')}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#F39C12] hover:underline"
            >
              {isLogin ? t('register') : t('login')}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

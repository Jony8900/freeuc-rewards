import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Logo } from '../components/Logo';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export function ResetPasswordPage() {
  const { t, isRTL } = useLanguage();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (!token) {
    return (
      <div className="min-h-screen bg-[#0A0A0C] flex flex-col items-center justify-center p-4 noise-bg">
        <div className="relative z-10 w-full max-w-md text-center">
          <Logo size={72} />
          <h1 className="font-display text-3xl text-white tracking-tight mt-4 mb-4">GetFreeUC</h1>
          <div className="bg-[#141419] border border-[#27272A] rounded-sm p-6">
            <p className="text-red-400 text-lg mb-4" data-testid="invalid-reset-link">{t('invalidResetLink')}</p>
            <Link
              to="/auth"
              data-testid="back-to-login-invalid"
              className="text-[#F39C12] hover:underline text-sm"
            >
              {t('backToLogin')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      toast.error(t('passwordTooShort'));
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error(t('passwordMismatch'));
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${API}/auth/reset-password`, {
        token,
        new_password: newPassword
      });
      setSuccess(true);
      toast.success(t('resetSuccess'));
    } catch (error) {
      const message = error.response?.data?.detail || t('error');
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] flex flex-col items-center justify-center p-4 noise-bg">
      <div
        className="fixed inset-0 opacity-20 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.pexels.com/photos/6125333/pexels-photo-6125333.jpeg)' }}
      />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex flex-col items-center gap-2 mb-4">
            <Logo size={72} />
            <h1 className="font-display text-3xl text-white tracking-tight">GetFreeUC</h1>
          </div>
        </div>

        <div className="bg-[#141419] border border-[#27272A] rounded-sm p-6">
          {success ? (
            <div className="text-center py-6" data-testid="reset-success">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-white text-xl font-semibold mb-3">{t('resetSuccess')}</h2>
              <button
                onClick={() => navigate('/auth')}
                data-testid="go-to-login-btn"
                className="mt-4 bg-[#F39C12] hover:bg-[#E67E22] text-black font-semibold py-3 px-8 rounded-sm uppercase tracking-[0.2em] text-sm transition-colors"
              >
                {t('login')}
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-white text-lg font-semibold mb-2 text-center">
                {t('resetPassword')}
              </h2>
              <p className="text-[#8A8A93] text-sm mb-6 text-center">
                {isRTL ? 'أدخل كلمة المرور الجديدة' : 'Enter your new password'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-[#8A8A93] mb-2">
                    {t('newPassword')}
                  </label>
                  <div className="relative">
                    <Lock className="absolute start-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A8A93]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      minLength={6}
                      data-testid="new-password-input"
                      className="w-full bg-[#0A0A0C] border border-[#27272A] rounded-sm ps-11 pe-11 py-3 text-white focus:border-[#F39C12] transition-colors"
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

                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-[#8A8A93] mb-2">
                    {t('confirmPassword')}
                  </label>
                  <div className="relative">
                    <Lock className="absolute start-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A8A93]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      minLength={6}
                      data-testid="confirm-password-input"
                      className="w-full bg-[#0A0A0C] border border-[#27272A] rounded-sm ps-11 pe-4 py-3 text-white focus:border-[#F39C12] transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  data-testid="reset-password-submit-btn"
                  className="w-full bg-[#F39C12] hover:bg-[#E67E22] text-black font-semibold py-3 rounded-sm uppercase tracking-[0.2em] text-sm transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <span className="inline-block w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    t('resetPasswordBtn')
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

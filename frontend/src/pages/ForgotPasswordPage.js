import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Mail, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Logo } from '../components/Logo';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export function ForgotPasswordPage() {
  const { t, isRTL } = useLanguage();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API}/auth/forgot-password`, { email });
      setSent(true);
      toast.success(t('resetEmailSent'));
    } catch (error) {
      const message = error.response?.data?.detail || t('error');
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

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
          {sent ? (
            <div className="text-center py-6" data-testid="reset-email-sent">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-white text-xl font-semibold mb-3">{t('resetEmailSent')}</h2>
              <p className="text-[#8A8A93] text-sm mb-6 leading-relaxed">
                {isRTL
                  ? 'تحقق من بريدك الإلكتروني واضغط على الرابط لإعادة تعيين كلمة المرور'
                  : 'Check your email and click the link to reset your password'}
              </p>
              <Link
                to="/auth"
                data-testid="back-to-login-link"
                className="inline-flex items-center gap-2 text-[#F39C12] hover:underline text-sm"
              >
                <BackArrow className="w-4 h-4" />
                {t('backToLogin')}
              </Link>
            </div>
          ) : (
            <>
              <h2 className="text-white text-lg font-semibold mb-2 text-center">
                {t('forgotPasswordTitle')}
              </h2>
              <p className="text-[#8A8A93] text-sm mb-6 text-center leading-relaxed">
                {t('forgotPasswordDesc')}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-[0.2em] text-[#8A8A93] mb-2">
                    {t('email')}
                  </label>
                  <div className="relative">
                    <Mail className="absolute start-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A8A93]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      data-testid="forgot-email-input"
                      className="w-full bg-[#0A0A0C] border border-[#27272A] rounded-sm ps-11 pe-4 py-3 text-white focus:border-[#F39C12] transition-colors"
                      placeholder={isRTL ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  data-testid="send-reset-link-btn"
                  className="w-full bg-[#F39C12] hover:bg-[#E67E22] text-black font-semibold py-3 rounded-sm uppercase tracking-[0.2em] text-sm transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <span className="inline-block w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  ) : (
                    t('sendResetLink')
                  )}
                </button>
              </form>

              <div className="text-center mt-6">
                <Link
                  to="/auth"
                  data-testid="back-to-login-from-forgot"
                  className="inline-flex items-center gap-2 text-[#F39C12] hover:underline text-sm"
                >
                  <BackArrow className="w-4 h-4" />
                  {t('backToLogin')}
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Target, TrendingUp, Gift, Users, Shield, Star, ChevronDown, Trophy, Zap } from 'lucide-react';
import { Logo } from '../components/Logo';
import { AdBanner } from '../components/AdsManager';

export function LandingPage() {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const navigate = useNavigate();

  const features = isRTL ? [
    { icon: Target, title: 'شاهد واربح', desc: 'شاهد إعلانات قصيرة واحصل على نقاط فورية. كل مشاهدة تقربك من هدفك!' },
    { icon: TrendingUp, title: '5 مستويات', desc: 'ارتقِ من مبتدئ إلى ماسي واحصل على مضاعف نقاط يصل إلى x3!' },
    { icon: Gift, title: 'مكافآت يومية', desc: 'سجّل دخولك يومياً واحصل على مكافآت تزداد مع كل يوم متتالي.' },
    { icon: Users, title: 'ادعُ أصدقاءك', desc: 'شارك كودك واحصل على 200 نقطة لكل صديق يسجل معك!' },
    { icon: Trophy, title: 'تنافس وتصدّر', desc: 'لوحة متصدرين تعرض أفضل اللاعبين. هل ستكون من بينهم؟' },
    { icon: Shield, title: 'آمن وموثوق', desc: 'بياناتك محمية بتشفير قوي. نحترم خصوصيتك ونحميها.' },
  ] : [
    { icon: Target, title: 'Watch & Earn', desc: 'Watch short ads and get instant points. Each view brings you closer to your goal!' },
    { icon: TrendingUp, title: '5 Levels', desc: 'Rise from Beginner to Diamond and get up to x3 points multiplier!' },
    { icon: Gift, title: 'Daily Rewards', desc: 'Log in daily and receive rewards that increase with each consecutive day.' },
    { icon: Users, title: 'Invite Friends', desc: 'Share your code and get 200 points for each friend who joins!' },
    { icon: Trophy, title: 'Compete & Lead', desc: 'Leaderboard showing top players. Will you be among them?' },
    { icon: Shield, title: 'Safe & Trusted', desc: 'Your data is protected with strong encryption. We respect your privacy.' },
  ];

  const packages = [
    { uc: '60', points: '6,500' },
    { uc: '325', points: '32,000' },
    { uc: '660', points: '65,000' },
    { uc: '1,800', points: '160,000' },
    { uc: '3,850', points: '325,000' },
    { uc: '8,100', points: '650,000' },
  ];

  const steps = isRTL ? [
    { num: '1', title: 'سجّل مجاناً', desc: 'أنشئ حسابك في ثوانٍ باستخدام بريدك الإلكتروني.' },
    { num: '2', title: 'شاهد الإعلانات', desc: 'شاهد إعلانات قصيرة واربح نقاطاً مع كل مشاهدة.' },
    { num: '3', title: 'اجمع النقاط', desc: 'اجمع النقاط من الإعلانات والمهام والمكافآت اليومية والإحالات.' },
    { num: '4', title: 'استبدل بـ UC', desc: 'حوّل نقاطك إلى UC واستمتع بألعابك المفضلة!' },
  ] : [
    { num: '1', title: 'Sign Up Free', desc: 'Create your account in seconds using your email.' },
    { num: '2', title: 'Watch Ads', desc: 'Watch short ads and earn points with every view.' },
    { num: '3', title: 'Collect Points', desc: 'Collect points from ads, tasks, daily bonuses, and referrals.' },
    { num: '4', title: 'Redeem for UC', desc: 'Convert your points to UC and enjoy your favorite games!' },
  ];

  const faqs = isRTL ? [
    { q: 'هل GetFreeUC مجاني؟', a: 'نعم! التطبيق مجاني تماماً. تكسب النقاط بمشاهدة الإعلانات ولا تحتاج لدفع أي شيء.' },
    { q: 'كيف أستلم الـ UC؟', a: 'بعد تقديم طلب الاستبدال، يقوم فريقنا بمراجعة الطلب وإرسال UC إلى حسابك عبر معرف اللاعب الخاص بك خلال 24-48 ساعة.' },
    { q: 'ما هو نظام المستويات؟', a: 'هناك 5 مستويات: مبتدئ (x1)، برونزي (x1.2)، فضي (x1.5)، ذهبي (x2)، ماسي (x3). كلما ارتفع مستواك، زادت نقاطك لكل إعلان!' },
    { q: 'هل بياناتي آمنة؟', a: 'نعم! نستخدم تشفير SSL/HTTPS لحماية اتصالاتك وتشفير bcrypt لكلمات المرور. لا نشارك بياناتك مع أطراف ثالثة.' },
  ] : [
    { q: 'Is GetFreeUC free?', a: 'Yes! The app is completely free. You earn points by watching ads and never need to pay anything.' },
    { q: 'How do I receive UC?', a: 'After submitting a redemption request, our team reviews it and sends UC to your account via your Player ID within 24-48 hours.' },
    { q: 'What is the leveling system?', a: 'There are 5 levels: Beginner (x1), Bronze (x1.2), Silver (x1.5), Gold (x2), Diamond (x3). The higher your level, the more points per ad!' },
    { q: 'Is my data safe?', a: 'Yes! We use SSL/HTTPS encryption and bcrypt for passwords. We never share your data with third parties.' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0C]" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F39C12]/5 to-transparent" />
        <div className="max-w-5xl mx-auto px-4 pt-12 pb-16 relative z-10">
          <div className="text-center">
            <div className="inline-flex flex-col items-center gap-3 mb-6">
              <Logo size={80} />
              <h1 className="font-display text-4xl sm:text-5xl text-white tracking-tight">
                GetFreeUC
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-[#F39C12] font-semibold mb-4">
              {isRTL ? 'اربح UC مجاناً بمشاهدة الإعلانات!' : 'Earn Free UC by Watching Ads!'}
            </p>
            <p className="text-[#8A8A93] text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              {isRTL
                ? 'GetFreeUC هو المنصة الأولى التي تتيح لك كسب نقاط مجانية واستبدالها بـ UC لألعابك المفضلة. سجّل الآن وابدأ الربح!'
                : 'GetFreeUC is the first platform that lets you earn free points and redeem them for UC in your favorite games. Sign up now and start earning!'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button
                onClick={() => navigate('/auth')}
                data-testid="hero-signup-btn"
                className="bg-[#F39C12] hover:bg-[#E67E22] text-black font-bold py-3 px-10 rounded-sm uppercase tracking-[0.2em] text-sm transition-colors"
              >
                {isRTL ? 'سجّل الآن مجاناً' : 'Sign Up Free Now'}
              </button>
              <button
                onClick={() => navigate('/auth')}
                data-testid="hero-login-btn"
                className="border border-[#27272A] hover:border-[#F39C12] text-white py-3 px-10 rounded-sm uppercase tracking-[0.2em] text-sm transition-colors"
              >
                {isRTL ? 'تسجيل الدخول' : 'Login'}
              </button>
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <ChevronDown className="w-6 h-6 text-[#8A8A93] animate-bounce" />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#141419] border-y border-[#27272A] py-6">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-[#F39C12] text-2xl sm:text-3xl font-display">10K+</p>
            <p className="text-[#8A8A93] text-xs">{isRTL ? 'مستخدم نشط' : 'Active Users'}</p>
          </div>
          <div>
            <p className="text-[#F39C12] text-2xl sm:text-3xl font-display">50K+</p>
            <p className="text-[#8A8A93] text-xs">{isRTL ? 'UC تم توزيعها' : 'UC Distributed'}</p>
          </div>
          <div>
            <p className="text-[#F39C12] text-2xl sm:text-3xl font-display">100K+</p>
            <p className="text-[#8A8A93] text-xs">{isRTL ? 'إعلان تمت مشاهدته' : 'Ads Watched'}</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl text-white font-display text-center mb-3">
            {isRTL ? 'كيف يعمل؟' : 'How It Works?'}
          </h2>
          <p className="text-[#8A8A93] text-sm text-center mb-10 max-w-lg mx-auto">
            {isRTL ? '4 خطوات بسيطة لبدء كسب UC مجاناً' : '4 simple steps to start earning free UC'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, i) => (
              <div key={i} className="bg-[#141419] border border-[#27272A] rounded-sm p-5 text-center hover:border-[#F39C12]/30 transition-colors">
                <div className="w-12 h-12 rounded-full bg-[#F39C12] text-black font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="text-white font-semibold text-sm mb-2">{step.title}</h3>
                <p className="text-[#8A8A93] text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="max-w-5xl mx-auto px-4">
        <AdBanner slot="auto" format="auto" />
      </div>

      {/* Features */}
      <section className="py-16 px-4 bg-[#141419]/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl text-white font-display text-center mb-3">
            {isRTL ? 'لماذا GetFreeUC؟' : 'Why GetFreeUC?'}
          </h2>
          <p className="text-[#8A8A93] text-sm text-center mb-10 max-w-lg mx-auto">
            {isRTL ? 'مميزات تجعلنا الخيار الأفضل لكسب UC مجاناً' : 'Features that make us the best choice for earning free UC'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <div key={i} className="bg-[#0A0A0C] border border-[#27272A] rounded-sm p-5 hover:border-[#F39C12]/30 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#F39C12]/10 flex items-center justify-center mb-3">
                  <f.icon className="w-5 h-5 text-[#F39C12]" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-2">{f.title}</h3>
                <p className="text-[#8A8A93] text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UC Packages */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl text-white font-display text-center mb-3">
            {isRTL ? 'باقات UC المتاحة' : 'Available UC Packages'}
          </h2>
          <p className="text-[#8A8A93] text-sm text-center mb-10 max-w-lg mx-auto">
            {isRTL ? 'اختر الباقة المناسبة واستبدل نقاطك' : 'Choose the right package and redeem your points'}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {packages.map((pkg, i) => (
              <div key={i} className="bg-[#141419] border border-[#27272A] rounded-sm p-4 text-center hover:border-[#F39C12]/50 transition-colors">
                <Zap className="w-6 h-6 text-[#F39C12] mx-auto mb-2" />
                <p className="text-[#F39C12] text-xl font-display">{pkg.uc}</p>
                <p className="text-white text-xs mb-1">UC</p>
                <p className="text-[#8A8A93] text-xs">{pkg.points} {isRTL ? 'نقطة' : 'points'}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Levels */}
      <section className="py-16 px-4 bg-[#141419]/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl text-white font-display text-center mb-3">
            {isRTL ? 'نظام المستويات' : 'Leveling System'}
          </h2>
          <p className="text-[#8A8A93] text-sm text-center mb-10 max-w-lg mx-auto">
            {isRTL ? 'كلما لعبت أكثر، ربحت أكثر!' : 'The more you play, the more you earn!'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: isRTL ? 'مبتدئ' : 'Beginner', mult: 'x1.0', color: '#8A8A93' },
              { name: isRTL ? 'برونزي' : 'Bronze', mult: 'x1.2', color: '#CD7F32' },
              { name: isRTL ? 'فضي' : 'Silver', mult: 'x1.5', color: '#C0C0C0' },
              { name: isRTL ? 'ذهبي' : 'Gold', mult: 'x2.0', color: '#FFD700' },
              { name: isRTL ? 'ماسي' : 'Diamond', mult: 'x3.0', color: '#B9F2FF' },
            ].map((lvl, i) => (
              <div key={i} className="bg-[#0A0A0C] border border-[#27272A] rounded-sm p-4 w-32 text-center">
                <Star className="w-8 h-8 mx-auto mb-2" style={{ color: lvl.color }} />
                <p className="text-sm font-semibold" style={{ color: lvl.color }}>{lvl.name}</p>
                <p className="text-[#F39C12] font-display text-lg mt-1">{lvl.mult}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <div className="max-w-5xl mx-auto px-4 py-4">
        <AdBanner slot="auto" format="auto" />
      </div>

      {/* FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl text-white font-display text-center mb-10">
            {isRTL ? 'الأسئلة الشائعة' : 'FAQ'}
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-[#141419] border border-[#27272A] rounded-sm group">
                <summary className="p-4 cursor-pointer text-white text-sm font-semibold list-none flex justify-between items-center">
                  {faq.q}
                  <ChevronDown className="w-4 h-4 text-[#8A8A93] group-open:rotate-180 transition-transform" />
                </summary>
                <p className="px-4 pb-4 text-[#8A8A93] text-sm leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-t from-[#F39C12]/5 to-transparent">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl text-white font-display mb-4">
            {isRTL ? 'ابدأ الآن واربح UC مجاناً!' : 'Start Now and Earn Free UC!'}
          </h2>
          <p className="text-[#8A8A93] text-sm mb-8">
            {isRTL ? 'انضم لآلاف اللاعبين الذين يربحون UC يومياً' : 'Join thousands of players earning UC daily'}
          </p>
          <button
            onClick={() => navigate('/auth')}
            data-testid="cta-signup-btn"
            className="bg-[#F39C12] hover:bg-[#E67E22] text-black font-bold py-4 px-12 rounded-sm uppercase tracking-[0.2em] text-sm transition-colors"
          >
            {isRTL ? 'سجّل مجاناً الآن' : 'Sign Up Free Now'}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#141419] border-t border-[#27272A] py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Logo size={24} />
              <span className="text-white font-display text-sm">GetFreeUC</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-[#8A8A93]">
              <a href="/about" className="hover:text-[#F39C12] transition-colors">{isRTL ? 'حول التطبيق' : 'About'}</a>
              <a href="/faq" className="hover:text-[#F39C12] transition-colors">{isRTL ? 'الأسئلة الشائعة' : 'FAQ'}</a>
              <a href="/guides" className="hover:text-[#F39C12] transition-colors">{isRTL ? 'الأدلة' : 'Guides'}</a>
              <a href="/privacy-policy" className="hover:text-[#F39C12] transition-colors">{isRTL ? 'الخصوصية' : 'Privacy'}</a>
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="text-[#8A8A93]/40 text-xs">
              {isRTL ? 'GetFreeUC - تطبيق مستقل غير تابع لأي شركة ألعاب' : 'GetFreeUC - Independent app not affiliated with any game company'}
            </p>
            <p className="text-[#8A8A93]/40 text-xs mt-1">© 2026 GetFreeUC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

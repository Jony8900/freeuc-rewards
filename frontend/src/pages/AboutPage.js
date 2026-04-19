import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Info, Target, Gift, Shield, Users, TrendingUp } from 'lucide-react';
import { Logo } from '../components/Logo';
import { AdBanner } from '../components/AdsManager';

export function AboutPage() {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  const features = isRTL ? [
    { icon: Target, title: 'شاهد واربح', desc: 'شاهد إعلانات قصيرة واربح نقاط يمكنك استبدالها بـ UC لألعابك المفضلة.' },
    { icon: TrendingUp, title: 'نظام المستويات', desc: '5 مستويات من مبتدئ إلى ماسي. كل مستوى يزيد مضاعف نقاطك حتى x3!' },
    { icon: Gift, title: 'مكافآت يومية', desc: 'سجّل دخولك يومياً واحصل على مكافآت إضافية. كلما زادت أيامك المتتالية، زادت مكافأتك.' },
    { icon: Users, title: 'نظام الإحالات', desc: 'ادعُ أصدقاءك واحصل على 200 نقطة لكل صديق يسجل باستخدام كودك.' },
    { icon: Shield, title: 'آمن وموثوق', desc: 'بياناتك محمية بتشفير قوي. نحن نحترم خصوصيتك ونلتزم بحمايتها.' },
  ] : [
    { icon: Target, title: 'Watch & Earn', desc: 'Watch short ads and earn points that you can redeem for UC in your favorite games.' },
    { icon: TrendingUp, title: 'Leveling System', desc: '5 levels from Beginner to Diamond. Each level increases your points multiplier up to x3!' },
    { icon: Gift, title: 'Daily Rewards', desc: 'Log in daily and get extra rewards. The more consecutive days, the bigger your reward.' },
    { icon: Users, title: 'Referral System', desc: 'Invite your friends and get 200 points for each friend who signs up with your code.' },
    { icon: Shield, title: 'Safe & Trusted', desc: 'Your data is protected with strong encryption. We respect your privacy and are committed to protecting it.' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0C] p-4 pb-24" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-[#F39C12] hover:underline text-sm mb-6">
          <BackArrow className="w-4 h-4" />
          {isRTL ? 'العودة' : 'Back'}
        </Link>

        <div className="text-center mb-8">
          <Logo size={64} />
          <h1 className="text-3xl font-display text-white mt-3">GetFreeUC</h1>
          <p className="text-[#8A8A93] mt-2">
            {isRTL ? 'اربح UC مجاناً بسهولة وأمان' : 'Earn Free UC Easily and Safely'}
          </p>
        </div>

        <div className="bg-[#141419] border border-[#27272A] rounded-sm p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Info className="w-6 h-6 text-[#F39C12]" />
            <h2 className="text-white text-xl font-semibold">
              {isRTL ? 'عن التطبيق' : 'About the App'}
            </h2>
          </div>
          <div className="text-[#8A8A93] text-sm leading-relaxed space-y-4">
            {isRTL ? (
              <>
                <p>GetFreeUC هو تطبيق مكافآت مبتكر يتيح لك كسب نقاط عن طريق مشاهدة الإعلانات، وتحويل هذه النقاط إلى UC (العملة الافتراضية) لألعابك المفضلة.</p>
                <p>تم تطوير التطبيق ليكون سهل الاستخدام ومتاح للجميع. يدعم اللغتين العربية والإنجليزية، ويعمل على جميع الأجهزة بما في ذلك الهواتف الذكية وأجهزة الكمبيوتر.</p>
                <p>نظام النقاط الخاص بنا شفاف وعادل. كل إعلان تشاهده يمنحك نقاطاً يمكنك تجميعها واستبدالها بباقات UC متنوعة تبدأ من 60 UC وحتى 8100 UC.</p>
              </>
            ) : (
              <>
                <p>GetFreeUC is an innovative rewards application that allows you to earn points by watching advertisements, and convert those points into UC (virtual currency) for your favorite games.</p>
                <p>The app was developed to be easy to use and accessible to everyone. It supports both Arabic and English languages, and works on all devices including smartphones and computers.</p>
                <p>Our points system is transparent and fair. Every ad you watch earns you points that you can accumulate and redeem for various UC packages starting from 60 UC up to 8100 UC.</p>
              </>
            )}
          </div>
        </div>

        <h2 className="text-white text-xl font-semibold mb-4 px-1">
          {isRTL ? 'المميزات الرئيسية' : 'Key Features'}
        </h2>
        <div className="space-y-3 mb-6">
          {features.map((f, i) => (
            <div key={i} className="bg-[#141419] border border-[#27272A] rounded-sm p-4 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#F39C12]/10 flex items-center justify-center flex-shrink-0 mt-1">
                <f.icon className="w-5 h-5 text-[#F39C12]" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm mb-1">{f.title}</h3>
                <p className="text-[#8A8A93] text-sm leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#141419] border border-[#27272A] rounded-sm p-6">
          <h2 className="text-white text-xl font-semibold mb-4">
            {isRTL ? 'كيف يعمل التطبيق؟' : 'How Does It Work?'}
          </h2>
          <div className="space-y-4">
            {(isRTL ? [
              { step: '1', title: 'سجّل حساباً مجانياً', desc: 'أنشئ حسابك بسهولة باستخدام بريدك الإلكتروني ومعرف اللاعب الخاص بك.' },
              { step: '2', title: 'شاهد الإعلانات', desc: 'شاهد إعلانات قصيرة (5 ثوانٍ) واربح نقاطاً مع كل مشاهدة.' },
              { step: '3', title: 'اجمع النقاط', desc: 'كلما شاهدت أكثر، ربحت أكثر! خاصة مع مضاعف المستوى الخاص بك.' },
              { step: '4', title: 'استبدل بـ UC', desc: 'عندما تجمع نقاطاً كافية، استبدلها بباقة UC من اختيارك.' },
            ] : [
              { step: '1', title: 'Create a Free Account', desc: 'Easily create your account using your email and your player ID.' },
              { step: '2', title: 'Watch Ads', desc: 'Watch short ads (5 seconds) and earn points with each view.' },
              { step: '3', title: 'Collect Points', desc: 'The more you watch, the more you earn! Especially with your level multiplier.' },
              { step: '4', title: 'Redeem for UC', desc: 'When you have enough points, redeem them for a UC package of your choice.' },
            ]).map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#F39C12] flex items-center justify-center flex-shrink-0 text-black font-bold text-sm">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">{item.title}</h3>
                  <p className="text-[#8A8A93] text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-[#8A8A93]/60 text-xs">
            {isRTL ? 'هذا التطبيق مستقل وغير تابع أو مرتبط بأي شركة ألعاب' : 'This app is independent and not affiliated with any game company'}
          </p>
        </div>

        <div className="mt-4">
          <AdBanner slot="auto" format="auto" />
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { AdBanner } from '../components/AdsManager';

const faqData = {
  ar: [
    { q: 'ما هو GetFreeUC؟', a: 'GetFreeUC هو تطبيق مكافآت يتيح لك كسب نقاط عن طريق مشاهدة الإعلانات. يمكنك استبدال هذه النقاط بـ UC (العملة الافتراضية) لألعابك المفضلة. التطبيق مجاني تماماً ولا يتطلب أي دفع.' },
    { q: 'كيف أكسب النقاط؟', a: 'يمكنك كسب النقاط بعدة طرق:\n• مشاهدة الإعلانات (10 نقاط لكل إعلان)\n• تسجيل الدخول اليومي (مكافآت متزايدة حسب الأيام المتتالية)\n• إكمال المهام اليومية (حتى 600 نقطة يومياً)\n• دعوة الأصدقاء (200 نقطة لكل صديق)' },
    { q: 'كم نقطة أحتاج لاستبدال UC؟', a: 'تختلف حسب الباقة:\n• 60 UC = 6,500 نقطة\n• 325 UC = 32,000 نقطة\n• 660 UC = 65,000 نقطة\n• 1800 UC = 160,000 نقطة\n• 3850 UC = 325,000 نقطة\n• 8100 UC = 650,000 نقطة' },
    { q: 'كيف يعمل نظام المستويات؟', a: 'هناك 5 مستويات:\n• مبتدئ (x1.0) - البداية\n• برونزي (x1.2) - عند 5,000 نقطة مكتسبة\n• فضي (x1.5) - عند 25,000 نقطة\n• ذهبي (x2.0) - عند 100,000 نقطة\n• ماسي (x3.0) - عند 500,000 نقطة\nكلما ارتفع مستواك، زاد مضاعف نقاطك!' },
    { q: 'كيف يعمل نظام الإحالات؟', a: 'كل مستخدم يحصل على كود إحالة خاص. عندما يسجل صديقك باستخدام كودك، تحصل أنت وصديقك على 200 نقطة مكافأة. يمكنك مشاركة الكود عبر وسائل التواصل الاجتماعي.' },
    { q: 'ما هي المكافأة اليومية؟', a: 'عند تسجيل الدخول كل يوم، تحصل على مكافأة يومية تزداد مع كل يوم متتالي. نظام الخطوط المتتالية (Streak) يكافئك على الالتزام بالدخول يومياً لمدة 7 أيام.' },
    { q: 'كيف أستلم الـ UC؟', a: 'بعد تقديم طلب الاستبدال، يقوم فريقنا بمراجعة الطلب وإرسال UC إلى حسابك عبر معرف اللاعب الخاص بك. عادة تتم المعالجة خلال 24-48 ساعة.' },
    { q: 'هل التطبيق آمن؟', a: 'نعم! نستخدم تشفير SSL/HTTPS لحماية اتصالاتك، وتشفير bcrypt لكلمات المرور. لا نشارك بياناتك الشخصية مع أطراف ثالثة.' },
    { q: 'هل يمكنني استخدام التطبيق على عدة أجهزة؟', a: 'نعم! GetFreeUC هو تطبيق ويب تقدمي (PWA) يعمل على أي جهاز. فقط سجل دخولك بنفس الحساب من أي متصفح.' },
    { q: 'ماذا أفعل إذا نسيت كلمة المرور؟', a: 'اضغط على "نسيت كلمة المرور؟" في صفحة تسجيل الدخول، أدخل بريدك الإلكتروني، وستصلك رسالة بريد إلكتروني تحتوي على رابط لإعادة تعيين كلمة المرور.' },
  ],
  en: [
    { q: 'What is GetFreeUC?', a: 'GetFreeUC is a rewards app that lets you earn points by watching advertisements. You can redeem these points for UC (virtual currency) in your favorite games. The app is completely free and requires no payment.' },
    { q: 'How do I earn points?', a: 'You can earn points in several ways:\n• Watching ads (10 points per ad)\n• Daily login bonus (increasing rewards for consecutive days)\n• Completing daily tasks (up to 600 points per day)\n• Inviting friends (200 points per friend)' },
    { q: 'How many points do I need to redeem UC?', a: 'It depends on the package:\n• 60 UC = 6,500 points\n• 325 UC = 32,000 points\n• 660 UC = 65,000 points\n• 1800 UC = 160,000 points\n• 3850 UC = 325,000 points\n• 8100 UC = 650,000 points' },
    { q: 'How does the leveling system work?', a: 'There are 5 levels:\n• Beginner (x1.0) - Starting level\n• Bronze (x1.2) - At 5,000 total points earned\n• Silver (x1.5) - At 25,000 points\n• Gold (x2.0) - At 100,000 points\n• Diamond (x3.0) - At 500,000 points\nThe higher your level, the bigger your points multiplier!' },
    { q: 'How does the referral system work?', a: 'Every user gets a unique referral code. When your friend signs up using your code, both you and your friend receive 200 bonus points. You can share your code via social media.' },
    { q: 'What is the daily bonus?', a: 'When you log in every day, you receive a daily bonus that increases with each consecutive day. The streak system rewards you for logging in daily for up to 7 days.' },
    { q: 'How do I receive UC?', a: 'After submitting a redemption request, our team reviews it and sends UC to your account via your Player ID. Processing usually takes 24-48 hours.' },
    { q: 'Is the app safe?', a: 'Yes! We use SSL/HTTPS encryption to protect your connections, and bcrypt encryption for passwords. We do not share your personal data with third parties.' },
    { q: 'Can I use the app on multiple devices?', a: 'Yes! GetFreeUC is a Progressive Web App (PWA) that works on any device. Just log in with the same account from any browser.' },
    { q: 'What if I forgot my password?', a: 'Click on "Forgot Password?" on the login page, enter your email, and you will receive an email with a link to reset your password.' },
  ]
};

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-[#141419] border border-[#27272A] rounded-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-start"
        data-testid={`faq-item-${question.slice(0,20)}`}
      >
        <span className="text-white text-sm font-semibold flex-1">{question}</span>
        {open ? <ChevronUp className="w-5 h-5 text-[#F39C12] flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-[#8A8A93] flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-4 pb-4 text-[#8A8A93] text-sm leading-relaxed whitespace-pre-line border-t border-[#27272A] pt-3">
          {answer}
        </div>
      )}
    </div>
  );
}

export function FAQPage() {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;
  const faqs = faqData[language] || faqData.en;

  return (
    <div className="min-h-screen bg-[#0A0A0C] p-4 pb-24" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-[#F39C12] hover:underline text-sm mb-6">
          <BackArrow className="w-4 h-4" />
          {isRTL ? 'العودة' : 'Back'}
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="w-8 h-8 text-[#F39C12]" />
          <h1 className="text-2xl font-display text-white">
            {isRTL ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
          </h1>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.q} answer={faq.a} />
          ))}
        </div>

        <div className="mt-8 bg-[#141419] border border-[#27272A] rounded-sm p-6 text-center">
          <p className="text-[#8A8A93] text-sm mb-3">
            {isRTL ? 'لم تجد إجابة لسؤالك؟' : "Didn't find your answer?"}
          </p>
          <a href="mailto:support@getfreeuc.com" className="text-[#F39C12] hover:underline text-sm font-semibold">
            {isRTL ? 'تواصل معنا: support@getfreeuc.com' : 'Contact us: support@getfreeuc.com'}
          </a>
        </div>

        <div className="mt-4">
          <AdBanner slot="auto" format="auto" />
        </div>
      </div>
    </div>
  );
}

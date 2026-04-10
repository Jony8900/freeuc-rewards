import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Zap, Trophy, Calendar, Users, Star } from 'lucide-react';

export function GuidesPage() {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-[#0A0A0C] p-4 pb-24" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-[#F39C12] hover:underline text-sm mb-6">
          <BackArrow className="w-4 h-4" />
          {isRTL ? 'العودة' : 'Back'}
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-8 h-8 text-[#F39C12]" />
          <h1 className="text-2xl font-display text-white">
            {isRTL ? 'الأدلة والنصائح' : 'Guides & Tips'}
          </h1>
        </div>

        {/* Guide 1: How to earn fast */}
        <div className="bg-[#141419] border border-[#27272A] rounded-sm p-6 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#F39C12]/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#F39C12]" />
            </div>
            <h2 className="text-white text-lg font-semibold">
              {isRTL ? 'كيف تربح UC بسرعة؟' : 'How to Earn UC Fast?'}
            </h2>
          </div>
          <div className="text-[#8A8A93] text-sm leading-relaxed space-y-3">
            {isRTL ? (
              <>
                <p>إليك أفضل الاستراتيجيات لتسريع كسب النقاط في GetFreeUC:</p>
                <h3 className="text-white font-semibold mt-4">1. شاهد الإعلانات بانتظام</h3>
                <p>كل إعلان يمنحك 10 نقاط أساسية. مع مضاعف المستوى، يمكن أن تصل إلى 30 نقطة لكل إعلان في المستوى الماسي! حاول مشاهدة أكبر عدد ممكن يومياً.</p>
                <h3 className="text-white font-semibold mt-4">2. أكمل المهام اليومية</h3>
                <p>المهام اليومية تمنحك مكافآت إضافية كبيرة:</p>
                <ul className="list-disc list-inside space-y-1 ms-4">
                  <li>شاهد 3 إعلانات = 50 نقطة إضافية</li>
                  <li>شاهد 5 إعلانات = 100 نقطة إضافية</li>
                  <li>شاهد 10 إعلانات = 250 نقطة إضافية</li>
                  <li>شاهد 20 إعلان = 600 نقطة إضافية</li>
                </ul>
                <h3 className="text-white font-semibold mt-4">3. لا تفوّت المكافأة اليومية</h3>
                <p>سجّل دخولك كل يوم للحصول على مكافأة يومية متزايدة. خط 7 أيام متتالية يعطيك أكبر مكافأة!</p>
                <h3 className="text-white font-semibold mt-4">4. ادعُ أصدقاءك</h3>
                <p>كل صديق يسجل باستخدام كودك = 200 نقطة فورية لك وله. كلما دعوت أكثر، ربحت أكثر!</p>
                <h3 className="text-white font-semibold mt-4">5. ارفع مستواك بسرعة</h3>
                <p>كلما ارتفع مستواك، زاد مضاعف النقاط. المستوى الماسي يمنحك x3 مما يعني ثلاثة أضعاف النقاط لكل إعلان!</p>
              </>
            ) : (
              <>
                <p>Here are the best strategies to speed up your point earning in GetFreeUC:</p>
                <h3 className="text-white font-semibold mt-4">1. Watch Ads Regularly</h3>
                <p>Each ad gives you 10 base points. With your level multiplier, you can earn up to 30 points per ad at Diamond level! Try to watch as many as possible daily.</p>
                <h3 className="text-white font-semibold mt-4">2. Complete Daily Tasks</h3>
                <p>Daily tasks give you significant bonus rewards:</p>
                <ul className="list-disc list-inside space-y-1 ms-4">
                  <li>Watch 3 ads = 50 bonus points</li>
                  <li>Watch 5 ads = 100 bonus points</li>
                  <li>Watch 10 ads = 250 bonus points</li>
                  <li>Watch 20 ads = 600 bonus points</li>
                </ul>
                <h3 className="text-white font-semibold mt-4">3. Don't Miss the Daily Bonus</h3>
                <p>Log in every day to get an increasing daily bonus. A 7-day streak gives you the biggest reward!</p>
                <h3 className="text-white font-semibold mt-4">4. Invite Your Friends</h3>
                <p>Each friend who signs up with your code = 200 instant points for both you and them!</p>
                <h3 className="text-white font-semibold mt-4">5. Level Up Fast</h3>
                <p>The higher your level, the bigger your points multiplier. Diamond level gives you x3, meaning triple points for every ad!</p>
              </>
            )}
          </div>
        </div>

        {/* Guide 2: Levels */}
        <div className="bg-[#141419] border border-[#27272A] rounded-sm p-6 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#F39C12]/10 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-[#F39C12]" />
            </div>
            <h2 className="text-white text-lg font-semibold">
              {isRTL ? 'دليل المستويات الكامل' : 'Complete Levels Guide'}
            </h2>
          </div>
          <div className="text-[#8A8A93] text-sm leading-relaxed">
            <p className="mb-4">
              {isRTL ? 'نظام المستويات يكافئك على نشاطك. كلما جمعت نقاطاً أكثر، ارتفع مستواك وزاد مضاعف نقاطك.' : 'The leveling system rewards your activity. The more points you collect, the higher your level and the bigger your multiplier.'}
            </p>
            <div className="space-y-3">
              {[
                { level: 1, nameAr: 'مبتدئ', nameEn: 'Beginner', min: '0', mult: 'x1.0', bonus: '0', color: '#8A8A93' },
                { level: 2, nameAr: 'برونزي', nameEn: 'Bronze', min: '5,000', mult: 'x1.2', bonus: '500', color: '#CD7F32' },
                { level: 3, nameAr: 'فضي', nameEn: 'Silver', min: '25,000', mult: 'x1.5', bonus: '1,500', color: '#C0C0C0' },
                { level: 4, nameAr: 'ذهبي', nameEn: 'Gold', min: '100,000', mult: 'x2.0', bonus: '5,000', color: '#FFD700' },
                { level: 5, nameAr: 'ماسي', nameEn: 'Diamond', min: '500,000', mult: 'x3.0', bonus: '15,000', color: '#B9F2FF' },
              ].map(lvl => (
                <div key={lvl.level} className="flex items-center gap-3 p-3 rounded-sm border border-[#27272A] bg-[#0A0A0C]">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: lvl.color + '20' }}>
                    <Star className="w-4 h-4" style={{ color: lvl.color }} />
                  </div>
                  <div className="flex-1">
                    <span className="text-white text-sm font-semibold" style={{ color: lvl.color }}>
                      {isRTL ? lvl.nameAr : lvl.nameEn}
                    </span>
                    <p className="text-[#8A8A93] text-xs">
                      {isRTL ? `${lvl.min} نقطة مطلوبة` : `${lvl.min} points required`}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-[#F39C12] font-display text-sm">{lvl.mult}</p>
                    <p className="text-[#8A8A93] text-xs">{isRTL ? 'مضاعف' : 'multiplier'}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-green-400 font-display text-sm">+{lvl.bonus}</p>
                    <p className="text-[#8A8A93] text-xs">{isRTL ? 'بونص' : 'bonus'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Guide 3: Daily Bonus */}
        <div className="bg-[#141419] border border-[#27272A] rounded-sm p-6 mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#F39C12]/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-[#F39C12]" />
            </div>
            <h2 className="text-white text-lg font-semibold">
              {isRTL ? 'نظام المكافآت اليومية' : 'Daily Rewards System'}
            </h2>
          </div>
          <div className="text-[#8A8A93] text-sm leading-relaxed space-y-3">
            {isRTL ? (
              <>
                <p>نظام المكافآت اليومية يشجعك على تسجيل الدخول كل يوم. كل يوم متتالي تسجل فيه دخولك، تحصل على مكافأة أكبر!</p>
                <p>إذا فاتك يوم، يتم إعادة تعيين خطك المتتالي. لذلك حاول الدخول كل يوم للحصول على أكبر المكافآت.</p>
                <p className="text-white font-semibold">نصيحة: فعّل التذكيرات على هاتفك حتى لا تنسى تسجيل الدخول يومياً!</p>
              </>
            ) : (
              <>
                <p>The daily rewards system encourages you to log in every day. Each consecutive day you log in, you get a bigger reward!</p>
                <p>If you miss a day, your streak resets. So try to log in every day to get the maximum rewards.</p>
                <p className="text-white font-semibold">Tip: Set reminders on your phone so you don't forget to log in daily!</p>
              </>
            )}
          </div>
        </div>

        {/* Guide 4: Referrals */}
        <div className="bg-[#141419] border border-[#27272A] rounded-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#F39C12]/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-[#F39C12]" />
            </div>
            <h2 className="text-white text-lg font-semibold">
              {isRTL ? 'كيف تستفيد من نظام الإحالات؟' : 'How to Benefit from the Referral System?'}
            </h2>
          </div>
          <div className="text-[#8A8A93] text-sm leading-relaxed space-y-3">
            {isRTL ? (
              <>
                <p>نظام الإحالات هو أسرع طريقة لكسب النقاط! إليك كيف:</p>
                <ol className="list-decimal list-inside space-y-2 ms-2">
                  <li>اذهب إلى صفحة <strong className="text-white">الإحالات</strong> في التطبيق</li>
                  <li>انسخ <strong className="text-white">كود الإحالة</strong> الخاص بك</li>
                  <li>شاركه مع أصدقائك عبر واتساب أو تيليجرام أو أي وسيلة</li>
                  <li>عندما يسجل صديقك باستخدام كودك، تحصل أنت وصديقك على <strong className="text-[#F39C12]">200 نقطة</strong></li>
                </ol>
                <p className="mt-3">لا يوجد حد لعدد الأصدقاء الذين يمكنك دعوتهم! ادعُ 10 أصدقاء واحصل على 2,000 نقطة مجاناً!</p>
                <p className="text-white font-semibold mt-2">نصيحة: شارك كودك في مجموعات الألعاب على وسائل التواصل الاجتماعي للوصول لأكبر عدد من اللاعبين!</p>
              </>
            ) : (
              <>
                <p>The referral system is the fastest way to earn points! Here's how:</p>
                <ol className="list-decimal list-inside space-y-2 ms-2">
                  <li>Go to the <strong className="text-white">Referrals</strong> page in the app</li>
                  <li>Copy your unique <strong className="text-white">referral code</strong></li>
                  <li>Share it with friends via WhatsApp, Telegram, or any platform</li>
                  <li>When your friend signs up with your code, both of you get <strong className="text-[#F39C12]">200 points</strong></li>
                </ol>
                <p className="mt-3">There's no limit to how many friends you can invite! Invite 10 friends and get 2,000 points for free!</p>
                <p className="text-white font-semibold mt-2">Tip: Share your code in gaming groups on social media to reach more players!</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

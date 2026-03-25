import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Shield } from 'lucide-react';

export function PrivacyPolicyPage() {
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
          <Shield className="w-8 h-8 text-[#F39C12]" />
          <h1 className="text-2xl font-display text-white">
            {isRTL ? 'سياسة الخصوصية' : 'Privacy Policy'}
          </h1>
        </div>

        <div className="bg-[#141419] border border-[#27272A] rounded-sm p-6 space-y-6 text-[#8A8A93] text-sm leading-relaxed">
          <p className="text-xs text-[#8A8A93]/60">
            {isRTL ? 'آخر تحديث: مارس 2026' : 'Last updated: March 2026'}
          </p>

          {isRTL ? (
            <>
              <section>
                <h2 className="text-white text-lg font-semibold mb-3">مقدمة</h2>
                <p>مرحباً بك في GetFreeUC. نحن نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية معلوماتك عند استخدام تطبيقنا.</p>
              </section>

              <section>
                <h2 className="text-white text-lg font-semibold mb-3">المعلومات التي نجمعها</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong className="text-white">معلومات الحساب:</strong> الاسم، البريد الإلكتروني، ومعرف اللاعب عند التسجيل.</li>
                  <li><strong className="text-white">بيانات الاستخدام:</strong> النقاط المكتسبة، الإعلانات المشاهدة، وسجل الاستبدال.</li>
                  <li><strong className="text-white">معلومات الجهاز:</strong> نوع الجهاز ونظام التشغيل لتحسين تجربة المستخدم.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-white text-lg font-semibold mb-3">كيف نستخدم معلوماتك</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>إدارة حسابك وتقديم خدماتنا.</li>
                  <li>تتبع النقاط والمكافآت.</li>
                  <li>إرسال إشعارات متعلقة بالحساب (مثل إعادة تعيين كلمة المرور).</li>
                  <li>تحسين التطبيق وتجربة المستخدم.</li>
                  <li>عرض الإعلانات عبر Google AdSense.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-white text-lg font-semibold mb-3">الإعلانات</h2>
                <p>يستخدم تطبيقنا Google AdSense لعرض الإعلانات. قد يستخدم Google ملفات تعريف الارتباط (Cookies) لعرض إعلانات مخصصة بناءً على زياراتك السابقة. يمكنك إدارة تفضيلات الإعلانات من خلال إعدادات Google.</p>
              </section>

              <section>
                <h2 className="text-white text-lg font-semibold mb-3">أمان البيانات</h2>
                <p>نتخذ إجراءات أمنية مناسبة لحماية بياناتك الشخصية، بما في ذلك تشفير كلمات المرور واستخدام اتصالات آمنة (HTTPS).</p>
              </section>

              <section>
                <h2 className="text-white text-lg font-semibold mb-3">مشاركة البيانات</h2>
                <p>لا نبيع أو نشارك بياناتك الشخصية مع أطراف ثالثة إلا في الحالات التالية:</p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>عند الضرورة لتقديم الخدمة (مثل معالجة المكافآت).</li>
                  <li>عند الطلب بموجب القانون.</li>
                  <li>مع مقدمي خدمات الإعلانات (Google AdSense).</li>
                </ul>
              </section>

              <section>
                <h2 className="text-white text-lg font-semibold mb-3">حقوقك</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>حق الوصول إلى بياناتك الشخصية.</li>
                  <li>حق تصحيح بياناتك.</li>
                  <li>حق حذف حسابك وبياناتك.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-white text-lg font-semibold mb-3">الأطفال</h2>
                <p>تطبيقنا غير موجه للأطفال دون سن 13 عاماً. لا نجمع عمداً بيانات من الأطفال دون هذا السن.</p>
              </section>

              <section>
                <h2 className="text-white text-lg font-semibold mb-3">التغييرات على هذه السياسة</h2>
                <p>قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنقوم بإخطارك بأي تغييرات عن طريق نشر السياسة الجديدة على هذه الصفحة.</p>
              </section>

              <section>
                <h2 className="text-white text-lg font-semibold mb-3">اتصل بنا</h2>
                <p>إذا كان لديك أي أسئلة حول سياسة الخصوصية، يرجى التواصل معنا عبر البريد الإلكتروني: <a href="mailto:support@getfreeuc.com" className="text-[#F39C12] hover:underline">support@getfreeuc.com</a></p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-white text-lg font-semibold mb-3">Introduction</h2>
                <p>Welcome to GetFreeUC. We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and protect your information when you use our application.</p>
              </section>

              <section>
                <h2 className="text-white text-lg font-semibold mb-3">Information We Collect</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong className="text-white">Account Information:</strong> Name, email address, and Player ID when you register.</li>
                  <li><strong className="text-white">Usage Data:</strong> Points earned, ads watched, and redemption history.</li>
                  <li><strong className="text-white">Device Information:</strong> Device type and operating system to improve user experience.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-white text-lg font-semibold mb-3">How We Use Your Information</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>To manage your account and provide our services.</li>
                  <li>To track points and rewards.</li>
                  <li>To send account-related notifications (such as password reset).</li>
                  <li>To improve the application and user experience.</li>
                  <li>To display advertisements via Google AdSense.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-white text-lg font-semibold mb-3">Advertisements</h2>
                <p>Our application uses Google AdSense to display ads. Google may use cookies to serve personalized ads based on your previous visits. You can manage your ad preferences through Google settings.</p>
              </section>

              <section>
                <h2 className="text-white text-lg font-semibold mb-3">Data Security</h2>
                <p>We take appropriate security measures to protect your personal data, including password encryption and secure connections (HTTPS).</p>
              </section>

              <section>
                <h2 className="text-white text-lg font-semibold mb-3">Data Sharing</h2>
                <p>We do not sell or share your personal data with third parties except in the following cases:</p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>When necessary to provide the service (such as processing rewards).</li>
                  <li>When required by law.</li>
                  <li>With advertising service providers (Google AdSense).</li>
                </ul>
              </section>

              <section>
                <h2 className="text-white text-lg font-semibold mb-3">Your Rights</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>Right to access your personal data.</li>
                  <li>Right to correct your data.</li>
                  <li>Right to delete your account and data.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-white text-lg font-semibold mb-3">Children</h2>
                <p>Our application is not intended for children under the age of 13. We do not knowingly collect data from children under this age.</p>
              </section>

              <section>
                <h2 className="text-white text-lg font-semibold mb-3">Changes to This Policy</h2>
                <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
              </section>

              <section>
                <h2 className="text-white text-lg font-semibold mb-3">Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us via email: <a href="mailto:support@getfreeuc.com" className="text-[#F39C12] hover:underline">support@getfreeuc.com</a></p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

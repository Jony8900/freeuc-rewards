# 📱 دليل إعداد الإعلانات - Free UC Rewards

## الجزء 1: Google AdSense (للويب)

### الخطوة 1: إنشاء حساب AdSense
1. اذهب إلى https://adsense.google.com
2. سجّل دخول بحساب Google
3. اضغط "البدء"
4. أدخل عنوان موقعك (تحتاج دومين خاص)

### الخطوة 2: الحصول على دومين
خيارات رخيصة:
- Namecheap.com (~$8/سنة)
- GoDaddy.com (~$12/سنة)
- Porkbun.com (~$9/سنة)

اقتراحات أسماء:
- freeucrewards.com
- ucrewards.app
- getfreeuc.com

### الخطوة 3: بعد موافقة AdSense
أرسل لي:
- Publisher ID (مثال: ca-pub-1234567890123456)
- سأدمجه في التطبيق خلال دقائق

---

## الجزء 2: Google AdMob (للتطبيق APK)

### الخطوة 1: إنشاء حساب AdMob
1. اذهب إلى https://admob.google.com
2. سجّل دخول بحساب Google
3. اضغط "Apps" ← "Add App"
4. اختر "Android"
5. هل التطبيق منشور؟ اختر "No"
6. أدخل اسم التطبيق: "Free UC Rewards"

### الخطوة 2: إنشاء وحدات إعلانية
1. من لوحة التطبيق، اضغط "Ad units"
2. أنشئ الوحدات التالية:

| النوع | الاسم | الاستخدام |
|-------|-------|----------|
| Rewarded | reward_video | مشاهدة الإعلان للنقاط |
| Interstitial | interstitial_main | بين الصفحات |
| Banner | banner_bottom | أسفل الشاشة |

### الخطوة 3: انسخ المعرّفات
بعد الإنشاء، انسخ:
- App ID: ca-app-pub-XXXXXXXX~YYYYYYYY
- Rewarded Ad Unit: ca-app-pub-XXXXXXXX/ZZZZZZZZ
- Interstitial Ad Unit: ca-app-pub-XXXXXXXX/AAAAAAAA
- Banner Ad Unit: ca-app-pub-XXXXXXXX/BBBBBBBB

---

## الجزء 3: بناء ملف APK

### المتطلبات:
- Android Studio (مجاني)
- Java JDK 11+
- حساب Google Play Console ($25 مرة واحدة)

### الخطوات:
```bash
# 1. بناء التطبيق
cd /app/frontend
yarn build

# 2. تهيئة Capacitor
npx cap init "Free UC Rewards" "com.freeuc.rewards"

# 3. إضافة Android
npx cap add android

# 4. نسخ الملفات
npx cap sync

# 5. فتح في Android Studio
npx cap open android
```

### في Android Studio:
1. Build ← Generate Signed Bundle/APK
2. اختر APK
3. أنشئ keystore جديد (احفظه بأمان!)
4. اختر release
5. انتظر البناء

---

## الجزء 4: نشر على Google Play

### الخطوة 1: إنشاء حساب مطور
1. اذهب إلى https://play.google.com/console
2. ادفع رسوم التسجيل ($25)
3. أكمل معلومات الحساب

### الخطوة 2: إنشاء تطبيق جديد
1. اضغط "Create app"
2. أدخل اسم التطبيق
3. اختر اللغة الافتراضية
4. اختر "App" و "Free"

### الخطوة 3: إعداد المتجر
أكمل جميع الأقسام:
- [ ] App access
- [ ] Ads declaration (نعم، يحتوي إعلانات)
- [ ] Content rating
- [ ] Target audience
- [ ] News apps
- [ ] COVID-19 apps
- [ ] Data safety
- [ ] Government apps

### الخطوة 4: رفع APK
1. Production ← Releases
2. Create new release
3. Upload APK
4. أضف ملاحظات الإصدار
5. Review and rollout

---

## الجزء 5: الجدول الزمني المتوقع

| المهمة | الوقت |
|--------|-------|
| شراء دومين | 10 دقائق |
| إنشاء حساب AdSense | 15 دقيقة |
| موافقة AdSense | 1-14 يوم |
| إنشاء حساب AdMob | 15 دقيقة |
| بناء APK | 30 دقيقة |
| إنشاء حساب Play Console | 20 دقيقة |
| نشر التطبيق | 1-7 أيام للمراجعة |

---

## الجزء 6: المعرّفات المطلوبة

أرسل لي هذه المعرّفات عند الحصول عليها:

### AdSense:
```
Publisher ID: ca-pub-________________
```

### AdMob:
```
App ID: ca-app-pub-________________~__________
Rewarded Unit: ca-app-pub-________________/__________
Interstitial Unit: ca-app-pub-________________/__________
Banner Unit: ca-app-pub-________________/__________
```

---

## الجزء 7: الأرباح المتوقعة

### AdSense (ويب):
- CPM: $1-3
- 1000 مستخدم = ~$100-300/شهر

### AdMob (تطبيق):
- Rewarded Video CPM: $5-15
- 1000 مستخدم = ~$300-900/شهر

### المجموع مع كلاهما:
- 1000 مستخدم = ~$400-1200/شهر
- 5000 مستخدم = ~$2000-6000/شهر

---

## ❓ أسئلة شائعة

**س: كم يستغرق موافقة AdSense؟**
ج: عادة 1-3 أيام، قد يصل لأسبوعين

**س: هل أحتاج شركة في السويد؟**
ج: لا، يمكنك البدء كفرد (Enskild firma)

**س: كيف أستلم الأرباح؟**
ج: تحويل بنكي مباشر عند وصولك لـ $100

**س: هل يمكنني استخدام كلا الخيارين؟**
ج: نعم! AdSense للويب + AdMob للتطبيق = أرباح أكثر

import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  ar: {
    // Navigation
    home: 'الرئيسية',
    earn: 'اربح',
    redeem: 'استبدال',
    profile: 'الحساب',
    referrals: 'الإحالات',
    admin: 'الإدارة',
    tasks: 'المهام',
    
    // Auth
    login: 'تسجيل الدخول',
    register: 'إنشاء حساب',
    logout: 'تسجيل الخروج',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    username: 'اسم المستخدم',
    pubgId: 'معرف اللاعب',
    referralCode: 'كود الإحالة (اختياري)',
    noAccount: 'ليس لديك حساب؟',
    hasAccount: 'لديك حساب بالفعل؟',
    
    // Home
    yourBalance: 'رصيدك',
    points: 'نقطة',
    watchAd: 'شاهد إعلان واربح',
    watchingAd: 'جاري مشاهدة الإعلان...',
    pointsEarned: 'تم ربح {points} نقاط!',
    totalEarned: 'إجمالي المكتسب',
    totalRedeemed: 'إجمالي المستبدل',
    adsWatched: 'الإعلانات المشاهدة',
    
    // Redeem
    ucPackages: 'باقات UC',
    pointsCost: '{points} نقطة',
    redeemNow: 'استبدل الآن',
    notEnoughPoints: 'نقاط غير كافية',
    redeemSuccess: 'تم تقديم طلب الاستبدال بنجاح!',
    redeemHistory: 'سجل الاستبدال',
    
    // Referrals
    yourReferralCode: 'كود الإحالة الخاص بك',
    copyCode: 'نسخ الكود',
    copied: 'تم النسخ!',
    inviteFriends: 'ادعُ أصدقاءك',
    referralBonus: 'احصل على {bonus} نقطة لكل صديق!',
    friendsReferred: 'الأصدقاء المُحالين',
    noReferrals: 'لم تقم بدعوة أي صديق بعد',
    shareMessage: 'انضم إلى GetFreeUC واربح UC مجاناً! استخدم كودي: {code}',
    
    // Profile
    myProfile: 'ملفي الشخصي',
    memberSince: 'عضو منذ',
    statistics: 'الإحصائيات',
    
    // Status
    pending: 'قيد الانتظار',
    approved: 'تمت الموافقة',
    rejected: 'مرفوض',
    
    // Admin
    dashboard: 'لوحة التحكم',
    users: 'المستخدمين',
    redemptions: 'طلبات الاستبدال',
    totalUsers: 'إجمالي المستخدمين',
    totalPointsDistributed: 'إجمالي النقاط الموزعة',
    pendingRedemptions: 'الطلبات المعلقة',
    approve: 'موافقة',
    reject: 'رفض',
    
    // Tasks
    dailyTasks: 'المهام اليومية',
    claimReward: 'استلم المكافأة',
    claimed: 'تم الاستلام',
    dailyProgress: 'التقدم اليومي',
    
    // General
    loading: 'جاري التحميل...',
    error: 'حدث خطأ',
    success: 'تم بنجاح',
    language: 'EN',
    disclaimer: 'هذا التطبيق مستقل وغير تابع أو مرتبط بأي شركة ألعاب',
    level: 'المستوى',
    levelBonus: 'بونص المستوى',
    nextLevel: 'المستوى التالي',
    multiplier: 'مضاعف النقاط',
    forgotPassword: 'نسيت كلمة المرور؟',
    forgotPasswordTitle: 'استعادة كلمة المرور',
    forgotPasswordDesc: 'أدخل بريدك الإلكتروني وسنرسل لك رابط لإعادة تعيين كلمة المرور',
    sendResetLink: 'إرسال رابط الاستعادة',
    sending: 'جاري الإرسال...',
    resetPassword: 'تعيين كلمة مرور جديدة',
    newPassword: 'كلمة المرور الجديدة',
    confirmPassword: 'تأكيد كلمة المرور',
    resetPasswordBtn: 'تغيير كلمة المرور',
    resetting: 'جاري التغيير...',
    passwordMismatch: 'كلمات المرور غير متطابقة',
    passwordTooShort: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
    resetEmailSent: 'تم إرسال رابط الاستعادة إلى بريدك الإلكتروني',
    resetSuccess: 'تم تغيير كلمة المرور بنجاح! يمكنك تسجيل الدخول الآن',
    backToLogin: 'العودة لتسجيل الدخول',
    invalidResetLink: 'رابط إعادة التعيين غير صالح',
    deleteAccount: 'حذف الحساب',
    deleteAccountConfirm: 'هل أنت متأكد من حذف حسابك؟ هذا الإجراء لا يمكن التراجع عنه.',
    deleteAccountSuccess: 'تم حذف الحساب بنجاح',
    deleting: 'جاري الحذف...',
  },
  en: {
    // Navigation
    home: 'Home',
    earn: 'Earn',
    redeem: 'Redeem',
    profile: 'Profile',
    referrals: 'Referrals',
    admin: 'Admin',
    tasks: 'Tasks',
    
    // Auth
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    email: 'Email',
    password: 'Password',
    username: 'Username',
    pubgId: 'Player ID',
    referralCode: 'Referral Code (optional)',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',
    
    // Home
    yourBalance: 'Your Balance',
    points: 'Points',
    watchAd: 'Watch Ad & Earn',
    watchingAd: 'Watching Ad...',
    pointsEarned: 'Earned {points} points!',
    totalEarned: 'Total Earned',
    totalRedeemed: 'Total Redeemed',
    adsWatched: 'Ads Watched',
    
    // Redeem
    ucPackages: 'UC Packages',
    pointsCost: '{points} Points',
    redeemNow: 'Redeem Now',
    notEnoughPoints: 'Not enough points',
    redeemSuccess: 'Redemption request submitted!',
    redeemHistory: 'Redemption History',
    
    // Referrals
    yourReferralCode: 'Your Referral Code',
    copyCode: 'Copy Code',
    copied: 'Copied!',
    inviteFriends: 'Invite Friends',
    referralBonus: 'Get {bonus} points for each friend!',
    friendsReferred: 'Friends Referred',
    noReferrals: "You haven't invited any friends yet",
    shareMessage: 'Join GetFreeUC and earn free UC! Use my code: {code}',
    
    // Profile
    myProfile: 'My Profile',
    memberSince: 'Member Since',
    statistics: 'Statistics',
    
    // Status
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    
    // Admin
    dashboard: 'Dashboard',
    users: 'Users',
    redemptions: 'Redemptions',
    totalUsers: 'Total Users',
    totalPointsDistributed: 'Points Distributed',
    pendingRedemptions: 'Pending Redemptions',
    approve: 'Approve',
    reject: 'Reject',
    
    // Tasks
    dailyTasks: 'Daily Tasks',
    claimReward: 'Claim Reward',
    claimed: 'Claimed',
    dailyProgress: 'Daily Progress',
    
    // General
    loading: 'Loading...',
    error: 'An error occurred',
    success: 'Success',
    language: 'AR',
    disclaimer: 'This app is independent and not affiliated with any game company',
    level: 'Level',
    levelBonus: 'Level Bonus',
    nextLevel: 'Next Level',
    multiplier: 'Points Multiplier',
    forgotPassword: 'Forgot Password?',
    forgotPasswordTitle: 'Reset Password',
    forgotPasswordDesc: 'Enter your email and we will send you a link to reset your password',
    sendResetLink: 'Send Reset Link',
    sending: 'Sending...',
    resetPassword: 'Set New Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm Password',
    resetPasswordBtn: 'Reset Password',
    resetting: 'Resetting...',
    passwordMismatch: 'Passwords do not match',
    passwordTooShort: 'Password must be at least 6 characters',
    resetEmailSent: 'A reset link has been sent to your email',
    resetSuccess: 'Password changed successfully! You can now log in',
    backToLogin: 'Back to Login',
    invalidResetLink: 'Invalid reset link',
    deleteAccount: 'Delete Account',
    deleteAccountConfirm: 'Are you sure you want to delete your account? This action cannot be undone.',
    deleteAccountSuccess: 'Account deleted successfully',
    deleting: 'Deleting...',
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || 'ar';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  };

  const t = (key, params = {}) => {
    let text = translations[language][key] || key;
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, isRTL: language === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

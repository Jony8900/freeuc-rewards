# GetFreeUC - PRD

## Original Problem Statement
تطبيق مكافآت UC حيث يشاهد المستخدمون الإعلانات ويربحون نقاط يمكن استبدالها بـ UC (عملة اللعبة).

## Project Overview
- **App Name**: GetFreeUC
- **App Type**: PWA + Android App
- **Languages**: Arabic (RTL) / English
- **Live URL**: https://getfreeuc.com
- **Backend URL**: https://freeuc-rewards.onrender.com
- **GitHub**: https://github.com/Jony8900/freeuc-rewards

## Tech Stack
- **Frontend**: React 19, Tailwind CSS, Lucide Icons, Sonner
- **Backend**: FastAPI, Motor (MongoDB async), Resend
- **Database**: MongoDB Atlas
- **Auth**: JWT (7 days)
- **Hosting**: Vercel (FE), Render (BE)
- **Email**: Resend (noreply@getfreeuc.com - Domain verified)
- **Mobile**: Capacitor 6 (Android)

## What's Been Implemented

### Core Features
- [x] User registration/login with JWT auth
- [x] Points system (watch ads = earn points)
- [x] 6 UC packages with redemption
- [x] Referral system (200 points)
- [x] Admin dashboard
- [x] Arabic/English RTL support
- [x] Daily tasks, Ad simulation (mock)
- [x] PWA configuration

### Deployment
- [x] Vercel + Render + MongoDB Atlas
- [x] Custom domain getfreeuc.com

### Engagement Features
- [x] Levels system (5 levels, Beginner to Diamond, x1-x3 multiplier)
- [x] Leaderboard (with Player ID)
- [x] Daily login bonus (7-day streak)
- [x] Google AdSense integration + ads.txt

### Account Management
- [x] Forgot Password (Resend email, token-based, 1hr expiry)
- [x] Reset Password page
- [x] Delete Account (API + UI, required by Google Play)

### Admin Features
- [x] Reset ALL user points
- [x] Reset individual user points
- [x] User management, redemption approval

### Content Pages
- [x] About page (/about)
- [x] FAQ page (/faq) - 10 Q&As in AR/EN
- [x] Guides page (/guides) - 4 guides
- [x] Privacy Policy (/privacy-policy)
- [x] Footer links in profile page

### Android App
- [x] Capacitor 6, API 35, AGP 8.2.1
- [x] Custom app icon (UC gold on dark)
- [x] Custom splash screen
- [x] AAB uploaded to Google Play Console (Internal Testing)
- [x] Google Play reviewer account created

### AdSense Fixes
- [x] Removed global AdSense script from index.html
- [x] Ads only load on content-rich pages
- [x] Removed ads from low-content pages

## API Endpoints
- Auth: register, login, me, forgot-password, reset-password, update-profile, change-password, delete-account
- Ads: watch, status
- User: level
- Packages: list, redeem, my-redemptions
- Referrals: list
- Leaderboard: top, my-rank
- Bonus: status, claim
- Admin: stats, users, redemptions, update-redemption, toggle-admin, settings, reset-all-points, reset-user-points

## Credentials
- Admin: admin@pubguc.com / admin123
- Reviewer: reviewer@getfreeuc.com / Review2026
- Resend API Key: re_Spv4ZJmj_3KYBovfA7eyhzfrBmgUrTxEH

## Prioritized Backlog
### P0 (Critical)
- [ ] Save to GitHub + Deploy latest changes
- [ ] Complete Google Play store listing (screenshots, descriptions)
- [ ] Add 12 testers for closed testing (14 days required)

### P1 (High)
- [ ] Wait 2 days then request AdSense re-review
- [ ] Real ad network integration (AdMob for app)

### P2 (Medium)
- [ ] Achievement/badge system
- [ ] Push notifications
- [ ] Welcome email for new users

### P3 (Low)
- [ ] In-app mini games
- [ ] Social sharing
- [ ] CI/CD for Android builds

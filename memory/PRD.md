# GetFreeUC - PRD

## Original Problem Statement
تطبيق مكافآت UC حيث يشاهد المستخدمون الإعلانات ويربحون نقاط يمكن استبدالها بـ UC (عملة اللعبة).

## Project Overview
- **App Name**: GetFreeUC
- **App Type**: PWA (Progressive Web App) - Mobile-first
- **Languages**: Arabic (RTL) / English
- **Theme**: Dark gaming aesthetic
- **Live URL**: https://getfreeuc.com
- **Backend URL**: https://freeuc-rewards.onrender.com
- **GitHub**: https://github.com/Jony8900/freeuc-rewards

## Tech Stack
- **Frontend**: React 19, Tailwind CSS, Lucide Icons, Sonner (toasts)
- **Backend**: FastAPI, Motor (MongoDB async), Resend (email)
- **Database**: MongoDB Atlas
- **Auth**: JWT (7 days expiration)
- **Hosting**: Vercel (frontend), Render (backend)
- **Domain**: getfreeuc.com (Namecheap)
- **Email**: Resend (noreply@getfreeuc.com) - Domain verified

## What's Been Implemented

### Phase 1 - Core App (2026-03-21)
- [x] User registration/login with JWT auth
- [x] Points system (watch ads = earn points)
- [x] 6 UC packages (60-8100 UC) with redemption
- [x] Referral system (200 points bonus)
- [x] Admin dashboard (users, redemptions, settings)
- [x] Arabic/English language support with RTL
- [x] Daily tasks system
- [x] Ad simulation (mock - 5 second wait)
- [x] PWA configuration
- [x] Capacitor config for future APK

### Phase 2 - Deployment (2026-03-23)
- [x] Frontend deployed to Vercel
- [x] Backend deployed to Render
- [x] MongoDB Atlas database connected
- [x] Custom domain getfreeuc.com linked with DNS (Namecheap)

### Phase 3 - Rebranding & Levels (2026-03-23)
- [x] Rebranded to "GetFreeUC" (removed PUBG references)
- [x] Levels system: 5 levels (Beginner to Diamond)
- [x] Point multipliers per level (x1 to x3)
- [x] Level-up bonuses

### Phase 4 - Engagement & Monetization (2026-03-23)
- [x] Leaderboard (top 10 players with username, player ID, level, points)
- [x] Daily login bonus (7-day streak system)
- [x] Google AdSense integration (Publisher ID + ads.txt)

### Phase 5 - Forgot Password & Deployment (2026-03-24)
- [x] Forgot Password page with email input
- [x] Reset Password page with new password + confirmation
- [x] Backend APIs: POST /api/auth/forgot-password, POST /api/auth/reset-password
- [x] Resend email integration with verified domain (noreply@getfreeuc.com)
- [x] DNS setup: DKIM, SPF, DMARC on Namecheap
- [x] Token-based reset with 1-hour expiry
- [x] Email enumeration prevention
- [x] Player ID added to leaderboard display
- [x] Cleaned requirements.txt, fixed deployment conflicts
- [x] Successfully deployed to production (Vercel + Render)

## API Endpoints
- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- `POST /api/auth/forgot-password`, `POST /api/auth/reset-password`
- `PUT /api/auth/update-profile`, `PUT /api/auth/change-password`
- `POST /api/ads/watch`, `GET /api/ads/status`
- `GET /api/user/level`
- `GET /api/packages`, `POST /api/redeem`, `GET /api/redemptions/my`
- `GET /api/referrals`
- `GET /api/leaderboard`, `GET /api/leaderboard/my-rank`
- `GET /api/bonus/status`, `POST /api/bonus/claim`
- Admin: `GET /api/admin/stats`, `GET /api/admin/users`, `GET /api/admin/redemptions`
- Admin: `PUT /api/admin/redemptions/{id}`, `PUT /api/admin/users/{id}/toggle-admin`

## Admin Credentials
- Email: admin@pubguc.com
- Password: admin123

## 3rd Party Integrations
- **Resend**: Email service for password reset (API key in Render env vars)
- **Google AdSense**: Monetization (Publisher ID integrated, ads.txt deployed)
- **MongoDB Atlas**: Production database
- **Vercel**: Frontend hosting
- **Render**: Backend hosting

## Prioritized Backlog

### P1 (High Priority)
- [ ] Verify AdSense ads.txt and ad serving
- [ ] Push notifications

### P2 (Medium Priority)
- [ ] Complete Android App Bundle (AAB) for Play Store
- [ ] Achievement/badge system
- [ ] Welcome email for new users (Resend ready)

### P3 (Low Priority)
- [ ] In-app mini games for bonus points
- [ ] Social sharing improvements
- [ ] Dark/Light theme toggle

## Important Notes
- Ads are SIMULATED (mock) - not real ad network yet
- UC delivery is manual (admin approves, then sends UC to player)
- Render free tier sleeps after 15 min inactivity (~50s cold start)
- Resend domain verified and working for all email addresses

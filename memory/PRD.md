# PUBG UC Rewards → GetFreeUC - PRD

## Original Problem Statement
تطبيق مكافآت UC حيث يشاهد المستخدمون الإعلانات ويربحون نقاط يمكن استبدالها بـ UC (عملة اللعبة).

## Project Overview
- **App Name**: GetFreeUC
- **App Type**: PWA (Progressive Web App) - Mobile-first
- **Languages**: Arabic (RTL) / English
- **Theme**: Dark gaming aesthetic
- **Live URL**: https://getfreeuc.com (also: www.getfreeuc.com, freeuc-rewards.vercel.app)
- **Backend URL**: https://freeuc-rewards.onrender.com
- **GitHub**: https://github.com/Jony8900/freeuc-rewards

## Tech Stack
- **Frontend**: React 19, Tailwind CSS, Lucide Icons, Sonner (toasts)
- **Backend**: FastAPI, Motor (MongoDB async)
- **Database**: MongoDB Atlas
- **Auth**: JWT (7 days expiration)
- **Hosting**: Vercel (frontend), Render (backend)
- **Domain**: getfreeuc.com (Namecheap)

## What's Been Implemented

### Phase 1 - Core App (2026-03-21)
- [x] User registration/login with JWT auth
- [x] Points system (watch ads = earn points)
- [x] 6 UC packages (60-8100 UC) with redemption
- [x] Referral system (50 points bonus)
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
- [x] Fixed Vercel build issues (date-fns, ajv, CI=true, Node.js v24)

### Phase 3 - Rebranding & Levels (2026-03-23)
- [x] Removed all PUBG references (legal safety)
- [x] Rebranded to "GetFreeUC"
- [x] Changed "PUBG ID" → "Player ID / معرف اللاعب"
- [x] Added legal disclaimer
- [x] Levels system: 5 levels (Beginner→Bronze→Silver→Gold→Diamond)
- [x] Point multipliers per level (x1→x1.2→x1.5→x2→x3)
- [x] Level-up bonuses (500→1500→5000→15000 points)
- [x] Level progress bar on homepage

## API Endpoints
- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- `POST /api/ads/watch`, `GET /api/ads/status`
- `GET /api/user/level` ← NEW
- `GET /api/packages`, `POST /api/redeem`, `GET /api/redemptions/my`
- `GET /api/referrals`
- `GET /api/admin/stats`, `GET /api/admin/users`, `GET /api/admin/redemptions`
- `PUT /api/admin/redemptions/{id}`, `PUT /api/admin/users/{id}/toggle-admin`

## Admin Credentials
- Email: admin@pubguc.com
- Password: admin123

## Levels System
| Level | Name AR | Name EN | Min Earned | Multiplier | Level-up Bonus |
|-------|---------|---------|-----------|------------|----------------|
| 1 | مبتدئ | Beginner | 0 | x1.0 | 0 |
| 2 | برونزي | Bronze | 5,000 | x1.2 | 500 |
| 3 | فضي | Silver | 25,000 | x1.5 | 1,500 |
| 4 | ذهبي | Gold | 100,000 | x2.0 | 5,000 |
| 5 | ماسي | Diamond | 500,000 | x3.0 | 15,000 |

## Prioritized Backlog

### P1 (High Priority)
- [ ] Real ad network integration (Google AdSense/AdMob)
- [ ] Push notifications

### P2 (Medium Priority)
- [ ] Daily login bonus
- [ ] Achievement badges
- [ ] Compile PWA to APK using Capacitor
- [ ] Leaderboard

### P3 (Low Priority)
- [ ] In-app mini games for bonus points
- [ ] Social sharing improvements
- [ ] Dark/Light theme toggle

## Important Notes
- Ads are SIMULATED (mock) - not real ad network
- UC delivery is manual (admin approves, then sends UC to player)
- Render free tier sleeps after 15 min inactivity (~50s cold start)
- No PUBG trademarks used - legally safe

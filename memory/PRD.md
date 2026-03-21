# PUBG UC Rewards - PRD (Product Requirements Document)

## Original Problem Statement
تطبيق مكافآت PUBG UC حيث يشاهد المستخدمون الإعلانات ويربحون نقاط يمكن استبدالها بـ UC (عملة اللعبة).

## Project Overview
- **App Type**: PWA (Progressive Web App) - Mobile-first
- **Languages**: Arabic (RTL) / English
- **Theme**: Dark gaming aesthetic (PUBG style)

## User Personas
1. **PUBG Gamer (15-30 years)**: Primary user who wants free UC
2. **Referrer**: User who invites friends to earn bonus points
3. **Admin**: Manages users and redemption requests

## Core Requirements (Static)
1. User Authentication (Register/Login)
2. Points System (Watch ads = earn points)
3. UC Packages Redemption
4. Referral System (50 points per referral)
5. Admin Dashboard
6. Arabic/English Language Support

## What's Been Implemented ✅
### Date: 2026-03-21
- [x] User registration with username, email, password, PUBG ID
- [x] User login with JWT authentication
- [x] Points balance display with gold glow effect
- [x] Watch ad simulation (5 seconds = 5 points)
- [x] Statistics cards (Total Earned, Total Redeemed, Ads Watched)
- [x] 6 UC packages (60, 325, 660, 1800, 3850, 8100 UC)
- [x] Redemption system (creates pending request, deducts points)
- [x] Redemption history with status badges
- [x] Referral code generation
- [x] Copy & share referral code
- [x] Friends referred list
- [x] 50 points bonus for referral (both referrer and referee)
- [x] Profile page with user info
- [x] Logout functionality
- [x] Admin dashboard with stats
- [x] Admin users management
- [x] Admin redemptions management (approve/reject)
- [x] Admin toggle for users
- [x] Language toggle (AR/EN)
- [x] RTL support for Arabic
- [x] Bottom navigation bar
- [x] Gaming UI theme (dark, gold accents)
- [x] Responsive mobile design

## Tech Stack
- **Frontend**: React 19, Tailwind CSS, Lucide Icons, Sonner (toasts)
- **Backend**: FastAPI, Motor (MongoDB async)
- **Database**: MongoDB
- **Auth**: JWT (7 days expiration)

## API Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/ads/watch` - Watch ad and earn points
- `GET /api/packages` - Get UC packages
- `POST /api/redeem` - Redeem UC package
- `GET /api/redemptions/my` - User's redemption history
- `GET /api/referrals` - Referral info and friends list
- `GET /api/admin/stats` - Admin statistics
- `GET /api/admin/users` - All users
- `GET /api/admin/redemptions` - All redemptions
- `PUT /api/admin/redemptions/{id}` - Approve/reject
- `PUT /api/admin/users/{id}/toggle-admin` - Toggle admin status

## Prioritized Backlog

### P0 (Critical) - Done ✅
- All core features implemented

### P1 (High Priority) - Future
- [ ] Real ad network integration (Google AdSense/AdMob)
- [ ] Payment gateway for direct UC purchase
- [ ] Push notifications

### P2 (Medium Priority) - Future
- [ ] User profile picture
- [ ] Daily login bonus
- [ ] Achievement badges
- [ ] Social sharing integration

### P3 (Low Priority) - Future
- [ ] Leaderboard
- [ ] In-app games for bonus points
- [ ] Dark/Light theme toggle

## Admin Credentials
- Email: admin@pubguc.com
- Password: admin123

## Notes
- Ads are SIMULATED (mock) - 5 second wait, no real ad network
- UC delivery is manual (admin approves, then sends UC manually to PUBG ID)

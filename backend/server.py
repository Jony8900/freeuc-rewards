from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import jwt
import bcrypt
import secrets

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# JWT settings
JWT_SECRET = os.environ.get('JWT_SECRET', secrets.token_hex(32))
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24 * 7  # 7 days

app = FastAPI()
api_router = APIRouter(prefix="/api")
security = HTTPBearer()

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# ============ MODELS ============

class UserRegister(BaseModel):
    username: str
    email: EmailStr
    password: str
    pubg_id: str
    referral_code: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    username: str
    email: str
    pubg_id: str
    points: int
    total_earned: int
    total_redeemed: int
    referral_code: str
    referred_by: Optional[str] = None
    referred_count: int
    is_admin: bool
    created_at: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

class WatchAdResponse(BaseModel):
    points_earned: int
    new_balance: int
    message: str

class UCPackage(BaseModel):
    id: str
    name: str
    uc_amount: int
    points_cost: int
    image_url: str

class RedeemRequest(BaseModel):
    package_id: str

class Redemption(BaseModel):
    id: str
    user_id: str
    username: str
    pubg_id: str
    package_id: str
    package_name: str
    uc_amount: int
    points_spent: int
    status: str  # pending, approved, rejected
    created_at: str
    processed_at: Optional[str] = None

class AdminUpdateRedemption(BaseModel):
    status: str  # approved, rejected

class AdminStats(BaseModel):
    total_users: int
    total_points_distributed: int
    total_redemptions: int
    pending_redemptions: int
    total_ads_watched: int

# ============ HELPER FUNCTIONS ============

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def create_token(user_id: str) -> str:
    payload = {
        "sub": user_id,
        "exp": datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRATION_HOURS)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        user = await db.users.find_one({"id": user_id}, {"_id": 0})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

async def get_admin_user(user: dict = Depends(get_current_user)):
    if not user.get("is_admin"):
        raise HTTPException(status_code=403, detail="Admin access required")
    return user

def generate_referral_code() -> str:
    return secrets.token_hex(4).upper()

# ============ UC PACKAGES ============

UC_PACKAGES = [
    {"id": "uc_60", "name": "60 UC", "uc_amount": 60, "points_cost": 100, "image_url": "https://images.unsplash.com/photo-1624365169106-1f1f4cd65c91?w=200"},
    {"id": "uc_325", "name": "325 UC", "uc_amount": 325, "points_cost": 500, "image_url": "https://images.unsplash.com/photo-1624365169106-1f1f4cd65c91?w=200"},
    {"id": "uc_660", "name": "660 UC", "uc_amount": 660, "points_cost": 950, "image_url": "https://images.unsplash.com/photo-1624365169106-1f1f4cd65c91?w=200"},
    {"id": "uc_1800", "name": "1800 UC", "uc_amount": 1800, "points_cost": 2500, "image_url": "https://images.unsplash.com/photo-1624365169106-1f1f4cd65c91?w=200"},
    {"id": "uc_3850", "name": "3850 UC", "uc_amount": 3850, "points_cost": 5000, "image_url": "https://images.unsplash.com/photo-1624365169106-1f1f4cd65c91?w=200"},
    {"id": "uc_8100", "name": "8100 UC", "uc_amount": 8100, "points_cost": 10000, "image_url": "https://images.unsplash.com/photo-1624365169106-1f1f4cd65c91?w=200"},
]

POINTS_PER_AD = 5
REFERRAL_BONUS = 50

# ============ AUTH ROUTES ============

@api_router.post("/auth/register", response_model=TokenResponse)
async def register(data: UserRegister):
    # Check if email exists
    existing = await db.users.find_one({"email": data.email})
    if existing:
        raise HTTPException(status_code=400, detail="البريد الإلكتروني مستخدم بالفعل")
    
    # Check if username exists
    existing_username = await db.users.find_one({"username": data.username})
    if existing_username:
        raise HTTPException(status_code=400, detail="اسم المستخدم مستخدم بالفعل")
    
    user_id = str(uuid.uuid4())
    referral_code = generate_referral_code()
    
    user = {
        "id": user_id,
        "username": data.username,
        "email": data.email,
        "password": hash_password(data.password),
        "pubg_id": data.pubg_id,
        "points": 0,
        "total_earned": 0,
        "total_redeemed": 0,
        "referral_code": referral_code,
        "referred_by": None,
        "referred_count": 0,
        "is_admin": False,
        "ads_watched": 0,
        "last_ad_time": None,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    
    # Handle referral
    if data.referral_code:
        referrer = await db.users.find_one({"referral_code": data.referral_code})
        if referrer:
            user["referred_by"] = referrer["id"]
            user["points"] = REFERRAL_BONUS  # Bonus for using referral
            user["total_earned"] = REFERRAL_BONUS
            # Give bonus to referrer
            await db.users.update_one(
                {"id": referrer["id"]},
                {
                    "$inc": {"points": REFERRAL_BONUS, "total_earned": REFERRAL_BONUS, "referred_count": 1}
                }
            )
    
    await db.users.insert_one(user)
    
    token = create_token(user_id)
    user_response = {k: v for k, v in user.items() if k != "password"}
    
    return TokenResponse(access_token=token, user=UserResponse(**user_response))

@api_router.post("/auth/login", response_model=TokenResponse)
async def login(data: UserLogin):
    user = await db.users.find_one({"email": data.email}, {"_id": 0})
    if not user or not verify_password(data.password, user["password"]):
        raise HTTPException(status_code=401, detail="بريد إلكتروني أو كلمة مرور غير صحيحة")
    
    token = create_token(user["id"])
    user_response = {k: v for k, v in user.items() if k != "password"}
    
    return TokenResponse(access_token=token, user=UserResponse(**user_response))

@api_router.get("/auth/me", response_model=UserResponse)
async def get_me(user: dict = Depends(get_current_user)):
    return UserResponse(**{k: v for k, v in user.items() if k != "password"})

# ============ POINTS & ADS ROUTES ============

@api_router.post("/ads/watch", response_model=WatchAdResponse)
async def watch_ad(user: dict = Depends(get_current_user)):
    # Simulate ad watching (in real app, verify with ad network)
    await db.users.update_one(
        {"id": user["id"]},
        {
            "$inc": {"points": POINTS_PER_AD, "total_earned": POINTS_PER_AD, "ads_watched": 1},
            "$set": {"last_ad_time": datetime.now(timezone.utc).isoformat()}
        }
    )
    
    new_balance = user["points"] + POINTS_PER_AD
    
    return WatchAdResponse(
        points_earned=POINTS_PER_AD,
        new_balance=new_balance,
        message="تم إضافة النقاط بنجاح!"
    )

@api_router.get("/points/balance")
async def get_balance(user: dict = Depends(get_current_user)):
    return {
        "points": user["points"],
        "total_earned": user["total_earned"],
        "total_redeemed": user["total_redeemed"]
    }

# ============ UC PACKAGES & REDEMPTION ============

@api_router.get("/packages", response_model=List[UCPackage])
async def get_packages():
    return [UCPackage(**pkg) for pkg in UC_PACKAGES]

@api_router.post("/redeem")
async def redeem_points(data: RedeemRequest, user: dict = Depends(get_current_user)):
    package = next((p for p in UC_PACKAGES if p["id"] == data.package_id), None)
    if not package:
        raise HTTPException(status_code=404, detail="الباقة غير موجودة")
    
    if user["points"] < package["points_cost"]:
        raise HTTPException(status_code=400, detail="نقاط غير كافية")
    
    # Create redemption request
    redemption = {
        "id": str(uuid.uuid4()),
        "user_id": user["id"],
        "username": user["username"],
        "pubg_id": user["pubg_id"],
        "package_id": package["id"],
        "package_name": package["name"],
        "uc_amount": package["uc_amount"],
        "points_spent": package["points_cost"],
        "status": "pending",
        "created_at": datetime.now(timezone.utc).isoformat(),
        "processed_at": None
    }
    
    await db.redemptions.insert_one(redemption)
    
    # Deduct points
    await db.users.update_one(
        {"id": user["id"]},
        {
            "$inc": {"points": -package["points_cost"], "total_redeemed": package["points_cost"]}
        }
    )
    
    return {"message": "تم تقديم طلب الاستبدال بنجاح", "redemption_id": redemption["id"]}

@api_router.get("/redemptions/my", response_model=List[Redemption])
async def get_my_redemptions(user: dict = Depends(get_current_user)):
    redemptions = await db.redemptions.find({"user_id": user["id"]}, {"_id": 0}).sort("created_at", -1).to_list(100)
    return [Redemption(**r) for r in redemptions]

# ============ REFERRALS ============

@api_router.get("/referrals")
async def get_referrals(user: dict = Depends(get_current_user)):
    referred_users = await db.users.find(
        {"referred_by": user["id"]},
        {"_id": 0, "id": 1, "username": 1, "created_at": 1}
    ).to_list(100)
    
    return {
        "referral_code": user["referral_code"],
        "referred_count": user["referred_count"],
        "bonus_per_referral": REFERRAL_BONUS,
        "referred_users": referred_users
    }

# ============ ADMIN ROUTES ============

@api_router.get("/admin/stats", response_model=AdminStats)
async def get_admin_stats(admin: dict = Depends(get_admin_user)):
    total_users = await db.users.count_documents({})
    
    pipeline = [{"$group": {"_id": None, "total": {"$sum": "$total_earned"}, "ads": {"$sum": "$ads_watched"}}}]
    result = await db.users.aggregate(pipeline).to_list(1)
    total_points = result[0]["total"] if result else 0
    total_ads = result[0]["ads"] if result else 0
    
    total_redemptions = await db.redemptions.count_documents({})
    pending_redemptions = await db.redemptions.count_documents({"status": "pending"})
    
    return AdminStats(
        total_users=total_users,
        total_points_distributed=total_points,
        total_redemptions=total_redemptions,
        pending_redemptions=pending_redemptions,
        total_ads_watched=total_ads
    )

@api_router.get("/admin/users")
async def get_all_users(admin: dict = Depends(get_admin_user)):
    users = await db.users.find({}, {"_id": 0, "password": 0}).to_list(1000)
    return users

@api_router.get("/admin/redemptions")
async def get_all_redemptions(admin: dict = Depends(get_admin_user), status: Optional[str] = None):
    query = {}
    if status:
        query["status"] = status
    redemptions = await db.redemptions.find(query, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return redemptions

@api_router.put("/admin/redemptions/{redemption_id}")
async def update_redemption(redemption_id: str, data: AdminUpdateRedemption, admin: dict = Depends(get_admin_user)):
    if data.status not in ["approved", "rejected"]:
        raise HTTPException(status_code=400, detail="Invalid status")
    
    redemption = await db.redemptions.find_one({"id": redemption_id})
    if not redemption:
        raise HTTPException(status_code=404, detail="Redemption not found")
    
    if redemption["status"] != "pending":
        raise HTTPException(status_code=400, detail="Redemption already processed")
    
    update_data = {
        "status": data.status,
        "processed_at": datetime.now(timezone.utc).isoformat()
    }
    
    # If rejected, refund points
    if data.status == "rejected":
        await db.users.update_one(
            {"id": redemption["user_id"]},
            {"$inc": {"points": redemption["points_spent"], "total_redeemed": -redemption["points_spent"]}}
        )
    
    await db.redemptions.update_one({"id": redemption_id}, {"$set": update_data})
    
    return {"message": f"Redemption {data.status}"}

@api_router.put("/admin/users/{user_id}/toggle-admin")
async def toggle_admin(user_id: str, admin: dict = Depends(get_admin_user)):
    user = await db.users.find_one({"id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    new_status = not user.get("is_admin", False)
    await db.users.update_one({"id": user_id}, {"$set": {"is_admin": new_status}})
    
    return {"message": f"Admin status updated to {new_status}"}

# Create default admin user on startup
@app.on_event("startup")
async def create_default_admin():
    admin = await db.users.find_one({"email": "admin@pubguc.com"})
    if not admin:
        admin_user = {
            "id": str(uuid.uuid4()),
            "username": "admin",
            "email": "admin@pubguc.com",
            "password": hash_password("admin123"),
            "pubg_id": "ADMIN",
            "points": 0,
            "total_earned": 0,
            "total_redeemed": 0,
            "referral_code": generate_referral_code(),
            "referred_by": None,
            "referred_count": 0,
            "is_admin": True,
            "ads_watched": 0,
            "last_ad_time": None,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        await db.users.insert_one(admin_user)
        logger.info("Default admin user created: admin@pubguc.com / admin123")

@api_router.get("/")
async def root():
    return {"message": "PUBG UC Rewards API", "version": "1.0.0"}

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

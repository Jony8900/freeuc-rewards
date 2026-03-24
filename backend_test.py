import requests
import sys
import json
from datetime import datetime

class PUBGUCAPITester:
    def __init__(self, base_url="https://preview-getfreeuc.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.token = None
        self.admin_token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.user_id = None
        self.admin_user_id = None

    def run_test(self, name, method, endpoint, expected_status, data=None, use_admin=False):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        
        # Use admin token if specified
        token = self.admin_token if use_admin else self.token
        if token:
            headers['Authorization'] = f'Bearer {token}'

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    return success, response.json()
                except:
                    return success, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    print(f"Response: {response.json()}")
                except:
                    print(f"Response: {response.text}")

            return success, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        success, response = self.run_test(
            "Root API Endpoint",
            "GET",
            "",
            200
        )
        return success

    def test_user_registration(self):
        """Test user registration"""
        timestamp = datetime.now().strftime('%H%M%S')
        test_data = {
            "username": f"testuser_{timestamp}",
            "email": f"test_{timestamp}@example.com",
            "password": "TestPass123!",
            "pubg_id": f"PUBG_{timestamp}",
            "referral_code": ""
        }
        
        success, response = self.run_test(
            "User Registration",
            "POST",
            "auth/register",
            200,
            data=test_data
        )
        
        if success and 'access_token' in response:
            self.token = response['access_token']
            self.user_id = response['user']['id']
            print(f"✅ User registered with ID: {self.user_id}")
            return True
        return False

    def test_admin_login(self):
        """Test admin login"""
        success, response = self.run_test(
            "Admin Login",
            "POST",
            "auth/login",
            200,
            data={"email": "admin@pubguc.com", "password": "admin123"}
        )
        
        if success and 'access_token' in response:
            self.admin_token = response['access_token']
            self.admin_user_id = response['user']['id']
            print(f"✅ Admin logged in with ID: {self.admin_user_id}")
            return True
        return False

    def test_user_login(self):
        """Test user login with registered credentials"""
        timestamp = datetime.now().strftime('%H%M%S')
        success, response = self.run_test(
            "User Login",
            "POST",
            "auth/login",
            200,
            data={"email": f"test_{timestamp}@example.com", "password": "TestPass123!"}
        )
        return success

    def test_get_user_profile(self):
        """Test getting user profile"""
        success, response = self.run_test(
            "Get User Profile",
            "GET",
            "auth/me",
            200
        )
        return success

    def test_watch_ad(self):
        """Test watching ad to earn points"""
        success, response = self.run_test(
            "Watch Ad",
            "POST",
            "ads/watch",
            200
        )
        
        if success:
            print(f"✅ Earned {response.get('points_earned', 0)} points")
        return success

    def test_get_points_balance(self):
        """Test getting points balance"""
        success, response = self.run_test(
            "Get Points Balance",
            "GET",
            "points/balance",
            200
        )
        return success

    def test_get_uc_packages(self):
        """Test getting UC packages"""
        success, response = self.run_test(
            "Get UC Packages",
            "GET",
            "packages",
            200
        )
        
        if success and isinstance(response, list) and len(response) > 0:
            print(f"✅ Found {len(response)} UC packages")
        return success

    def test_redeem_uc_package(self):
        """Test redeeming UC package (should fail due to insufficient points)"""
        success, response = self.run_test(
            "Redeem UC Package (Insufficient Points)",
            "POST",
            "redeem",
            400,  # Expecting 400 due to insufficient points
            data={"package_id": "uc_60"}
        )
        return success

    def test_get_redemption_history(self):
        """Test getting redemption history"""
        success, response = self.run_test(
            "Get Redemption History",
            "GET",
            "redemptions/my",
            200
        )
        return success

    def test_get_referrals(self):
        """Test getting referral information"""
        success, response = self.run_test(
            "Get Referrals",
            "GET",
            "referrals",
            200
        )
        
        if success:
            print(f"✅ Referral code: {response.get('referral_code', 'N/A')}")
        return success

    def test_admin_stats(self):
        """Test admin stats endpoint"""
        success, response = self.run_test(
            "Admin Stats",
            "GET",
            "admin/stats",
            200,
            use_admin=True
        )
        
        if success:
            print(f"✅ Total users: {response.get('total_users', 0)}")
            print(f"✅ Total points distributed: {response.get('total_points_distributed', 0)}")
        return success

    def test_admin_get_users(self):
        """Test admin get all users"""
        success, response = self.run_test(
            "Admin Get All Users",
            "GET",
            "admin/users",
            200,
            use_admin=True
        )
        
        if success and isinstance(response, list):
            print(f"✅ Found {len(response)} users")
        return success

    def test_admin_get_redemptions(self):
        """Test admin get all redemptions"""
        success, response = self.run_test(
            "Admin Get All Redemptions",
            "GET",
            "admin/redemptions",
            200,
            use_admin=True
        )
        
        if success and isinstance(response, list):
            print(f"✅ Found {len(response)} redemptions")
        return success

    def test_unauthorized_access(self):
        """Test unauthorized access to protected endpoints"""
        # Temporarily remove token
        temp_token = self.token
        self.token = None
        
        success, response = self.run_test(
            "Unauthorized Access (Should Fail)",
            "GET",
            "auth/me",
            401  # Expecting 401 Unauthorized
        )
        
        # Restore token
        self.token = temp_token
        return success

    def test_admin_access_without_admin_role(self):
        """Test admin endpoints with regular user token"""
        success, response = self.run_test(
            "Admin Access with Regular User (Should Fail)",
            "GET",
            "admin/stats",
            403,  # Expecting 403 Forbidden
            use_admin=False  # Use regular user token
        )
        return success

def main():
    print("🚀 Starting PUBG UC Rewards API Tests...")
    print("=" * 50)
    
    tester = PUBGUCAPITester()
    
    # Test sequence
    tests = [
        tester.test_root_endpoint,
        tester.test_user_registration,
        tester.test_admin_login,
        tester.test_get_user_profile,
        tester.test_watch_ad,
        tester.test_get_points_balance,
        tester.test_get_uc_packages,
        tester.test_redeem_uc_package,
        tester.test_get_redemption_history,
        tester.test_get_referrals,
        tester.test_admin_stats,
        tester.test_admin_get_users,
        tester.test_admin_get_redemptions,
        tester.test_unauthorized_access,
        tester.test_admin_access_without_admin_role,
    ]
    
    # Run all tests
    for test in tests:
        try:
            test()
        except Exception as e:
            print(f"❌ Test failed with exception: {str(e)}")
    
    # Print results
    print("\n" + "=" * 50)
    print(f"📊 Tests completed: {tester.tests_passed}/{tester.tests_run}")
    success_rate = (tester.tests_passed / tester.tests_run * 100) if tester.tests_run > 0 else 0
    print(f"📈 Success rate: {success_rate:.1f}%")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print("⚠️  Some tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())
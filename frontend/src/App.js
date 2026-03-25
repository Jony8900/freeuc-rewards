import React from 'react';
import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'sonner';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { AuthPage } from './pages/AuthPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { HomePage } from './pages/HomePage';
import { TasksPage } from './pages/TasksPage';
import { RedeemPage } from './pages/RedeemPage';
import { ReferralsPage } from './pages/ReferralsPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminPage } from './pages/AdminPage';
import { SettingsPage } from './pages/SettingsPage';
import { PackagesPage } from './pages/PackagesPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { BottomNav } from './components/BottomNav';

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0C] flex items-center justify-center">
        <div className="w-10 h-10 spinner" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

// Auth Route (redirect if already logged in)
function AuthRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0C] flex items-center justify-center">
        <div className="w-10 h-10 spinner" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

// Layout with Bottom Nav
function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0A0A0C]">
      {children}
      <BottomNav />
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <AuthRoute>
            <AuthPage />
          </AuthRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <AuthRoute>
            <ForgotPasswordPage />
          </AuthRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <ResetPasswordPage />
        }
      />
      <Route
        path="/privacy-policy"
        element={
          <PrivacyPolicyPage />
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout>
              <HomePage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <AppLayout>
              <TasksPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/redeem"
        element={
          <ProtectedRoute>
            <AppLayout>
              <RedeemPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/referrals"
        element={
          <ProtectedRoute>
            <AppLayout>
              <ReferralsPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/leaderboard"
        element={
          <ProtectedRoute>
            <AppLayout>
              <LeaderboardPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <AppLayout>
              <ProfilePage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AppLayout>
              <AdminPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute>
            <AppLayout>
              <SettingsPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/packages"
        element={
          <ProtectedRoute>
            <AppLayout>
              <PackagesPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <SettingsProvider>
          <BrowserRouter>
            <div className="App dark">
              <AppRoutes />
              <Toaster 
                position="top-center" 
                toastOptions={{
                  style: {
                    background: '#141419',
                    color: '#ffffff',
                    border: '1px solid #27272A',
                  },
                }}
              />
            </div>
          </BrowserRouter>
        </SettingsProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const defaultSettings = {
  app_name: "Free UC Rewards",
  app_name_ar: "مكافآت UC المجانية",
  tagline: "EARN FREE UC",
  tagline_ar: "اربح UC مجاناً",
  primary_color: "#F39C12",
  secondary_color: "#E67E22",
  background_color: "#0A0A0C",
  logo_url: "",
  points_per_ad: 10,
  referral_bonus: 200,
  contact_email: "",
  social_links: {
    telegram: "",
    whatsapp: "",
    instagram: ""
  }
};

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get(`${API}/settings`);
      setSettings({ ...defaultSettings, ...response.data });
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings) => {
    try {
      await axios.put(`${API}/admin/settings`, newSettings);
      setSettings(prev => ({ ...prev, ...newSettings }));
      return true;
    } catch (error) {
      console.error('Failed to update settings:', error);
      return false;
    }
  };

  const refreshSettings = () => {
    fetchSettings();
  };

  return (
    <SettingsContext.Provider value={{ 
      settings, 
      loading, 
      updateSettings,
      refreshSettings
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}

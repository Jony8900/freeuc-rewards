import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  Package, Plus, Edit2, Trash2, Save, X, 
  Coins, Shield, Check, AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export function PackagesPage() {
  const { language } = useLanguage();
  const { isAdmin } = useAuth();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPackage, setNewPackage] = useState({
    name: '',
    uc_amount: '',
    points_cost: '',
    is_active: true
  });
  const [saving, setSaving] = useState(false);

  const isRTL = language === 'ar';

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get(`${API}/admin/packages`);
      setPackages(response.data);
    } catch (error) {
      console.error('Failed to fetch packages:', error);
      toast.error(isRTL ? 'فشل تحميل الباقات' : 'Failed to load packages');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (pkg) => {
    setEditingId(pkg.id);
    setEditData({
      name: pkg.name,
      uc_amount: pkg.uc_amount,
      points_cost: pkg.points_cost,
      is_active: pkg.is_active
    });
  };

  const handleSaveEdit = async (packageId) => {
    setSaving(true);
    try {
      await axios.put(`${API}/admin/packages/${packageId}`, editData);
      toast.success(isRTL ? 'تم تحديث الباقة بنجاح' : 'Package updated successfully');
      setEditingId(null);
      fetchPackages();
    } catch (error) {
      toast.error(error.response?.data?.detail || (isRTL ? 'فشل التحديث' : 'Update failed'));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (packageId) => {
    if (!window.confirm(isRTL ? 'هل أنت متأكد من حذف هذه الباقة؟' : 'Are you sure you want to delete this package?')) {
      return;
    }

    try {
      await axios.delete(`${API}/admin/packages/${packageId}`);
      toast.success(isRTL ? 'تم حذف الباقة بنجاح' : 'Package deleted successfully');
      fetchPackages();
    } catch (error) {
      toast.error(error.response?.data?.detail || (isRTL ? 'فشل الحذف' : 'Delete failed'));
    }
  };

  const handleAddPackage = async () => {
    if (!newPackage.name || !newPackage.uc_amount || !newPackage.points_cost) {
      toast.error(isRTL ? 'يرجى ملء جميع الحقول' : 'Please fill all fields');
      return;
    }

    setSaving(true);
    try {
      await axios.post(`${API}/admin/packages`, {
        name: newPackage.name,
        uc_amount: parseInt(newPackage.uc_amount),
        points_cost: parseInt(newPackage.points_cost),
        is_active: newPackage.is_active
      });
      toast.success(isRTL ? 'تم إضافة الباقة بنجاح' : 'Package added successfully');
      setShowAddForm(false);
      setNewPackage({ name: '', uc_amount: '', points_cost: '', is_active: true });
      fetchPackages();
    } catch (error) {
      toast.error(error.response?.data?.detail || (isRTL ? 'فشل الإضافة' : 'Add failed'));
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (pkg) => {
    try {
      await axios.put(`${API}/admin/packages/${pkg.id}`, { is_active: !pkg.is_active });
      toast.success(isRTL ? 'تم تحديث الحالة' : 'Status updated');
      fetchPackages();
    } catch (error) {
      toast.error(isRTL ? 'فشل التحديث' : 'Update failed');
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0A0A0C] flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-white font-display text-xl">Admin Access Required</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0C] flex items-center justify-center">
        <div className="w-10 h-10 spinner" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0C] pb-24 noise-bg">
      <div className="relative z-10 p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-2xl text-white flex items-center gap-2">
            <Package className="w-6 h-6 text-[#F39C12]" />
            {isRTL ? 'إدارة الباقات' : 'Manage Packages'}
          </h1>
          <button
            onClick={() => setShowAddForm(true)}
            data-testid="add-package-btn"
            className="flex items-center gap-2 px-4 py-2 bg-[#F39C12] text-black rounded-sm text-sm uppercase tracking-[0.15em] hover:bg-[#E67E22] transition-colors"
          >
            <Plus className="w-4 h-4" />
            {isRTL ? 'إضافة' : 'Add'}
          </button>
        </div>

        {/* Add New Package Form */}
        {showAddForm && (
          <div className="bg-[#141419] border border-[#F39C12] rounded-sm p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#F39C12] font-semibold">
                {isRTL ? 'إضافة باقة جديدة' : 'Add New Package'}
              </h3>
              <button onClick={() => setShowAddForm(false)} className="text-[#8A8A93] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-[#8A8A93] mb-2">
                  {isRTL ? 'اسم الباقة' : 'Package Name'}
                </label>
                <input
                  type="text"
                  value={newPackage.name}
                  onChange={(e) => setNewPackage(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="60 UC"
                  className="w-full bg-[#0A0A0C] border border-[#27272A] rounded-sm px-3 py-2 text-white text-sm focus:border-[#F39C12]"
                />
              </div>
              <div>
                <label className="block text-xs text-[#8A8A93] mb-2">
                  {isRTL ? 'كمية UC' : 'UC Amount'}
                </label>
                <input
                  type="number"
                  value={newPackage.uc_amount}
                  onChange={(e) => setNewPackage(prev => ({ ...prev, uc_amount: e.target.value }))}
                  placeholder="60"
                  className="w-full bg-[#0A0A0C] border border-[#27272A] rounded-sm px-3 py-2 text-white text-sm focus:border-[#F39C12]"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-[#8A8A93] mb-2">
                  {isRTL ? 'سعر النقاط' : 'Points Cost'}
                </label>
                <input
                  type="number"
                  value={newPackage.points_cost}
                  onChange={(e) => setNewPackage(prev => ({ ...prev, points_cost: e.target.value }))}
                  placeholder="1500"
                  className="w-full bg-[#0A0A0C] border border-[#27272A] rounded-sm px-3 py-2 text-white text-sm focus:border-[#F39C12]"
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newPackage.is_active}
                    onChange={(e) => setNewPackage(prev => ({ ...prev, is_active: e.target.checked }))}
                    className="w-4 h-4 accent-[#F39C12]"
                  />
                  <span className="text-white text-sm">{isRTL ? 'مفعّلة' : 'Active'}</span>
                </label>
              </div>
            </div>
            
            <button
              onClick={handleAddPackage}
              disabled={saving}
              className="w-full bg-[#F39C12] hover:bg-[#E67E22] text-black py-2 rounded-sm uppercase tracking-[0.15em] text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              {saving ? (
                <div className="w-4 h-4 spinner" />
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  {isRTL ? 'إضافة الباقة' : 'Add Package'}
                </>
              )}
            </button>
          </div>
        )}

        {/* Packages List */}
        <div className="space-y-3">
          {packages.length === 0 ? (
            <div className="bg-[#141419] border border-[#27272A] rounded-sm p-6 text-center">
              <Package className="w-10 h-10 text-[#8A8A93] mx-auto mb-2" />
              <p className="text-[#8A8A93]">{isRTL ? 'لا توجد باقات' : 'No packages'}</p>
            </div>
          ) : (
            packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-[#141419] border rounded-sm overflow-hidden ${
                  pkg.is_active ? 'border-[#27272A]' : 'border-red-500/30 opacity-60'
                }`}
                data-testid={`package-item-${pkg.id}`}
              >
                {editingId === pkg.id ? (
                  /* Edit Mode */
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs text-[#8A8A93] mb-1">
                          {isRTL ? 'الاسم' : 'Name'}
                        </label>
                        <input
                          type="text"
                          value={editData.name}
                          onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full bg-[#0A0A0C] border border-[#27272A] rounded-sm px-2 py-1.5 text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[#8A8A93] mb-1">
                          {isRTL ? 'كمية UC' : 'UC Amount'}
                        </label>
                        <input
                          type="number"
                          value={editData.uc_amount}
                          onChange={(e) => setEditData(prev => ({ ...prev, uc_amount: parseInt(e.target.value) || 0 }))}
                          className="w-full bg-[#0A0A0C] border border-[#27272A] rounded-sm px-2 py-1.5 text-white text-sm"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs text-[#8A8A93] mb-1">
                          {isRTL ? 'سعر النقاط' : 'Points Cost'}
                        </label>
                        <input
                          type="number"
                          value={editData.points_cost}
                          onChange={(e) => setEditData(prev => ({ ...prev, points_cost: parseInt(e.target.value) || 0 }))}
                          className="w-full bg-[#0A0A0C] border border-[#27272A] rounded-sm px-2 py-1.5 text-white text-sm"
                        />
                      </div>
                      <div className="flex items-end">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editData.is_active}
                            onChange={(e) => setEditData(prev => ({ ...prev, is_active: e.target.checked }))}
                            className="w-4 h-4 accent-[#F39C12]"
                          />
                          <span className="text-white text-sm">{isRTL ? 'مفعّلة' : 'Active'}</span>
                        </label>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveEdit(pkg.id)}
                        disabled={saving}
                        className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-green-500 py-2 rounded-sm text-sm flex items-center justify-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        {isRTL ? 'حفظ' : 'Save'}
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="flex-1 bg-[#27272A] hover:bg-[#3a3a3a] text-white py-2 rounded-sm text-sm flex items-center justify-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        {isRTL ? 'إلغاء' : 'Cancel'}
                      </button>
                    </div>
                  </div>
                ) : (
                  /* View Mode */
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-sm bg-[#F39C12]/20 flex items-center justify-center">
                          <Coins className="w-6 h-6 text-[#F39C12]" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{pkg.name}</h3>
                          <p className="text-[#8A8A93] text-sm">{pkg.uc_amount} UC</p>
                        </div>
                      </div>
                      <div className="text-end">
                        <p className="text-[#F39C12] font-display text-xl">{pkg.points_cost?.toLocaleString()}</p>
                        <p className="text-[#8A8A93] text-xs">{isRTL ? 'نقطة' : 'points'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => toggleActive(pkg)}
                        className={`flex items-center gap-1 text-xs px-2 py-1 rounded-sm ${
                          pkg.is_active 
                            ? 'bg-green-500/20 text-green-500' 
                            : 'bg-red-500/20 text-red-500'
                        }`}
                      >
                        {pkg.is_active ? <Check className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                        {pkg.is_active ? (isRTL ? 'مفعّلة' : 'Active') : (isRTL ? 'معطّلة' : 'Inactive')}
                      </button>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(pkg)}
                          className="p-2 bg-[#27272A] hover:bg-[#F39C12] hover:text-black text-white rounded-sm transition-colors"
                          data-testid={`edit-${pkg.id}`}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(pkg.id)}
                          className="p-2 bg-[#27272A] hover:bg-red-500 text-white rounded-sm transition-colors"
                          data-testid={`delete-${pkg.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Info Note */}
        <div className="mt-6 bg-[#141419] border border-[#27272A] rounded-sm p-4">
          <p className="text-[#8A8A93] text-xs text-center">
            {isRTL 
              ? '💡 الباقات المعطّلة لن تظهر للمستخدمين في صفحة الاستبدال' 
              : '💡 Inactive packages will not be shown to users in the redeem page'}
          </p>
        </div>
      </div>
    </div>
  );
}

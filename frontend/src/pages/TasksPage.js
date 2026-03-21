import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Target, CheckCircle, Gift, Clock, Zap, Users, LogIn } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export function TasksPage() {
  const { t, language, isRTL } = useLanguage();
  const { user, refreshUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API}/tasks/daily`);
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const claimReward = async (taskId) => {
    setClaiming(taskId);
    try {
      const response = await axios.post(`${API}/tasks/claim/${taskId}`);
      toast.success(response.data.message);
      await fetchTasks();
      await refreshUser();
    } catch (error) {
      const message = error.response?.data?.detail || t('error');
      toast.error(message);
    } finally {
      setClaiming(null);
    }
  };

  const getTaskIcon = (taskId) => {
    if (taskId.includes('ads')) return Zap;
    if (taskId.includes('invite') || taskId.includes('referral')) return Users;
    if (taskId.includes('login')) return LogIn;
    return Target;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0C] flex items-center justify-center">
        <div className="w-10 h-10 spinner" />
      </div>
    );
  }

  const completedCount = tasks.filter(t => t.completed).length;
  const claimedCount = tasks.filter(t => t.claimed).length;
  const totalReward = tasks.reduce((sum, t) => sum + t.reward, 0);
  const earnedReward = tasks.filter(t => t.claimed).reduce((sum, t) => sum + t.reward, 0);

  return (
    <div className="min-h-screen bg-[#0A0A0C] pb-24 noise-bg">
      <div className="relative z-10 p-4">
        {/* Header */}
        <h1 className="font-display text-2xl text-white mb-2 flex items-center gap-2">
          <Target className="w-6 h-6 text-[#F39C12]" />
          {language === 'ar' ? 'المهام اليومية' : 'Daily Tasks'}
        </h1>
        <p className="text-[#8A8A93] text-sm mb-6">
          {language === 'ar' ? 'أكمل المهام واربح مكافآت إضافية!' : 'Complete tasks and earn bonus rewards!'}
        </p>

        {/* Progress Summary */}
        <div className="bg-gradient-to-br from-[#1a1a1f] to-[#141419] border border-[#27272A] rounded-sm p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[#8A8A93] text-sm">
              {language === 'ar' ? 'التقدم اليومي' : 'Daily Progress'}
            </span>
            <span className="text-[#F39C12] font-display text-lg">
              {claimedCount}/{tasks.length}
            </span>
          </div>
          <div className="w-full h-2 bg-[#27272A] rounded-full overflow-hidden mb-3">
            <div 
              className="h-full bg-[#F39C12] transition-all duration-500"
              style={{ width: `${(claimedCount / tasks.length) * 100}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#8A8A93]">
              {language === 'ar' ? 'المكافآت المحصّلة' : 'Rewards Earned'}
            </span>
            <span className="text-green-400 font-semibold">
              {earnedReward} / {totalReward} {language === 'ar' ? 'نقطة' : 'pts'}
            </span>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          {tasks.map((task) => {
            const Icon = getTaskIcon(task.id);
            const progressPercent = Math.min((task.progress / task.target) * 100, 100);
            
            return (
              <div
                key={task.id}
                className={`bg-[#141419] border rounded-sm overflow-hidden transition-all ${
                  task.claimed 
                    ? 'border-green-500/30 opacity-70' 
                    : task.completed 
                    ? 'border-[#F39C12]/50' 
                    : 'border-[#27272A]'
                }`}
                data-testid={`task-${task.id}`}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-sm flex items-center justify-center ${
                        task.claimed 
                          ? 'bg-green-500/20' 
                          : task.completed 
                          ? 'bg-[#F39C12]/20' 
                          : 'bg-[#27272A]'
                      }`}>
                        {task.claimed ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Icon className={`w-5 h-5 ${task.completed ? 'text-[#F39C12]' : 'text-[#8A8A93]'}`} />
                        )}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">
                          {language === 'ar' ? task.name_ar : task.name_en}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Gift className="w-4 h-4 text-[#F39C12]" />
                          <span className="text-[#F39C12] text-sm font-semibold">
                            +{task.reward} {language === 'ar' ? 'نقطة' : 'pts'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[#8A8A93] text-sm">
                      {task.progress}/{task.target}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-[#27272A] rounded-full overflow-hidden mb-3">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        task.claimed ? 'bg-green-500' : task.completed ? 'bg-[#F39C12]' : 'bg-[#8A8A93]'
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  {/* Claim Button */}
                  {task.completed && !task.claimed && (
                    <button
                      onClick={() => claimReward(task.id)}
                      disabled={claiming === task.id}
                      data-testid={`claim-${task.id}`}
                      className="w-full bg-[#F39C12] hover:bg-[#E67E22] text-black py-2.5 rounded-sm uppercase tracking-[0.15em] text-sm font-semibold flex items-center justify-center gap-2 transition-colors pulse-gold"
                    >
                      {claiming === task.id ? (
                        <span className="inline-block w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      ) : (
                        <>
                          <Gift className="w-4 h-4" />
                          {language === 'ar' ? 'استلم المكافأة' : 'Claim Reward'}
                        </>
                      )}
                    </button>
                  )}

                  {task.claimed && (
                    <div className="flex items-center justify-center gap-2 text-green-500 py-2">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">{language === 'ar' ? 'تم الاستلام' : 'Claimed'}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Reset Timer */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 text-[#8A8A93] text-sm bg-[#141419] px-4 py-2 rounded-sm">
            <Clock className="w-4 h-4" />
            <span>{language === 'ar' ? 'تُعاد المهام يومياً عند منتصف الليل' : 'Tasks reset daily at midnight'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

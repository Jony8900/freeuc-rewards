import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Trophy, Medal, Crown, Star, User } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export function LeaderboardPage() {
  const { language } = useLanguage();
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState([]);
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [myRank, setMyRank] = useState(null);
  const [loading, setLoading] = useState(true);

  const isRTL = language === 'ar';

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [lbRes, rankRes] = await Promise.all([
        axios.get(`${API}/leaderboard`),
        user ? axios.get(`${API}/leaderboard/my-rank`).catch(() => null) : null,
      ]);
      setLeaderboard(lbRes.data.leaderboard);
      setTotalPlayers(lbRes.data.total_players);
      if (rankRes?.data) setMyRank(rankRes.data);
    } catch (err) {
      console.error('Failed to fetch leaderboard:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const getRankIcon = (rank) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-[#FFD700]" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-[#C0C0C0]" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-[#CD7F32]" />;
    return <span className="text-[#8A8A93] text-sm font-mono w-5 text-center">#{rank}</span>;
  };

  const getRankBg = (rank) => {
    if (rank === 1) return 'bg-[#FFD700]/10 border-[#FFD700]/30';
    if (rank === 2) return 'bg-[#C0C0C0]/10 border-[#C0C0C0]/30';
    if (rank === 3) return 'bg-[#CD7F32]/10 border-[#CD7F32]/30';
    return 'bg-[#141419] border-[#27272A]';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-[#F39C12] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-4 pb-24" dir={isRTL ? 'rtl' : 'ltr'} data-testid="leaderboard-page">
      {/* Header */}
      <div className="text-center mb-6">
        <Trophy className="w-10 h-10 text-[#F39C12] mx-auto mb-2" />
        <h1 className="text-2xl font-display text-white">
          {isRTL ? 'المتصدرين' : 'Leaderboard'}
        </h1>
        <p className="text-[#8A8A93] text-sm mt-1">
          {isRTL ? `${totalPlayers} لاعب` : `${totalPlayers} Players`}
        </p>
      </div>

      {/* My Rank Card */}
      {myRank && !myRank.is_admin && (
        <div className="bg-[#F39C12]/10 border border-[#F39C12]/30 rounded-sm p-4 mb-6" data-testid="my-rank-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F39C12]/20 flex items-center justify-center">
                <User className="w-5 h-5 text-[#F39C12]" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{myRank.username}</p>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3" style={{ color: myRank.level_color }} />
                  <span className="text-xs" style={{ color: myRank.level_color }}>
                    {isRTL ? myRank.level_name_ar : myRank.level_name_en}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-[#F39C12] font-display text-2xl">#{myRank.rank}</p>
              <p className="text-[#8A8A93] text-xs">
                {isRTL ? `من ${myRank.total_players}` : `of ${myRank.total_players}`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard List */}
      <div className="space-y-2">
        {leaderboard.map((player) => (
          <div
            key={player.rank}
            className={`border rounded-sm p-3 flex items-center gap-3 transition-all ${getRankBg(player.rank)}`}
            data-testid={`leaderboard-rank-${player.rank}`}
          >
            {/* Rank */}
            <div className="flex-shrink-0 w-8 flex justify-center">
              {getRankIcon(player.rank)}
            </div>

            {/* Player Info */}
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold truncate">{player.username}</p>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3" style={{ color: player.level_color }} />
                  <span className="text-xs" style={{ color: player.level_color }}>
                    {isRTL ? player.level_name_ar : player.level_name_en}
                  </span>
                </div>
                {player.pubg_id && (
                  <span className="text-[#8A8A93] text-xs">
                    ID: {player.pubg_id}
                  </span>
                )}
              </div>
            </div>

            {/* Points */}
            <div className="text-left flex-shrink-0">
              <p className="text-[#F39C12] font-display text-sm">
                {player.total_earned.toLocaleString()}
              </p>
              <p className="text-[#8A8A93] text-xs">
                {isRTL ? 'نقطة' : 'pts'}
              </p>
            </div>
          </div>
        ))}

        {leaderboard.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-12 h-12 text-[#27272A] mx-auto mb-3" />
            <p className="text-[#8A8A93]">
              {isRTL ? 'لا يوجد لاعبين بعد' : 'No players yet'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LeaderboardPage;

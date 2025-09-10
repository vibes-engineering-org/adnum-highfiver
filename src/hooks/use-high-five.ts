"use client";

import { useState, useEffect, useCallback } from "react";
import { useMiniAppSdk } from "./use-miniapp-sdk";

interface HighFiveStats {
  totalHighFives: number;
  dailyHighFives: number;
  points: number;
  lastCheckIn: string | null;
  currentStreak: number;
  badges: string[];
  refCode: string;
  lastHighFiveDate: string | null;
}

interface LeaderboardEntry {
  userId: string;
  username: string;
  points: number;
  totalHighFives: number;
  badges: string[];
}

const POINTS_PER_HIGH_FIVE = 10;
const DAILY_CHECKIN_POINTS = 50;
const STREAK_BONUS_MULTIPLIER = 2;
const REF_BOOST_MULTIPLIER = 1.5;

export function useHighFive() {
  const { context, isSDKLoaded } = useMiniAppSdk();
  const [stats, setStats] = useState<HighFiveStats>({
    totalHighFives: 0,
    dailyHighFives: 0,
    points: 0,
    lastCheckIn: null,
    currentStreak: 0,
    badges: [],
    refCode: "",
    lastHighFiveDate: null,
  });
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false);

  const userId = context?.user?.fid?.toString() || "anonymous";
  const username = context?.user?.username || "Anonymous User";
  
  // Load user stats from localStorage
  useEffect(() => {
    if (!isSDKLoaded) return;
    
    const savedStats = localStorage.getItem(`highfive_stats_${userId}`);
    if (savedStats) {
      const parsed = JSON.parse(savedStats);
      setStats(parsed);
      
      // Check if user has checked in today
      const today = new Date().toDateString();
      setHasCheckedInToday(parsed.lastCheckIn === today);
      
      // Reset daily high fives if it's a new day
      if (parsed.lastHighFiveDate !== today) {
        setStats(prev => ({ ...prev, dailyHighFives: 0 }));
      }
    } else {
      // Generate ref code using Farcaster ID (fid)
      const refCode = userId !== "anonymous" ? userId : `HF${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
      setStats(prev => ({ ...prev, refCode }));
    }
    
    // Load global leaderboard
    const savedLeaderboard = localStorage.getItem("highfive_leaderboard");
    if (savedLeaderboard) {
      setLeaderboard(JSON.parse(savedLeaderboard));
    }
  }, [userId, isSDKLoaded]);

  // Save stats to localStorage whenever they change
  useEffect(() => {
    if (!isSDKLoaded) return;
    localStorage.setItem(`highfive_stats_${userId}`, JSON.stringify(stats));
  }, [stats, userId, isSDKLoaded]);

  const updateLeaderboard = useCallback((newStats: HighFiveStats) => {
    const existingLeaderboard = JSON.parse(localStorage.getItem("highfive_leaderboard") || "[]");
    
    const userIndex = existingLeaderboard.findIndex((entry: LeaderboardEntry) => entry.userId === userId);
    const userEntry: LeaderboardEntry = {
      userId,
      username,
      points: newStats.points,
      totalHighFives: newStats.totalHighFives,
      badges: newStats.badges,
    };
    
    if (userIndex >= 0) {
      existingLeaderboard[userIndex] = userEntry;
    } else {
      existingLeaderboard.push(userEntry);
    }
    
    // Sort by points descending
    existingLeaderboard.sort((a: LeaderboardEntry, b: LeaderboardEntry) => b.points - a.points);
    
    localStorage.setItem("highfive_leaderboard", JSON.stringify(existingLeaderboard));
    setLeaderboard(existingLeaderboard);
  }, [userId, username]);

  const getBadges = (totalHighFives: number): string[] => {
    const badges = [];
    if (totalHighFives >= 10) badges.push("High Five Rookie");
    if (totalHighFives >= 100) badges.push("High Five Champion");
    if (totalHighFives >= 500) badges.push("High Five Legend");
    if (totalHighFives >= 1000) badges.push("High Five Master");
    return badges;
  };

  const giveHighFive = useCallback((hasRefBoost = false) => {
    setStats(prev => {
      const today = new Date().toDateString();
      const newTotalHighFives = prev.totalHighFives + 1;
      const newDailyHighFives = prev.lastHighFiveDate === today ? prev.dailyHighFives + 1 : 1;
      
      let pointsToAdd = POINTS_PER_HIGH_FIVE;
      if (hasRefBoost) {
        pointsToAdd = Math.floor(pointsToAdd * REF_BOOST_MULTIPLIER);
      }
      
      const newStats = {
        ...prev,
        totalHighFives: newTotalHighFives,
        dailyHighFives: newDailyHighFives,
        points: prev.points + pointsToAdd,
        badges: getBadges(newTotalHighFives),
        lastHighFiveDate: today,
      };
      
      updateLeaderboard(newStats);
      return newStats;
    });
  }, [updateLeaderboard]);

  const dailyCheckIn = useCallback(() => {
    if (hasCheckedInToday) return false;
    
    setStats(prev => {
      const today = new Date().toDateString();
      const isConsecutiveDay = prev.lastCheckIn && 
        new Date(prev.lastCheckIn).getTime() === new Date().getTime() - (24 * 60 * 60 * 1000);
      
      const newStreak = isConsecutiveDay ? prev.currentStreak + 1 : 1;
      const bonusPoints = newStreak > 1 ? DAILY_CHECKIN_POINTS * STREAK_BONUS_MULTIPLIER : DAILY_CHECKIN_POINTS;
      
      const newStats = {
        ...prev,
        points: prev.points + bonusPoints,
        lastCheckIn: today,
        currentStreak: newStreak,
      };
      
      updateLeaderboard(newStats);
      return newStats;
    });
    
    setHasCheckedInToday(true);
    return true;
  }, [hasCheckedInToday, updateLeaderboard]);

  const getUserRank = useCallback(() => {
    const userIndex = leaderboard.findIndex(entry => entry.userId === userId);
    return userIndex >= 0 ? userIndex + 1 : null;
  }, [leaderboard, userId]);

  return {
    stats,
    leaderboard,
    hasCheckedInToday,
    giveHighFive,
    dailyCheckIn,
    getUserRank,
    userId,
    username,
    isSDKLoaded,
  };
}
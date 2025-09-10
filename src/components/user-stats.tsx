"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { HandHeart, TrendingUp, Calendar, Trophy } from "lucide-react";

interface UserStatsProps {
  username: string;
  totalHighFives: number;
  dailyHighFives: number;
  points: number;
  currentStreak: number;
  badges: string[];
  userRank: number | null;
}

export function UserStats({
  username,
  totalHighFives,
  dailyHighFives, 
  points,
  currentStreak,
  badges,
  userRank
}: UserStatsProps) {
  const stats = [
    {
      label: "Total High Fives",
      value: totalHighFives.toLocaleString(),
      icon: <HandHeart className="w-4 h-4" />,
      color: "text-blue-600",
    },
    {
      label: "Today's High Fives",
      value: dailyHighFives.toString(),
      icon: <TrendingUp className="w-4 h-4" />,
      color: "text-green-600",
    },
    {
      label: "Check-in Streak",
      value: `${currentStreak} day${currentStreak !== 1 ? 's' : ''}`,
      icon: <Calendar className="w-4 h-4" />,
      color: "text-purple-600",
    },
    {
      label: "Global Rank",
      value: userRank ? `#${userRank}` : "Unranked",
      icon: <Trophy className="w-4 h-4" />,
      color: "text-yellow-600",
    },
  ];

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HandHeart className="w-5 h-5" />
          Your Stats
        </CardTitle>
        <CardDescription>
          Hello, {username}! Here&apos;s your high five progress
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center p-4 bg-primary/10 rounded-lg">
          <p className="text-2xl font-bold text-primary">{points.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">Total Points</p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-3 bg-muted/30 rounded-lg">
              <div className={`flex items-center justify-center gap-1 ${stat.color}`}>
                {stat.icon}
                <span className="font-semibold">{stat.value}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
        
        {badges.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Your Badges:</p>
            <div className="flex flex-wrap gap-1">
              {badges.map((badge) => (
                <Badge key={badge} variant="secondary" className="text-xs">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
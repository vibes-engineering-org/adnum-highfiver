"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Trophy, Medal, Award, Crown } from "lucide-react";

interface LeaderboardEntry {
  userId: string;
  username: string;
  points: number;
  totalHighFives: number;
  badges: string[];
}

interface LeaderboardProps {
  leaderboard: LeaderboardEntry[];
  currentUserId: string;
  userRank: number | null;
}

export function Leaderboard({ leaderboard, currentUserId, userRank }: LeaderboardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-yellow-50 border-yellow-200";
      case 2:
        return "bg-gray-50 border-gray-200";
      case 3:
        return "bg-amber-50 border-amber-200";
      default:
        return "";
    }
  };

  const topUsers = leaderboard.slice(0, 10);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Global Leaderboard
        </CardTitle>
        <CardDescription>
          Top high fivers in the community
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {userRank && (
          <div className="mb-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-sm font-medium text-primary">Your Rank: #{userRank}</p>
          </div>
        )}
        
        {topUsers.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Trophy className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No rankings yet</p>
            <p className="text-sm">Be the first to give high fives!</p>
          </div>
        ) : (
          topUsers.map((user, index) => {
            const rank = index + 1;
            const isCurrentUser = user.userId === currentUserId;
            
            return (
              <div
                key={user.userId}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                  getRankColor(rank)
                } ${isCurrentUser ? 'ring-2 ring-primary/30' : ''}`}
              >
                <div className="flex-shrink-0">
                  {getRankIcon(rank)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`font-medium truncate ${
                      isCurrentUser ? 'text-primary' : ''
                    }`}>
                      {user.username}
                      {isCurrentUser && <span className="text-xs">(You)</span>}
                    </p>
                    {user.badges.length > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {user.badges.length} badge{user.badges.length !== 1 ? 's' : ''}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{user.points.toLocaleString()} pts</span>
                    <span>{user.totalHighFives.toLocaleString()} high fives</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
        
        {leaderboard.length > 10 && (
          <div className="text-center pt-2 text-sm text-muted-foreground">
            ... and {leaderboard.length - 10} more users
          </div>
        )}
      </CardContent>
    </Card>
  );
}
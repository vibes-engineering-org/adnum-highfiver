"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { HighFiveButton } from "~/components/high-five-button";
import { UserStats } from "~/components/user-stats";
import { DailyCheckIn } from "~/components/daily-checkin";
import { BadgeSystem } from "~/components/badge-system";
import { Leaderboard } from "~/components/leaderboard";
import { RefCodeShare } from "~/components/ref-code-share";
import { useHighFive } from "~/hooks/use-high-five";
import { HandHeart } from "lucide-react";

export default function App() {
  const {
    stats,
    leaderboard,
    hasCheckedInToday,
    giveHighFive,
    dailyCheckIn,
    getUserRank,
    userId,
    username,
    isSDKLoaded,
  } = useHighFive();

  const [highFiveCount, setHighFiveCount] = useState(0);

  const handleHighFive = () => {
    giveHighFive();
    setHighFiveCount(prev => prev + 1);
  };

  if (!isSDKLoaded) {
    return (
      <div className="w-[400px] mx-auto py-8 px-4 min-h-screen flex flex-col items-center justify-center">
        <div className="text-center space-y-4">
          <HandHeart className="w-12 h-12 mx-auto text-primary animate-pulse" />
          <p className="text-lg text-muted-foreground">Loading High Five...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[400px] mx-auto py-6 px-4 min-h-screen">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-primary mb-2">High Five!</h1>
        <p className="text-muted-foreground">Connect with the Farcaster community</p>
      </div>

      <div className="mb-6 text-center">
        <HighFiveButton onHighFive={handleHighFive} />
        <p className="mt-3 text-sm text-muted-foreground">
          Tap to give a high five and earn points!
        </p>
      </div>

      <Tabs defaultValue="stats" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="checkin">Daily</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="leaderboard">Ranks</TabsTrigger>
        </TabsList>

        <div className="mt-4">
          <TabsContent value="stats" className="space-y-4 mt-0">
            <UserStats
              username={username}
              totalHighFives={stats.totalHighFives}
              dailyHighFives={stats.dailyHighFives}
              points={stats.points}
              currentStreak={stats.currentStreak}
              badges={stats.badges}
              userRank={getUserRank()}
            />
            <RefCodeShare refCode={stats.refCode} points={stats.points} />
          </TabsContent>

          <TabsContent value="checkin" className="mt-0">
            <DailyCheckIn
              onCheckIn={dailyCheckIn}
              hasCheckedInToday={hasCheckedInToday}
              currentStreak={stats.currentStreak}
              points={stats.points}
            />
          </TabsContent>

          <TabsContent value="badges" className="mt-0">
            <BadgeSystem
              badges={stats.badges}
              totalHighFives={stats.totalHighFives}
            />
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-0">
            <Leaderboard
              leaderboard={leaderboard}
              currentUserId={userId}
              userRank={getUserRank()}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

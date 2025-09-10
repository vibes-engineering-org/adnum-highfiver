"use client";

import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { CheckCircle, Calendar } from "lucide-react";

interface DailyCheckInProps {
  onCheckIn: () => boolean;
  hasCheckedInToday: boolean;
  currentStreak: number;
  points: number;
}

export function DailyCheckIn({ onCheckIn, hasCheckedInToday, currentStreak, points }: DailyCheckInProps) {
  const handleCheckIn = () => {
    const success = onCheckIn();
    if (success) {
      // Could add success toast here if needed
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Daily Check-in
        </CardTitle>
        <CardDescription>
          Check in daily to earn bonus points and maintain your streak!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Current Streak</p>
            <p className="text-2xl font-bold text-primary">{currentStreak} days</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">Total Points</p>
            <p className="text-2xl font-bold text-primary">{points.toLocaleString()}</p>
          </div>
        </div>
        
        {hasCheckedInToday ? (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Checked in today!</span>
            <Badge variant="secondary">+{currentStreak > 1 ? 100 : 50} pts</Badge>
          </div>
        ) : (
          <Button 
            onClick={handleCheckIn}
            className="w-full"
            size="lg"
          >
            Check In Today
            <Badge variant="secondary" className="ml-2">
              +{currentStreak > 0 ? 100 : 50} pts
            </Badge>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Trophy, Award, Star, Crown } from "lucide-react";

interface BadgeSystemProps {
  badges: string[];
  totalHighFives: number;
}

interface BadgeInfo {
  name: string;
  requirement: number;
  icon: React.ReactNode;
  color: string;
  earned: boolean;
}

export function BadgeSystem({ badges, totalHighFives }: BadgeSystemProps) {
  const badgeDefinitions: BadgeInfo[] = [
    {
      name: "High Five Rookie",
      requirement: 10,
      icon: <Star className="w-4 h-4" />,
      color: "bg-gray-500",
      earned: badges.includes("High Five Rookie"),
    },
    {
      name: "High Five Champion", 
      requirement: 100,
      icon: <Award className="w-4 h-4" />,
      color: "bg-blue-500",
      earned: badges.includes("High Five Champion"),
    },
    {
      name: "High Five Legend",
      requirement: 500,
      icon: <Trophy className="w-4 h-4" />,
      color: "bg-purple-500",
      earned: badges.includes("High Five Legend"),
    },
    {
      name: "High Five Master",
      requirement: 1000,
      icon: <Crown className="w-4 h-4" />,
      color: "bg-yellow-500",
      earned: badges.includes("High Five Master"),
    },
  ];

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Achievement Badges
        </CardTitle>
        <CardDescription>
          Earn badges by giving high fives to other users!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {badgeDefinitions.map((badge) => (
          <div 
            key={badge.name}
            className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
              badge.earned 
                ? 'bg-primary/10 border-primary/20' 
                : 'bg-muted/30 border-muted opacity-60'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full text-white ${badge.color} ${
                !badge.earned && 'grayscale'
              }`}>
                {badge.icon}
              </div>
              <div>
                <p className={`font-medium ${!badge.earned && 'text-muted-foreground'}`}>
                  {badge.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {badge.requirement} high fives
                </p>
              </div>
            </div>
            <div>
              {badge.earned ? (
                <Badge className={badge.color}>Earned</Badge>
              ) : (
                <Badge variant="outline">
                  {Math.max(0, badge.requirement - totalHighFives)} left
                </Badge>
              )}
            </div>
          </div>
        ))}
        
        <div className="pt-2 border-t">
          <p className="text-sm text-muted-foreground text-center">
            Progress: {totalHighFives.toLocaleString()} total high fives
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
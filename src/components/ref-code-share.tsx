"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { ShareCastButton } from "~/components/share-cast-button";
import { Badge } from "~/components/ui/badge";
import { Copy, Gift, Share2 } from "lucide-react";
import { useState } from "react";

interface RefCodeShareProps {
  refCode: string;
  points: number;
  shareUrl?: string;
}

export function RefCodeShare({ refCode, points, shareUrl }: RefCodeShareProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      const urlToCopy = shareUrl || refCode;
      await navigator.clipboard.writeText(urlToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareText = `Join me on High Five! Tap my link to automatically high five and get bonus points! 🙏`;
  const finalShareUrl = shareUrl || (typeof window !== 'undefined' ? window.location.origin : '');

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="w-5 h-5" />
          Share Your Ref Code
        </CardTitle>
        <CardDescription>
          Share your code with friends to earn bonus points!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-muted/30 rounded-lg text-center">
          <p className="text-lg font-mono font-bold text-primary">{refCode}</p>
          <p className="text-sm text-muted-foreground mt-1">Your unique ref code</p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="flex-1"
          >
            <Copy className="w-4 h-4 mr-2" />
            {copied ? 'Copied!' : 'Copy Code'}
          </Button>
          
          <ShareCastButton
            text={shareText}
            url={finalShareUrl}
            variant="default"
            className="flex-1"
          />
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center gap-2 text-green-700 mb-1">
            <Share2 className="w-4 h-4" />
            <span className="font-medium">Boost Benefits</span>
          </div>
          <p className="text-sm text-green-600">
            When someone taps your link, they automatically high five and you both get 50% more points!
          </p>
        </div>

        <div className="text-center space-y-1">
          <p className="text-sm font-medium">How it works:</p>
          <p className="text-xs text-muted-foreground">
            Share your link! When friends tap it, they automatically give a high five with bonus points
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
"use client";

import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface HighFiveButtonProps {
  onHighFive: () => void;
  disabled?: boolean;
  className?: string;
}

export function HighFiveButton({ onHighFive, disabled, className }: HighFiveButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    
    setIsAnimating(true);
    onHighFive();
    
    // Reset animation after 300ms
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <Button
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "w-32 h-32 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-110 active:scale-95",
        isAnimating && "animate-pulse scale-110",
        className
      )}
      variant="default"
    >
      🙏 High Five
    </Button>
  );
}
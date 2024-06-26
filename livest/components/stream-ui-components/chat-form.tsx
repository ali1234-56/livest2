"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SendEmotioncons } from "./exchange";
import { ChatInfo } from "./chat-info";
import { Counter } from "./counter";

interface ChatFormProps {
  onSubmit: (message: string) => void; 
  value: string;
  onChange: (value: string) => void;
  isHidden: boolean;
  isFollowersOnly: boolean;
  isFollowing: boolean;
  isDelayed: boolean;
  username: string;
  counter: number;
}

export const ChatForm = ({
  onSubmit,
  value,
  onChange,
  isHidden,
  isFollowersOnly,
  isFollowing,
  isDelayed,
  counter,
  username
}: ChatFormProps) => {

  const [isDelayBlocked, setIsDelayBlocked] = useState(false);


  const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;
  const isDisabled = isHidden || isDelayBlocked || isFollowersOnlyAndNotFollowing;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    console.log(value)

    if (!value || isDisabled) return;

    if (isDelayed && !isDelayBlocked) {
      setIsDelayBlocked(true);
      setTimeout(() => {
        setIsDelayBlocked(false);
        onSubmit(value);
      }, 3000);
    } else {
      onSubmit(value);
    }
  };

  
  const handleEmotionconsSubmit = (value: string) => {
    console.log(value)

    if (isDelayed && !isDelayBlocked) {
      setIsDelayBlocked(true);
      setTimeout(() => {
        setIsDelayBlocked(false);
        onSubmit(value);
      }, 3000);
    } else {
      onSubmit(value);
    }
  };

  if (isHidden) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-y-4 p-3">
      <div className="w-full">
        <ChatInfo isDelayed={isDelayed} isFollowersOnly={isFollowersOnly} />
        <Input
          onChange={(e) => onChange(e.target.value)}
          value={value}
          disabled={isDisabled}
          placeholder="Send a message"
          className={cn("border-white/10", (isFollowersOnly ||isDelayed) && "rounded-t-none border-t-0")}
        />
      </div>

      <div className="flex ml-auto">
        <Counter counter={counter} username={username} />
        <Button type="submit" variant="primary" size="sm" disabled={isDisabled}>
          Chat
        </Button>
        <div className="pl-1" >
          <SendEmotioncons 
            disabled={isDisabled}
            username={username} 
            onSubmit={handleEmotionconsSubmit}
          />
        </div>
      </div>
    </form>
  );
};

export const ChatFormSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-y-4 p-3">
      <Skeleton className="w-full h-10" />
      <div className="flex items-center gap-x-2 ml-auto">
        <Skeleton className="h-7 w-7" />
        <Skeleton className="h-7 w-12" />
      </div>
    </div>
  );
};


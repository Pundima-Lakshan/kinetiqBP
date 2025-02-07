"use client";

import { ABLY_CHANNEL } from "@/lib";
import { asyncStateObserversCommon } from "@/observers";
import { invalidationConfig } from "@/services";
import { type MutationCacheNotifyEvent, type QueryClient, useQueryClient } from "@tanstack/react-query";
import { type RealtimeChannel } from "ably";
import { type AblyMessageCallback, useChannel } from "ably/react";

const handleMessage = (message: Parameters<AblyMessageCallback>[0], queryClient: QueryClient) => {
  const event = message.data as MutationCacheNotifyEvent;

  const { handleQueryInvalidation } = asyncStateObserversCommon({
    cacheType: "mutation",
    setIsLoading: () => {},
  });

  handleQueryInvalidation(event, queryClient, invalidationConfig);
};

export const useRTUpdatesObserver = () => {
  const queryClient = useQueryClient();
  return useChannel(ABLY_CHANNEL, (message) => {
    handleMessage(message, queryClient);
  });
};

/**
 * @param channel
 * @param event - only pass MutationCacheNotifyEvent (only for type safety QueryCacheNotifyEvent was also included)
 */
export const publishRTUpdate = ({ channel, event }: { channel: RealtimeChannel; event: MutationCacheNotifyEvent }) => {
  if (event.type !== "updated") {
    return;
  }
  if (event.action.type !== "success") {
    return;
  }
  void channel.publish(ABLY_CHANNEL, event);
};

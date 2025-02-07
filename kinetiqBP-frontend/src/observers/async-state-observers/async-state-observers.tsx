"use client";

import {
  asyncMutationStatesObserver,
  type AsyncMutationStatesObserverParams,
  asyncQueryStatesObserver,
  type AsyncStateObserversCommonParams,
  useRTUpdatesObserver,
} from "@/observers";
import { useZustandStore } from "@/stores/store-provider";
import { useEffect } from "react";

export type AsyncStateObserversProps = Omit<AsyncStateObserversCommonParams, "cacheType" | "channel" | "setIsLoading"> &
  Omit<AsyncMutationStatesObserverParams, "cacheType" | "channel" | "setIsLoading">;

export const AsyncStateObservers = ({ ...rest }: AsyncStateObserversProps) => {
  const { channel } = useRTUpdatesObserver();
  const { setIsLoading } = useZustandStore((state) => state.actions);

  useEffect(() => {
    const { unsubscribe: queryUnsub } = asyncQueryStatesObserver({
      setIsLoading,
    });
    const { unsubscribe: mutationUnsub } = asyncMutationStatesObserver({
      ...rest,
      setIsLoading,
      channel,
    });

    return () => {
      queryUnsub();
      mutationUnsub();
    };
  }, [rest]);

  return <></>;
};

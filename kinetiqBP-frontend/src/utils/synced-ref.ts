import { useRef } from 'react';

export interface SyncedRefProps<T = unknown> {
  value: T;
}

export const useSyncedRef = <T>({ value }: SyncedRefProps<T>) => {
  const syncedRef = useRef<T>(value);
  syncedRef.current = value;
  return syncedRef;
};

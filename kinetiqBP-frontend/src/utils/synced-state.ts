import { useState } from 'react';
import { useNonInitialEffect } from '@/utils/non-initial-effect.ts';

export interface SyncedStateProps<T = unknown> {
  getter: () => T;
  deps: unknown[];
}

export const useSyncedState = <T>({ getter, deps }: SyncedStateProps<T>) => {
  const [state, setState] = useState<T>(getter);
  useNonInitialEffect(() => {
    setState(getter);
  }, [...deps]);

  return {
    state,
    setState,
  };
};

import { useEffect, useRef } from 'react';

export const useNonInitialEffect = (effect: Parameters<typeof useEffect>[0], deps: Parameters<typeof useEffect>[1]) => {
  const isInitialMount = useRef(true);

  const effectRef = useRef(effect);
  effectRef.current = effect;

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    effectRef.current();
  }, deps);
};

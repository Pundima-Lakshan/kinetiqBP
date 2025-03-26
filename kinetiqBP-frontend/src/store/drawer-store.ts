import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface DrawerStoreState {
  open: boolean;
}

interface DraweStoreActions {
  actions: {
    handleDrawerOpen: () => void;
    handleDrawerClose: () => void;
  };
}

const getInitialState = () => {
  return {
    open: false,
  };
};

export const useDrawerStore = create<DrawerStoreState & DraweStoreActions>()(
  immer((set) => ({
    ...getInitialState(),
    actions: {
      handleDrawerClose: () =>
        set((state) => {
          state.open = false;
        }),
      handleDrawerOpen: () =>
        set((state) => {
          state.open = true;
        }),
    },
  })),
);

export const useDrawerStoreActions = () => useDrawerStore((state) => state.actions);

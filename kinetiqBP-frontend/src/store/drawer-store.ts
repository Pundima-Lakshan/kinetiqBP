import { AnalysisChartType } from '@/components';
import { QueryType } from '@/services';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface DrawerStoreState {
  open: boolean;
  chartType?: AnalysisChartType;
  queryType?: QueryType;
  formData?: Record<string, unknown>;
}

interface DraweStoreActions {
  actions: {
    handleDrawerOpen: () => void;
    handleDrawerClose: () => void;
    updateChartType: (type: AnalysisChartType) => void;
    updateQueryType: (type: QueryType) => void;
    updateFormData: (data: Record<string, unknown>) => void;
  };
}

const getInitialState = (): DrawerStoreState => {
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
      updateChartType: (type) =>
        set((state) => {
          state.chartType = type;
        }),
      updateQueryType: (type) =>
        set((state) => {
          state.queryType = type;
        }),
      updateFormData: (data) =>
        set((state) => {
          state.formData = data;
        }),
    },
  })),
);

export const useDrawerStoreActions = () => useDrawerStore((state) => state.actions);

import { useDrawerStoreActions } from '@/store';

export const useNewAnalysisChart = () => {
  const { handleDrawerOpen } = useDrawerStoreActions();

  const handleNewAnalysisChart = () => {
    handleDrawerOpen();
  };

  return {
    handleNewAnalysisChart,
  };
};

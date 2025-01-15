import { useActivePage } from '@toolpad/core/useActivePage';
import { Breadcrumb } from '@toolpad/core/PageContainer';

export const useDynamicBreadcrumbs = (): { title: string; breadcrumbs: Breadcrumb[] } => {
  const activePage = useActivePage();

  return {
    breadcrumbs: [],
    title: activePage?.title ?? '',
  };
};

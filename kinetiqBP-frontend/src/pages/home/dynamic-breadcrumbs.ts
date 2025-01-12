import { useActivePage } from '@toolpad/core/useActivePage';
import { Breadcrumb } from '@toolpad/core/PageContainer';

export const useDynamicBreadcrumbs = (): { title: string; breadcrumbs: Breadcrumb[] } => {
  const activePage = useActivePage();
  if (activePage == null) {
    return {
      breadcrumbs: [],
      title: '',
    };
  }

  const title = `Item ${123}`;
  const path = `${activePage.path}/${123}`;

  return {
    breadcrumbs: [...activePage.breadcrumbs, { title, path }],
    title: activePage.title,
  };
};

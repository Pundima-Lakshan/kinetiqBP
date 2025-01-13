import { PageHeader, PageHeaderToolbar } from '@toolpad/core';
import { useCallback } from 'react';
import { useDynamicBreadcrumbs } from '@/pages/home/dynamic-breadcrumbs.ts';
import { PageHeaderAction } from '@/components';

const KBPPageToolbar = () => {
  return (
    <PageHeaderToolbar>
      <PageHeaderAction />
    </PageHeaderToolbar>
  );
};

export const KBPPageHeader = () => {
  const CustomPageToolbarComponent = useCallback(() => <KBPPageToolbar />, []);
  const { breadcrumbs, title } = useDynamicBreadcrumbs();

  return <PageHeader breadcrumbs={breadcrumbs} title={title} slots={{ toolbar: CustomPageToolbarComponent }} />;
};

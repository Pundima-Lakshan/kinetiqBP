import { PageHeader, PageHeaderToolbar } from '@toolpad/core';
import { Button } from '@mui/material';
import { useCallback } from 'react';
import { useDynamicBreadcrumbs } from '@/pages/home/dynamic-breadcrumbs.ts';

const CustomPageToolbar = ({ status }: { status: string }) => {
  return (
    <PageHeaderToolbar>
      <p>Current status: {status}</p>
      <Button color="inherit">Export</Button>
    </PageHeaderToolbar>
  );
};

export const CustomPageHeader = ({ status }: { status: string }) => {
  const CustomPageToolbarComponent = useCallback(() => <CustomPageToolbar status={status} />, [status]);
  const { breadcrumbs, title } = useDynamicBreadcrumbs();

  return <PageHeader breadcrumbs={breadcrumbs} title={title} slots={{ toolbar: CustomPageToolbarComponent }} />;
};

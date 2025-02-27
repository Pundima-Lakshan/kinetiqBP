import { browserRoutesCollection, getPath } from '@/configs';
import { Breadcrumb } from '@toolpad/core/PageContainer';
import { useActivePage } from '@toolpad/core/useActivePage';
import { useParams } from 'react-router';

export const useDynamicBreadcrumbs = (): { title: string; breadcrumbs: Breadcrumb[] } => {
  const activePage = useActivePage();
  const params = useParams();

  const getWorkflowInstanceBreadcrumbs = () => {
    const { workflowInstanceId } = params;
    if (workflowInstanceId) {
      return [
        {
          title: 'Workflow Instances',
          path: getPath(browserRoutesCollection.WorkflowInstances.segment),
        },
        {
          title: workflowInstanceId,
        },
      ];
    } else {
      return [
        {
          title: activePage?.title ?? '',
        },
      ];
    }
  };

  switch (activePage?.title) {
    case browserRoutesCollection.WorkflowInstances.title: {
      const breadcrumbs = getWorkflowInstanceBreadcrumbs();
      const { workflowInstanceId } = params;
      return {
        breadcrumbs,
        title: breadcrumbs.length > 1 ? `Workflow Instance ${workflowInstanceId}` : activePage.title,
      };
    }
  }

  return {
    breadcrumbs: [
      {
        title: activePage?.title ?? '',
      },
    ],
    title: activePage?.title ?? '',
  };
};

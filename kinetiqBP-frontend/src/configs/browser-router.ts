import { createBrowserRouter } from 'react-router';
import { Dashboard, FormDefinition, Heatmaps, Home, Statistics, Tasks, WorkflowDefinitions, WorkflowInstances } from '@/pages';

export const BrowserRouteSegments = {
  Dashboard: '',
  WorkflowDefinitions: 'workflow-definitions',
  WorkflowInstances: 'workflow-instances',
  FormDefinitions: 'form-definitions',
  Tasks: 'tasks',
  Statistics: 'statistics',
  Heatmap: 'heatmap',
};

const getPath = (segment: string) => {
  return `/${segment}`;
};

export const browserRouter = createBrowserRouter([
  {
    Component: Home,
    children: [
      {
        path: getPath(BrowserRouteSegments.Dashboard),
        Component: Dashboard,
      },
      {
        path: getPath(BrowserRouteSegments.WorkflowDefinitions),
        Component: WorkflowDefinitions,
      },
      {
        path: getPath(BrowserRouteSegments.WorkflowInstances),
        Component: WorkflowInstances,
      },
      {
        path: getPath(BrowserRouteSegments.FormDefinitions),
        Component: FormDefinition,
      },
      {
        path: getPath(BrowserRouteSegments.Heatmap),
        Component: Heatmaps,
      },
      {
        path: getPath(BrowserRouteSegments.Statistics),
        Component: Statistics,
      },
      {
        path: getPath(BrowserRouteSegments.Tasks),
        Component: Tasks,
      },
    ],
  },
]);

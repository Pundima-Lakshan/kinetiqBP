import { PdfDesigner, PdfForm } from '@/components';
import { Dashboard, FormDefinitions, Heatmaps, Home, Statistics, Tasks, WorkflowDefinitions, WorkflowInstances } from '@/pages';
import { createBrowserRouter } from 'react-router';

export const browserRoutesCollection = {
  Dashboard: { segment: '', title: 'Dashboard' },
  WorkflowDefinitions: { segment: 'workflow-definitions', title: 'Workflow Definitions' },
  WorkflowInstances: { segment: 'workflow-instances', title: 'Workflow Instances' },
  FormDefinitions: { segment: 'form-definitions', title: 'Form Definitions' },
  Tasks: { segment: 'tasks', title: 'Tasks' },
  FormDesigner: { segment: 'form-designer', title: 'Form Designer' },
  FormViewer: { segment: 'form-viewer', title: 'Form Viewer' },
  Statistics: { segment: 'statistics', title: 'Statistics' },
  Heatmap: { segment: 'heatmap', title: 'Heatmap' },
};

const getPath = (segment: string) => {
  return `/${segment}`;
};

export const browserRouter = createBrowserRouter([
  {
    Component: Home,
    children: [
      {
        path: getPath(browserRoutesCollection.Dashboard.segment),
        Component: Dashboard,
      },
      {
        path: getPath(browserRoutesCollection.WorkflowDefinitions.segment),
        Component: WorkflowDefinitions,
      },
      {
        path: getPath(browserRoutesCollection.WorkflowInstances.segment),
        Component: WorkflowInstances,
      },
      {
        path: getPath(browserRoutesCollection.FormDefinitions.segment),
        Component: FormDefinitions,
      },
      {
        path: getPath(browserRoutesCollection.FormDefinitions.segment),
        Component: FormDefinitions,
      },
      {
        path: getPath(browserRoutesCollection.FormDesigner.segment),
        Component: PdfDesigner,
      },
      {
        path: getPath(browserRoutesCollection.FormViewer.segment),
        Component: PdfForm,
      },
      {
        path: getPath(browserRoutesCollection.Heatmap.segment),
        Component: Heatmaps,
      },
      {
        path: getPath(browserRoutesCollection.Statistics.segment),
        Component: Statistics,
      },
      {
        path: getPath(browserRoutesCollection.Tasks.segment),
        Component: Tasks,
      },
    ],
  },
]);

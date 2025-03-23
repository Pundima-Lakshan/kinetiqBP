import { PdfDesigner, PdfForm } from '@/components';
import {
  Dashboard,
  FormDefinitions,
  Heatmaps,
  Home,
  PageNotFound,
  PdfTemplates,
  Statistics,
  Tasks,
  Users,
  WorkflowDefinitions,
  WorkFlowInstance,
  WorkflowInstances,
} from '@/pages';
import { WorkflowHistoricInstances } from '@/pages/workflow-historic-instances';
import { createBrowserRouter } from 'react-router';

export const browserRoutesCollection = {
  Dashboard: { segment: '', title: 'Dashboard' },
  WorkflowDefinitions: { segment: 'workflow-definitions', title: 'Workflow Definitions' },
  WorkflowInstances: { segment: 'workflow-instances', title: 'Workflow Instances' },
  PdfTemplates: { segment: 'pdf-templates', title: 'PDF Templates' },
  WorkflowHistoricInstances: { segment: 'workflow-historic-instances', title: 'Workflow Historic Instances' },
  FormDefinitions: { segment: 'form-definitions', title: 'Form Definitions' },
  Tasks: { segment: 'tasks', title: 'Tasks' },
  FormDesigner: { segment: 'form-designer', title: 'Form Designer' },
  FormViewer: { segment: 'form-viewer', title: 'Form Viewer' },
  Statistics: { segment: 'statistics', title: 'Statistics' },
  Heatmap: { segment: 'heatmap', title: 'Heatmap' },
  Users: { segment: 'users', title: 'Users' },
};

export const PAGE_NOT_FOUND_PATH = '/page-not-found';

export const getPath = (segment: string) => {
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
        path: `${getPath(browserRoutesCollection.WorkflowInstances.segment)}/:workflowDefinitionId/:workflowInstanceId`,
        Component: WorkFlowInstance,
      },
      {
        path: getPath(browserRoutesCollection.WorkflowHistoricInstances.segment),
        Component: WorkflowHistoricInstances,
      },
      {
        path: `${getPath(browserRoutesCollection.WorkflowHistoricInstances.segment)}/:workflowDefinitionId/:workflowInstanceId`,
        Component: WorkFlowInstance,
      },
      {
        path: getPath(browserRoutesCollection.PdfTemplates.segment),
        Component: PdfTemplates,
      },
      {
        path: `${getPath(browserRoutesCollection.WorkflowHistoricInstances.segment)}/:workflowDefinitionId/:workflowInstanceId`,
        Component: WorkFlowInstance,
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
      {
        path: getPath(browserRoutesCollection.Users.segment),
        Component: Users,
      },
      {
        path: PAGE_NOT_FOUND_PATH,
        Component: PageNotFound,
      },
    ],
  },
]);

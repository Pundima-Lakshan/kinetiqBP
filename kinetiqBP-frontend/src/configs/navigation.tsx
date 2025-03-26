import { browserRoutesCollection } from '@/configs/browser-router.ts';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import TaskIcon from '@mui/icons-material/Task';
import type { Navigation } from '@toolpad/core/AppProvider';

export const navigation: Navigation = [
  {
    kind: 'header',
    title: 'Main',
  },
  {
    segment: browserRoutesCollection.Dashboard.segment,
    title: browserRoutesCollection.Dashboard.title,
    icon: <DashboardIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Work',
  },
  {
    segment: browserRoutesCollection.Tasks.segment,
    title: browserRoutesCollection.Tasks.title,
    icon: <TaskIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Workflow Instances',
  },
  {
    segment: browserRoutesCollection.WorkflowInstances.segment,
    pattern: `${browserRoutesCollection.WorkflowInstances.segment}{/:workflowDefinitionId}?{/:workflowInstanceId}?`,
    title: browserRoutesCollection.WorkflowInstances.title,
    icon: <AssignmentIcon />,
  },
  {
    segment: browserRoutesCollection.WorkflowHistoricInstances.segment,
    title: browserRoutesCollection.WorkflowHistoricInstances.title,
    icon: <DescriptionIcon />,
  },
  {
    segment: browserRoutesCollection.PdfTemplates.segment,
    pattern: `${browserRoutesCollection.PdfTemplates.segment}{/:pdfTemplateId}`,
    title: browserRoutesCollection.PdfTemplates.title,
    icon: <AssignmentIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Workflow Definitions',
  },
  {
    segment: browserRoutesCollection.WorkflowDefinitions.segment,
    title: browserRoutesCollection.WorkflowDefinitions.title,
    icon: <AssignmentIcon />,
  },
  {
    segment: browserRoutesCollection.FormDefinitions.segment,
    title: browserRoutesCollection.FormDefinitions.title,
    icon: <AssignmentIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'PDF Template Utils',
  },
  {
    segment: browserRoutesCollection.PdfTemplateDesigner.segment,
    title: browserRoutesCollection.PdfTemplateDesigner.title,
    icon: <DescriptionIcon />,
  },
  {
    segment: browserRoutesCollection.PdfTemplateViewer.segment,
    title: browserRoutesCollection.PdfTemplateViewer.title,
    icon: <DescriptionIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'General',
  },
  {
    segment: browserRoutesCollection.Users.segment,
    title: browserRoutesCollection.Users.title,
    icon: <DescriptionIcon />,
  },
  // {
  //   kind: 'divider',
  // },
  // {
  //   kind: 'header',
  //   title: 'Analytics',
  // },
  // {
  //   segment: browserRoutesCollection.Statistics.segment,
  //   title: browserRoutesCollection.Statistics.title,
  //   icon: <DescriptionIcon />,
  // },
  // {
  //   segment: browserRoutesCollection.Heatmap.segment,
  //   title: browserRoutesCollection.Heatmap.title,
  //   icon: <DescriptionIcon />,
  // },
];

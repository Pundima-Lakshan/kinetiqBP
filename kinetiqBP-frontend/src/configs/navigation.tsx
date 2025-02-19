import { browserRoutesCollection } from '@/configs/browser-router.ts';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import type { Navigation } from '@toolpad/core/AppProvider';

export const navigation: Navigation = [
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
    icon: <AssignmentIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Workflows',
  },
  {
    segment: browserRoutesCollection.WorkflowDefinitions.segment,
    title: browserRoutesCollection.WorkflowDefinitions.title,
    icon: <AssignmentIcon />,
  },
  {
    segment: browserRoutesCollection.WorkflowInstances.segment,
    title: browserRoutesCollection.WorkflowInstances.title,
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
    title: 'Forms',
  },
  {
    segment: browserRoutesCollection.FormDesigner.segment,
    title: browserRoutesCollection.FormDesigner.title,
    icon: <DescriptionIcon />,
  },
  {
    segment: browserRoutesCollection.FormViewer.segment,
    title: browserRoutesCollection.FormViewer.title,
    icon: <DescriptionIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: browserRoutesCollection.Statistics.segment,
    title: browserRoutesCollection.Statistics.title,
    icon: <DescriptionIcon />,
  },
  {
    segment: browserRoutesCollection.Heatmap.segment,
    title: browserRoutesCollection.Heatmap.title,
    icon: <DescriptionIcon />,
  },
];

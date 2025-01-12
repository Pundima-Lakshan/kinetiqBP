import type { Navigation } from '@toolpad/core/AppProvider';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';
import { BrowserRouteSegments } from '@/configs/browser-router.ts';

export const navigation: Navigation = [
  {
    segment: BrowserRouteSegments.Dashboard,
    title: 'Dashboard',
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
    segment: BrowserRouteSegments.Tasks,
    title: 'Tasks',
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
    segment: BrowserRouteSegments.WorkflowDefinitions,
    title: 'Definitions',
    icon: <AssignmentIcon />,
  },
  {
    segment: BrowserRouteSegments.WorkflowInstances,
    title: 'Instances',
    icon: <AssignmentIcon />,
  },
  {
    segment: BrowserRouteSegments.FormDefinitions,
    title: 'Form Definitions',
    icon: <AssignmentIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: BrowserRouteSegments.Statistics,
    title: 'Statistics',
    icon: <DescriptionIcon />,
  },
  {
    segment: BrowserRouteSegments.Heatmap,
    title: 'Heatmap',
    icon: <DescriptionIcon />,
  },
];

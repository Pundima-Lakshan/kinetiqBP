import { Badge, badgeClasses, Box, IconButton, styled, Tooltip } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import TaskIcon from '@mui/icons-material/Task';
import { useHandleQueriesRefresh } from '@/services';
import { useTaskCountAction } from './toolbar-action-hooks';

export const ToolbarActions = () => {
  const { handleQueriesRefresh } = useHandleQueriesRefresh();
  const { tasksCount, isLoadingTaskInstances, handleNavigateTasks } = useTaskCountAction();

  return (
    <Box>
      <Box display="flex" flexDirection="row" gap="10px" marginRight="10px">
        <Tooltip title="Refresh">
          <IconButton onClick={handleQueriesRefresh}>
            <AutorenewIcon color="info" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Tasks Count">
          <IconButton loading={isLoadingTaskInstances} onClick={handleNavigateTasks}>
            <TaskIcon />
            <TaskBadge badgeContent={tasksCount} color="primary" overlap="circular" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

const TaskBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

import { Button } from '@mui/material';
import { useActivePage } from '@toolpad/core/useActivePage';
import { useSyncedState } from '@/utils';
import { browserRoutesCollection } from '@/configs';

const actionablePages = [
  browserRoutesCollection.FormDefinitions,
  browserRoutesCollection.WorkflowDefinitions,
  browserRoutesCollection.WorkflowInstances,
];

export const PageHeaderAction = () => {
  const activePage = useActivePage();

  const getActionLabel = () => {
    return `Create ${activePage?.title}`.trim().slice(0, -1);
  };

  const { state: actionLabel } = useSyncedState({ getter: getActionLabel, deps: [activePage] });

  const handleClick = () => {
    console.log('Create clicked');
  };

  const hidden = !activePage || !actionablePages.some((page) => page.title === activePage.title);

  return (
    <Button variant="contained" color="primary" style={{ display: hidden ? 'none' : '' }} onClick={handleClick}>
      {actionLabel}
    </Button>
  );
};

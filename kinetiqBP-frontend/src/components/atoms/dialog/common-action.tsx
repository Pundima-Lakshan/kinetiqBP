import { Button } from '@mui/material';

interface CommonActionProps {
  handleAction: () => void;
  label: string;
}

export const CommonAction = ({ handleAction, label }: CommonActionProps) => {
  return (
    <Button onClick={handleAction} variant="text">
      {label}
    </Button>
  );
};

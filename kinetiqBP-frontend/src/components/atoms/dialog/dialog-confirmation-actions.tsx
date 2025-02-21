import { Button, DialogActions } from '@mui/material';
import { ReactNode } from 'react';

export interface DialogConfirmationActionsProps {
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  otherActions?: ReactNode[];
  isLoading: boolean;
}

export const DialogConfirmationActions = ({
  onConfirm,
  onCancel,
  confirmLabel,
  cancelLabel,
  otherActions = [],
  isLoading,
}: DialogConfirmationActionsProps) => {
  return (
    <DialogActions>
      {...otherActions}
      {onCancel && (
        <Button autoFocus onClick={onCancel} variant="outlined" loading={isLoading}>
          {cancelLabel ?? 'Cancel'}
        </Button>
      )}
      {onConfirm && (
        <Button onClick={onConfirm} variant="contained" loading={isLoading}>
          {confirmLabel ?? 'Save'}
        </Button>
      )}
    </DialogActions>
  );
};

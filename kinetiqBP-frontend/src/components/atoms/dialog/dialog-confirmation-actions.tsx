import { Button, DialogActions } from '@mui/material';
import { ReactNode } from 'react';

export interface DialogConfirmationActionsProps {
  onConfirm?: () => void;
  onRemove?: () => void;
  onCancel?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  removeLabel?: string;
  otherActions?: ReactNode[];
  isLoading: boolean;
}

export const DialogConfirmationActions = ({
  onConfirm,
  onCancel,
  onRemove,
  confirmLabel,
  cancelLabel,
  removeLabel,
  otherActions = [],
  isLoading,
}: DialogConfirmationActionsProps) => {
  return (
    <DialogActions>
      {...otherActions}
      {onCancel && (
        <Button autoFocus onClick={onCancel} variant="outlined" color="warning" loading={isLoading}>
          {cancelLabel ?? 'Cancel'}
        </Button>
      )}
      {onConfirm && (
        <Button onClick={onConfirm} variant="contained" color="success" loading={isLoading}>
          {confirmLabel ?? 'Save'}
        </Button>
      )}
      {onRemove && (
        <Button onClick={onRemove} variant="contained" color="error" loading={isLoading}>
          {removeLabel ?? 'Remove'}
        </Button>
      )}
    </DialogActions>
  );
};

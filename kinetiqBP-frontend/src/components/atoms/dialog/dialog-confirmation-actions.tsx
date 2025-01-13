import { Button, DialogActions } from '@mui/material';

export interface DialogConfirmationActionsProps {
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
}

export const DialogConfirmationActions = ({ onConfirm, onCancel, confirmLabel, cancelLabel }: DialogConfirmationActionsProps) => {
  return (
    <DialogActions>
      <Button autoFocus onClick={onCancel} variant="outlined">
        {cancelLabel ?? 'Cancel'}
      </Button>
      <Button onClick={onConfirm} variant="contained">
        {confirmLabel ?? 'Save'}
      </Button>
    </DialogActions>
  );
};

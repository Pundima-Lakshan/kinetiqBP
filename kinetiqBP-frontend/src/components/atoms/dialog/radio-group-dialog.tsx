import { defaultDialogContentProps, defaultDialogProps } from '@/components/utils';
import { Dialog, DialogContent, DialogTitle, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { DialogProps } from '@toolpad/core';
import { useRef, useState } from 'react';
import { DialogConfirmationActions } from './dialog-confirmation-actions';

interface RadioGroupDialogPayload {
  label: string;
  options: Array<{ value: string | number; label: string }>;
}

interface RadioGroupDialogResult {
  value: string;
}

export const RadioGroupDialog = ({ open, onClose, payload }: DialogProps<RadioGroupDialogPayload, RadioGroupDialogResult | void>) => {
  const [value, setValue] = useState<string | undefined>();
  const radioGroupRef = useRef<HTMLElement>(null);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    if (value) {
      onClose({ value });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <Dialog
      {...defaultDialogProps}
      fullWidth
      open={open}
      onClose={() => onClose()}
      closeAfterTransition={false}
      TransitionProps={{ onEntering: handleEntering }}
    >
      <DialogTitle>Select</DialogTitle>
      <DialogContent {...defaultDialogContentProps}>
        <RadioGroup ref={radioGroupRef} aria-label="ringtone" name="ringtone" value={value} onChange={handleChange}>
          {payload.options.map((option) => (
            <FormControlLabel value={option.value} key={option.value} control={<Radio />} label={option.label} />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogConfirmationActions onCancel={handleCancel} onConfirm={handleOk} isLoading={false} />
    </Dialog>
  );
};

import { Dialog, DialogContent } from '@mui/material';
import { ComponentProps } from 'react';

export const defaultDialogProps: Partial<ComponentProps<typeof Dialog>> = {
  fullWidth: true,
  closeAfterTransition: false,
  maxWidth: false,
  scroll: 'paper',
};

export const defaultDialogContentProps: Partial<ComponentProps<typeof DialogContent>> = {
  style: { height: '80vh' },
};

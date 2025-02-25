import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, FormControl } from '@mui/material';
import type { ChangeEventHandler } from 'react';
import { VisuallyHiddenInput } from '../organisms/pdfme/helper-components';

interface FileInputControlProps {
  handleChange: ChangeEventHandler<HTMLInputElement>;
  label: string;
  accept?: 'application/json' | '.pdf' | '.xml';
}

export const FileInputFormControl = ({ handleChange, label, accept = 'application/json' }: FileInputControlProps) => {
  return (
    <FormControl size="small">
      <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>
        {label}
        <VisuallyHiddenInput type="file" accept={accept} onChange={handleChange} />
      </Button>
    </FormControl>
  );
};

import { Button } from '@mui/material';

interface DownloadXmlActionProps {
  handleDownload: () => void;
  label: string;
}

export const DownloadAction = ({ handleDownload, label }: DownloadXmlActionProps) => {
  return (
    <Button onClick={handleDownload} variant="text">
      {label}
    </Button>
  );
};

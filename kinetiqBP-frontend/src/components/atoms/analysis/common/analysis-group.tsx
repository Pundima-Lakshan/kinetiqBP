import { SwapyReactive, SwapyReactiveProps } from '@/components/molecules';
import { Box, Typography } from '@mui/material';

export type AnalysisGroupProps = {
  title: string;
  description?: string;
} & SwapyReactiveProps;

export const AnalysisGroup = ({ title, description, ...rest }: AnalysisGroupProps) => {
  return (
    <Box>
      <Box style={{ backgroundColor: 'white', padding: '15px' }}>
        <Typography variant="h5" color="info">
          {title}
        </Typography>
        {description && <Typography variant="caption">{description}</Typography>}
      </Box>
      <SwapyReactive {...rest} />
    </Box>
  );
};

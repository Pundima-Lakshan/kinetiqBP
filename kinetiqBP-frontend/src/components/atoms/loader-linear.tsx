import { Box, LinearProgress } from '@mui/material';

export const LoaderLinear = () => {
  return (
    <Box sx={{ width: '100%', position: 'absolute', top: 0, left: 0, zIndex: 9999 }}>
      <LinearProgress />
    </Box>
  );
};

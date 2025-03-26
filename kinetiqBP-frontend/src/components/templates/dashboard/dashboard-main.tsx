import { ContainerBox, SwapyReactive } from '@/components';
import { Box } from '@mui/material';

export const DashboardMain = () => {
  return (
    <ContainerBox style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto' }}>
      <Box>
        <SwapyReactive items={[]} setItems={() => {}} />
      </Box>
    </ContainerBox>
  );
};

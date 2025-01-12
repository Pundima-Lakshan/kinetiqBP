import Box from '@mui/material/Box';
import { ReactNode } from 'react';

interface ContainerBoxProps {
  children: ReactNode;
}

export const ContainerBox = ({ children }: ContainerBoxProps) => {
  return <Box sx={{ height: '100%', width: '100%' }}>{children}</Box>;
};

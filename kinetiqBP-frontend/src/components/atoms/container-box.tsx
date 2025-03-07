import { Typography } from '@mui/material';
import { ReactNode, type CSSProperties } from 'react';

interface ContainerBoxProps {
  children: ReactNode;
  style?: CSSProperties;
  centerItems?: boolean;
  typography?: boolean;
}

export const ContainerBox = ({ children, style, centerItems, typography }: ContainerBoxProps) => {
  const centerStyle = centerItems ? { display: 'flex', justifyContent: 'center', alignItems: 'center' } : {};
  return (
    <div style={{ height: '100%', width: '100%', overflow: 'hidden', padding: '0', ...centerStyle, ...style }}>
      {typography ? <Typography>{children}</Typography> : <>{children}</>}
    </div>
  );
};

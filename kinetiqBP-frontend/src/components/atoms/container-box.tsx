import { ReactNode, type CSSProperties } from 'react';

interface ContainerBoxProps {
  children: ReactNode;
  style?: CSSProperties;
}

export const ContainerBox = ({ children, style }: ContainerBoxProps) => {
  return <div style={{ height: '100%', width: '100%', overflow: 'hidden', padding: '0', ...style }}>{children}</div>;
};

import { ReactNode } from 'react';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { ContainerBox } from '../container-box';

export interface AnalysisCardProps {
  cardActionCallback: () => void;
  title: string;
  description: string;
  children?: ReactNode; // This is optional because to stasify types, but indended it not be optional
}

export const AnalysisCard = ({ title, description, children, cardActionCallback }: AnalysisCardProps) => {
  return (
    <Card>
      <CardActionArea onClick={cardActionCallback}>
        <CardContent>
          <Typography gutterBottom sx={{ color: 'text.title', fontSize: 14 }}>
            {title}
          </Typography>
          <ContainerBox style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>{children}</ContainerBox>
          <Typography variant="body2" textAlign="center">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

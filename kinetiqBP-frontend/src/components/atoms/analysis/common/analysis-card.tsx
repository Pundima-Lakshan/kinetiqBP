import InfoIcon from '@mui/icons-material/Info';
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { ContainerBox } from '../../container-box';

export interface AnalysisCardProps {
  cardActionCallback?: () => void;
  title: string;
  description?: string;
  children?: ReactNode; // This is optional because to stasify types, but indended it not be optional
}

export const AnalysisCard = ({ title, description, children, cardActionCallback }: AnalysisCardProps) => {
  return (
    <Card style={{ width: '100%', height: '100%' }}>
      <CardContent
        style={{ margin: 'auto', height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
      >
        <Box style={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography gutterBottom sx={{ color: 'text.title', fontSize: 14 }}>
            {title}
          </Typography>
          <CardActionArea style={{ width: 'fit-content', borderRadius: '2px' }} onClick={cardActionCallback}>
            <InfoIcon color="info" style={{ margin: '5px' }} />
          </CardActionArea>
        </Box>
        <ContainerBox style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100% - 80px)' }}>
          {children}
        </ContainerBox>
        <Typography variant="body2" textAlign="center" marginTop="10px">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

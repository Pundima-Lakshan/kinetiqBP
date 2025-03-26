import { ReactNode } from 'react';
import { Box, Card, CardActionArea, CardContent, IconButton, Typography } from '@mui/material';
import { ContainerBox } from '../container-box';
import InfoIcon from '@mui/icons-material/Info';

export interface AnalysisCardProps {
  cardActionCallback: () => void;
  title: string;
  description: string;
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
          <CardActionArea style={{ width: 'fit-content' }} onClick={cardActionCallback}>
            <IconButton>
              <InfoIcon color="info" />
            </IconButton>
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

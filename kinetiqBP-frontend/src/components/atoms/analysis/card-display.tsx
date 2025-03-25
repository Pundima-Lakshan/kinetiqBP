import { Card, CardActionArea, CardContent, Typography } from '@mui/material';

export interface AnCardDisplayProps {
  title: string;
  value: string | number;
  description: string | number;
  cardActionCallback: () => void;
}

export const AnCardDisplay = ({ cardActionCallback, title, value, description }: AnCardDisplayProps) => {
  return (
    <Card>
      <CardActionArea onClick={cardActionCallback}>
        <CardContent>
          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            {title}
          </Typography>
          <Typography variant="h5" component="div">
            {value}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

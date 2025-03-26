import { AnalysisQueryArgs, AnalysisQueryResponse, GenericFlowableListResponse, QueryType, useAnalysisQueries } from '@/services';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';

export interface AnCardDisplayProps {
  title: string;
  valueType?: string | number;
  description: string | number;
  cardActionCallback?: () => void;
  queryType: QueryType;
  queryArgs: AnalysisQueryArgs;
}

export const AnCardDisplay = ({ cardActionCallback, queryType, queryArgs, title, description }: AnCardDisplayProps) => {
  const result = useAnalysisQueries({ queryType, args: queryArgs });

  return (
    <Card>
      <CardActionArea onClick={cardActionCallback}>
        <CardContent>
          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            {title}
          </Typography>
          <Typography variant="h5" component="div">
            {getValue(result?.data).total}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const getValue = (data?: AnalysisQueryResponse) => {
  return {
    total: data?.total ?? 0,
  };
};

import { Gauge } from '@mui/x-charts/Gauge';
import { AnalysisCardProps, AnalysisCard } from './common';

export type AnGaugeProps = {
  value: number;
  text: string;
  height?: number;
} & AnalysisCardProps;

export const AnGauge = ({ value, text, height, ...rest }: AnGaugeProps) => {
  return (
    <AnalysisCard {...rest}>
      <Gauge value={value} startAngle={-110} endAngle={110} text={text} height={height ?? 100} />
    </AnalysisCard>
  );
};

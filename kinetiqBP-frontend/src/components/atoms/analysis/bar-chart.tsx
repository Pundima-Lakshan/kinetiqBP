import { BarChart, BarChartProps } from '@mui/x-charts/BarChart';
import { DatasetType } from '@mui/x-charts/internals';
import { AnalysisCard, AnalysisCardProps } from './analysis-card';

export type AnBarChartProps = {
  dataset: DatasetType;
  series: BarChartProps['series'];
  xAxis: {
    dataKey: string;
    label?: string;
  };
  yAxis?: {
    dataKey?: string;
    label?: string;
  };
  height?: number;
} & AnalysisCardProps;

export const AnBarChart = ({ dataset, series, xAxis, yAxis, height, ...rest }: AnBarChartProps) => {
  return (
    <AnalysisCard {...rest}>
      <BarChart
        height={height ?? 300}
        dataset={dataset}
        series={series}
        xAxis={[{ scaleType: 'band', dataKey: xAxis.dataKey }]}
        yAxis={[{ label: yAxis?.label, dataKey: yAxis?.dataKey }]}
      />
    </AnalysisCard>
  );
};

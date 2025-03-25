import { LineChart } from '@mui/x-charts';
import { DatasetType } from '@mui/x-charts/internals';
import { AnalysisCard, AnalysisCardProps } from './analysis-card';

export type AnLineChartProps = {
  keyToLabel: Record<string, string>;
  colors: Record<string, string>;
  height?: number;
  dataset: DatasetType;
  xAxis: {
    dataKey: string;
    label?: string;
  };
} & AnalysisCardProps;

export const AnLineChart = ({ keyToLabel, colors, height = 500, dataset, xAxis, ...rest }: AnLineChartProps) => {
  return (
    <AnalysisCard {...rest}>
      <LineChart
        height={height}
        xAxis={[
          {
            dataKey: xAxis.dataKey,
          },
        ]}
        series={Object.keys(keyToLabel).map((key) => ({
          dataKey: key,
          label: keyToLabel[key],
          color: colors[key],
          showMark: false,
          ...stackStrategy,
        }))}
        dataset={dataset}
      />
    </AnalysisCard>
  );
};

const stackStrategy = {
  stack: 'total',
  area: true,
  stackOffset: 'none', // To stack 0 on top of others
} as const;

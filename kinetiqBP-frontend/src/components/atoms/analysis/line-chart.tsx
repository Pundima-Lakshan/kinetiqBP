import { LineChart } from '@mui/x-charts';
import { DatasetType } from '@mui/x-charts/internals';
import { AnalysisCardProps, AnalysisCard } from './common';

export type AnLineChartProps = {
  keyToLabel: Record<string, string>;
  height?: number;
  dataset: DatasetType;
  xAxis: {
    dataKey: string;
    label?: string;
  };
  stacking?: boolean;
} & AnalysisCardProps;

export const AnLineChart = ({ keyToLabel, stacking, height = 500, dataset, xAxis, ...rest }: AnLineChartProps) => {
  return (
    <AnalysisCard {...rest}>
      <LineChart
        height={height}
        xAxis={[{ dataKey: xAxis.dataKey }]}
        series={Object.keys(keyToLabel).map((key) => ({
          dataKey: key,
          label: keyToLabel[key],
          showMark: false,
          ...getStackStrategy(stacking),
        }))}
        dataset={dataset}
      />
    </AnalysisCard>
  );
};

const getStackStrategy = (stacking?: boolean) => {
  if (!stacking) return {};
  return {
    stack: 'total',
    area: false,
    stackOffset: 'none', // To stack 0 on top of others
  } as const;
};

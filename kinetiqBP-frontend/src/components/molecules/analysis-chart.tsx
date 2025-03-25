import { AnCardDisplayProps, AnBarChart, AnBarChartProps, AnCardDisplay, AnGauge, AnGaugeProps, AnLineChart, AnLineChartProps } from '../atoms';

export type AnalysisChartType = 'bar' | 'card' | 'line' | 'gauge';

type AnalysisChartPropsBarChart = {
  type: 'bar';
} & AnBarChartProps;

type AnalysisChartPropsCardDisplay = {
  type: 'card';
} & AnCardDisplayProps;

type AnalysisChartPropsLineChart = {
  type: 'line';
} & AnLineChartProps;

type AnalysisChartPropsGauge = {
  type: 'gauge';
} & AnGaugeProps;

export const AnalysisChart = (
  props: AnalysisChartPropsCardDisplay | AnalysisChartPropsBarChart | AnalysisChartPropsLineChart | AnalysisChartPropsGauge,
) => {
  switch (props.type) {
    case 'bar': {
      return <AnBarChart {...props} />;
    }
    case 'line': {
      return <AnLineChart {...props} />;
    }
    case 'gauge': {
      return <AnGauge {...props} />;
    }
    case 'card': {
      return <AnCardDisplay {...props} />;
    }
  }
};

import { Typography } from '@mui/material';
import { Fragment } from 'react/jsx-runtime';

interface StepperLabelProps {
  labels: (string | null)[];
  index: number;
  activeIndex: number;
}

export const StepperLabel = ({ labels, index, activeIndex }: StepperLabelProps) => {
  return (
    <Fragment key={index}>
      {labels.map((label, _index) => (
        <Fragment key={_index}>
          {label && (
            <Typography
              key={`${label}-${_index}`}
              color={activeIndex === index ? 'info' : 'textPrimary'}
              fontSize={_index === 0 ? undefined : '0.9em'}
              style={{ padding: 0, margin: 0 }}
            >
              {label}
            </Typography>
          )}
        </Fragment>
      ))}
    </Fragment>
  );
};

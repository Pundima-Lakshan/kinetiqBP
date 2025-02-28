import { Fragment } from 'react/jsx-runtime';

interface StepperLabelProps {
  labels: (string | null)[];
  index: number;
}

export const StepperLabel = ({ labels, index }: StepperLabelProps) => {
  return (
    <Fragment key={index}>
      {labels.map((label, index) => (
        <Fragment key={index}>
          {label && (
            <p key={`${label}-${index}`} style={{ padding: 0, margin: 0 }}>
              {label}
            </p>
          )}
        </Fragment>
      ))}
    </Fragment>
  );
};

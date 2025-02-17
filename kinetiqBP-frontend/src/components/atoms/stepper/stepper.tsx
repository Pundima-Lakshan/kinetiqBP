import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Stepper from '@mui/material/Stepper';
import * as React from 'react';
import { ContainerBox } from '../container-box';
interface KBPStepperProps {
  steps: {
    label: string;
    index: number;
    completed?: boolean;
    disabled?: boolean;
    component: React.ReactNode;
    onComplete: () => void;
  }[];
  allCompletedComponent?: React.ReactNode;
}

interface Completed {
  [k: number]: boolean;
}

export const KBPStepper = ({ steps, allCompletedComponent }: KBPStepperProps) => {
  const [localSteps] = React.useState(steps);
  const [activeStep, setActiveStep] = React.useState(() => {
    return steps.findIndex((step) => !step.completed);
  });
  const [completed, setCompleted] = React.useState<Completed>(() => {
    return steps.reduce((acc: Completed, step) => {
      if (step.completed) acc[step.index] = step.completed;
      return acc;
    }, {});
  });

  const totalSteps = () => {
    return localSteps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep = isLastStep() && !allStepsCompleted() ? localSteps.findIndex((step, i) => !(i in completed)) : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = (_activeStep: number) => {
    setCompleted({
      ...completed,
      [_activeStep]: true,
    });
    steps[_activeStep].onComplete();
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <ContainerBox>
      <Stepper nonLinear activeStep={activeStep}>
        {localSteps.map((step, index) => (
          <Step key={step.label} completed={completed[index]} style={{ padding: '16px' }} disabled={step.disabled}>
            <StepButton color={completed[index] ? 'success' : 'inherit'} onClick={handleStep(index)} style={{ padding: '16px' }}>
              {step.label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <ContainerBox style={{ height: 'calc(100% - 56px)' }}>
        {allStepsCompleted() && allCompletedComponent ? (
          <>
            {allCompletedComponent}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </>
        ) : (
          <>
            <ContainerBox style={{ height: 'calc(100% - 36.5px)', padding: '24px' }}>
              <ContainerBox style={{ overflowY: 'auto' }}>{steps[activeStep].component}</ContainerBox>
            </ContainerBox>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== localSteps.length &&
                (completed[activeStep] ? (
                  <Button disabled={true}>{'Completed'}</Button>
                ) : (
                  <Button onClick={() => handleComplete(activeStep)}>{completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}</Button>
                ))}
            </Box>
          </>
        )}
      </ContainerBox>
    </ContainerBox>
  );
};

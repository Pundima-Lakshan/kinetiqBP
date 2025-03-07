import { useSyncedState } from '@/utils';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Stepper from '@mui/material/Stepper';
import { Fragment } from 'react/jsx-runtime';
import { ContainerBox } from '../container-box';

import { DefaultAllCompletedComponent } from '@/components/templates/workflow-progress/default-all-completed-component';
import { StepperLabel } from './stepper-label';
import './styles.css';

export interface KbpStep {
  labels: (string | null)[];
  index: number;
  completed?: boolean;
  disabled?: boolean;
  component: React.ReactNode;
  onComplete: () => void;
}

interface KBPStepperProps {
  steps: KbpStep[];
  allCompletedComponent?: React.ReactNode;
  additionalActions?: React.ReactNode[];
  stepperHeader: string;
  isLoading?: boolean;
  showAllCompleted?: boolean;
}

interface Completed {
  [k: number]: boolean;
}

export const KBPStepper = ({ steps, allCompletedComponent, additionalActions, stepperHeader, showAllCompleted }: KBPStepperProps) => {
  const { state: activeStep, setState: setActiveStep } = useSyncedState({
    getter: () => {
      const stepIndex = steps.findIndex((step) => !step.completed);
      if (stepIndex === -1) return steps.length - 1;
      return stepIndex;
    },
    deps: [steps],
  });

  const { state: completed, setState: setCompleted } = useSyncedState<Completed>({
    getter: () => {
      return steps.reduce((acc: Completed, step) => {
        if (step.completed) acc[step.index] = step.completed;
        return acc;
      }, {});
    },
    deps: [steps],
  });

  const totalSteps = () => {
    return steps.length;
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
    const newActiveStep = isLastStep() && !allStepsCompleted() ? steps.findIndex((_step, i) => !(i in completed)) : activeStep + 1;
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
    steps[_activeStep]?.onComplete();
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <ContainerBox style={{ display: 'flex', flexDirection: 'row', gap: '0 16px' }}>
      <Box style={{ display: 'flex', flexDirection: 'column', gap: '8px 0' }}>
        <Typography className="stepper-header">{stepperHeader}</Typography>
        <Stepper nonLinear activeStep={activeStep} orientation="vertical" connector={null} className="vertical-stepper">
          {steps.map((step, index) => (
            <Step key={`step-${(step.index, step.labels[0])}`} completed={completed[index]} style={{ padding: '16px' }} disabled={step.disabled}>
              <StepButton color={completed[index] ? 'success' : 'inherit'} onClick={handleStep(index)} style={{ padding: '16px' }}>
                <StepperLabel key={`step-label-${(step.index, step.labels[0])}`} labels={step.labels} index={step.index} activeIndex={activeStep} />
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Box>
      <ContainerBox style={{ width: 'calc(100% - 56px)' }}>
        {showAllCompleted && allStepsCompleted() ? (
          <>
            {allCompletedComponent}
            {!allCompletedComponent && <DefaultAllCompletedComponent />}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </>
        ) : (
          <>
            <ContainerBox key="stepper-step-component" style={{ height: 'calc(100% - 36.5px)', padding: '8px' }}>
              <ContainerBox style={{ overflowY: 'auto' }}>{steps[activeStep]?.component}</ContainerBox>
            </ContainerBox>
            <Box key="stepper-buttons" sx={{ display: 'flex', flexDirection: 'row' }}>
              <Button key="stepper-button-back" color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
              <Box key="stepper-button-spacing-left" sx={{ flex: '1 1 auto' }} />
              {additionalActions?.map((action, i) => <Fragment key={`action-${i}`}>{action}</Fragment>)}
              <Box key="stepper-button-spacing-right" sx={{ flex: '1 1 auto' }} />
              <Button key="stepper-button-next" onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Button key={`completed-${activeStep}`} disabled={true}>
                    Completed
                  </Button>
                ) : (
                  <Button key={`complete-step-${activeStep}`} onClick={() => handleComplete(activeStep)}>
                    Complete Step
                  </Button>
                ))}
            </Box>
          </>
        )}
      </ContainerBox>
    </ContainerBox>
  );
};

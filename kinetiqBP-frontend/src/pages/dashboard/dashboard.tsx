import { KBPStepper } from '@/components/atoms/stepper';

const steps = [
  {
    index: 0,
    label: 'Select campaign settings',
    component: (
      <div>
        {Array.from({ length: 200 }).map((_, i) => {
          return <p key={i}> i</p>;
        })}
      </div>
    ),
    onComplete: () => {},
    completed: true,
  },
  { index: 1, label: 'Create an ad group', completed: false, component: <div className="h-full">Step 2</div>, onComplete: () => {} },
  { index: 2, label: 'Create an ad', completed: false, component: <div>Step 3</div>, onComplete: () => {} },
  { index: 3, label: 'Review', completed: false, component: <div>Step 4</div>, onComplete: () => {} },
];

export const Dashboard = () => {
  return <KBPStepper steps={steps} />;
};

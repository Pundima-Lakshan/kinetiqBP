export const nodes = [
  {
    id: '1-1',
    type: 'input',
    data: {
      label: 'Start',
    },
    position: { x: 150, y: 0 },
  },
  {
    id: '1-2',
    type: 'default',
    data: {
      label: 'User Task',
    },
    position: { x: 0, y: 100 },
  },
  {
    id: '1-3',
    type: 'output',
    data: {
      label: 'Approval task',
    },
    position: { x: 300, y: 100 },
  },
];

export const edges = [
  {
    id: 'e1-2',
    source: '1-1',
    target: '1-2',
    type: 'smoothstep',
  },
  {
    id: 'e1-3',
    source: '1-1',
    target: '1-3',
    animated: true,
  },
];

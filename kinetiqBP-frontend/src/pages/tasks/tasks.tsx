import { TasksGrid } from '@/components';

export const Tasks = () => {
  const dummyData = [
    {
      id: '1',
      name: 'Workflow 1',
      description: 'Description 1',
      version: '1.0',
      created: '2023-01-01',
      modified: '2023-01-02',
    },
    {
      id: '2',
      name: 'Workflow 2',
      description: 'Description 2',
      version: '1.1',
      created: '2023-02-01',
      modified: '2023-02-02',
    },
    {
      id: '3',
      name: 'Workflow 3',
      description: 'Description 3',
      version: '2.0',
      created: '2023-03-01',
      modified: '2023-03-02',
    },
  ];

  return <TasksGrid data={dummyData} />;
};

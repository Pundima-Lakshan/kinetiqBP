import { filterQueryTasksArgs } from '@/configs';
import { GenericFlowableListResponse, QueryTasksArgs, QueryType, TaskInstance } from './http';
import { useQueryTasks } from './queries';

export type AnalysisQueryArgs = Partial<QueryTasksArgs>;

export type AnalysisQueryResponse = GenericFlowableListResponse<TaskInstance>;

interface AnalysisQueriesProps {
  queryType: QueryType;
  args: AnalysisQueryArgs;
}

export const useAnalysisQueries = ({ queryType, args }: AnalysisQueriesProps) => {
  const { data, isLoading } = useQueryTasks(filterQueryTasksArgs(args), queryType === 'task');

  switch (queryType) {
    case 'task': {
      return {
        data,
        isLoading,
      };
    }
  }
};

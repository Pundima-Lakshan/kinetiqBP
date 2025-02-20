import { FormDefinitionsGrid } from '@/components';
import { useGetFormDefinitions } from '@/services';

export const FormDefinitions = () => {
  const { data: formDefinitions = [], isLoading: isLoadingFormDefinitions } = useGetFormDefinitions();

  return <FormDefinitionsGrid data={formDefinitions} loading={isLoadingFormDefinitions} />;
};

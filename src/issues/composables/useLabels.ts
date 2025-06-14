import { useQuery } from '@tanstack/vue-query';
import { gitHubApi } from 'src/api/gitHubApi';
import { Label } from '../interfaces/label';
import { useIssuesStore } from 'src/stores/issues';
import { storeToRefs } from 'pinia';

const getLabels = async (): Promise<Label[]> => {
  const { data } = await gitHubApi<Label[]>('/labels?per_page=100');
  return data;
};

const useLabels = () => {
  const issuesStore = useIssuesStore();
  const { labels: selectedLabels } = storeToRefs(issuesStore);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['labels'],
    queryFn: getLabels,
    staleTime: 1000 * 60 * 60, // una hora
  });
  return {
    data,
    isLoading,
    isError,

    // Getters
    selectedLabels: selectedLabels,

    //Methods
    toggleLabel: issuesStore.toggleLabel, // forma corta de hacer uso de funcion
  };
};

export default useLabels;

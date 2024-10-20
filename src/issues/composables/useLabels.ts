import { useQuery } from '@tanstack/vue-query';
import { gitHubApi } from 'src/api/gitHubApi';
import { Label } from '../interfaces/label';
import { useIssuesStore } from 'src/stores/issues';
import { storeToRefs } from 'pinia';

const getLabels = async (): Promise<Label[]> => {
  const { data } = await gitHubApi<Label[]>('/labels?per_page=100');
  console.log(data);
  return data;
};

const useLabels = () => {
  const issuesStore = useIssuesStore();
  const { labels } = storeToRefs(issuesStore);
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
    selectedLabels: labels,

    //Methods
    toggleLabel: issuesStore.toggleLabel, // forma corta de hacer uso de funcion
  };
};

export default useLabels;

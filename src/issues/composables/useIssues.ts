import { useQuery } from '@tanstack/vue-query';
import { Issue } from '../interfaces/issue';
import { gitHubApi } from 'src/api/gitHubApi';

const getIssues = async (): Promise<Issue[]> => {
  const params = new URLSearchParams();

  params.append('per_page', '10');
  const { data } = await gitHubApi.get('/issues', { params });
  return data;
};

const useIssues = () => {
  const issuesQuery = useQuery({ queryKey: ['issues'], queryFn: getIssues });
  return {
    issuesQuery,
  };
};

export default useIssues;

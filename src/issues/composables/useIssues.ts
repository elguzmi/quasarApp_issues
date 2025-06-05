import { useQuery } from '@tanstack/vue-query';
import { Issue, State } from '../interfaces/issue';
import { gitHubApi } from 'src/api/gitHubApi';
import useStore from './useStore';

const getIssues = async ( labels : string[] , state : State): Promise<Issue[]> => {
  const params = new URLSearchParams();

  if (state ) params.append('state', state)
    if(labels.length > 0){
      const labelString = labels.join(',')
      params.append('label', labelString)
    }

  params.append('per_page', '10');
  const { data } = await gitHubApi.get('/issues', { params });
  return data;
};

const useIssues = () => {

  const {labels, state} = useStore()

  const issuesQuery = useQuery({ queryKey: ['issues' , { labels , state}], queryFn: ()=>getIssues(labels.value, state.value) });  // como son reactivos cuando cambien va a volver a hacer la peticion
  return {
    issuesQuery,
  };

};

export default useIssues;

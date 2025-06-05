import { gitHubApi } from 'src/api/gitHubApi';
import { Issue } from '../interfaces/issue';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
//import { computed } from 'vue';


const sleep = ():Promise<boolean>=>{
  return new Promise(resolve=>{
    setTimeout(()=>{
        resolve(true)
    },2000)
  })
}

const getIssue = async (issueNumber: number): Promise<Issue> => {
  await sleep()
  const { data } = await gitHubApi.get<Issue>(`/issues/${issueNumber}`);
  return data;
};

const getComments = async (issueNumber: number): Promise<Issue[]> => {
  await sleep()
  const { data } = await gitHubApi.get<Issue[]>(
    `/issues/${issueNumber}/comments`
  );
  return data;
};

interface Options {
  autoload?: boolean
}

const useIssue = (issueNumber: number ,  options?:Options) => {

  const client = useQueryClient(); // toda la instancia de las peticiones , los queries

  const {autoload = true} = options||{}


  const issueQuery = useQuery({
    queryKey: ['issue', issueNumber],
    queryFn: () => getIssue(issueNumber),
    staleTime: 1000 * 60,
    enabled : autoload
  });

  // Si quiero que se ejecute cuando resuelva una, se coloca enabled , cuando enabled este en true se av a ejecutar, de lo contrario no se ejecuta
  const issueCommentsQuery = useQuery({
    queryKey: ['issue', issueNumber, 'comments'],
    queryFn: () => getComments(issueQuery.data.value?.number || 0),
    staleTime: 1000 * 15,
    enabled : autoload
    //enabled: computed(() => !!issueQuery.data.value),
  });

  const prefecthIssue = (issueNumber:number)=>{
    client.prefetchQuery({
      queryKey: ['issue', issueNumber],
      queryFn: () => getIssue(issueNumber),
      staleTime: 1000 * 60,
    })

    client.prefetchQuery({
      queryKey: ['issue', issueNumber, 'comments'],
      queryFn: () => getComments(issueNumber),
      staleTime: 1000 * 15, // 15 segundos la data
    })
  }

  return {
    issueQuery,
    issueCommentsQuery,

    //METHODS
    prefecthIssue
  };
};

export default useIssue;

import { ref } from 'vue';
import { Issue } from '../interfaces/issue';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { gitHubApi } from 'src/api/gitHubApi';

interface Args {
  title: string;
  labels?: string[];
  body?: string;
}

const addIssue = async ({ title, body = '', labels = [] }: Args): Promise<Issue> => {
  const newIssue = { title, body, labels };
  const { data } = await gitHubApi.post<Issue>('/issues', newIssue);
  console.log(data);
  return data;
}

export default function useIssueMutation() {
  // State
  const queryClient = useQueryClient()
  const issueMutation = useMutation({
    mutationFn: addIssue, onSuccess: (issue) => {
      queryClient.invalidateQueries({ queryKey: ['issues'], exact: false }) // Inhbailita cualquiera que tenga issues
      queryClient.refetchQueries({ queryKey: ['issues'], exact: false }) // Recarga todos los queries
      queryClient.setQueryData(['issue', issue.number], issue) // Alamcena en el cache para ya tenerlo instantaneamente

    }, onSettled: () => {
      // Cauando termina con error o success
      console.log('Issue added');
    }
  })
  const state = ref();



  return {
    // State
    state,
    // Computed

    // Methods
    issueMutation
  };
}
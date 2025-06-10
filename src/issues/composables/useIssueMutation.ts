import { ref } from 'vue';
import { Issue } from '../interfaces/issue';
import { useMutation } from '@tanstack/vue-query';
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
  const issueMutation = useMutation({
    mutationFn: addIssue, onSuccess: () => {
      console.log('Issue added');
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
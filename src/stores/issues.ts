import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useIssuesStore = defineStore('issues', () => {
  //TODO arreglar tipo de dato
  const state = ref('');
  const labels = ref<string[]>([]);

  return {
    // State properties
    state,
    labels,

    // Getters

    // Actions
    toggleLable(labelName: string) {
      throw new Error('No implementado');
    },
  };
});

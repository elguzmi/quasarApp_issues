<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import FilterSelector from '../components/filter-selector/FilterSelector.vue';
import IssueList from '../components/issue-list/IssueList.vue';
import useIssues from '../composables/useIssues';
import FloatingButtons from '../components/FloatingButtons.vue';
import NewIssueDialog from '../components/NewIssueDialog.vue';
import { ref } from 'vue';
import useLabels from '../composables/useLabels';

const { issuesQuery } = useIssues();
const { data: labels } = useLabels();
const isOpen = ref<boolean>(false); // para abrir y cerrar le modal

const openDialog = () => {
  isOpen.value = true;
}
</script>

<template>
  <div class="row q-mb-md">
    <div class="col-12">
      <span class="text-h4">Git Hub issues</span>
    </div>
  </div>

  <div class="row">
    <div class="col-xs-12 col-md-4">
      <!--TODO FILTROS -->
      <FilterSelector />
    </div>
    <div class="col-xs-12 col-md-8">
      <!--TODO: LOADER -->
      <LoaderSpinner color="secondary" v-if="issuesQuery.isLoading.value"></LoaderSpinner>

      <IssueList v-else :issues="issuesQuery.data?.value || []" />
    </div>
  </div>

  <!--FLOATING BOTTOMS-->
  <FloatingButtons :buttons="[
    {
      icon: 'add',
      color: 'primary',
      size: 'sm',
      action: openDialog
    }
  ]" />

  <NewIssueDialog :is-open="isOpen" v-if="labels && isOpen" :labels="labels.map(label => label.name) || []"
    @on-close="isOpen = false" />


</template>

<style scoped></style>

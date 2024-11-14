<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import { useRoute } from 'vue-router';
import IssueCard from '../components/issue-list/IssueCard.vue';
import useIssue from '../composables/useIssue';

const route = useRoute();
const { id = '' } = route.params;
const { issueQuery, issueCommentsQuery } = useIssue(+id);
</script>
<template>
  <router-link class="text-white" to="/">go back</router-link>

  <!-- Header -->
  <LoaderSpinner
    v-if="issueQuery.isLoading.value"
    color="white"
    :thinckness="1"
    size="1.5rem"
  />
  <IssueCard v-else-if="issueQuery.data.value" :issue="issueQuery.data.value" />
  <p v-else>Issue with ID {{ id }} not found</p>

  <!-- Comentarios -->
  <LoaderSpinner
    v-if="issueCommentsQuery.isLoading.value"
    color="white"
    :thinckness="1"
    size="1.5rem"
  />
  <div class="column" v-else-if="issueCommentsQuery.data.value">
    <span class="text-h3 q-mb-md"
      >Comments ({{ issueCommentsQuery.data.value.length }})</span
    >
    <IssueCard
      v-for="coment of issueCommentsQuery.data.value"
      :key="coment.id"
      :issue="coment"
    />
  </div>
</template>

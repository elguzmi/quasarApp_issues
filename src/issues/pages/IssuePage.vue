<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import { useRoute } from 'vue-router';
import IssueCard from '../components/issue-list/IssueCard.vue';

const route = useRoute();
const { id = '' } = route.params;
console.log('🚀 ~ id:', id);
</script>
<template>
  <LoaderSpinner color="white" />
  <router-link class="text-white" to="/">go back</router-link>

  <!-- Header -->
  <IssueCard />

  <!-- Comentarios -->
  <LoaderSpinner color="white" :thinckness="1" size="1.5rem" />

  <div class="column">
    <span class="text-h3 q-mb-md">Comments (5)</span>
    <IssueCard v-for="coment of 10" :key="coment" />
  </div>
</template>

<style scoped></style>

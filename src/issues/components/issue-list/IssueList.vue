<script lang="ts" setup>
import { Issue } from 'src/issues/interfaces/issue';
import IssueCard from './IssueCard.vue';

interface Props {
  issues: Issue[];
}
const props = defineProps<Props>();
</script>

<template>
  <div class="row">
    <IssueCard v-for="issue of props.issues" :key="issue.id" :issue="issue" />
  </div>
</template>

<style lang="scss" scoped></style>

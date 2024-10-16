<script setup lang="ts">
import { ref } from 'vue';

const test = ref<string>('');
</script>
<template>
  <q-btn-toggle
    v-model="test"
    push
    glossy
    toggle-color="primary"
    :options="[
      { label: 'All', value: '' },
      { label: 'Open', value: 'open' },
      { label: 'Closed', value: 'closed' },
    ]"
  />
</template>

<style scoped></style>

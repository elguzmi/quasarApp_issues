<script setup lang="ts">
import useLabels from 'src/issues/composables/useLabels';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';

const { data, isLoading, toggleLabel, selectedLabels } = useLabels();
</script>
<template>
  <div class="q-mt-md">
    <LoaderSpinner size="50px" :thinckness="1" v-if="isLoading" />
    <q-chip
      v-else
      v-for="label of data"
      :key="label.id"
      :style="{
        color: `#${label.color}`,
      }"
      :outline="selectedLabels.indexOf(label.name) < 0"
      clickable
      @click="toggleLabel(label.name)"
    >
      {{ label.name }}
    </q-chip>
  </div>
</template>

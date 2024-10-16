<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
</script>
<template>
  <LoaderSpinner size="50px" :thinckness="1" />

  <q-chip v-for="label of 10" :key="label" color="primary" outline clickable>
    Algun Nombre
  </q-chip>
</template>

<style scoped></style>

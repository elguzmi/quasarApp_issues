<script setup lang="ts">
import { toRef } from 'vue';

interface Props {
  color?: string;
  size?: string;
  thinckness?: number;
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  size: '3.5rem',
  thinckness: 2,
});

const color = toRef(props, 'color');
const size = toRef(props, 'size');
const thinckness = toRef(props, 'thinckness');
</script>

<template>
  <div class="column items-center">
    <q-spinner :color="color" :size="size" :thickness="thinckness" />
    <span class="q-mt-sm">Loading</span>
  </div>
</template>

<style scoped></style>

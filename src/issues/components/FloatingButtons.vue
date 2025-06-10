<script setup lang="ts">

interface Props {
  buttons: FabButton[];
}

interface FabButton {
  icon: string;
  color?: 'primary' | 'secondary' | 'accent' | 'dark' | 'light';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  action: () => void;
}

defineProps<Props>();


</script>

<template>
  <div class="fab">
    <q-btn class="q-mx-xs" v-for="item in $props.buttons" :key="item.icon" round :color="item.color || 'primary'"
      :size="item.size || 'md'" :icon="item.icon" @click="item.action" />
  </div>
</template>

<style scoped>
.fab {
  position: fixed;
  bottom: 30px;
  right: 50px;
  z-index: 1000;

}
</style>

<script setup lang="ts">
import { ref, toRef, watch } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import useIssueMutation from '../composables/useIssueMutation';

interface Props {
  isOpen: boolean;
  labels: string[];
}
interface Emits {
  (e: 'onClose'): void;
}

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const { issueMutation } = useIssueMutation();

const isDialogOpen = toRef(props, 'isOpen');

const title = ref<string>('');
const label = ref<string[]>([]);
const body = ref<string>('');


watch(props, () => {
  isDialogOpen.value = props.isOpen;
})

watch(issueMutation.isSuccess, (isSuccess) => {
  if (isSuccess) {
    title.value = '';
    body.value = '';
    label.value = [];
    issueMutation.reset(); // Restablezco el estado original de los valores de ese query
    emits('onClose');
  }
})

</script>


<template>
  <div class="q-pa-md q-gutter-sm">

    <q-dialog v-model:model-value="isDialogOpen" :position="'bottom'" persistent>
      <q-card style="width: 500px">
        <q-form @submit="issueMutation.mutate({ title, body, labels })">
          <q-linear-progress :value="1" color="primary" />

          <q-card-section class="column no-wrap">
            <div>
              <div class="text-weight-bold"> New Issue </div>
              <div class="text-grey">Add new issue with labels</div>
            </div>

            <q-space />
            <div>
              <q-input filled v-model="title" label="Title" class="q-mb-sm" dense
                :rules="[val => val.length > 0 || 'Title is required']" />
              <q-select filled v-model="label" :options="labels" label="Multiple" multiple class="q-mb-sm" dense />

              <!--Markdown editor-->
              <MdEditor v-model="body" placeholder="# markdown" language="en-US" />
            </div>
          </q-card-section>
          <q-card-actions align="left">
            <q-btn :disable="issueMutation.isPending.value" @click="emits('onClose')" label="Cancel" color="primary" />
            <q-space />
            <q-btn :disable="issueMutation.isPending.value" label="Add issue" color="dark" type="submit" />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>


<style scoped></style>
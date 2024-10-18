<template>
    <q-dialog v-model="dialog" :backdrop-filter="backdropFilter">
      <q-card>
        <q-card-section class="row items-center q-pb-none text-h4 text-white bg-primary ">
          {{ title }}
        </q-card-section>
  
        <q-card-section>
          {{ content }}
        </q-card-section>
  
        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const dialog = ref('')
  const props = defineProps({
    dialog: {
      type: Boolean,
      required: true,
    },
    backdropFilter: {
      type: String,
      required: false,
      default: null,
    },
    title: {
      type: String,
      required: false,
      default: 'Dialog',
    },
    content: {
      type: String,
      required: false,
      default: 'This dialog has a backdrop filter.',
    }
  });
  </script>
  
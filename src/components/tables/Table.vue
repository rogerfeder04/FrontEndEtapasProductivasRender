<template>
    <div style="width:90%">
      <q-table :title="title" :rows="rows" :columns="columns" flat bordered>
        
        <!-- Columna para el botón de Editar -->
        <template v-slot:body-cell-editar="props">
          <q-td :props="props" class="q-pa-sm">
            <q-btn class="q-pa-sm" @click="onClickEdit(props.row)">📝</q-btn>
          </q-td>
        </template>
        
        <!-- Columna para el botón de Activar/Desactivar -->
        <template v-slot:body-cell-activar="props">
          <q-td :props="props" class="q-pa-sm">
            <q-btn class="q-pa-sm" @click="onClickActivate(props.row)">
              <span v-if="props.row.estado == 1">❌</span>
              <span v-else>✅</span>
            </q-btn>
          </q-td>
        </template>
        
      </q-table>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    rows: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    onClickEdit: {
      type: Function,
      required: true
    },
    onClickActivate: {
      type: Function,
      required: true
    }
  })
  </script>
  
  <style scoped>
  .q-pa-sm {
    padding: 5px;
  }
  </style>
  
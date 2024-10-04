<template>
    <div>
        <Table 
      :rows="rows" 
      :columns="columns" 
      :title="title" 
      :onClickEdit="openDialog"
      :onClickActivate="toggleEstado"
    ></Table>    <q-dialog v-model="alert">
      <!-- Aquí va tu diálogo -->
    </q-dialog>
    </div>
</template>

<script setup>
import Table from '../components/tables/Table.vue';
import { ref } from 'vue';
import { useQuasar } from "quasar";

const $q = useQuasar();
let selectedRow = ref({});
let title = ref("Titulo de la tabla enviada desde padre");

const columns = ref([
  {
    name: "numero",
    label: "Numero de factura",
    field: "numero",
    align: "center",
  },
  {
    name: "fecha",
    required: true,
    label: "Fecha de factura",
    align: "center",
    field: "fecha",
    sortable: true,
  },
  {
    name: "comprador",
    align: "center",
    label: "Nombre comprdor",
    field: "comprador",
    sortable: true,
  },
  { name: "total", label: "Valor Total", align: "center", field: "total" },
  { name: "estado", label: "Estado", align: "center", field: "estado" },
  { name: "editar", label: "Editar", align: "center", field: "editar" },
  { name: "activar", label: "Activar/Desactivar", align: "center", field: "activar" },
]);

const rows = ref([
  {
    numero: "123",
    fecha: "19-02-2024",
    comprador: "Alex Guevara",
    total: 334000,
    estado: 1
  },
  {
    numero: "124",
    fecha: "20-02-2024",
    comprador: "Luis Medina",
    total: 334000,
    estado: 1
  },
  {
    numero: "125",
    fecha: "21-02-2024",
    comprador: "Alfredo Gutierrez",
    total: 334000,
    estado: 0
  },
  {
    numero: "126",
    fecha: "22-02-2024",
    comprador: "Matias Garnica",
    total: 334000,
    estado: 0
  },
  {
    numero: "127",
    fecha: "23-02-2024",
    comprador: "Cristian Tarasona",
    total: 334000,
    estado: 0
  },
]);

function openDialog(row) {
  selectedRow.value = row;
  alert.value = true;
  console.log(row);
}

function toggleEstado(row) {
  // Lógica para cambiar el estado de la fila
  row.estado = row.estado === 1 ? 0 : 1;
  console.log("Nuevo estado:", row.estado);
}
</script>

<style>
</style>
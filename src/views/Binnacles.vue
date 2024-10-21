<template>
    <q-layout view="lHh Lpr lff" class="layout">
      <q-page-container>
      <Header
        :title="'REPFORA'"
        :drawerOpen="drawerOpen"
        @toggleDrawer="toggleDrawer"
      ></Header>
      <Sidebar 
        :drawerOpen="drawerOpen" 
        @update:drawerOpen="toggleDrawer"
      />

      <CustomButton 
        label="CREAR BITÁCORA"
        :onClickFunction="openDialog"
      >
      </CustomButton>
  
    <div class="table-container">
      <Table
        :rows="rows"
        :columns="columns"
        :title="title"
        :onClickEdit="openDialog"
        :onClickActivate="toggleEstado"
      ></Table>
    </div>

    <CustomModal
  :modelValue="dialog"
  :title="dialogTitle"
  :onSave="saveBinnacle"
  @update:modelValue="dialog = $event"
>
  <template #content>
    <InputLog
      id="assignament"
      filled
      label="Seleccione la asignación"
      v-model="assignament"
      required
      errorMessage="Asignación requerida"
      icon="people-arrows"
      type="text"
    />

    <InputLog
      id="instructor"
      filled
      label="Seleccione el instructor"
      v-model="instructor"
      required
      errorMessage="Instructor requerido"
      icon="chalkboard-user"
      type="text"
    />
    <InputLog
      id="number"
      filled
      label="Número de bitacora"
      v-model="number"
      required
      errorMessage="Número de bitacora requerido"
      icon="list-ol"
      type="text"
    />
    <InputLog
      id="observation"
      filled
      label="Observación"
      v-model="observation"
      icon="envelope-open-text"
      type="text"
    />
  </template>
</CustomModal>

  </q-page-container>
  </q-layout>
  </template>
  
  <script setup>
  import { ref, onBeforeMount } from "vue";
  
  import Header from "@/components/layouts/Header.vue";
  import Sidebar from "@/components/layouts/Sidebar.vue";
  import Table from "@/components/tables/Table.vue";
  import CustomButton from "@/components/buttons/CustomButton.vue";
import CustomModal from "../components/modals/CustomModal.vue";
import InputLog from "@/components/inputs/Inputs.vue";
import { notifyErrorRequest, notifySuccessRequest } from "@/composables/notify/Notify.vue";

import { getData, postData } from "@/services/apiClient.js";
  
const title = ref("BITÁCORAS");
const dialog = ref(false);
const dialogTitle = ref("CREAR BITÁCORA"); 

//v-models de los inputs
const assignament = ref('')
const instructor = ref('')
const number = ref('')
const observation = ref('')

const binnacleData = {
  assignament: assignament.value,
  instructor: instructor.value,
  number: number.value,
  observation: observation.value,
}

  const rows = ref([]);
  const columns = ref([
  {
    name: "assignment",
    align: "center",
    label: "Asignacion",
    field: "assignment",
    sortable: true,
  },
  {
    name: "instructor",
    required: true,
    label: "instructor",
    align: "center",
    field: row => row.instructor.idInstructor,
    sortable: true,
  },
  {
    name: "number",
    required: true,
    label: "Número de Bitacora",
    align: "center",
    field: "number",
    sortable: true,
  },
  {
    name: "document",
    required: true,
    label: "Documento",
    align: "center",
    field: "document",
    sortable: true,
  },
  {
    name: "observation",
    required: true,
    label: "Observaciones",
    align: "center",
    field: row => row.observation.observation,
    sortable: true,
  },
  {
    name: "status",
    label: "Estado",
    align: "center",
    field: "status",
    sortable: true,
  },
  {
    name: "opciones",
    label: "Opciones",
    align: "center",
    sortable: true,
  },
  ]);
  
  onBeforeMount(() => {
    getBinnacles()
  })
  
  async function getBinnacles() {
  let response = await getData("Binnacle/listallbinnacles");
  console.log(response);
  rows.value = response;
  }
  
  const drawerOpen = ref(false);
  
  function toggleDrawer() {
  drawerOpen.value = !drawerOpen.value;
  }
  
  const openDialog = (row) => {
    dialog.value = true;
  };

  const saveBinnacle = async () => {
    try {
      let response = await postData('Binnacle/addbinnacle', binnacleData);
      rows.value = response;
      dialog.value = false;
        notifySuccessRequest('Bitacora guardada exitosamente');
    } catch (error) {
        notifyErrorRequest('Ocurrió un error al guardar la bitacora');
      }
    };
  
  const toggleEstado = (row) => {
  row.estado = row.estado === 1 ? 0 : 1;
  console.log("Nuevo estado:", row.estado);
  };
  </script>

  
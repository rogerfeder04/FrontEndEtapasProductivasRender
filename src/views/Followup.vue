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

      <CustomButton label="CREAR SEGUIMIENTO" :onClickFunction="openDialog">
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
        :onSave="saveFiche"
        @update:modelValue="dialog = $event"
      >
        <template #content>
          <div class="input-grid">
          <InputLog
            id="assignment"
            filled
            label="SeleccionarAsignación"
            v-model="assignment"
            required
            errorMessage="Asignación requerida"
            icon="file"
            type="text"
          />

          <InputLog
            id="instructor"
            filled
            label="Seleccionar Instructor"
            v-model="instructor"
            required
            errorMessage="Instructor requerido"
            icon="chalkboard-user"
            type="text"
          />
          <InputLog
            id="number"
            filled
            label="Número de Seguimiento"
            v-model="number"
            required
            errorMessage="Número requerido"
            icon="street-view"
            type="text"
          />
          <InputLog
            id="month"
            filled
            label="Mes de Seguimiento"
            v-model="month"
            required
            errorMessage="Mes requerido"
            icon="person-chalkboard"
            type="text"
          />
          <InputLog
            id="document"
            filled
            label="Documento"
            v-model="document"
            required
            errorMessage="Documento requerido"
            icon="file-invoice"
            type="text"
          />
          <InputLog
            id="observations"
            filled
            label="Observaciones"
            v-model="observations"
            icon="image"
            type="text"
          />
        </div>
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

const title = ref("SEGUIMIENTOS");
const dialog = ref(false);
const dialogTitle = ref("CREAR SEGUIMIENTO");

//v-models de los inputs
const assignment = ref("");
const instructor = ref("");
const number = ref("");
const month = ref("");
const document = ref("");
const observations = ref("");

const assignmentData = {
  assignment: assignment.value,
  instructor: instructor.value,
  number: number.value,
  month: month.value,
  document: document.value,
  observations: observations.value,
};

const rows = ref([]);
const columns = ref([
  {
    name: "assignment",
    required: true,
    label: "Fecha de Inicio",
    align: "center",
    field: "assignment",
    sortable: true,
  },
  {
    name: "instructor",
    align: "center",
    label: "Fecha Fin",
    field: "instructor",
    sortable: true,
  },
  {
    name: "company",
    label: "Empresa",
    align: "center",
    field: "company",
    sortable: true,
  },
  {
    name: "number",
    label: "Telefono de la Empresa",
    align: "center",
    field: "number",
    sortable: true,
  },
  {
    name: "month",
    align: "center",
    label: "Dirección de la Empresa",
    field: "month",
    sortable: true,
  },
  {
    name: "document",
    align: "center",
    label: "Dueño de la empresa",
    field: "document",
    sortable: true,
  },
  {
    name: "status",
    label: "Documento Alternativo",
    align: "center",
    field: "status",
    sortable: true,
  },
  {
    name: "observations",
    label: "Hora",
    align: "center",
    field: "observations",
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
    getFollowUps()
})

async function getFollowUps() {
  let response = await getData("Followup/listallfollowup");
  console.log(response);
  rows.value = response.followup;
}

const drawerOpen = ref(false);

function toggleDrawer() {
  drawerOpen.value = !drawerOpen.value;
}

const openDialog = () => {
  dialog.value = true;
};

const saveFiche = async () => {
  try {
    let response = await postData("Repfora/addFollowup", followUpData);

    // Si la respuesta es exitosa, actualizamos la tabla y cerramos el modal
    rows.value = response;
    dialog.value = false;
    notifySuccessRequest("Asignación guardada exitosamente");
  } catch (error) {
    notifyErrorRequest("Ocurrió un error al guardar la asignación");
  }
};

const toggleEstado = (row) => {
  // Lógica para cambiar el estado de la fila
  row.estado = row.estado === 1 ? 0 : 1;
  console.log("Nuevo estado:", row.estado);
};
</script>


<template>
  <q-layout view="lHh Lpr lff" class="layout">
    <q-page-container>
      <Header
        :title="'REPFORA'"
        :drawerOpen="drawerOpen"
        @toggleDrawer="toggleDrawer"
      ></Header>
      <Sidebar :drawerOpen="drawerOpen" @update:drawerOpen="toggleDrawer" />

      <CustomButton label="CREAR ASIGNACIÓN" :onClickFunction="openDialog">
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
        :onSave="saveAssignment"
        @update:modelValue="dialog = $event"
      >
        <template #content>
          <div class="input-grid">
          <InputLog
            id="register"
            filled
            label="Registro"
            v-model="register"
            required
            errorMessage="Registro requerido"
            icon="file"
            type="text"
          />

          <InputLog
            id="followUpInstructor"
            filled
            label="Instructor de Seguimiento"
            v-model="followUpInstructor"
            required
            errorMessage="Instructor de Seguimiento requerido"
            icon="chalkboard-user"
            type="text"
          />
          <InputLog
            id="technicalInstructor"
            filled
            label="Instructor Técnico"
            v-model="technicalInstructor"
            required
            errorMessage="Instructor Técnico requerido"
            icon="street-view"
            type="text"
          />
          <InputLog
            id="projectInstructor"
            filled
            label="Instructor de Proyecto"
            v-model="projectInstructor"
            required
            errorMessage="Instructor de Proyecto requerido"
            icon="person-chalkboard"
            type="text"
          />
          <InputLog
            id="certificationDoc"
            filled
            label="Documento de certificación"
            v-model="certificationDoc"
            required
            errorMessage="Documento de certificación requerido"
            icon="file-invoice"
            type="text"
          />
          <InputLog
            id="judymentPhoto"
            filled
            label="Foto del Juicio"
            v-model="judymentPhoto"
            required
            errorMessage="Foto del Juicio requerido"
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

const title = ref("ASIGNACIONES");
const dialog = ref(false);
const dialogTitle = ref("CREAR ASIGNACIÓN");

//v-models de los inputs
const register = ref("");
const followUpInstructor = ref("");
const technicalInstructor = ref("");
const projectInstructor = ref("");
const certificationDoc = ref("");
const judymentPhoto = ref("");

const assignmentData = {
  register: register.value,
  followUpInstructor: followUpInstructor.value,
  technicalInstructor: technicalInstructor.value,
  projectInstructor: projectInstructor.value,
  certificationDoc: certificationDoc.value,
  judymentPhoto: judymentPhoto.value,
};

// Configuración de la tabla
const rows = ref([]);
const columns = ref([
  {
    name: "register",
    align: "center",
    label: "Registro",
    field: "register",
    sortable: true,
  },
  {
    name: "followUpInstructor",
    required: true,
    label: "Instructor de Seguimiento",
    align: "center",
    field: "followUpInstructor",
    sortable: true,
  },
  {
    name: "technicalInstructor",
    required: true,
    label: "Instructor Técnico",
    align: "center",
    field: "technicalInstructor",
    sortable: true,
  },
  {
    name: "projectInstructor",
    required: true,
    label: "Instructor de Proyecto",
    align: "center",
    field: "projectInstructor",
    sortable: true,
  },
  {
    name: "certificationDoc",
    required: true,
    label: "Documento de certificación",
    align: "center",
    field: "certificationDoc",
    sortable: true,
  },
  {
    name: "judymentPhoto",
    label: "Foto del Juicio",
    align: "center",
    field: "judymentPhoto",
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
  getAssignments();
});

async function getAssignments() {
  let response = await getData("Assignment/listallassignment");
  console.log(response);
  rows.value = response;
}

const drawerOpen = ref(false);

function toggleDrawer() {
  drawerOpen.value = !drawerOpen.value;
}

const openDialog = () => {
  dialog.value = true;
};

const saveAssignment = async () => {
  try {
    let response = await postData("Assignment/addassignment", assignmentData);

    // Si la respuesta es exitosa, actualizamos la tabla y cerramos el modal
    rows.value = response;
    dialog.value = false;
    notifySuccessRequest("Asignación guardada exitosamente");
  } catch (error) {
    notifyErrorRequest("Ocurrió un error al guardar la asignación");
  }
};

const toggleEstado = () => {};
</script>


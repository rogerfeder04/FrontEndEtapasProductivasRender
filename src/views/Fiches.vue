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
        label="CREAR FICHA"
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
        :onSave="saveFiche"
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


const title = ref("FICHAS");
const dialog = ref(false);
const dialogTitle = ref("CREAR FICHA");

//v-models de los inputs
const register = ref("");
const followUpInstructor = ref("");
const technicalInstructor = ref("");
const projectInstructor = ref("");
const certificationDoc = ref("");
const judymentPhoto = ref("");

const ficheData = {
  register: register.value,
  followUpInstructor: followUpInstructor.value,
  technicalInstructor: technicalInstructor.value,
  projectInstructor: projectInstructor.value,
  certificationDoc: certificationDoc.value,
  judymentPhoto: judymentPhoto.value,
};

const rows = ref([]);
const columns = ref([
{
  name: "program",
  align: "center",
  label: "Ficha",
  field: row => row.program.name,
  sortable: true,
},
{
  name: "number",
  required: true,
  label: "Número de Ficha",
  align: "center",
  field: "number",
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
  getFiches()
})

async function getFiches() {
let response = await getData("Repfora/fiches");
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

const saveFiche = async () => {
  try {
    let response = await postData("Repfora/addFiche", ficheData);

    // Si la respuesta es exitosa, actualizamos la tabla y cerramos el modal
    rows.value = response;
    dialog.value = false;
    notifySuccessRequest("Asignación guardada exitosamente");
  } catch (error) {
    notifyErrorRequest("Ocurrió un error al guardar la asignación");
  }
};

const toggleEstado = (row) => {
row.estado = row.estado === 1 ? 0 : 1;
console.log("Nuevo estado:", row.estado);
};
</script>
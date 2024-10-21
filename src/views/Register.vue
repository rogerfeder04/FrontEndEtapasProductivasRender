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

      <CustomButton label="CREAR REGISTRO" :onClickFunction="openDialog">
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
        :onSave="saveRegister"
        @update:modelValue="dialog = $event"
      >
        <template #content>
          <div class="input-grid">
          <q-select
            id="idApprentice"
            filled
            label="Seleccione el Aprendiz"
            v-model="idApprentice"
            required
            errorMessage="Aprendiz requerido"
            icon="user-graduate"
            type="text"
          />

          <q-select
            id="idModality"
            filled
            label="Seleccione la Modalidad"
            v-model="idModality"
            required
            errorMessage="Modalidad requerida"
            icon="shapes"
            type="text"
          />
          <InputLog
            id="startDate"
            filled
            label="Fecha de Inicio"
            v-model="startDate"
            required
            errorMessage="Fecha requerida"
            icon="calendar-days"
            type="date"
          />
          <InputLog
            id="endDate"
            filled
            label="Fecha de Fin"
            v-model="endDate"
            required
            errorMessage="Fecha requerida"
            icon="calendar-days"
            type="date"
          />
          <InputLog
            id="company"
            filled
            label="Nombre de la Empresa"
            v-model="company"
            required
            errorMessage="Empresa requerida"
            icon="spell-check"
            type="text"
          />
          <InputLog
            id="phoneCompany"
            filled
            label="Teléfono de la empresa"
            v-model="phoneCompany"
            required
            errorMessage="Número de contacto requerido"
            icon="phone"
            type="text"
          />
          <InputLog
            id="addressCompany"
            filled
            label="Dirección de la empresa"
            v-model="addressCompany"
            required
            errorMessage="Dirección requerida"
            icon="map-location-dot"
            type="text"
          />
          <InputLog
            id="owner"
            filled
            label="Dueño de la Empresa"
            v-model="owner"
            required
            errorMessage="Dueño requerido"
            icon="user-tie"
            type="text"
          />
          <InputLog
            id="docAlternative"
            filled
            label="Documento Alternativo"
            v-model="docAlternative"
            required
            errorMessage="Documento requerido"
            icon="file-invoice"
            type="text"
          />
          <InputLog
            id="hour"
            filled
            label="Horas"
            v-model="hour"
            required
            errorMessage="Horas requeridas"
            icon="clock"
            type="text"
          />
          <InputLog
            id="businessProyectHour"
            filled
            label="Horas del Proyecto de Negocio"
            v-model="businessProyectHour"
            required
            errorMessage="Horas requeridas"
            icon="stopwatch"
            type="text"
          />
          <InputLog
            id="productiveProjectHour"
            filled
            label="Horas del Proyecto Productivo"
            v-model="productiveProjectHour"
            required
            errorMessage="Horas requeridas"
            icon="stopwatch"
            type="text"
          />
          <InputLog
            id="mailCompany"
            filled
            label="Email de la empresa"
            v-model="mailCompany"
            required
            errorMessage="Email de la empresa requerido"
            icon="envelope"
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

const title = ref("REGISTROS");
const dialog = ref(false);
const dialogTitle = ref("CREAR REGISTRO");

//v-models de los inputs
const idApprentice = ref("");
const idModality = ref("");
const startDate = ref("");
const endDate = ref("");
const company = ref("");
const phoneCompany = ref("");
const addressCompany = ref("");
const owner = ref("");
const docAlternative = ref("");
const hour = ref("");
const businessProyectHour = ref("");
const productiveProjectHour = ref("");
const mailCompany = ref("");

const registerData = {
  idApprentice: idApprentice.value,
  idModality: idModality.value,
  startDate: startDate.value,
  endDate: endDate.value,
  company: company.value,
  phoneCompany: phoneCompany.value,
  addressCompany: addressCompany.value,
  owner: owner.value,
  docAlternative: docAlternative.value,
  hour: hour.value,
  businessProyectHour: businessProyectHour.value,
  productiveProjectHour: productiveProjectHour.value,
  mailCompany: mailCompany.value,
};

const rows = ref([]);
const columns = ref([
  {
    name: "startDate",
    required: true,
    label: "Fecha de Inicio",
    align: "center",
    field: "startDate",
    sortable: true,
  },
  {
    name: "endDate",
    align: "center",
    label: "Fecha Fin",
    field: "endDate",
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
    name: "phoneCompany",
    label: "Telefono de la Empresa",
    align: "center",
    field: "phoneCompany",
    sortable: true,
  },
  {
    name: "addressCompany",
    align: "center",
    label: "Dirección de la Empresa",
    field: "addressCompany",
    sortable: true,
  },
  {
    name: "owner",
    align: "center",
    label: "Dueño de la empresa",
    field: "owner",
    sortable: true,
  },
  {
    name: "docAlternative",
    label: "Documento Alternativo",
    align: "center",
    field: "docAlternative",
    sortable: true,
  },
  {
    name: "hour",
    label: "Hora",
    align: "center",
    field: "hour",
    sortable: true,
  },
  {
    name: "businessProyectHour",
    label: "Horas del Proyecto Empresarial",
    align: "center",
    field: "businessProyectHour",
    sortable: true,
  },
  {
    name: "productiveProjectHour",
    label: "Horas del Proyecto Productivo",
    align: "center",
    field: "productiveProjectHour",
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
  getRegisters()
})

async function getRegisters() {
  let response = await getData("Register/listallregister");
  console.log(response);
  rows.value = response.register;
}

const drawerOpen = ref(false);

function toggleDrawer() {
  drawerOpen.value = !drawerOpen.value;
}

const openDialog = () => {
  dialog.value = true;
};

const saveRegister  = async () => {
  try {
    let response = await postData("Register/addregister", registerData);

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

<style>
.layout {
  padding: 0; 
}

.table-container {
  margin-top: 0; /* Quita el margen superior */
  padding: 0 20px; /* Añade un pequeño padding lateral si es necesario */
}
</style>

<template>
  <q-layout view="lHh Lpr lff" class="layout">
    <q-page-container>
      <Header
        :title="'REPFORA'"
        :drawerOpen="drawerOpen"
        @toggleDrawer="toggleDrawer"
      ></Header>
      <Sidebar :drawerOpen="drawerOpen" @update:drawerOpen="toggleDrawer" />

      <CustomButton label="CREAR APRENDIZ" :onClickFunction="openDialog">
      </CustomButton>

      <div class="table-container">
        <Table
          :rows="rows"
          :columns="columns"
          :title="title"
          :onClickEdit="editApprentice"
          :onClickToggleStatus="toggleStatus"
        >
        </Table>
      </div>

      <CustomModal
        :modelValue="dialog"
        :title="dialogTitle"
        :onSave="saveApprentice"
        @update:modelValue="dialog = $event"
      >
        <template #content>
          <div class="input-grid">
                <InputLog
                  id="fiche"
                  filled
                  label="Seleccionar ficha"
                  v-model="fiche"
                  required
                  errorMessage="Ficha requerida"
                  icon="users-line"
                  type="text"
                />
             
                <InputLog
                  id="tpDocument"
                  filled
                  label="Tipo de Documento"
                  v-model="tpDocument"
                  required
                  errorMessage="Tipo de Documento requerido"
                  icon="chalkboard-user"
                  type="text"
                />
                 <InputLog
                  id="numDocument"
                  filled
                  label="Documento del Aprendiz"
                  v-model="numDocument"
                  required
                  errorMessage="Documento requerido"
                  icon="address-card"
                  type="text"
                />
                 <InputLog
                  id="firstName"
                  filled
                  label="Nombres del Aprendiz"
                  v-model="firstName"
                  required
                  errorMessage="Nombres requeridos"
                  icon="spell-check"
                  type="text"
                />
                 <InputLog
                  id="lastName"
                  filled
                  label="Apellidos del Aprendiz"
                  v-model="lastName"
                  required
                  errorMessage="Nombre del Aprendiz requerido"
                  icon="spell-check"
                  type="text"
                />
                 <InputLog
                  id="phone"
                  filled
                  label="Teléfono del Aprendiz"
                  v-model="phone"
                  required
                  errorMessage="Teléfono del Aprendiz requerido"
                  icon="phone"
                  type="text"
                />
                 <InputLog
                  id="email"
                  filled
                  label="Email del Aprendiz"
                  v-model="email"
                  required
                  errorMessage="Email del Aprendiz requerido"
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
import {
  notifyErrorRequest,
  notifySuccessRequest,
} from "@/composables/notify/Notify.vue";

import { getData, postData, putData } from "@/services/apiClient.js";

const title = ref("APRENDICES");
const dialog = ref(false);
const dialogTitle = ref("CREAR APRENDIZ");

//v-models de los inputs
const fiche = ref("");
const tpDocument = ref("");
const numDocument = ref("");
const firstName = ref("");
const lastName = ref("");
const phone = ref("");
const email = ref("");

const apprenticeData = {
  fiche: fiche.value,
  tpDocument: tpDocument.value,
  numDocument: numDocument.value,
  firstName: firstName.value,
  lastName: lastName.value,
  phone: phone.value,
  email: email.value,
};

const rows = ref([]);
const columns = ref([
  {
    name: "fiche",
    label: "Ficha",
    align: "center",
    field: (row) => row.fiche.name,
    sortable: true,
  },
  {
    name: "tpDocument",
    align: "center",
    label: "Tipo de Documento",
    field: "tpDocument",
    sortable: true,
  },
  {
    name: "numDocument",
    align: "center",
    label: "Documento del Aprendiz",
    field: "numDocument",
    sortable: true,
  },
  {
    name: "name",
    required: true,
    label: "Nombre del Aprendiz",
    align: "center",
    field: (row) => `${row.firstName || ""} ${row.lastName || ""}`.trim(),
    sortable: true,
  },
  {
    name: "phone",
    align: "center",
    label: "Teléfono del Aprendiz",
    field: "phone",
    sortable: true,
  },
  {
    name: "email",
    align: "center",
    label: "Email del Aprendiz",
    field: "email",
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
    field: "opciones",
    sortable: true,
  },
]);

onBeforeMount(() => {
  getApprentices();
});

async function getApprentices() {
  let response = await getData("Apprentice/listallapprentice");
  console.log(response.apprentices);
  rows.value = response.apprentices;
}

const drawerOpen = ref(false);

function toggleDrawer() {
  drawerOpen.value = !drawerOpen.value;
}

const openDialog = () => {
  dialog.value = true;
};

const saveApprentice = async (row) => {
  try {
    const apprenticeData = {
      fiche: fiche.value,
      tpDocument: tpDocument.value,
      numDocument: numDocument.value,
      firstName: firstName.value,
      lastName: lastName.value,
      phone: phone.value,
      email: email.value,
    };

    if (dialogTitle.value === "EDITAR APRENDIZ") {
      let response = await putData(`Apprentice/updateapprenticebyid/${row.idApprentice}`, apprenticeData);
      notifySuccessRequest("Aprendiz editado exitosamente");
    } else {
      let response = await postData("Apprentice/addapprentice", apprenticeData);
      notifySuccessRequest("Aprendiz guardado exitosamente");
    }
    dialog.value = false;
    await getApprentices();
  } catch (error) {
    notifyErrorRequest("Ocurrió un error al guardar o editar el aprendiz");
  }
};

async function toggleStatus(row) {
  try {
    const url = row.status === 0 
      ? `Apprentice/enableapprentice/${row._id}`
      : `Apprentice/disableapprentice/${row._id}`;
    await putData(url, {});
    await getApprentices();
    notifySuccessRequest("Estado cambiado exitosamente");
  } catch (error) {
    notifyErrorRequest("Ocurrió un error al cambiar el estado del aprendiz");
  }
}

async function editApprentice(row) {
  fiche.value = row.fiche; 
  tpDocument.value = row.tpDocument;
  numDocument.value = row.numDocument;
  firstName.value = row.firstName;
  lastName.value = row.lastName;
  phone.value = row.phone;
  email.value = row.email;

  dialogTitle.value = "EDITAR APRENDIZ";
  
  dialog.value = true;
}

</script>

<style>
.input-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

@media (max-width: 600px) {
  .input-grid {
    grid-template-columns: 1fr;
  }
}
</style>
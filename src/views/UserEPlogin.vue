<template>
  <q-layout view="hHh lpR fFf" class="cardContainer">
    <q-page-container>
  <div class="q-pa-md">
  <q-card class="my-card">
    <q-card-section 
        class="flex-content bg-primary text-white">
      <h1 
        class="text-h4 q-mt-sm q-mb-xs"><b>REPFORA</b></h1>
    </q-card-section>

    <q-card-section class="imgSenaLogoContent">
        <q-img class="senaLogo" src="@\assets\images\senaLogo.png"></q-img>
    </q-card-section>

    <h1 
    class="text-h5 q-mt-sm q-mb-xs" align="center"><b>LOG IN</b></h1>

    <q-card-section align="center">
      <q-select
        class="selectStyles"
        filled 
        :rules="[val => !!val || 'Este campo es obligatorio']"
        v-model="role" 
        :options="roles" 
        label="Selecciona un rol"
        @update:model-value="updateRole"
      >
      </q-select>

      <InputLog
        id="email"
        placeholder="Ingresa tu correo"
        v-model="email"
        type="email"
        errorMessage="El email es obligatorio"
        icon="envelope"
      />  

      <InputLog
        v-if="role === 'ADMIN' || role === 'Instructor'"
        id="password"
        placeholder="Ingresa tu contraseña"
        v-model="password"
        type="password"
        errorMessage="Contraseña requerida"
        icon="lock"
        />  

        <InputLog
        v-if="role === 'Apprentice'"
        id="document"
        placeholder="Ingresa tu documento"
        v-model="document"
        type="Text"
        errorMessage="El documento es obligatorio"
        icon="address-card"
      />  
  
    <customButton
      label="INICIAR SESIÓN" 
      :onClickFunction="onSubmit"
      color="primary"
    />

    <div v-if="role === 'ADMIN' || role === 'Instructor'">
          <router-link
            to="/recoverpassword"
            class="forgotPassword"
            id="recuperacion"
            ><b>Restablecer Contraseña</b>
          </router-link>
    </div>
    </q-card-section>
  </q-card>
</div>
</q-page-container>

  <Footer></Footer>
  
</q-layout>
</template>
  
<script setup>
import Footer from "@/components/layouts/Footer.vue"
import InputLog from "@/components/inputs/Inputs.vue";
import customButton from "@/components/buttons/CustomButton.vue";

import { ref, watch } from "vue";
import { postData } from "@/services/apiClient.js";
import { getData } from "@/services/apiClient.js";
import { notifyErrorRequest, notifySuccessRequest, notifyWarningRequest } from "@/composables/notify/Notify.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/useAuth.js";

const route = useRouter();
const authStore = useAuthStore();
const role = ref('Apprentice')
const roles = ref(['Instructor', 'ADMIN', 'Apprentice'])
const email = ref("");
const password = ref("");
const document = ref("")


// const requiredRule = (value) => !!value || "Campo requerido";
// const emailRule = (value) => /.+@.+\..+/.test(value) || "Correo inválido";

const userData = ref({
  "role": role.value.trim(),
  "email": email.value.trim(),
  "password": password.value.trim()
});

watch([email, password, role], () => {
  userData.value = {
    role: role.value,
    email: email.value,
    password: password.value,
  };
});

const updateRole = (newRole) => {
  role.value = newRole;
  userData.value.role = newRole;
};

const onSubmit = async () => {
  try{
    if (role.value === "ADMIN" || role.value === "Instructor") {
    let response = await postData("Repfora/Login", userData.value)
    console.log(response.token)
    localStorage.setItem('token', response.token);

      // Configura el token en la store
      authStore.setToken(response.token); 
      authStore.setRol(role.value);      
    route.push("/home")
    notifySuccessRequest("Inicio de sesión exitoso")
  }else if (role.value === "Apprentice") {
  let response = await getData("/Apprentice/listallapprentice") 

      authStore.setRol(role.value);

 const apprentice = response.apprentices.find(apprentice => apprentice.email === email.value)
 route.push("/binnacles")
}
} catch (error) {
  notifyErrorRequest("Error en el inicio de sesión");
  console.error("Error Inicio de sesión error", error);
}
}

</script>
  
  <style scoped>
.cardContainer {
  background-color: rgb(245, 245, 245) !important;
}
  
.my-card {
  max-width: 400px;
  margin: 0 auto;
  padding: 0px;
  transition: all 0.3s;
  border: 1px solid #ccc;
  box-shadow: none;
  border-radius: 8px;

}

.flex-content {
  text-align: center;
  
}

.senaLogo {
    width: 30%;
    height: 30%;
}

.imgSenaLogoContent {
    display: flex;
    justify-content: center;
}

.cardContainer {
  justify-content: center !important;
  align-content: center !important;
  align-items: center !important;
  justify-items: center;
}

.my-card:hover {
  background-color: inherit;
  transition: none;
}

.selectStyles {
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.2s;
  padding: 0px;
  margin-bottom: 8%;
}

.forgotPassword:hover {
  text-shadow: 1px 1px 3px var(--q-primary);
  transition: border 0.3s;
}

.forgotPassword {
  color: var(--q-primary);
  transition: border 0.3s, color 0.3s;
  text-decoration: none;
  font-size: 15px;
}

</style>  
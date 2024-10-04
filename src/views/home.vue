<template>
    <div class="q-pa-md"> 
    <Layout></Layout>


    <Card route="/Home/Ficha" imgSrc="../assets/Images/Logo-Fichas.png" title="FICHAS" />
  


    </div>
</template>

<script setup>
import Table from "../components/tables/Table.vue";
import Layout from "../components/layouts/Layout.vue";
import Card from "../components/cards/Card.vue"
import { ref } from "vue";

let alert = ref(false);

</script>

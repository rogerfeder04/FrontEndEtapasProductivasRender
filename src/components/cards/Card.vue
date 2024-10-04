<template>
    <q-card class="my-card" flat bordered @click="goToRoute(route)">
      <div class="colorCorporativo flex-container">
        <q-img :src="imgSrc" class="flex-img" />
      </div>
      <q-card-section class="flex-content">
        <div class="text-h6 q-mt-sm q-mb-xs">{{ title }}</div>
      </q-card-section>
    </q-card>
  </template>
  
  <script setup>
  const props = defineProps({
    route: {
      type: String,
      required: true
    },
    imgSrc: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  });
  
  const goToRoute = (route) => {
    this.$router.push(route);
  };
  </script>
  
  <style scoped>
  .my-card {
    width: 100%;
    max-width: 400px;
  }
  .flex-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
  }
  .flex-img {
    max-width: 150px;
  }
  .flex-content {
    text-align: center;
  }
  </style>
  
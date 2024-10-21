<template>
    <div>
      <q-btn
       @click="handleClick" 
       id="button"
       flat
       :style="{ backgroundColor: backgroundColor }"
       >
       <font-awesome-icon :icon="icon" style="font-size: 20px; color: white;"/>
      </q-btn>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    icon: {
      type: Array,
      required: true,
    },
    onClick: {
      type: Function,
    },
    backgroundColor: {
      type: String,
      default: "var(--q-primary)",
    },
  });
  
  function handleClick() {
  if (props.onClick) {
    props.onClick();
  }
}
  </script>
  
  <style scoped>
#button {
  color: white;
  border-radius: 25px;
  padding: 10px;
  font-weight: bold;
  transition: border 0.3s, color 0.3s;
  text-decoration: none;
}
  </style>
  
<template>
    <div>
      <h1>________________Apprentices Page</h1>
      <CustomButton @click="handleClick">Click Me</CustomButton>
    </div>
  </template>
  
  <script>
  import CustomButton from '../components/buttons/Button.vue';
  
  export default {
    components: {
      CustomButton
    },
    methods: {
      handleClick() {
        console.log('boton al hacer log click!');
      }
    }
  }
  </script>
  
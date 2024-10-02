<template>
    <div>
      <h1>Assignments Page</h1>
      <CustomButton @click="handleClick">Submit</CustomButton>
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
        console.log('Button clicked in Assignments Page!');
      }
    }
  }
  </script>
  
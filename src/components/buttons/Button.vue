<template>
    <button @click="handleClick">
      <slot></slot> <!-- Para que sea un botón reutilizable -->
    </button>
  </template>
  
  <script>
  export default {
    name: 'CustomButton',
    props: {
      onClick: {
        type: Function,
        required: false
      }
    },
    methods: {
      handleClick() {
        if (this.onClick) {
          this.onClick();
        }
      }
    }
  }
  </script>
  
  <style scoped>
  button {
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  
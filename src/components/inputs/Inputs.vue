<template>
    <div>
      <q-input
        v-model="internalValue"
        filled
        :label="label"
        :icon="leftIcon"
        :clearable="clearable"
        :clear-icon="clearIcon"
        :type="type"
        @click="handleClick"
        @input="emitInput($event)"
        @clear="emitClear"
      >
        <!-- Icono del lado derecho -->
        <template v-if="rightIcon" v-slot:append>
          <q-icon :name="rightIcon" @click="handleClickRightIcon"/>
        </template>
      </q-input>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    modelValue: {
      type: [String, Number],
      required: true
    },
    label: {
      type: String,
      default: "No tengo texto"
    },
    leftIcon: {
      type: String,
      default: ""
    },
    rightIcon: {
      type: String,
      default: ""
    },
    clearable: {
      type: Boolean,
      default: true
    },
    clearIcon: {
      type: String,
      default: "close"
    },
    type: {
      type: String,
      default: "text"
    },
    onClickFunction: {
      type: Function,
      required: false
    }
  });
  
  const internalValue = ref(props.modelValue);
  
  // Emitir cambios hacia el padre cuando se actualice el valor
  function emitInput(value) {
    emit('update:modelValue', value);
  }
  
  // Emitir evento cuando se borra el input
  function emitClear() {
    emit('clear');
  }
  
  // Llamar función de clic si está definida
  function handleClick() {
    if (props.onClickFunction) {
      props.onClickFunction();
    }
  }
  
  function handleClickRightIcon() {
    if (props.onClickFunction) {
      props.onClickFunction();
    }
  }
  </script>
  
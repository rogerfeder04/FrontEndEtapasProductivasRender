<template>
  <q-dialog v-model="internalValue" :backdrop-filter="backdropFilter"  persistent>
    <q-card>
      <q-card-section class="text-align-center title text-white bg-primary">

        {{ title }}
      </q-card-section>

      <q-card-section id="inputsSection">
        <slot name="content"></slot>
        <q-card-actions align="center">
          <CustomButton label="Cancelar" color="negative" @click="closeModal" />
          <CustomButton label="Guardar" color="positive" @click="handleSave" />
        </q-card-actions>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, defineEmits } from 'vue';
import CustomButton from '../buttons/CustomButton.vue';

const emit = defineEmits();

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  backdropFilter: {
    type: String,
    required: false,
    default: null,
  },
  title: {
    type: String,
    required: false,
    default: 'Dialog',
  },
  onSave: {
    type: Function,
    required: false,
  }
});

const internalValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
});

const closeModal = () => {
  emit('update:modelValue', false);
};

const handleSave = () => {
  if (props.onSave) {
    props.onSave();
  }
  closeModal();
};
</script>


<style lang="scss">
.q-card__section {
  /* top, right, bottom, left */
  padding: 10px 15px 5px 15px !important;
  text-align: center !important;

}

::-webkit-scrollbar {
  width: 12px; /* Ancho del scroll vertical */
  height: 12px; /* Alto del scroll horizontal */
}

::-webkit-scrollbar-track {
  background: #f1f1f1; /* Fondo de la pista del scroll */
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background-color: $primary; /* Color de la "manija" del scroll */
  border-radius: 10px;
  border: 3px solid #f1f1f1;
}


.title {
  font-size: 28px;
  align-self: center;
  font-weight: bold;
  position: sticky !important;
  top: 0px;
  z-index: 1;
}

.text-align-center{
  text-align: center !important;
}

.inputsSection {
  display: grid !important;
  grid-template-columns: repeat(2, 1fr) !important;
  gap: 0px !important;
}

@media (max-width: 600px) {
  .inputsSection {
    grid-template-columns: 1fr !important; 
  }
}

</style>
<template>
  <div style="width: 98%">
    <q-table 
      :title="title" 
      :rows="rows" 
      :columns="columns" 
      flat 
      bordered
    >
    <template v-slot:body-cell-opciones="props">
        <q-td :props="props" id="buttons">
          <TableButton
            :icon="['fas', 'pen-to-square']"
            :onClick="() => onClickEdit(props.row)"
            backgroundColor="#157fe1"
          />

          <TableButton
            v-if="props.row.status === 1"
            :icon="['fas', 'circle-check']"
            :onClick="() => onClickToggleStatus(props.row)"
            backgroundColor="#21BA45"
          />

          <TableButton
            v-if="props.row.status === 0"
            :icon="['fas', 'circle-xmark']"
            :onClick="() => onClickToggleStatus(props.row)"            backgroundColor="#C10015"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>
  
<script setup>
import TableButton from '../buttons/TableButton.vue';


const props = defineProps({
  rows: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  onClickEdit: {
    type: Function,
    required: true,
  },
  onClickToggleStatus: {
    type: Function,
    required: true,
  },
});
</script>
  

<style lang="scss">
.q-table__container div {
  display: flex;
}

.q-table__container > div:first-child {
  border-bottom: 4px solid $primary;
  padding: 2%;
}

.q-table--horizontal-separator thead th{
  border-bottom-width: 3px !important;
}

.q-table__top {
  padding: 5px !important;
}

th.text-center {
  font-size: 15px !important;
  font-weight: bold !important;
  color: $primary !important
}

td {
  padding: 1% !important;
}

.layout {
  padding: 0;
}

.table-container {
  margin-top: 0;
  padding: 0 20px;
}

#buttons {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
}

</style>

  
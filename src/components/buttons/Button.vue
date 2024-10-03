<template>
    <div>
        <button @click="handleClick">{{ props.label }}</button>
    </div>
</template>

<script setup>
const props = defineProps({
    label:{
        type:String,
        require:true,
        default:"No tengo texto"
    },
    onClickFunction:{
        type:Function,
        require:true
    }
})

function handleClick (){
    props.onClickFunction()
}

</script>

<style scoped>
button{
    background-color: red;
    color: white;
    border: 1px solid black;
}
</style>
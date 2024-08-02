<template>
    <input :value="props.modelValue"
           @input="$emit('update:modelValue', $event.target.value)"
           class="w-full bg-gray-50 border border-gray-300 focus-visible:outline-gray-400 text-gray-900 rounded-lg px-4 py-2"/>
</template>
<script setup>

const props = defineProps({
    modelValue: {
        type: String,
        default: ""
    }
})
</script>
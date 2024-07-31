<template>
    <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
           class="bg-gray-50 border border-gray-300 focus-visible:outline-gray-400 text-gray-900 rounded-lg px-4 py-2"/>
</template>
<script>
export default {
    name: "CustomInput",
    props: {
        modelValue: {
            type: String,
            default: ""
        }
    }
}
</script>
<template>
    <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
        class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500  block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
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
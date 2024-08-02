<template>
    <div v-for="error in errors" class="text-red-500 text-sm">{{ error.$message }}</div>
</template>
<script>
export default {
    name: "InputErrors",
    props: {
        errors: {
            type: Array,
            default: []
        }
    }
}
</script>
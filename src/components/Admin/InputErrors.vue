<template>
    <div>
        <span v-for="error in errors" class="text-red-500 text-sm">{{ error.$message }}</span>
    </div>
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
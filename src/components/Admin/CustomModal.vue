<template>
    <a-modal v-model:open="props.open"
             footer=""
             :closable="false"
             centered>
        <template #title>
            <header class="flex items-center mb-4">
                <h1 class="text-2xl font-bold">{{ props.title }}</h1>
                <button @click="$emit('close')" type="button" class="ml-auto">
                    <i class="fa fa-xmark text-2xl pt-1"></i>
                </button>
            </header>
            <hr>
        </template>
        <div class="px-2 mt-6">
            <slot name="body"/>
        </div>
    </a-modal>
</template>
<script setup>
const props = defineProps({
    title: {
        type: String,
        default: ""
    },
    open: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <div class="bg-white rounded-lg shadow w-full">
        <div v-if="title || !!$slots.toolbar" class="border-b border-gray-300 flex justify-between items-center py-5 px-8">
            <h3 class="text-2xl font-semibold">{{title}}</h3>
            <slot name="toolbar"/>
        </div>
        <div class="flex flex-col gap-7 px-8 py-9">
            <slot name="body"/>
        </div>
    </div>
</template>
<script>
export default {
    name: "CustomCard",
    props: {
        title: {
            type: String
        }
    }
}
</script>
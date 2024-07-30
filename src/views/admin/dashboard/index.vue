<template>
    <div>
        <h1 class="text-4xl font-semibold">Hello {{authStore?.user?.name}}. Welcome to dashboard</h1>
    </div>
</template>
<script setup>

import {useAuthStore} from "@/stores/authStore.js";

const authStore = useAuthStore();

</script>
<template>
    <router-view v-if="$route.name === 'login'"/>
    <div v-else-if="authStore.isAuth" class="flex">
        <AppSidebar/>
        <div class="wrapper w-full flex flex-col justify-center">
            <AppHeader/>
            <main class="bg-neutral-50 py-10">
                <CustomContainer>
                    <RouterView/>
                </CustomContainer>
            </main>
            <AppFooter/>
        </div>
    </div>
</template>
<style scoped>
main {
    min-height: calc(100vh - var(--header-height) - var(--footer-height));
}
</style>
<script setup>
import {useAuthStore} from "@/stores/authStore.js";

const authStore = useAuthStore();
</script>

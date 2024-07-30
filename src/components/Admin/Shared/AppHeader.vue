<template>
    <CustomContainer>
        <header class="bg-white flex justify-between items-center">
            <Breadcrumb/>
            <div>
                <button @click="logout" class="px-4 py-2 text-white bg-blue-700 hover:bg-blue-600 rounded-lg">Logout
                </button>
            </div>
        </header>
    </CustomContainer>
</template>
<script>
import CustomContainer from "@/components/Admin/CustomContainer.vue";
import Breadcrumb from "@/components/Admin/Shared/Breadcrumb.vue";
import SweetAlert from "@/components/Admin/SweetAlert.vue";
import {useAuthStore} from "@/stores/authStore.js";
import router from "@/router/index.js";

export default {
    name: "Header",
    components: {
        SweetAlert,
        Breadcrumb,
        CustomContainer
    },
    setup() {
        const authStore = useAuthStore()

        return {authStore}
    },
    methods: {
        logout() {
            this.authStore.logout()
        }
    }
}
</script>

<style scoped>
header {
    height: var(--header-height);
}
</style>
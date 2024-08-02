<template>
    <CustomContainer>
        <header class="bg-white flex justify-between items-center">
            <Breadcrumb/>
            <div>
                <CustomButton @click="logout">
                    <template #icon>
                        <i class="fa fa-right-from-bracket"></i>
                    </template>
                    Logout
                </CustomButton>
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
import CustomButton from "@/components/Admin/CustomButton.vue";

export default {
    name: "Header",
    components: {
        CustomButton,
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
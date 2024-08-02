<template>
    <div class="flex justify-center items-center bg-gray-200 h-[100vh]">
        <div class="bg-white rounded-lg shadow w-[500px]">
            <div class="border-b border-gray-900 text-center py-5 px-8">
                <h3 class="text-2xl font-semibold">Appointment App</h3>
            </div>
            <div class="flex flex-col gap-7 px-8 my-9">
                <form @submit.prevent="onSubmit" class="grid gap-6 mb-6">
                    <div>
                        <CustomLabel for="email">E-mail</CustomLabel>
                        <CustomInput id="email" v-model="loginForm.email" class="w-full"/>
                        <InputErrors :errors="loginValidate.email.$errors"/>
                    </div>
                    <div>
                        <CustomLabel for="password">Password</CustomLabel>
                        <CustomInput id="password" type="password" v-model="loginForm.password" class="w-full"/>
                        <InputErrors :errors="loginValidate.password.$errors"/>
                    </div>
                    <div>
                        <CustomButton class="w-full" btnType="primary" :loading="loading">
                            Login
                        </CustomButton>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <SweetAlert :hide-cancel-btn="requestAlert.hideCancelBtn" :type="requestAlert.type" :open="requestAlert.open" @close="requestAlert.open = false">
        <template #message>{{ requestAlert.message }}</template>
    </SweetAlert>
</template>
<script setup>
import CustomInput from "@/components/Admin/CustomInput.vue";
import CustomLabel from "@/components/Admin/CustomLabel.vue";
import CustomButton from "@/components/Admin/CustomButton.vue";
import SweetAlert from "@/components/Admin/SweetAlert.vue";
import {useAuthStore} from '@/stores/authStore.js';
import {useVuelidate} from '@vuelidate/core'
import {reactive, ref} from "vue";
import {email, required} from "@vuelidate/validators";
import InputErrors from "@/components/Admin/InputErrors.vue";
import {useRouter} from "vue-router";

const authStore = useAuthStore();

const loginForm = reactive({
    email: "admin@admin.com",
    password: "123123"
})

const loginFormRules = {
    email: {required, email},
    password: {required},
}

const loginValidate = useVuelidate(loginFormRules, loginForm)

const loading = ref(false)

const requestAlert = reactive({
    type: "",
    open: false,
    message: "",
    hideCancelBtn: false,
})

const onSubmit = async () => {
    const validate = await loginValidate.value.$validate();
    if(!validate) return;

    loading.value = true
    const res = await authStore.login(loginForm)
    if (res.success) {
        requestAlert.hideCancelBtn = true
        requestAlert.type = "success"
        setTimeout(() => {
            window.location.href = "/"
        }, 1000)
    } else {
        requestAlert.hideCancelBtn = false
        requestAlert.type = "error"
    }

    requestAlert.message = res.message ?? ""
    requestAlert.open = true
    loading.value = false
}
</script>

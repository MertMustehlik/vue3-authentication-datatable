<template>
    <div>
        <CustomCard title="Users">
            <template #toolbar>
                <CustomButton @click="openUserModal = true">
                    <template #icon><i class="fa fa-plus"></i></template>
                    Add User
                </CustomButton>
                <CustomModal title="Add User"
                             :open="openUserModal"
                             @close="hideUserModal">
                    <template #body>
                        <form @submit.prevent="onSubmit" class="flex flex-wrap gap-y-4">
                            <div class="w-full xl:w-1/2 px-1.5">
                                <CustomLabel>Name</CustomLabel>
                                <CustomInput v-model="userForm.name"/>
                                <InputErrors :errors="userValidate.name.$errors"/>
                            </div>
                            <div class="w-full xl:w-1/2 px-1.5">
                                <CustomLabel>E-Mail</CustomLabel>
                                <CustomInput type="email" v-model="userForm.email"/>
                                <InputErrors :errors="userValidate.email.$errors"/>

                            </div>
                            <div class="w-full px-1.5">
                                <CustomLabel class="mb-0">Password</CustomLabel>
                                <CustomInput v-model="userForm.password"/>
                                <InputErrors :errors="userValidate.password.$errors"/>
                            </div>
                            <div class="w-full px-1.5 flex justify-end mt-3 gap-2">
                                <CustomButton @click="hideUserModal" type="reset" btn-type="light">Cancel</CustomButton>
                                <CustomButton :loading="addUserLoading" type="submit" btn-type="primary">Save</CustomButton>
                            </div>
                        </form>
                    </template>
                </CustomModal>
            </template>
            <template #body>
                <CustomDataTable @fetch-data="fetchData"
                                 :attrs="dataTableAttrs"
                                 :columns="columns"/>
            </template>
        </CustomCard>
    </div>
</template>
<script setup>
import CustomCard from "@/components/Admin/CustomCard.vue";
import CustomButton from "@/components/Admin/CustomButton.vue";
import CustomDataTable from "@/components/Admin/CustomDataTable.vue";
import {getUsers, addUser} from "@/services/index.js";
import {reactive, ref} from "vue";
import CustomModal from "@/components/Admin/CustomModal.vue";
import CustomInput from "@/components/Admin/CustomInput.vue";
import CustomLabel from "@/components/Admin/CustomLabel.vue";
import InputErrors from "@/components/Admin/InputErrors.vue";
import {email, helpers, minLength, required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core";
import {userPassRegex} from "@/validators.js";
import {notification} from "ant-design-vue";

const openUserModal = ref(false);
const dataTableAttrs = reactive({
    data: [
        [9999999, "test", "data"]
    ],
    total: 0,
    isLoading: false
});

const columns = [
    { title: '#', data: 0 },
    { title: 'Name', data: 1 },
    { title: 'E-Mail', data: 2 }
]
const fetchData = async (e) => {
    dataTableAttrs.isLoading = true;
    const res = await getUsers(e)
    if (!res.success) {
        alert(res.message)
        dataTableAttrs.isLoading = false;
        return false
    }
    dataTableAttrs.total = res.total
    dataTableAttrs.data = res.data.map(item => {
        return [
            item?.id,
            item?.name,
            item?.email
        ]
    })
    dataTableAttrs.isLoading = false;
};

// start::Add User Form
const addUserLoading = ref(false);
const userForm = reactive({
    name: "",
    email: "",
    password: ""
})
const userFormRules = {
    name: {
        required
    },
    email: {required, email},
    password: {
        required,
        minLength: minLength(8),
        userPassRegex: helpers.withMessage("The password must contain at least one letter and one number", userPassRegex)
    },
}
const userValidate = useVuelidate(userFormRules, userForm)
const addUserRequestAlert = reactive({
    type: "",
    open: false,
    message: "",
})

const hideUserModal = () => {
    openUserModal.value = false
}
const onSubmit = async () => {
    const validate = await userValidate.value.$validate();
    if(!validate) return;

    addUserLoading.value = true

    const res = await addUser(userForm.name, userForm.email, userForm.password)

    addUserRequestAlert.type = res?.success ? "success" : "error"
    addUserRequestAlert.message = res?.message ?? ""
    addUserRequestAlert.open = true
    addUserLoading.value = false

    console.log(dataTableAttrs.data, "dataTableAttrs.data")
    if (res?.success){
        dataTableAttrs.data.unshift([res.user.id,res.user.name,res.user.email])

        notification.success({
            message: res?.message ?? '',
            placement: "top"
        });

        openUserModal.value = false
        userForm.name = ""
        userForm.email = ""
        userForm.password = ""
    }else{
        notification.error({
            message: res?.message ?? '',
            placement: "top"
        });
    }
    userValidate.value.$reset()
}
// end::Add User Form
</script>

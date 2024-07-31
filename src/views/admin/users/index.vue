<template>
    <div>
        <CustomCard title="Users">
            <template #toolbar>
                <CustomButton>
                    <template #icon><i class="fa fa-plus"></i></template>
                    Add User
                </CustomButton>
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
import {getUsers} from "@/services/index.js";
import {ref} from "vue";

const dataTableAttrs = ref({
    data: [],
    total: 0,
    isLoading: false
});

const columns = [
    {label: "#", value: "id", sortable: false},
    {label: "Name", value: "name", sortable: true},
    {label: "E-Mail", value: "email", sortable: true}
]

const fetchData = async (e) => {
    dataTableAttrs.value.isLoading = true;
    const res = await getUsers(e)
    if (!res?.data?.success){
        alert(res?.data?.message)
        dataTableAttrs.value.isLoading = false;
        return false
    }
    dataTableAttrs.value.total = res?.data?.total
    dataTableAttrs.value.data = res.data.data.map(item => {
        return [
            item?.id,
            item?.name,
            item?.email
        ]
    })
    dataTableAttrs.value.isLoading = false;
};

</script>
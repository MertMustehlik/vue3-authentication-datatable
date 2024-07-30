<template>
    <CustomInput class="w-[200px]"
                 placeholder="Search in table"
                 v-model="search"
                 @input="onSearch"/>
    <div class="relative">
        <DataTable :data="props.attrs.data"
                   :options="dataTableOptions"
                   class="display">
            <thead>
            <tr>
                <th @click="sort('id')">#</th>
                <th @click="sort('name')">Name</th>
                <th @click="sort('email')">E-mail</th>
            </tr>
            </thead>
        </DataTable>
        <div v-if="props.attrs.isLoading" class="absolute inset-0 flex flex-center py-10 backdrop-blur-sm">
            <span><i class="fa fa-spinner animate-spin"></i> Please wait...</span>
        </div>
    </div>
    <div class="text-end">
        <a-pagination
                :pageSizeOptions="false"
                :total="props.attrs.total"
                :current="currentPage"
                :page-size="perPage"
                @change="onChangePagination"
        />
    </div>
</template>
<script setup>
import {ref, onMounted} from 'vue';

import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import CustomInput from "@/components/Admin/CustomInput.vue";

DataTable.use(DataTablesCore);

const props = defineProps({
    attrs: {
        type: Object,
        default: {
            data: [],
            total: 0,
            isLoading: false
        }
    }
});


const emit = defineEmits(['fetch-data']);

const dataTableOptions = ref({
    paging: false,
    searching: false,
    ordering: true,
    info: false
});
const currentPage = ref(1);
const perPage = ref(10);
const sortBy = ref('id');
const sortOrder = ref('asc');
const search = ref('');

const fetchData = () => {
    emit('fetch-data', {
        params: {
            page: currentPage.value,
            perPage: perPage.value,
            sortBy: sortBy.value,
            sortOrder: sortOrder.value,
            search: search.value,
        }
    });
}

const sort = (column) => {
    if (sortBy.value === column) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortBy.value = column;
        sortOrder.value = 'asc';
    }
    fetchData();
};

const onChangePagination = (e) => {
    currentPage.value = e;
    fetchData();
}

const onSearch = () => {
    currentPage.value = 1;
    fetchData()
}

onMounted(() => {
    fetchData();
});
</script>
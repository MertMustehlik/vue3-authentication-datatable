<template>
    <div class="w-[200px]">
        <CustomInput type="search"
                     placeholder="Search in table"
                     v-model="search"
                     @input="onSearch"/>
    </div>
    <div class="relative">
        <DataTable :data="props.attrs.data"
                   :options="dataTableOptions"
                   :columns="props.columns"/>
        <div v-if="props.attrs.isLoading" class="absolute inset-0 flex flex-center py-10 backdrop-blur-sm">
            <span><i class="fa fa-spinner animate-spin"></i> Please wait...</span>
        </div>
    </div>
    <div class="text-end">
        <a-pagination
                :show-size-changer="false"
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
import debounce from 'lodash.debounce'

DataTable.use(DataTablesCore);

const props = defineProps({
    attrs: {
        type: Object,
        default: {
            data: [],
            total: 0,
            isLoading: false
        }
    },
    columns: {
        type: Array,
        default: []
    }
});

const emit = defineEmits(['fetch-data']);

const dataTableOptions = ref({
    paging: false,
    searching: false,
    ordering: true,
    info: false,
    order: [],
});

const currentPage = ref(1);
const perPage = ref(10);
const sortBy = ref(props.columns[0]?.value);
const sortOrder = ref('desc');
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

const onSearch = debounce(() => {
    if (search.value.length !== 1) {
        currentPage.value = 1;
        fetchData();
    }
}, 300);

onMounted(() => {
    fetchData();
});
</script>
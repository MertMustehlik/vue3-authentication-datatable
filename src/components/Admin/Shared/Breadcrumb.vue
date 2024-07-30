<template>
    <nav class="breadcrumb font-medium text-xs lg:text-sm">
        <ol>
            <li v-for="(crumb, index) in breadcrumbs" :key="index">
                <router-link class="text-gray-600 hover:text-blue-600 cursor-pointer"
                             v-if="index < breadcrumbs.length - 1" :to="crumb.path">
                    {{ crumb.text }}
                </router-link>
                <span v-else class="text-gray-700">{{ crumb.text }}</span>
            </li>
        </ol>
    </nav>
</template>

<script>
export default {
    name: 'Breadcrumb',
    methods: {},
    computed: {
        breadcrumbs() {
            let pathArray = this.$route.path.split('/');
            pathArray.shift();

            let breadcrumbs = [];
            let currentPath = '';

            pathArray.forEach((path, index) => {
                currentPath += `/${path}`;
                let route = this.$router.resolve(currentPath);

                let crumbName = route?.meta?.breadcrumb || route?.name;
                breadcrumbs.push({text: crumbName, path: route.path});
            });
            breadcrumbs.unshift({text: "Brand Name", path: "/"})
            return breadcrumbs;
        }
    }
}
</script>


<script setup>
// import { computed } from 'vue';
// import { useRoute } from 'vue-router';
//
// const route = useRoute();
//
// const breadcrumbs = computed(() => {
//     let pathArray = this.$route.path.split('/');
//     console.log(pathArray, "patharray")
//     let list = [{ text: 'Home', path: '/' }]
//     if (route.meta?.breadcrumb){
//         list.push({ text: route.meta.breadcrumb, path: "" });
//     }
//     return list
// });
</script>

<style scoped>
.breadcrumb {
    display: flex;
    align-items: center;
}

.breadcrumb ol {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
}

.breadcrumb li {
    margin-right: 0.5rem;
}

.breadcrumb li + li::before {
    content: '>';
    margin-right: 0.5rem;
}
</style>

<template>
  <nav class="flex min-w-[240px] flex-col gap-2 p-8 font-sans text-base font-normal text-blue-gray-700">
      <RouterLink :to="{name: 'dashboard'}"  class="flex items-center gap-2 p-[10px] rounded-md text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                  active-class="text-blue-600 bg-gray-100">
          <div class="flex flex-center w-[30px]">
              <i class="fa fa-house"></i>
          </div>
          <span class="text-sm font-semibold">Dashboard</span>
      </RouterLink>
      <RouterLink :to="{name: 'users'}" class="flex items-center gap-2 p-[10px] rounded-md text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                  active-class="text-blue-600 bg-gray-100">
          <div class="flex flex-center w-[30px]">
              <i class="fa fa-users"></i>
          </div>
          <span class="text-sm font-semibold">Users</span>
      </RouterLink>
  </nav>
</template>
<script>

export default {
  name: "SidebarMenu"
}
</script>
<style scoped>

</style>
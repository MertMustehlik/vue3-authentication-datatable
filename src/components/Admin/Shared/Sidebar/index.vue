<template>
  <div class="hidden lg:block relative flex w-full max-w-[275px] flex-col bg-white text-gray-700 border-r">
    <!-- START::Brand-->
    <SidebarBrand/>
    <!-- END::Brand-->
    <!-- START::Menu-->
    <SidebarMenu/>
    <!-- END::Menu-->
  </div>
</template>
<script>
import SidebarBrand from "@/components/Admin/Shared/Sidebar/SidebarBrand.vue";
import SidebarMenu from "@/components/Admin/Shared/Sidebar/SidebarMenu.vue";

export default {
  name: "AppSidebar",
  components: {SidebarMenu, SidebarBrand}
}
</script>

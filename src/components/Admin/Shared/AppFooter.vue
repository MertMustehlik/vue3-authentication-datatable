<template>
  <CustomContainer>
    <footer class="bg-white w-full">
      <h1>Footer</h1>
    </footer>
  </CustomContainer>
</template>
<script>
import CustomContainer from "@/components/Admin/CustomContainer.vue";
export default {
  name: "Footer",
  components:{
      CustomContainer
  }
}
</script>

<style scoped>
footer{
  height: var(--header-height);
}
</style>
import './assets/css/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import AppHeader from "@/components/Admin/Shared/AppHeader.vue";
import AppSidebar from "@/components/Admin/Shared/Sidebar/index.vue";
import AppFooter from "@/components/Admin/Shared/AppFooter.vue";
import CustomContainer from "@/components/Admin/CustomContainer.vue";

const app = createApp(App)

app.use(createPinia())
app.use(Antd)
app.use(router)
app.component("AppHeader", AppHeader)
app.component("AppSidebar", AppSidebar)
app.component("AppFooter", AppFooter)
app.component("CustomContainer", CustomContainer)
app.mount('#app')

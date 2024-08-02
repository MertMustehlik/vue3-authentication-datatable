import {defineStore} from "pinia";
import {login} from "@/services/index.js";
import {jwtDecode} from "jwt-decode";
import router from "@/router/index.js";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: localStorage.getItem('token') ?? "",
        isAuth: !!localStorage.getItem('token')
    }),
    getters: {
        authUser: () => {
            return this.user
        }
    },
    actions: {
        async login(payload) {
            const res = await login(payload)
            if (res.success) {
                const token = res.token;
                const decoded = jwtDecode(token);
                const user = {
                    "id": decoded?.sub,
                    "name": decoded?.name,
                    "email": decoded?.email
                }

                localStorage.setItem("user", JSON.stringify(user))
                localStorage.setItem("token", token)

                this.user = user
                this.token = token
                this.isAuth = true
                return {"success": true, "message": res?.message}
            } else {
                localStorage.setItem("user", null)
                localStorage.setItem("token", null)

                this.user = {}
                this.token = ""
                this.isAuth = false
                return {"success": false, "message": res?.message ?? "An unexpected problem occurred"}
            }
        },
        logout() {
            localStorage.removeItem("user")
            localStorage.removeItem("token")

            this.user = null
            this.token = null
            this.isAuth = false

            router.push({ name: 'login' })
            return true
        },
        check() {
            const token = localStorage.getItem("token");
            this.user = token ? localStorage.getItem("user") : ""
            this.token = token ?? ""
            this.isAuth = !!token

            return !!token;
        }
    }
})
import {axios} from '../axios'

export const login = async (payload) => {
    try{
        return await axios.post('auth/login', payload);
    } catch (e) {
        return {"success": false, "message": e.response?.data?.message ?? "An unexpected problem occurred"}
    }
}

export const logout = async () => {

}
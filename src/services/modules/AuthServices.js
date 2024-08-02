import {axios} from '../axios'

export const login = async (payload) => {
    try{
        const res = await axios.post('auth/login', payload);
        return res.data
    } catch (e) {
        return {"success": false, "message": e.response?.data?.message ?? "An unexpected problem occurred"}
    }
}

export const logout = async () => {

}


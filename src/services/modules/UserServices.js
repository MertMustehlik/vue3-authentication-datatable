import {axios} from '../axios'

export const getUsers = async (payload) => {
    try{
        return await axios.get('users', payload);
    } catch (e) {
        return {"success": false, "message": e.response?.data?.message ?? "An unexpected problem occurred"}
    }
}


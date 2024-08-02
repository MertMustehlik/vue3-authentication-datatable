import {axios} from '../axios'

export const me = async () => {
    try{
        const res = await axios.get('users/me');
        return res.data;
    } catch (e) {
        return {"success": false, "message": e.response?.data?.message ?? "Unexpected problem occurred"}
    }
}

export const getUsers = async (payload) => {
    try{
        const res = await axios.get('users', payload);
        return res.data
    } catch (e) {
        return {"success": false, "message": e.response?.data?.message ?? "Unexpected problem occurred"}
    }
}

export const addUser = async (name, email, password) => {
    try{
        const res = await axios.post('users', {
            name: name,
            email: email,
            password: password,
        });
        return res.data;
    } catch (e) {
        return {"success": false, "message": e.response?.data?.message ?? "Unexpected problem occurred"}
    }
}

import Axios from 'axios'

const getToken = () => {
    return localStorage.getItem('token');
};

const instance  =  Axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    responseType: 'json',
    headers: {
        Authorization: `Bearer ${getToken()}`
    }
})
const axios = instance;
export { axios }

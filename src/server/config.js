import axios from 'axios';

const api = axios.create({
    baseURL: 'http://matc-oitoquatro.herokuapp.com/'
})

export default api
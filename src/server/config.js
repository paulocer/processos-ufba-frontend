import axios from 'axios';

const api = axios.create({
    baseURL: 'https://apiprocessosufba.herokuapp.com/'
})

export default api
import axios from 'axios'

const apiContato = axios.create({
    baseURL: process.env.REACT_APP_API_CONTATO
});

export default apiContato;
import axios from 'axios'

const apiDb = axios.create({
    baseURL: process.env.REACT_APP_API_DB_JSON_URL
});

export default apiDb;
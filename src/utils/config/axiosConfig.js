import axios from 'axios';

const serverUrl = import.meta.env.VITE_SERVER_URL;
export const API = axios.create({
    baseURL: `${serverUrl}/`
})
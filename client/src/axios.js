import axios from "axios";

export const makeRequest = axios.create({
    baseURL:"https://auraapi.onrender.com/",
    withCredentials: true
})
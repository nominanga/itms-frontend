import axios from "axios";


const baseAPI = axios.create({
    baseURL: "/api",
})

export default baseAPI

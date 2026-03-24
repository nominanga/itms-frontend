import axios from "axios";


const baseAPI = axios.create({
    baseURL: "/api",
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
    }
})

export default baseAPI

import axios from "axios";

const api = axios.create({
    baseURL: "https://my-blog-api-0wgd.onrender.com",
    withCredentials: true,
});

export default api;
import axios from "axios";


const axiosApi = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1",
})

axiosApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("ACCESS_TOKEN")
    config.headers.Authorization = `Bearer ${token}`;
    return config
})

axiosApi.interceptors.response.use(
    (response) => {
        return response
    },
    error => {
        try {
            const { response } = error;
            if (response.error === 401) {
                localStorage.removeItem("ACCESS_TOKEN");
            }
        } catch (error) {
            console.log(error)

        }
        throw error;
    }
)

export default axiosApi
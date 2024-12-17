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
            // Check if the response status code is 401 (Unauthorized)
            if (response && response.status === 401) {
                // Clear the token and user ID from localStorage
                localStorage.removeItem("ACCESS_TOKEN");
                localStorage.removeItem("ACCESS_USER_ID");
                console.log("Unauthorized! Token and ID removed.");
            }
        } catch (err) {
            console.error("Error handling response interceptor:", err);
        }
        // Re-throw the error for further handling
        return Promise.reject(error);
    }
)

export default axiosApi
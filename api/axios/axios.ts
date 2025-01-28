import axios from "axios";
import { Cookies } from "react-cookie";

const adminURL = `https://wtsacademy.dedicateddevelopers.us/api`

export const baseURL = adminURL;
let axiosInstance = axios.create({
    baseURL,
})
const cookie = new Cookies()

export const productImg = (media:string) => {
    return `https://wtsacademy.dedicateddevelopers.us/uploads/product/${media}`;
}

axiosInstance.interceptors.request.use(
     function(config: any){
        const token = cookie.get("token")
        // const token = localStorage.getItem('token') || sessionStorage.getItem("token")
        if(token){
            config.headers = config.headers || {};
            config.headers["x-access-token"] = token;
        }
        return config;
    },
    function (error){
        return Promise.reject(error)
    }
);
export default axiosInstance
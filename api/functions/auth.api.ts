import { MutationFunction } from "@tanstack/react-query"
import axiosInstance from "../axios/axios"
import endPoints from "../endpoints/endPoints"
import { loginProps } from "@/interface/auth.interface"


export const loginFn: MutationFunction<loginProps> = async (payload) => {
    const res = await axiosInstance.post<loginProps>(endPoints.auth.login, payload)
    console.log(res, "login response")
    return res.data
}
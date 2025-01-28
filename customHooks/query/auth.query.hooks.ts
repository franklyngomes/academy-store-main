import { useGlobalHooks } from "../globalHooks/globalhooks"
import { loginProps } from "@/interface/auth.interface"
import { useMutation, UseMutationResult } from "@tanstack/react-query"
import { loginFn } from "@/api/functions/auth.api"
import { Cookies } from "react-cookie"

export const loginMutation = (): UseMutationResult<loginProps, unknown> => {
    const { queryClient } = useGlobalHooks()
    const cookie = new Cookies()
    return useMutation<loginProps, void, unknown>({
        mutationFn: loginFn,
        onSuccess: (res) => {
            console.log(res)
            const { token, status, message,user } = res || {}
            if (status === 200 && token) {
                cookie.set("token", token, { path: "/", secure: true })
                localStorage.setItem("user", JSON.stringify(user))
            }
            queryClient.invalidateQueries({ queryKey: ["USER"] })
        },
        onError:(error:any, variables, context)=> {
            queryClient.invalidateQueries({ queryKey: ["USER"] })
        }
    })

}
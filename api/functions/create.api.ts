import { CreateProps } from "@/interface/cms.interface";
import axiosInstance from "../axios/axios";
import endPoints from "../endpoints/endPoints";
import { MutateFunction } from "@tanstack/react-query";

export const CreateProductFn : MutateFunction<CreateProps> = async(payload) => {
    const response = await axiosInstance.post<CreateProps>(endPoints.pages.create, payload)
    return response.data
}
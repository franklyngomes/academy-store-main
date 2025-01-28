import { MutationFunction } from "@tanstack/react-query";
import axiosInstance from "../axios/axios";
import { UpdateProps } from "@/interface/cms.interface";
import endPoints from "../endpoints/endPoints";

export const updateProductFn: MutationFunction<UpdateProps> = async (payload) => {
  const response = await axiosInstance.post<UpdateProps>(
    endPoints.pages.update,
    payload
  );
  return response.data
}
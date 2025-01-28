import { MutationFunction } from "@tanstack/react-query";
import axiosInstance from "../axios/axios";
import { DeleteProps } from "@/interface/cms.interface";
import endPoints from "../endpoints/endPoints";

export const deleteProductFn: MutationFunction<DeleteProps> = async (payload) => {
  const response = await axiosInstance.post<DeleteProps>(
    endPoints.pages.delete,
    payload
  );
  return response.data;
};

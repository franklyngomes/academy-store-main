import { DetailProps } from '@/interface/cms.interface';
import axiosInstance from '../axios/axios'
import endPoints from '../endpoints/endPoints'

export const List = async (page: number, perPage: number) => {
    const response = await axiosInstance.post(endPoints.pages.list, {page, perPage});
  return response.data
}
export const allProductDetails = async (id: string): Promise<DetailProps | null> => {
  const res = await axiosInstance.get<{data:DetailProps}>(endPoints.pages.details + id);
  return res.data.data;
} 


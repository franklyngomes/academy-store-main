import { IProfile } from '@/interface/cms.interface';
import axiosInstance from '../axios/axios'
import endPoints from '../endpoints/endPoints'

export const profileDetails = async (): Promise<IProfile | null> => {
  const res = await axiosInstance.get<{data:IProfile}>(endPoints.pages.profile);
  return res.data.data;
} 
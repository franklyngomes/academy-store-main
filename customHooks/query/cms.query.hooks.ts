import { CreateProps, DetailProps, IProfile, ListProps, UpdateProps } from "@/interface/cms.interface";
import { List } from "@/api/functions/list.api";
import {
  useQuery,
  UseQueryResult,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { DeleteProps } from "@/interface/cms.interface";
import { deleteProductFn } from "@/api/functions/delete.api";
import { Cookies } from "react-cookie";
import { useGlobalHooks } from "../globalHooks/globalhooks";
import { CreateProductFn } from "@/api/functions/create.api";
import { updateProductFn } from "@/api/functions/update.api";
import { allProductDetails } from "@/api/functions/list.api";
import { profileDetails } from "@/api/functions/profile";

export const listQuery = (page: number, perPage:number): UseQueryResult<ListProps, unknown> => {
  return useQuery({
    queryKey: ["LIST",page, perPage],
    queryFn: () => List(page, perPage),
  });
};

export const deleteMutation = (): UseMutationResult<
  DeleteProps,
  unknown,
  unknown
> => {
  const { queryClient } = useGlobalHooks();
  const cookie = new Cookies();

  return useMutation<DeleteProps, unknown, unknown>({
    mutationFn: deleteProductFn,
    onSuccess: (res) => {
      const { status, user, token } = res || {};
      if (status === 200 && token) {
        cookie.set("token", token, { path: "/", secure: true });
      }
      queryClient.invalidateQueries({ queryKey: ["LIST"] });
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
    },
  });
};

export const createMutation = (): UseMutationResult<CreateProps, unknown> => {
  const { queryClient } = useGlobalHooks();
  const cookie = new Cookies();

  return useMutation<CreateProps, void, unknown, FormData>({
    mutationFn: CreateProductFn,
    onSuccess: (res) => {
      const { token, status, user } = res || {};
      if (status === 200 && token) {
        cookie.set("token", token, { path: "/", secure: true });
      }
      queryClient.invalidateQueries({ queryKey: ["CREATE"] });
    },
    onError: (error) => {
      console.error("Error creating product:", error);
    },
  });
};

export const updateMutation = (): UseMutationResult<UpdateProps, unknown> => {
  const {queryClient} = useGlobalHooks();
  const cookie = new Cookies();

  return useMutation<UpdateProps, void, unknown, FormData>({
    mutationFn: updateProductFn,
    onSuccess: (res) => {
      const { token, status, user } = res || {};
      if (status === 200 && token) {
        cookie.set("token", token, { path: "/", secure: true });
      }
      queryClient.invalidateQueries({ queryKey: ["UPDATE"] });
    },
    onError: (error) => {
      console.error("Error creating product:", error);
    },
  })
}
export const fetchProductQuery = ( id: string | number): UseQueryResult<DetailProps, unknown> => {
  return useQuery({
    queryKey: ["PRODUCTDETAILS", id],
    queryFn: () => allProductDetails(`${id}`),
    enabled: !!id,
  });
};
export const fetchProfileDetails = () : UseQueryResult<IProfile, unknown> => {
  return useQuery({
    queryKey: ["PROFILE"],
    queryFn: () => profileDetails(),
  })
}

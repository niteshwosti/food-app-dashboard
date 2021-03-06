import { API } from "../utils/api";

export const addCategory = async (formData: any) => {
  const { data } = await API.post(`/categories`, formData);
  return data;
};

export const getCategoryById = async ({ queryKey }: any) => {
  const { data } = await API.get(`/categories/${queryKey[1]}`);
  return data;
};
export const deleteCategory = async (id: any) => {
  const { data } = await API.delete(`/categories/${id}`);
  return data;
};

export const updateCategory = async (formData: any) => {
  const { data } = await API.put(`/categories/${formData.cId}`, formData);
  return data;
};
export const fetchCategoryList = async () => {
  const { data } = await API.get(`/categories`);
  return data;
};

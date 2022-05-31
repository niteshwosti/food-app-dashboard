import { API } from "../utils/api";

export const addFood = async (formData: any) => {
  const { data } = await API.post(`/foods`, formData);
  return data;
};

export const getFoodList = async () => {
  const { data } = await API.get(`/foods`);
  return data;
};

export const getFoodById = async ({ queryKey }: any) => {
  const { data } = await API.get(`/foods/${queryKey[1]}`);
  return data;
};

export const updateFood = async (formData: any) => {
  const { data } = await API.put(`/foods/${formData.mId}`, formData);
  return data;
};

export const deleteFood = async (id: any) => {
  const { data } = await API.delete(`/foods/${id}`);
  return data;
};

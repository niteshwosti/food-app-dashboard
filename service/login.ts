import { API } from "../utils/api";

export const executeLogin = async (formData: any) => {
  const { data } = await API.post(`/signin`, formData);
  return data;
};

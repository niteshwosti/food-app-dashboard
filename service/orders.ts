import { API } from "../utils/api";

export const getOrders = async () => {
  const { data } = await API.get(`/orders`);
  return data;
};

import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

API.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("access_token");

    if (!config.headers) config.headers = {};
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { API };

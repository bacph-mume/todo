import axiosClient from "../utils/axios";

export const login = async ({ data }) => {
  const res = await axiosClient.post(import.meta.env.VITE_BASE_URL, {});
};

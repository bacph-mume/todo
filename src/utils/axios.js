import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

axiosClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshAccessToken();

      return axiosClient(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const refreshAccessToken = async () => {
  let refresh_token = localStorage.getItem("refresh_token");

  let response = await axios.post(
    import.meta.env.VITE_BASE_URL + "auth/token/refresh/",
    {
      refresh: refresh_token, // Django Simple JWT yêu cầu key là "refresh"
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  let data = response.data;

  localStorage.setItem("token", data.access);

  axiosClient.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${data.access}`;

  return data;
};

export default axiosClient;

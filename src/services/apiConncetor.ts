// import axiosInstance from "./axiosInstance"; // ✅ correct

// export const apiConnector = async (
//   method: any,
//   url: string,
//   body?: any,
//   headers: any = {}
// ) => {
//   return axiosInstance({
//     method,
//     url,
//     data: body,
//     headers,
//   });
// };


// src/services/apiConnector.ts

// import axios from "axios";

// const BASE_URL = "http://localhost:5000/api"; // change if needed

// // ✅ Axios Instance
// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
// });

// // ✅ Request Interceptor (Token attach)
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // ✅ Response Interceptor (Error handling)
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error("API Error:", error?.response?.data || error.message);

//     // Optional: auto logout on 401
//     if (error?.response?.status === 401) {
//       localStorage.removeItem("token");
//       window.location.href = "/login";
//     }

//     return Promise.reject(error);
//   }
// );

// // ✅ MAIN API CONNECTOR FUNCTION
// export const apiConnector = async (
//   method: "GET" | "POST" | "PUT" | "DELETE"|"PATCH",
//   url: string,
//   data?: any,
//   headers?: any
// ) => {
//   try {
//     const response = await axiosInstance({
//       method,
//       url,
//       data,
//       headers,
//     });

//     return response.data;

//   } catch (error: any) {
//     throw error?.response?.data || error.message;
//   }
// };











import axios from "axios";
import store from "@/components/redux/store";
import {
  logout,
  setToken,
} from "@/components/redux/slices/authSlice";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token =
    store.getState().auth.accessToken;

  if (token) {
    config.headers.Authorization =
      `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/refresh-token",
          {},
          {
            withCredentials: true,
          }
        );

        const newAccessToken =
          res.data.accessToken;

        store.dispatch(
          setToken(newAccessToken)
        );

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);

      } catch (err) {
        store.dispatch(logout());

        window.location.href = "/login";

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

export const apiConnector = async (
  method:
    | "GET"
    | "POST"
    | "PUT"
    | "PATCH"
    | "DELETE",
  url: string,
  data?: any
) => {
  const response = await axiosInstance({
    method,
    url,
    data,
  });

  return response.data;
};
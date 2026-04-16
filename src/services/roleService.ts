import axios from "axios";
import { apiConnector } from "./apiConncetor";

const API = "http://localhost:5000/api";

// ✅ create role
// export const createRole = (data: any) => {
//   return axios.post(`${API}/roles`, data);
// };


const BASE_URL = "http://localhost:5000/api";

export const createRole = async (data: { name: string }) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/roles`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // 🔥 important
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to create role");
  }

  return result;
};

// ✅ get permissions
export const getPermissions = () => {
  return axios.get(`${API}/permissions`);
};

// ✅ get roles
// export const getRoles = () => {
//   const token = localStorage.getItem("token");

//   return axios.get(`${API}/roles`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
  
// };



export const getRoles = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(`${API}/roles`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data; // ✅ ONLY DATA RETURN
};


// export const assignPermissions = async (data: {
//   roleId: number;
//   permissionIds: number[];
// }) => {
//   const res = await apiConnector("POST", "/roles/assign-permissions", data);
//   return res.data;
// };


export const assignPermissions = async (data: {
  roleId: number;
  permissionIds: number[];
}) => {
  return await apiConnector("POST", "/roles/assign-permissions", data);
};  
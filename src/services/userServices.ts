// import { apiConnector } from "./apiConncetor";
// import { endpointAuth } from "./apis";
// const token = localStorage.getItem("token");
// export const getUsers = async () => {
//   try {
//     const token = localStorage.getItem("token");

//     const response = await apiConnector(
//       "GET",
//       '/users',
//       null,
//       {
//         Authorization: `Bearer ${token}`, // 🔥 ADD THIS
//       }
//     );

//     console.log("response",response);
//     return response ;

//   } catch (error: any) {
//     console.error("GET Users Error:", error);
//     throw error?.response?.data || error.message;
//   }
// };

// export const getUserById = async (id: number) => {
//   try {
//     const response = await apiConnector(
//       "GET",
//       `${endpointAuth.USER_LIST_API}/${id}`
//     );

//     return response.data;

//   } catch (error: any) {
//     console.error("GET User Error:", error);
//     throw error?.response?.data || error.message;
//   }
// };
// export const toggleUserStatus = async (
//   id: number
// ) => {
//   try {
//     const token =
//       localStorage.getItem("token");

//     const response =
//       await apiConnector(
//         "PATCH",
//         `/users/${id}/toggle-status`,
//         null,
//         {
//           Authorization: `Bearer ${token}`,
//         }
//       );

//     return response.data;

//   } catch (error: any) {
//     throw (
//       error?.response?.data?.message ||
//       error.message
//     );
//   }
// };

// export const createUser = async (data: {
//   name: string;
//   email: string;
//   password: string;
//   roleId: string;   // ✅ add this
// }) => {
//   try {
//     const response = await apiConnector(
//       "POST",
//       `/users`,
//       data,
//       {
//         "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`, // 🔥 ADD THIS
//       }
//     );

//     return response.data;

//   } catch (error: any) {
//     console.error("POST User Error:", error?.response?.data); // 👈 improve log
//     throw error?.response?.data?.message || error.message;
//   }
// };

// // export const createUser = async (data: {

// //   name: string;
// //   email: string;
// //   password: string;
// // }) => {
// //   try { 
// //     const response = await apiConnector(
// //       "POST",
// //       `/users`,
// //       data,
// //       {
// //         "Content-Type": "application/json",
// //       }
// //     );

// //     return response.data;

// //   } catch (error: any) {
// //     console.error("POST User Error:", error);
// //     throw error?.response?.data || error.message;
// //   }

  
// // };




import { apiConnector } from "./apiConncetor";

// ✅ GET USERS
export const getUsers = async () => {
  return await apiConnector("GET", "/users");
};

// ✅ GET USER BY ID
export const getUserById = async (id: number) => {
  return await apiConnector("GET", `/users/${id}`);
};

// ✅ TOGGLE USER STATUS
export const toggleUserStatus = async (id: number) => {
  return await apiConnector(
    "PATCH",
    `/users/${id}/toggle-status`
  );
};

// ✅ CREATE USER
export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
  roleId: string;
}) => {
  return await apiConnector("POST", "/users", data);
};
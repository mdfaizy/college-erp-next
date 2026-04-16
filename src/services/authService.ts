import { apiConnector } from "./apiConncetor";

export const loginUser = async (
  formData: {
    email: string;
    password: string;
  }
) => {
  return await apiConnector(
    "POST",
    "/auth/login",
    formData
  );
};

export const logoutUser = async () => {
  return await apiConnector(
    "POST",
    "/auth/logout"
  );
};

export const getAuthMe = async () => {
  return await apiConnector(
    "GET",
    "/auth/me"
  );
};
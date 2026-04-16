import { apiConnector } from "./apiConncetor";

export const getPermissions = async () => {
  const res = await apiConnector("GET", "/permissions");
  return res.data;
};
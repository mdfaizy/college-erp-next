import { apiConnector } from "./apiConncetor";

export const createSession = async (data: any) => {
  return await apiConnector("POST","/session/create", data);
};

export const getSessions = async () => {
  return await apiConnector("GET","/session");
};
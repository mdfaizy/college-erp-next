import { apiConnector } from "./apiConncetor";

export const createSemester = async (data: any) => {
  return await apiConnector("POST","/semester/create", data);
};

export const getSemesters = async () => {
  return await apiConnector("GET","/semester");
};
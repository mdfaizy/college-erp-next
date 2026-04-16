import { apiConnector } from "./apiConncetor";

export const createDepartment = async (data: any) => {
  return await apiConnector("POST","/department/create", data);
};

export const getDepartments = async () => {
  return await apiConnector("GET","/department");
};


// DELETE
export const deleteDepartment = async (id: number) => {
  return await apiConnector("DELETE", `department/${id}`);
};
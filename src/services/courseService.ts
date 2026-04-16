import { apiConnector } from "./apiConncetor";

export const createCourse = async (data: any) => {
  return await apiConnector("POST","/course/create", data);
};


export const getCourses = async () => {
  return await apiConnector("GET","/course");
};
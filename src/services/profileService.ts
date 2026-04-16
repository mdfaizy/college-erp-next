import { apiConnector } from "./apiConncetor";

export const getMyProfile = async () => {
  const response = await apiConnector(
    "GET",
    "/student/me"
  );

  return response.data;
};


export const completeStudentProfile = async (
  data: any
) => {
  return await apiConnector(
    "PUT",
    "/students/complete-profile",
    data
  );
};

export const updateMyProfile = async (
  data: any
) => {
  const response = await apiConnector(
    "PUT",
    "/students/me",
    data
  );

  return response.data;
};
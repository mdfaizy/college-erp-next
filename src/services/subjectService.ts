import { apiConnector } from "./apiConncetor";

export const getSubjectsBySemester = async (
  semesterId: number
) => {
  try {
    const res = await apiConnector(
      "GET",
      `/subjects?semesterId=${semesterId}`
    );

    return res.data || [];
  } catch (error) {
    console.error(
      "Get Subjects Error:",
      error
    );
    return [];
  }
};
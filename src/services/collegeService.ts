import { apiConnector } from "./apiConncetor";


export const createCollege = async (data: any) => {
  try {
    const response = await apiConnector(
      "POST",
      "/college",   // ✅ correct API
      data
    );

    return response;

  } catch (error: any) {
    throw error?.response?.data?.message || error.message;
  }
};

export const toggleCollegeStatus = async (
  id: number
) => {
  try {
    const token =
      localStorage.getItem("token");

    const response =
      await apiConnector(
        "PATCH",
        `/college/${id}/toggle-status`,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

    return response.data;

  } catch (error: any) {
    throw (
      error?.response?.data?.message ||
      error.message
    );
  }
};

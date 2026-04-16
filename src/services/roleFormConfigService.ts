import { apiConnector } from "./apiConncetor";

// import { apiConnector } from "./apiConnector";

export const getRoleFormFields =
  async (roleId: number) => {
    const res = await apiConnector(
      "GET",
      `/role-form-config/${roleId}`
    );

    console.log(res);
    return res?.data?.data || [];
  };
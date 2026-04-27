import { apiConnector } from "./apiConncetor";

// CREATE
export const createStudent = async (data: any) => {
  return await apiConnector("POST", "/students", data);
};

// GET ALL
export const getStudents = async () => {
  return await apiConnector("GET", "/students"); // ✅ endpoint add
};

export const getStudentsBySemester = (
  semester: number
) =>
  apiConnector(
    "GET",
    `/students/by-semester/${semester}`
  );
// export const completeStudentProfile = async (
//   data: any
// ) => {
//   const response = await apiConnector(
//     "PUT",
//     "/students/complete-profile",
//     data
//   );

//   return response.data;
// };

export const updateMyProfile = async (
  data: any
) => {
  return await apiConnector(
    "PUT",
    "/students/me",
    data
  );
};
// DELETE
export const deleteStudent = async (id: number) => {
  return await apiConnector("DELETE", `/students/${id}`);
};


// import { apiConnector } from "./apiConnector";

export const getMyStudentProfile =
  async () => {
    const res = await apiConnector(
      "GET",
      "/students/me"
    );

    return res.data;
  };
export const getStudentById = async (
  id: number
) => {
  return await apiConnector(
    "GET",
    `/students/${id}`
  );
};

export const updateStudent = async (
  id: number,
  data: any
) => {
  return await apiConnector(
    "PUT",
    `/students/${id}`,
    data
  );
};
import { apiConnector } from "./apiConncetor";

export interface SubjectPayload {
  name: string;
  code: string;
  semesterId: number;
}

// // Get All Subjects
// export const getSubjects = async () => {
//   try {
//     const res = await apiConnector(
//       "GET",
//       "/subjects"
//     );

//     return res.data?.data || [];
//   } catch (error) {
//     console.error(
//       "Get Subjects Error:",
//       error
//     );
//     return [];
//   }
// };

// // Get Subjects By Semester
// export const getSubjectsBySemester =
//   async (semesterId: number) => {
//     try {
//       const res = await apiConnector(
//         "GET",
//         `/subjects?semesterId=${semesterId}`
//       );

//       return res.data?.data || [];
//     } catch (error) {
//       console.error(
//         "Get Subjects Error:",
//         error
//       );
//       return [];
//     }
//   };


export const getSubjects = async () => {
  try {
    const res = await apiConnector(
      "GET",
      "/subjects"
    );

    return res.data; // IMPORTANT
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getSubjectsBySemester =
  async (semesterId: number) => {
    try {
      const res = await apiConnector(
        "GET",
        `/subjects?semesterId=${semesterId}`
      );

      return res.data; // IMPORTANT
    } catch (error) {
      console.error(error);
      return [];
    }
  };

// Get Subject By ID
export const getSubjectById = async (
  id: number
) => {
  try {
    const res = await apiConnector(
      "GET",
      `/subjects/${id}`
    );
  console.log("API RESPONSE:", res.data);
    return res.data;
  } catch (error) {
    console.error(
      "Get Subject By ID Error:",
      error
    );
    return null;
  }
};

// Create Subject
export const createSubject = async (
  data: SubjectPayload
) => {
  try {
    const res = await apiConnector(
      "POST",
      "/subjects",
      data
    );

    return res.data?.data;
  } catch (error) {
    console.error(
      "Create Subject Error:",
      error
    );
    throw error;
  }
};

// Update Subject
export const updateSubject = async (
  id: number,
  data: Partial<SubjectPayload>
) => {
  try {
    const res = await apiConnector(
      "PATCH",
      `/subjects/${id}`,
      data
    );

    return res.data?.data;
  } catch (error) {
    console.error(
      "Update Subject Error:",
      error
    );
    throw error;
  }
};

// Delete Subject
export const deleteSubject = async (
  id: number
) => {
  try {
    const res = await apiConnector(
      "DELETE",
      `/subjects/${id}`
    );

    return res.data;
  } catch (error) {
    console.error(
      "Delete Subject Error:",
      error
    );
    throw error;
  }
};
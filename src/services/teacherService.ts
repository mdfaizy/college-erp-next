// const BASE_URL = "http://localhost:5000/api";

// // ✅ Create Teacher
// export const createTeacher = async (data: any) => {
//   try {
//     const token = localStorage.getItem("token");

//     const res = await fetch(`${BASE_URL}/teachers`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(data),
//     });

//     const result = await res.json();

//     if (!res.ok) {
//       throw new Error(result.message || "Failed to create teacher");
//     }

//     return result;

//   } catch (error: any) {
//     throw error.message;
//   }
// };

// // ✅ Get All Teachers
// export const getTeachers = async () => {
//   try {
//     const token = localStorage.getItem("token");

//     const res = await fetch("http://localhost:5000/api/teachers", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       throw new Error(data.message || "Failed to fetch teachers");
//     }

//     return data;

//   } catch (error: any) {
//     throw error.message;
//   }
// };



// import { CreateTeacherPayload, Teacher } from "@/types/teacher";

// const BASE_URL = "http://localhost:5000/api";

// // ✅ Create Teacher
// export const createTeacher = async (
//   data: CreateTeacherPayload
// ): Promise<Teacher> => {
//   try {
//     const token = localStorage.getItem("token");

//     const res = await fetch(`${BASE_URL}/teachers`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(data),
//     });

//     const result: Teacher = await res.json();

//     if (!res.ok) {
//       throw new Error((result as any)?.message || "Failed to create teacher");
//     }

//     return result;
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       throw error.message;
//     }
//     throw "Something went wrong";
//   }
// };

// // ✅ Get Teachers
// export const getTeachers = async (): Promise<Teacher[]> => {
//   try {
//     const token = localStorage.getItem("token");

//     const res = await fetch(`${BASE_URL}/teachers`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const data: Teacher[] = await res.json();

//     if (!res.ok) {
//       throw new Error("Failed to fetch teachers");
//     }

//     return data;
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       throw error.message;
//     }
//     throw "Something went wrong";
//   }
// };



import { apiConnector } from "./apiConncetor";
import {
  CreateTeacherPayload,
  Teacher,
} from "@/types/teacher";

/* ---------------- CREATE ---------------- */
export const createTeacher = async (
  data: CreateTeacherPayload
): Promise<Teacher> => {
  try {
    const res = await apiConnector(
      "POST",
      "/teachers",
      data
    );

    return res.data;

  } catch (error: any) {
    throw (
      error?.message ||
      "Failed to create teacher"
    );
  }
};

/* ---------------- GET ALL ---------------- */
export const getTeachers = async (): Promise<
  Teacher[]
> => {
  try {
    const res = await apiConnector(
      "GET",
      "/teachers"
    );

    return res;

  } catch (error: any) {
    throw (
      error?.message ||
      "Failed to fetch teachers"
    );
  }
};

/* ---------------- GET BY ID ---------------- */
export const getTeacherById = async (
  id: number
): Promise<Teacher> => {
  try {
    const res = await apiConnector(
      "GET",
      `/teachers/${id}`
    );

    return res.data;

  } catch (error: any) {
    throw (
      error?.message ||
      "Failed to fetch teacher"
    );
  }
};

/* ---------------- UPDATE ---------------- */
export const updateTeacher = async (
  id: number,
  data: Partial<CreateTeacherPayload>
): Promise<Teacher> => {
  try {
    const res = await apiConnector(
      "PUT",
      `/teachers/${id}`,
      data
    );

    return res.data;

  } catch (error: any) {
    throw (
      error?.message ||
      "Failed to update teacher"
    );
  }
};

/* ---------------- DELETE ---------------- */
export const deleteTeacher = async (
  id: number
): Promise<any> => {
  try {
    return await apiConnector(
      "DELETE",
      `/teachers/${id}`
    );

  } catch (error: any) {
    throw (
      error?.message ||
      "Failed to delete teacher"
    );
  }
};
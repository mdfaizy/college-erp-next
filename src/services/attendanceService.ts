// const BASE_URL = "http://localhost:5000/api";

// const getAuthHeaders = () => ({
//   "Content-Type": "application/json",
//   Authorization: `Bearer ${localStorage.getItem("token")}`,
// });

// export const markAttendance = async (payload: any) => {
//   const res = await fetch(`${BASE_URL}/attendance/mark`, {
//     method: "POST",
//     headers: getAuthHeaders(),
//     body: JSON.stringify(payload),
//   });

//   return await res.json();
// };

// export const getStudentsForAttendance = async (
//   semesterId: number
// ) => {
//   const res = await fetch(
//     `${BASE_URL}/students?semesterId=${semesterId}`,
//     {
//       headers: getAuthHeaders(),
//     }
//   );

//   return await res.json();
// };
// export const getStudentAttendance = async (studentId: number) => {
//   const res = await fetch(
//     `${BASE_URL}/attendance/student/${studentId}`,
//     {
//       headers: getAuthHeaders(),
//     }
//   );

//   return await res.json();
// };

// export const getMonthlyAttendance = async (
//   studentId: number,
//   month: number,
//   year: number
// ) => {
//   const res = await fetch(
//     `${BASE_URL}/attendance/monthly?studentId=${studentId}&month=${month}&year=${year}`,
//     {
//       headers: getAuthHeaders(),
//     }
//   );

//   return await res.json();
// };

// export const getSubjectWiseAttendance = async (
//   studentId: number
// ) => {
//   const res = await fetch(
//     `${BASE_URL}/attendance/subject-wise/${studentId}`,
//     {
//       headers: getAuthHeaders(),
//     }
//   );

//   return await res.json();
// };


import { apiConnector } from "./apiConncetor";

/**
 * Mark Attendance
 */
export const markAttendance = async (payload: any) => {
  try {
    return await apiConnector(
      "POST",
      "/attendance/mark",
      payload
    );
  } catch (error) {
    console.error("Mark Attendance Error:", error);
    throw error;
  }
};

/**
 * Get Students For Attendance
 */
export const getStudentsForAttendance = async (
  semesterId: number
) => {
  try {
    const res = await apiConnector(
      "GET",
      `/students?semesterId=${semesterId}`
    );

    return res.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
export const updateAttendance = async (
  sessionId: number,
  payload: any
) => {
  try {
    return await apiConnector(
      "PATCH",
      `/attendance/${sessionId}`,
      payload
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAttendanceSessionDetails = async (
  sessionId: number
) => {
  try {
    return await apiConnector(
      "GET",
      `/attendance/session/${sessionId}`
    );
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getAttendanceHistory = async () => {
  try {
    return await apiConnector(
      "GET",
      "/attendance/history"
    );
  } catch (error) {
    console.error(error);
    return [];
  }
};

// export const getStudentsForAttendance = async (



//   semesterId: number
// ) => {
//   try {
//     return await apiConnector(
//       "GET",
//       `/students?semesterId=${semesterId}`
//     );
//   } catch (error) {
//     console.error(
//       "Get Students For Attendance Error:",
//       error
//     );
//     return [];
//   }
// };

/**
 * Get Student Attendance Report
 */
export const getStudentAttendance = async (
  studentId: number
) => {
  try {
    return await apiConnector(
      "GET",
      `/attendance/student/${studentId}`
    );
  } catch (error) {
    console.error(
      "Get Student Attendance Error:",
      error
    );
    return null;
  }
};

/**
 * Get Monthly Attendance
 */
export const getMonthlyAttendance = async (
  studentId: number,
  month: number,
  year: number
) => {
  try {
    return await apiConnector(
      "GET",
      `/attendance/monthly?studentId=${studentId}&month=${month}&year=${year}`
    );
  } catch (error) {
    console.error(
      "Get Monthly Attendance Error:",
      error
    );
    return null;
  }
};

/**
 * Get Subject Wise Attendance
 */
export const getSubjectWiseAttendance = async (
  studentId: number
) => {
  try {
    return await apiConnector(
      "GET",
      `/attendance/subject-wise/${studentId}`
    );
  } catch (error) {
    console.error(
      "Get Subject Wise Attendance Error:",
      error
    );
    return [];
  }
};
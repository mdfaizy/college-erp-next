// import { apiConnector } from "./apiConncetor";

// export const createExam = (
//   data: any
// ) =>
//   apiConnector(
//     "POST",
//     "/result/create-exam",
//     data
//   );

//   export const getResultList = (
//   semester: number,
//   examId?: number
// ) =>
//   apiConnector(
//     "GET",
//     `/result/list?semester=${semester}${
//       examId
//         ? `&examId=${examId}`
//         : ""
//     }`
//   );
// export const submitResult = (
//   data: any
// ) =>
//   apiConnector(
//     "POST",
//     "/result/submit-result",
//     data
//   );

// export const getSemesterResults = (
//   studentId: number,
//   semester: number
// ) =>
//   apiConnector(
//     "GET",
//     `/result/semester/${studentId}/${semester}`
//   );


import { apiConnector } from "./apiConncetor";

export const createExam = (
  data: any
) =>
  apiConnector(
    "POST",
    "/result/create-exam",
    data
  );

export const submitResult = (
  data: any
) =>
  apiConnector(
    "POST",
    "/result/submit-result",
    data
  );

export const getSemesterResults = (
  studentId: number,
  semester: number
) =>
  apiConnector(
    "GET",
    `/result/semester/${studentId}/${semester}`
  );

export const getExamsBySemester = (
  semesterId: number
) =>
  apiConnector(
    "GET",
    `/result/exams/${semesterId}`
  );
export const getMyResult = async (semester: number) => {
  return await apiConnector(
    "GET",
    `/result/my-result/${semester}`
  );
};
export const getResultList = (
  semester: number,
  examId?: number
) =>
  apiConnector(
    "GET",
    `/result/list?semester=${semester}${
      examId
        ? `&examId=${examId}`
        : ""
    }`
  );
import { apiConnector } from "./apiConncetor";

export const createFeeStructure = (
  data: any
) =>
  apiConnector(
    "POST",
    "/fees/structure",
    data
  );

export const assignFees = (
  data: any
) =>
  apiConnector(
    "POST",
    "/fees/assign",
    data
  );

export const getStudentFees = () =>
  apiConnector(
    "GET",
    "/fees/student-fees"
  );


  export const getStudentFeeById = (id: number) =>
  apiConnector("GET", `/fees/student-fees/${id}`);

  
export const payFee = (
  id: number,
  data: any
) =>
  apiConnector(
    "PATCH",
    `/fees/pay/${id}`,
    data
  );

  export const getEligibleStudents = (
  semester: number
) =>
  apiConnector(
    "GET",
    `/fees/eligible-students?semester=${semester}`
  );


  export const getMyFees = () =>
  apiConnector(
    "GET",
    "/fees/my-fees"
  );

  
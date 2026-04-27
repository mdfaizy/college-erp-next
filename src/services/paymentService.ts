import { apiConnector } from "./apiConncetor";

export const createPaymentOrder =
  async (
    studentFeeId: number
  ) => {
    return await apiConnector(
      "POST",
      "/payments/create-order",
      {
        studentFeeId,
      }
    );
  };

  export const getReceipt = async (orderId: string) => {
  return await apiConnector(
    "GET",
    `/payments/receipt/${orderId}`
  );
};


export const verifyStudentPayment =
  async (payload: any) => {
    return await apiConnector(
      "POST",
      "/payments/verify",
      payload
    );
  };
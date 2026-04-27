import { useState } from "react";
import {
  createPaymentOrder,
  verifyStudentPayment,
} from "@/services/paymentService";
import toast from "react-hot-toast";

export const usePayment = (onSuccess?: () => void) => {
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const payNow = async (fee: any) => {
    try {
      setLoadingId(fee.id);

      const res = await createPaymentOrder(fee.id);
      const order = res.data || res;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: "College ERP",
        description: `${fee.feeStructure?.feeType} Fee`,
        order_id: order.id,

        handler: async (response: any) => {
          try {
            await verifyStudentPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            toast.success("Payment Successful");
            onSuccess?.(); // refresh
          } catch {
            toast.error("Verification Failed");
          }
        },

        prefill: {
          name: fee.student?.user?.name,
        },

        theme: { color: "#2563eb" },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (err) {
      toast.error("Payment Failed");
    } finally {
      setLoadingId(null);
    }
  };

  return { payNow, loadingId };
};
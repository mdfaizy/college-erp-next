"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getStudentFeeById } from "@/services/feeService";
import { createPaymentOrder, verifyStudentPayment } from "@/services/paymentService";
import toast from "react-hot-toast";
import { downloadReceipt } from "@/utils/receipt";

export default function FeeDetailsPage() {
  const params = useParams();
  const id = Number(params.id);

  const [fee, setFee] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchFee = async () => {
    try {
      const res = await getStudentFeeById(id);
      console.log(res)
      setFee(res.data);
    } catch {
      toast.error("Failed to fetch fee");
    }
  };

  useEffect(() => {
    if (id) fetchFee();
  }, [id]);

  const handlePayment = async () => {
    try {
      setLoading(true);

      const res = await createPaymentOrder(fee.id);
      const order = res.data || res;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: fee.student?.college?.name || "College ERP",
        description: `${fee.feeStructure?.feeType}`,
        order_id: order.id,

        handler: async (response: any) => {
          await verifyStudentPayment(response);
          toast.success("Payment Successful");
          fetchFee();
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();

    } catch {
      toast.error("Payment Failed");
    } finally {
      setLoading(false);
    }
  };

  if (!fee) return <p>Loading...</p>;
  const pending = Number(fee.amount) - Number(fee.paidAmount);
  const latestPayment = fee.payments?.[fee.payments.length - 1];
console.log("PAYMENTS:", fee.payments);
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-semibold">
          {fee.student?.user?.name}
        </h2>
        <p className="text-sm opacity-90">
          {fee.student?.college?.name}
        </p>
        <p className="text-xs opacity-70">
          {fee.student?.user?.email}
        </p>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-3 gap-4">
        <Card title="Total" value={`₹${fee.amount}`} />
        <Card title="Paid" value={`₹${fee.paidAmount}`} color="green" />
        <Card title="Pending" value={`₹${pending}`} color="red" />
      </div>

      {/* DETAILS */}
      <div className="bg-white rounded-xl shadow border p-5">
        <h3 className="font-semibold mb-4">Fee Details</h3>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <p><b>Semester:</b> {fee.feeStructure?.semester}</p>
          <p><b>Fee Type:</b> {fee.feeStructure?.feeType}</p>
          <p><b>Status:</b> {fee.status}</p>
          <p><b>Date:</b> {new Date(fee.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      {/* PAYMENT HISTORY */}
      <div className="bg-white rounded-xl shadow border p-5">
        <h3 className="font-semibold mb-4">Payment History</h3>

        {fee.payments?.map((p: any) => (
          <div key={p.id} className="flex justify-between border-b py-3">
            <div>
              <p>₹{p.amount}</p>
              <p className="text-xs text-gray-500">
                {new Date(p.createdAt).toLocaleString()}
              </p>
            </div>

            <span className={`text-xs px-2 py-1 rounded ${
              p.status === "SUCCESS"
                ? "bg-green-100 text-green-600"
                : "bg-gray-100"
            }`}>
              {p.status || "INITIATED"}
            </span>
          </div>
        ))}
      </div>

      {/* ACTION */}
      {/* {fee.status !== "PAID" ? (
        <button
          onClick={handlePayment}
          className="w-full bg-blue-600 text-white py-3 rounded-xl"
        >
          {loading ? "Processing..." : `Pay ₹${pending}`}
        </button>
      ) : (
        <div className="flex gap-3">
          <button
            onClick={() =>
              downloadReceipt(latestPayment.razorpayOrderId)
            }
            className="flex-1 bg-green-600 text-white py-3 rounded-xl"
          >
            Download Receipt
          </button>

          <button
            onClick={() =>
              window.open(
                `/api/receipt/${latestPayment.razorpayOrderId}`
              )
            }
            className="flex-1 bg-gray-800 text-white py-3 rounded-xl"
          >
            View Receipt
          </button>
        </div>
      )} */}

      {fee.status === "PAID" && latestPayment ? (
  <div className="flex gap-3">
    <button
      onClick={() =>
        downloadReceipt(latestPayment.razorpayOrderId)
      }
      className="flex-1 bg-green-600 text-white py-3 rounded-xl"
    >
      Download Receipt
    </button>

   <button
  onClick={() =>
    window.open(
      `http://localhost:5000/api/payments/receipt/${latestPayment.razorpayOrderId}`
    )
  }
  className="flex-1 bg-gray-800 text-white py-3 rounded-xl"
>
  View Receipt
</button>
  </div>
) : fee.status === "PAID" ? (
  <p className="text-center text-gray-500">
    No payment record found
  </p>
) : (
  <button
    onClick={handlePayment}
    className="w-full bg-blue-600 text-white py-3 rounded-xl"
  >
    {loading ? "Processing..." : `Pay ₹${pending}`}
  </button>
)}
    </div>
  );
}

function Card({ title, value, color = "blue" }: any) {
  const colors: any = {
    blue: "text-blue-600",
    green: "text-green-600",
    red: "text-red-600",
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow border">
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className={`font-bold ${colors[color]}`}>{value}</h3>
    </div>
  );
}   
// "use client";

// import { useEffect, useState } from "react";
// import { getMyFees } from "@/services/feeService";

// export default function MyFeesPage() {
//   const [fees, setFees] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchFees();
//   }, []);

//   const fetchFees = async () => {
//     try {
//       const res = await getMyFees();
//       console.log("rear daat" ,res)
//       setFees(res.data || []);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Summary calculation
//   const total = fees.reduce((acc, f) => acc + Number(f.amount), 0);
//   const paid = fees.reduce((acc, f) => acc + Number(f.paidAmount), 0);
//   const pending = total - paid;

//   return (
//     <div className="p-6 space-y-6">

//       {/* 🔥 SUMMARY CARDS */}
//       <div className="grid grid-cols-3 gap-4">
//         <div className="bg-white p-4 rounded-xl shadow border">
//           <p className="text-gray-500 text-sm">Total Fees</p>
//           <h2 className="text-xl font-bold">₹{total}</h2>
//         </div>

//         <div className="bg-white p-4 rounded-xl shadow border">
//           <p className="text-gray-500 text-sm">Paid</p>
//           <h2 className="text-xl font-bold text-green-600">₹{paid}</h2>
//         </div>

//         <div className="bg-white p-4 rounded-xl shadow border">
//           <p className="text-gray-500 text-sm">Pending</p>
//           <h2 className="text-xl font-bold text-red-600">₹{pending}</h2>
//         </div>
//       </div>

//       {/* 🔥 TABLE CARD */}
//       <div className="bg-white rounded-2xl shadow border p-6">
//         <h1 className="text-2xl font-bold mb-6">
//           My Fees
//         </h1>

//         {loading ? (
//           <p className="text-gray-500">Loading fees...</p>
//         ) : fees.length === 0 ? (
//           <p className="text-gray-500">No fees found</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm border-collapse">
//               <thead>
//                 <tr className="bg-gray-100 text-gray-600">
//                   <th className="p-3 text-left">Semester</th>
//                   <th className="p-3 text-left">Fee Type</th>
//                   <th className="p-3 text-left">Amount</th>
//                   <th className="p-3 text-left">Paid</th>
//                   <th className="p-3 text-left">Pending</th>
//                   <th className="p-3 text-left">Status</th>
//                   <th className="p-3 text-left">Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {fees.map((fee) => {
//                   const pendingAmount =
//                     Number(fee.amount) -
//                     Number(fee.paidAmount);

//                   return (
//                     <tr
//                       key={fee.id}
//                       className="border-b hover:bg-gray-50"
//                     >
//                       <td className="p-3">
//                         {fee.feeStructure?.semester}
//                       </td>

//                       <td className="p-3">
//                         {fee.feeStructure?.feeType}
//                       </td>

//                       <td className="p-3 font-medium">
//                         ₹{fee.amount}
//                       </td>

//                       <td className="p-3 text-green-600">
//                         ₹{fee.paidAmount}
//                       </td>

//                       <td className="p-3 text-red-600">
//                         ₹{pendingAmount}
//                       </td>

//                       <td className="p-3">
//                         <span
//                           className={`px-3 py-1 rounded-full text-xs font-medium ${
//                             fee.status === "PAID"
//                               ? "bg-green-100 text-green-700"
//                               : fee.status === "PARTIAL"
//                               ? "bg-yellow-100 text-yellow-700"
//                               : "bg-red-100 text-red-700"
//                           }`}
//                         >
//                           {fee.status}
//                         </span>
//                       </td>

//                       {/* 🔥 ACTION */}
//                       <td className="p-3">
//                         {fee.status !== "PAID" ? (
//                           <a
//                             href={`/fees/${fee.id}`}
//                             className="text-blue-600 hover:underline"
//                           >
//                             Pay Now
//                           </a>
//                         ) : (
//                           <a
//                             href={`/fees/${fee.id}`}
//                             className="text-gray-600 hover:underline"
//                           >
//                             View
//                           </a>
//                         )}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { getMyFees } from "@/services/feeService";
import { Wallet, CheckCircle, AlertCircle } from "lucide-react";

export default function MyFeesPage() {
  const [fees, setFees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    try {
      const res = await getMyFees();
      setFees(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const total = fees.reduce((acc, f) => acc + Number(f.amount), 0);
  const paid = fees.reduce((acc, f) => acc + Number(f.paidAmount), 0);
  const pending = total - paid;

  const percentage = total ? Math.round((paid / total) * 100) : 0;

  return (
    <div className="p-6 space-y-6">

      {/* 🔥 HEADER */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl p-6 shadow">
        <h1 className="text-xl font-semibold">My Fees Dashboard</h1>
        <p className="text-sm opacity-80">Track your fee payments easily</p>
      </div>

      {/* 🔥 SUMMARY CARDS */}
      <div className="grid md:grid-cols-3 gap-5">

        <SummaryCard
          title="Total Fees"
          value={`₹${total}`}
          icon={<Wallet size={20} />}
          color="blue"
        />

        <SummaryCard
          title="Paid"
          value={`₹${paid}`}
          icon={<CheckCircle size={20} />}
          color="green"
        />

        <SummaryCard
          title="Pending"
          value={`₹${pending}`}
          icon={<AlertCircle size={20} />}
          color="red"
        />

      </div>

      {/* 🔥 PROGRESS BAR */}
      <div className="bg-white p-5 rounded-xl shadow">
        <p className="text-sm text-gray-500 mb-2">
          Payment Progress
        </p>

        <div className="w-full h-3 bg-gray-200 rounded-full">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-green-400 to-green-600"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <p className="text-xs text-gray-500 mt-2">
          {percentage}% completed
        </p>
      </div>

      {/* 🔥 TABLE */}
      <div className="bg-white rounded-xl shadow p-5">

        <h2 className="text-lg font-semibold mb-4">
          Fee Details
        </h2>

        {loading ? (
          <p className="text-gray-400">Loading fees...</p>
        ) : fees.length === 0 ? (
          <p className="text-gray-400">No fees found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              <thead>
                <tr className="bg-gray-100 text-gray-600 text-xs uppercase">
                  <th className="p-3 text-left">Semester</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Paid</th>
                  <th className="p-3 text-left">Pending</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {fees.map((fee) => {
                  const pendingAmount =
                    Number(fee.amount) - Number(fee.paidAmount);

                  return (
                    <tr
                      key={fee.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="p-3">
                        {fee.feeStructure?.semester}
                      </td>

                      <td className="p-3 font-medium">
                        {fee.feeStructure?.feeType}
                      </td>

                      <td className="p-3 font-semibold">
                        ₹{fee.amount}
                      </td>

                      <td className="p-3 text-green-600">
                        ₹{fee.paidAmount}
                      </td>

                      <td className="p-3 text-red-600">
                        ₹{pendingAmount}
                      </td>

                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            fee.status === "PAID"
                              ? "bg-green-100 text-green-700"
                              : fee.status === "PARTIAL"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {fee.status}
                        </span>
                      </td>

                      {/* 🔥 BUTTON */}
                      <td className="p-3">
                        <a
                          href={`/fees/${fee.id}`}
                          className={`px-4 py-1.5 rounded-lg text-xs font-medium ${
                            fee.status !== "PAID"
                              ? "bg-blue-600 text-white hover:bg-blue-700"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {fee.status !== "PAID" ? "Pay Now" : "View"}
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// 🔥 Reusable Card
const SummaryCard = ({ title, value, icon, color }: any) => {
  const colors: any = {
    blue: "from-blue-500 to-indigo-600",
    green: "from-green-500 to-emerald-600",
    red: "from-red-500 to-pink-600",
  };

  return (
    <div
      className={`bg-gradient-to-r ${colors[color]} text-white rounded-xl p-5 shadow flex justify-between items-center`}
    >
      <div>
        <p className="text-sm opacity-80">{title}</p>
        <h2 className="text-xl font-bold">{value}</h2>
      </div>
      <div className="opacity-80">{icon}</div>
    </div>
  );
};
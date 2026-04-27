// "use client";

// import { useState } from "react";
// import {
//   createFeeStructure,
// } from "@/services/feeService";

// export default function CreateFeePage() {
//   const [form, setForm] = useState({
//     feeType: "",
//     semester: "",
//     amount: "",
//   });

//   const [loading, setLoading] =
//     useState(false);

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);

//       await createFeeStructure({
//         feeType: form.feeType,
//         semester: Number(form.semester),
//         amount: Number(form.amount),
//       });

//       alert(
//         "Fee Structure Created"
//       );

//       setForm({
//         feeType: "",
//         semester: "",
//         amount: "",
//       });
//     } catch (err: any) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-xl mx-auto">
//       <div className="bg-white p-6 rounded-xl shadow">
//         <h1 className="text-xl font-bold mb-4">
//           Create Fee Structure
//         </h1>

//         <select
//           value={form.feeType}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               feeType:
//                 e.target.value,
//             })
//           }
//           className="w-full border p-2 mb-4"
//         >
//           <option value="">
//             Select Fee Type
//           </option>
//           <option value="COLLEGE">
//             COLLEGE
//           </option>
//           <option value="HOSTEL">
//             HOSTEL
//           </option>
//           <option value="MESS">
//             MESS
//           </option>
//         </select>

//         <input
//           type="number"
//           placeholder="Semester"
//           value={form.semester}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               semester:
//                 e.target.value,
//             })
//           }
//           className="w-full border p-2 mb-4"
//         />

//         <input
//           type="number"
//           placeholder="Amount"
//           value={form.amount}
//           onChange={(e) =>
//             setForm({
//               ...form,
//               amount:
//                 e.target.value,
//             })
//           }
//           className="w-full border p-2 mb-4"
//         />

//         <button
//           onClick={handleSubmit}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           {loading
//             ? "Saving..."
//             : "Create Fee"}
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { createFeeStructure } from "@/services/feeService";
import { getSemesters } from "@/services/semesterService"; // 👉 API

export default function CreateFeePage() {
  const [form, setForm] = useState({
    feeType: "",
    semester: "",
    amount: "",
  });

  const [semesters, setSemesters] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingSem, setFetchingSem] = useState(true);

  // 🔥 Fetch semesters from API
  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const res = await getSemesters(); // expected: [1,2,3...]
        console.log(res)
        setSemesters(res);
      } catch (err) {
        console.error(err);
      } finally {
        setFetchingSem(false);
      }
    };

    fetchSemesters();
  }, []);

  const handleSubmit = async () => {
    if (!form.feeType || !form.semester || !form.amount) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await createFeeStructure({
        feeType: form.feeType,
        semester: Number(form.semester),
        amount: Number(form.amount),
      });

      alert("✅ Fee Structure Created");

      setForm({
        feeType: "",
        semester: "",
        amount: "",
      });
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 space-y-5">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Create Fee Structure
          </h1>
          <p className="text-sm text-gray-500">
            Add semester-wise fee details
          </p>
        </div>

        {/* Fee Type */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            Fee Type
          </label>
          <select
            value={form.feeType}
            onChange={(e) =>
              setForm({ ...form, feeType: e.target.value })
            }
            className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Fee Type</option>
            <option value="COLLEGE">College</option>
            <option value="HOSTEL">Hostel</option>
            <option value="MESS">Mess</option>
          </select>
        </div>

        {/* Semester */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            Semester
          </label>
          <select
            value={form.semester}
            onChange={(e) =>
              setForm({ ...form, semester: e.target.value })
            }
            className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">
              {fetchingSem ? "Loading..." : "Select Semester"}
            </option>

            {semesters.map((sem) => (
  <option key={sem.id} value={sem.number}>
    {sem.name}
  </option>
))}
          </select>
        </div>

        {/* Amount */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            Amount (₹)
          </label>
          <input
            type="number"
            placeholder="Enter amount"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: e.target.value })
            }
            className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium disabled:bg-gray-400"
        >
          {loading ? "Saving..." : "Create Fee Structure"}
        </button>
      </div>
    </div>
  );
}
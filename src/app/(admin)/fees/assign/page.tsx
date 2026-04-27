    // "use client";

    // import { useState } from "react";
    // import {
    // assignFees,
    // } from "@/services/feeService";

    // export default function AssignFeePage() {
    // const [form, setForm] = useState({
    //     studentId: "",
    //     semester: "",
    // });

    // const [loading, setLoading] =
    //     useState(false);

    // const handleAssign = async () => {
    //     try {
    //     setLoading(true);

    //     await assignFees({
    //         studentId: Number(
    //         form.studentId
    //         ),
    //         semester: Number(
    //         form.semester
    //         ),
    //     });

    //     alert(
    //         "Fees Assigned Successfully"
    //     );

    //     setForm({
    //         studentId: "",
    //         semester: "",
    //     });
    //     } catch (err: any) {
    //     alert(err.message);
    //     } finally {
    //     setLoading(false);
    //     }
    // };

    // return (
    //     <div className="p-6 max-w-xl mx-auto">
    //     <div className="bg-white p-6 rounded-xl shadow">
    //         <h1 className="text-xl font-bold mb-4">
    //         Assign Fees
    //         </h1>

    //         <input
    //         type="number"
    //         placeholder="Student ID"
    //         value={form.studentId}
    //         onChange={(e) =>
    //             setForm({
    //             ...form,
    //             studentId:
    //                 e.target.value,
    //             })
    //         }
    //         className="w-full border p-2 mb-4"
    //         />

    //         <input
    //         type="number"
    //         placeholder="Semester"
    //         value={form.semester}
    //         onChange={(e) =>
    //             setForm({
    //             ...form,
    //             semester:
    //                 e.target.value,
    //             })
    //         }
    //         className="w-full border p-2 mb-4"
    //         />

    //         <button
    //         onClick={handleAssign}
    //         className="bg-green-600 text-white px-4 py-2 rounded"
    //         >
    //         {loading
    //             ? "Assigning..."
    //             : "Assign Fees"}
    //         </button>
    //     </div>
    //     </div>
    // );
    // }



//     "use client";

// import { useEffect, useState } from "react";

// import {
//   assignFees,
//   getEligibleStudents,
// } from "@/services/feeService";

// export default function AssignFeePage() {
//   const [students, setStudents] =
//     useState<any[]>([]);

//   const [form, setForm] = useState({
//     semester: "",
//     studentId: "",
//   });

//   const [loading, setLoading] =
//     useState(false);

//   useEffect(() => {
//     if (form.semester) {
//       fetchEligibleStudents();
//     } else {
//       setStudents([]);
//     }
//   }, [form.semester]);

//   const fetchEligibleStudents =
//     async () => {
//       try {
//         const res =
//           await getEligibleStudents(
//             Number(form.semester)
//           );

//         setStudents(res.data);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//   const handleAssign = async () => {
//     try {
//       if (
//         !form.studentId ||
//         !form.semester
//       ) {
//         alert(
//           "Please select semester and student"
//         );
//         return;
//       }

//       setLoading(true);

//       await assignFees({
//         studentId: Number(
//           form.studentId
//         ),
//         semester: Number(
//           form.semester
//         ),
//       });

//       alert(
//         "Fees Assigned Successfully"
//       );

//       setForm({
//         ...form,
//         studentId: "",
//       });

//       fetchEligibleStudents();
//     } catch (err: any) {
//       alert(
//         err.message ||
//           "Failed to assign fee"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-xl mx-auto">
//       <div className="rounded-2xl bg-white border shadow p-6">
//         <h1 className="text-2xl font-bold mb-6">
//           Assign Student Fees
//         </h1>

//         {/* Semester Select */}
//         <div className="mb-4">
//           <label className="block mb-2 font-medium">
//             Select Semester
//           </label>

//           <select
//             value={form.semester}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 semester:
//                   e.target.value,
//                 studentId: "",
//               })
//             }
//             className="w-full border rounded px-3 py-2"
//           >
//             <option value="">
//               Select Semester
//             </option>

//             {[1,2,3,4,5,6,7,8].map(
//               (sem) => (
//                 <option
//                   key={sem}
//                   value={sem}
//                 >
//                   Semester {sem}
//                 </option>
//               )
//             )}
//           </select>
//         </div>

//         {/* Student Select */}
//         <div className="mb-6">
//           <label className="block mb-2 font-medium">
//             Select Student
//           </label>

//           <select
//             value={form.studentId}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 studentId:
//                   e.target.value,
//               })
//             }
//             disabled={
//               !form.semester
//             }
//             className="w-full border rounded px-3 py-2"
//           >
//             <option value="">
//               {form.semester
//                 ? "Select Student"
//                 : "Select Semester First"}
//             </option>

//             {students.map(
//               (student) => (
//                 <option
//                   key={student.id}
//                   value={student.id}
//                 >
//                   {
//                     student.user
//                       ?.name
//                   }{" "}
//                   (ID: {student.id})
//                 </option>
//               )
//             )}
//           </select>
//         </div>

//         <button
//           onClick={handleAssign}
//           disabled={loading}
//           className="w-full bg-green-600 text-white rounded py-2"
//         >
//           {loading
//             ? "Assigning..."
//             : "Assign Fees"}
//         </button>
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import {
  assignFees,
  getEligibleStudents,
} from "@/services/feeService";

export default function AssignFeePage() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    semester: "",
    studentId: "",
  });

  const [selectedStudent, setSelectedStudent] =
    useState<any>(null);

  // ✅ Fetch students
  useEffect(() => {
    if (form.semester) {
      fetchStudents();
    } else {
      setStudents([]);
    }
  }, [form.semester]);

  const fetchStudents = async () => {
    try {
      const res = await getEligibleStudents(
        Number(form.semester)
      );
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Handle select
  useEffect(() => {
    const student = students.find(
      (s) => s.id == form.studentId
    );
    setSelectedStudent(student);
  }, [form.studentId, students]);

  // ✅ Fee Preview
  const getFeeType = () => {
    if (!selectedStudent) return "";

    return selectedStudent.isHosteller
      ? "College + Hostel + Mess"
      : "Only College";
  };

  // ✅ Assign Fee
  const handleAssign = async () => {
    try {
      if (!form.studentId || !form.semester) {
        alert("Please select all fields");
        return;
      }

      setLoading(true);

      await assignFees({
        studentId: Number(form.studentId),
        semester: Number(form.semester),
      });

      alert("✅ Fees Assigned Successfully");

      setForm({
        ...form,
        studentId: "",
      });

      fetchStudents();
    } catch (err: any) {
      alert(
        err?.response?.data?.message ||
          "Failed to assign fee"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border p-8">

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          💰 Assign Student Fees
        </h1>

        {/* Semester */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-semibold text-gray-600">
            Semester
          </label>

          <select
            value={form.semester}
            onChange={(e) =>
              setForm({
                ...form,
                semester: e.target.value,
                studentId: "",
              })
            }
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none"
          >
            <option value="">Select Semester</option>
            {[1,2,3,4,5,6,7,8].map((sem) => (
              <option key={sem} value={sem}>
                Semester {sem}
              </option>
            ))}
          </select>
        </div>

        {/* Student */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-semibold text-gray-600">
            Student
          </label>

          <select
            value={form.studentId}
            onChange={(e) =>
              setForm({
                ...form,
                studentId: e.target.value,
              })
            }
            disabled={!form.semester}
            className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-green-500 outline-none"
          >
            <option value="">
              {form.semester
                ? "Select Student"
                : "Select Semester First"}
            </option>

            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.user?.name} (ID: {s.id}){" "}
                {s.isHosteller
                  ? "🏠 Hosteller"
                  : "🎓 Day Scholar"}
              </option>
            ))}
          </select>
        </div>

        {/* Fee Preview Card */}
        {selectedStudent && (
          <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 shadow-sm">
            <p className="text-sm text-gray-600">
              <b>Student Type:</b>{" "}
              {selectedStudent.isHosteller
                ? "Hosteller"
                : "Day Scholar"}
            </p>

            <p className="text-sm text-gray-600 mt-1">
              <b>Fee Structure:</b> {getFeeType()}
            </p>
          </div>
        )}

        {/* Button */}
        <button
          onClick={handleAssign}
          disabled={loading}
          className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-green-600 to-green-500 hover:opacity-90 transition"
        >
          {loading
            ? "Assigning..."
            : "Assign Fees"}
        </button>
      </div>
    </div>
  );
}
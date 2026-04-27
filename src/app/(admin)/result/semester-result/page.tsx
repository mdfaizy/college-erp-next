// "use client";

// import { useEffect, useState } from "react";

// import {
//   getSemesterResults,
// } from "@/services/resultService";

// import {
//   getStudentsBySemester,
// } from "@/services/studentService";

// export default function SemesterResultPage() {
//   const [students, setStudents] =
//     useState<any[]>([]);

//   const [results, setResults] =
//     useState<any[]>([]);

//   const [form, setForm] = useState({
//     semester: "",
//     studentId: "",
//   });

//   useEffect(() => {
//     if (form.semester) {
//       fetchStudents();
//     } else {
//       setStudents([]);
//     }
//   }, [form.semester]);

//   const fetchStudents =
//     async () => {
//       const res =
//         await getStudentsBySemester(
//           Number(form.semester)
//         );
// console.log(res)
//       setStudents(res.data);
//     };

//   const fetchResults =
//     async () => {
//       if (
//         !form.semester ||
//         !form.studentId
//       ) {
//         alert(
//           "Select semester and student"
//         );
//         return;
//       }

//       const res =
//         await getSemesterResults(
//           Number(form.studentId),
//           Number(form.semester)
//         );

//       setResults(res.data);
//     };

//   const totalObtained =
//     results.reduce(
//       (sum, item) =>
//         sum +
//         Number(
//           item.obtainedMarks
//         ),
//       0
//     );

//   const totalMarks =
//     results.reduce(
//       (sum, item) =>
//         sum +
//         Number(
//           item.exam
//             ?.totalMarks
//         ),
//       0
//     );

//   const percentage =
//     totalMarks > 0
//       ? (
//           (totalObtained /
//             totalMarks) *
//           100
//         ).toFixed(2)
//       : 0;

//   return (
//     <div className="p-6">
//       <div className="bg-white rounded-2xl shadow border p-6">
//         <h1 className="text-2xl font-bold mb-6">
//           Semester Result
//         </h1>

//         {/* Filters */}
//         <div className="grid md:grid-cols-3 gap-4 mb-6">
//           <select
//             className="border rounded p-3"
//             value={form.semester}
//             onChange={(e) =>
//               setForm({
//                 semester:
//                   e.target.value,
//                 studentId: "",
//               })
//             }
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

//           <select
//             className="border rounded p-3"
//             value={form.studentId}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 studentId:
//                   e.target.value,
//               })
//             }
//             disabled={!form.semester}
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
//                   (ID:
//                   {student.id})
//                 </option>
//               )
//             )}
//           </select>

//           <button
//             onClick={fetchResults}
//             className="bg-green-600 text-white rounded"
//           >
//             View Result
//           </button>
//         </div>

//         {/* Result Table */}
//         <table className="w-full border mb-6">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border p-3">
//                 Subject
//               </th>
//               <th className="border p-3">
//                 Exam
//               </th>
//               <th className="border p-3">
//                 Marks
//               </th>
//               <th className="border p-3">
//                 Total
//               </th>
//             </tr>
//           </thead>

//           <tbody>
//             {results.map(
//               (result) => (
//                 <tr key={result.id}>
//                   <td className="border p-3">
//                     {
//                       result.exam
//                         ?.subject
//                         ?.name
//                     }
//                   </td>

//                   <td className="border p-3">
//                     {
//                       result.exam
//                         ?.examName
//                     }
//                   </td>

//                   <td className="border p-3">
//                     {
//                       result.obtainedMarks
//                     }
//                   </td>

//                   <td className="border p-3">
//                     {
//                       result.exam
//                         ?.totalMarks
//                     }
//                   </td>
//                 </tr>
//               )
//             )}
//           </tbody>
//         </table>

//         {/* Summary */}
//         {results.length > 0 && (
//           <div className="grid md:grid-cols-3 gap-4">
//             <div className="bg-blue-50 p-4 rounded">
//               <p className="text-sm">
//                 Total Obtained
//               </p>
//               <h2 className="text-xl font-bold">
//                 {totalObtained}
//               </h2>
//             </div>

//             <div className="bg-green-50 p-4 rounded">
//               <p className="text-sm">
//                 Total Marks
//               </p>
//               <h2 className="text-xl font-bold">
//                 {totalMarks}
//               </h2>
//             </div>

//             <div className="bg-purple-50 p-4 rounded">
//               <p className="text-sm">
//                 Percentage
//               </p>
//               <h2 className="text-xl font-bold">
//                 {percentage}%
//               </h2>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { getSemesterResults } from "@/services/resultService";
import { getStudentsBySemester } from "@/services/studentService";

export default function SemesterResultPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    semester: "",
    studentId: "",
  });

  useEffect(() => {
    if (form.semester) {
      fetchStudents();
    } else {
      setStudents([]);
    }
  }, [form.semester]);

  const fetchStudents = async () => {
    const res = await getStudentsBySemester(Number(form.semester));
    setStudents(res.data);
  };

  const fetchResults = async () => {
    if (!form.semester || !form.studentId) {
      return;
    }
    setLoading(true);
    try {
      const res = await getSemesterResults(
        Number(form.studentId),
        Number(form.semester)
      );
      setResults(res.data);
    } finally {
      setLoading(false);
    }
  };

  const totalObtained = results.reduce((sum, item) => sum + Number(item.obtainedMarks), 0);
  const totalMarks = results.reduce((sum, item) => sum + Number(item.exam?.totalMarks || 0), 0);
  const percentage = totalMarks > 0 ? ((totalObtained / totalMarks) * 100).toFixed(2) : "0.00";

  return (
    <div className="min-h-screen bg-[#f8f9fa] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Student Transcript</h1>
          <p className="text-gray-500">Generate and review individual semester performance reports.</p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Select Semester</label>
              <select
                className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={form.semester}
                onChange={(e) => setForm({ semester: e.target.value, studentId: "" })}
              >
                <option value="">Choose Semester</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <option key={sem} value={sem}>Semester {sem}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Select Student</label>
              <select
                className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all disabled:opacity-60"
                value={form.studentId}
                onChange={(e) => setForm({ ...form, studentId: e.target.value })}
                disabled={!form.semester}
              >
                <option value="">{form.semester ? "Find Student..." : "Select Semester First"}</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>{s.user?.name} (Roll: {s.id})</option>
                ))}
              </select>
            </div>

            <button
              onClick={fetchResults}
              disabled={loading || !form.studentId}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition-all shadow-md shadow-indigo-100 disabled:bg-gray-300"
            >
              {loading ? "Generating..." : "Generate Report"}
            </button>
          </div>
        </div>

        {results.length > 0 ? (
          <div className="space-y-6 animate-in fade-in duration-500">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border-l-4 border-blue-500 p-5 rounded-xl shadow-sm flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Marks Obtained</p>
                  <h3 className="text-2xl font-bold text-gray-800">{totalObtained}</h3>
                </div>
                <div className="bg-blue-50 p-3 rounded-full text-blue-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
              </div>

              <div className="bg-white border-l-4 border-indigo-500 p-5 rounded-xl shadow-sm flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Total Capacity</p>
                  <h3 className="text-2xl font-bold text-gray-800">{totalMarks}</h3>
                </div>
                <div className="bg-indigo-50 p-3 rounded-full text-indigo-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
              </div>

              <div className="bg-white border-l-4 border-purple-500 p-5 rounded-xl shadow-sm flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase">Aggregate Score</p>
                  <h3 className="text-2xl font-bold text-gray-800">{percentage}%</h3>
                </div>
                <div className="bg-purple-50 p-3 rounded-full text-purple-500 font-bold text-lg">
                   %
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-600 font-semibold border-b">
                  <tr>
                    <th className="px-6 py-4">Course/Subject</th>
                    <th className="px-6 py-4">Assessment</th>
                    <th className="px-6 py-4 text-center">Score</th>
                    <th className="px-6 py-4 text-center">Max Marks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {results.map((result) => (
                    <tr key={result.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{result.exam?.subject?.name}</td>
                      <td className="px-6 py-4 text-gray-600">{result.exam?.examName}</td>
                      <td className="px-6 py-4 text-center">
                         <span className={`font-bold ${Number(result.obtainedMarks) < 35 ? 'text-red-500' : 'text-gray-900'}`}>
                           {result.obtainedMarks}
                         </span>
                      </td>
                      <td className="px-6 py-4 text-center text-gray-500">{result.exam?.totalMarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-end">
                <button className="text-indigo-600 font-semibold text-sm hover:underline" onClick={() => window.print()}>
                    Download PDF Transcript
                </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <div className="text-gray-400 mb-2">No Report Generated</div>
            <p className="text-sm text-gray-500">Please select a semester and student to view the transcript.</p>
          </div>
        )}
      </div>
    </div>
  );
}
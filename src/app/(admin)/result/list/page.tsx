// "use client";

// import { useEffect, useState } from "react";

// import {
//   getResultList,
//   getExamsBySemester,
// } from "@/services/resultService";

// export default function ResultListPage() {
//   const [semester, setSemester] =
//     useState("");

//   const [examId, setExamId] =
//     useState("");

//   const [exams, setExams] =
//     useState<any[]>([]);

//   const [results, setResults] =
//     useState<any[]>([]);

//   useEffect(() => {
//     if (semester) {
//       fetchExams();
//     }
//   }, [semester]);

//   const fetchExams =
//     async () => {
//       const res =
//         await getExamsBySemester(
//           Number(semester)
//         );

//       setExams(res.data);
//     };

//   const fetchResults =
//     async () => {
//       const res =
//         await getResultList(
//           Number(semester),
//           examId
//             ? Number(examId)
//             : undefined
//         );

//       setResults(res.data);
//     };

//   return (
//     <div className="p-6">
//       <div className="bg-white rounded-2xl shadow border p-6">
//         <h1 className="text-2xl font-bold mb-6">
//           Result List
//         </h1>

//         <div className="grid md:grid-cols-3 gap-4 mb-6">
//           <select
//             className="border p-3 rounded"
//             value={semester}
//             onChange={(e) =>
//               setSemester(
//                 e.target.value
//               )
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
//             className="border p-3 rounded"
//             value={examId}
//             onChange={(e) =>
//               setExamId(
//                 e.target.value
//               )
//             }
//           >
//             <option value="">
//               All Exams
//             </option>

//             {exams.map((exam) => (
//               <option
//                 key={exam.id}
//                 value={exam.id}
//               >
//                 {
//                   exam.examName
//                 }{" "}
//                 -{" "}
//                 {
//                   exam.subject
//                     ?.name
//                 }
//               </option>
//             ))}
//           </select>

//           <button
//             onClick={fetchResults}
//             className="bg-green-600 text-white rounded"
//           >
//             Search
//           </button>
//         </div>

//         <table className="w-full border">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border p-3">
//                 Student
//               </th>
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
//                       result.student
//                         ?.user?.name
//                     }
//                   </td>

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
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import { getResultList, getExamsBySemester } from "@/services/resultService";

// export default function ResultListPage() {
//   const [semester, setSemester] = useState("");
//   const [examId, setExamId] = useState("");
//   const [exams, setExams] = useState<any[]>([]);
//   const [results, setResults] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (semester) {
//       fetchExams();
//     }
//   }, [semester]);

//   const fetchExams = async () => {
//     const res = await getExamsBySemester(Number(semester));
//     setExams(res.data);
//   };

//   const fetchResults = async () => {
//     setLoading(true);
//     try {
//       const res = await getResultList(
//         Number(semester),
//         examId ? Number(examId) : undefined
//       );
//       setResults(res.data);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50/50 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Examination Results</h1>
//             <p className="text-gray-500 text-sm mt-1">Manage and view student academic performance</p>
//           </div>
//           <div className="flex items-center gap-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-lg border shadow-sm">
//             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
//             System Active
//           </div>
//         </div>

//         {/* Filters Card */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
//             <div className="space-y-1.5">
//               <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Semester</label>
//               <select
//                 className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 transition-all"
//                 value={semester}
//                 onChange={(e) => setSemester(e.target.value)}
//               >
//                 <option value="">Choose Semester</option>
//                 {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
//                   <option key={sem} value={sem}>Semester {sem}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="space-y-1.5 md:col-span-2">
//               <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Specific Exam (Optional)</label>
//               <select
//                 className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 transition-all"
//                 value={examId}
//                 onChange={(e) => setExamId(e.target.value)}
//               >
//                 <option value="">All Exams</option>
//                 {exams.map((exam) => (
//                   <option key={exam.id} value={exam.id}>
//                     {exam.examName} • {exam.subject?.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <button
//               onClick={fetchResults}
//               disabled={!semester || loading}
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-lg transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
//             >
//               {loading ? "Searching..." : "View Results"}
//             </button>
//           </div>
//         </div>

//         {/* Table Section */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm text-left">
//               <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   <th className="px-6 py-4 font-semibold">Student Name</th>
//                   <th className="px-6 py-4 font-semibold">Subject</th>
//                   <th className="px-6 py-4 font-semibold">Exam Type</th>
//                   <th className="px-6 py-4 font-semibold text-center">Score</th>
//                   <th className="px-6 py-4 font-semibold text-center">Status</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-100">
//                 {results.length > 0 ? (
//                   results.map((result) => {
//                     const percentage = (result.obtainedMarks / result.exam?.totalMarks) * 100;
//                     return (
//                       <tr key={result.id} className="hover:bg-gray-50/80 transition-colors">
//                         <td className="px-6 py-4">
//                           <div className="font-medium text-gray-900">{result.student?.user?.name}</div>
//                           <div className="text-gray-400 text-xs font-mono uppercase tracking-tighter">ID: {result.student?.id}</div>
//                         </td>
//                         <td className="px-6 py-4 text-gray-600 font-medium">
//                           {result.exam?.subject?.name}
//                         </td>
//                         <td className="px-6 py-4">
//                           <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
//                             {result.exam?.examName}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 text-center">
//                           <div className="text-gray-900 font-bold">
//                             {result.obtainedMarks} <span className="text-gray-400 font-normal">/ {result.exam?.totalMarks}</span>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 text-center">
//                           {percentage >= 35 ? (
//                             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                               Passed
//                             </span>
//                           ) : (
//                             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
//                               Failed
//                             </span>
//                           )}
//                         </td>
//                       </tr>
//                     );
//                   })
//                 ) : (
//                   <tr>
//                     <td colSpan={5} className="px-6 py-20 text-center text-gray-400">
//                       <div className="flex flex-col items-center gap-2">
//                         <svg className="w-12 h-12 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                         </svg>
//                         <p className="text-base font-medium text-gray-500">No results found</p>
//                         <p className="text-sm">Select a semester and click search to view data</p>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import {
  getResultList,
  getExamsBySemester,
} from "@/services/resultService";

export default function ResultListPage() {
  const [semester, setSemester] = useState("");
  const [examId, setExamId] = useState("");
  const [exams, setExams] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (semester) fetchExams();
  }, [semester]);

  const fetchExams = async () => {
    const res = await getExamsBySemester(Number(semester));
    setExams(res.data);
  };

  const fetchResults = async () => {
    setLoading(true);
    try {
      const res = await getResultList(
        Number(semester),
        examId ? Number(examId) : undefined
      );
      console.log(res);
      setResults(res.data);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 DOWNLOAD FUNCTION
  // const downloadResult = (result: any) => {
  //   const percentage =
  //     (result.obtainedMarks / result.exam?.totalMarks) * 100;

  //   const printWindow = window.open("", "_blank");

  //   printWindow?.document.write(`
  //     <html>
  //       <head>
  //         <title>Student Result</title>
  //         <style>
  //           body { font-family: Arial; padding: 30px; }
  //           .card {
  //             border: 1px solid #ddd;
  //             padding: 20px;
  //             border-radius: 10px;
  //             max-width: 500px;
  //             margin: auto;
  //           }
  //           h2 { text-align: center; }
  //           p { margin: 8px 0; }
  //         </style>
  //       </head>
  //       <body>
  //         <div class="card">
  //           <h2>Student Result</h2>
  //           <p><b>Name:</b> ${result.student?.user?.name}</p>
  //           <p><b>Student ID:</b> ${result.student?.id}</p>
  //           <p><b>Subject:</b> ${result.exam?.subject?.name}</p>
  //           <p><b>Exam:</b> ${result.exam?.examName}</p>
  //           <p><b>Marks:</b> ${result.obtainedMarks} / ${result.exam?.totalMarks}</p>
  //           <p><b>Percentage:</b> ${percentage.toFixed(2)}%</p>
  //           <p><b>Status:</b> ${
  //             percentage >= 35 ? "PASS ✅" : "FAIL ❌"
  //           }</p>
  //         </div>
  //       </body>
  //     </html>
  //   `);

  //   printWindow?.document.close();
  //   printWindow?.print();
  // };

const downloadResult = (result: any) => {
  // Percentage aur Pass/Fail logic
  const percentage = (result.obtainedMarks / result.exam?.totalMarks) * 100;
  const isPass = percentage >= 35;
  const statusText = isPass ? "PASS" : "FAIL";
  const statusColor = isPass ? "#166534" : "#991b1b";

  // College Name aur Address dynamically nikalna (Fallback values ke sath)
  // Agar aapka structure result.college ki jagah kuch aur hai, toh isey adjust kar lena
  const collegeName = result.student?.college?.name || result.college?.name || "Institution Name Not Found";
  const collegeAddress = result.student?.college?.address || result.college?.address || "Address Not Found";

  const printWindow = window.open("", "_blank");

  printWindow?.document.write(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Result - ${result.student?.user?.name || "Student"}</title>
        <style>
          @page { size: A4; margin: 20mm; }
          body { 
            font-family: "Times New Roman", Times, serif; 
            color: #333; 
            background-color: #f9f9f9;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            background: #fff;
            padding: 40px;
            border: 2px solid #2c3e50;
            outline: 4px solid double #2c3e50;
            outline-offset: -10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          }
          /* Header Section */
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #2c3e50;
            padding-bottom: 20px;
          }
          .header h1 {
            margin: 0 0 10px 0;
            font-size: 26px;
            color: #2c3e50;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .header p {
            margin: 0;
            font-size: 14px;
            color: #555;
            font-style: italic;
          }
          .report-title {
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            margin: 20px 0;
            text-decoration: underline;
            text-transform: uppercase;
          }
          /* Student Details Grid */
          .student-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 30px;
            font-size: 16px;
          }
          .info-row {
            display: flex;
          }
          .info-label {
            font-weight: bold;
            width: 130px;
          }
          .info-value {
            border-bottom: 1px dashed #ccc;
            flex-grow: 1;
            padding-left: 10px;
          }
          /* Marks Table */
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
          }
          th, td {
            border: 1px solid #2c3e50;
            padding: 12px;
            text-align: center;
          }
          th {
            background-color: #f2f2f2;
            font-weight: bold;
            text-transform: uppercase;
          }
          td.subject-name {
            text-align: left;
            font-weight: bold;
          }
          /* Summary Section */
          .summary-box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px;
            background-color: #f8f9fa;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 18px;
            margin-bottom: 40px;
          }
          .status {
            font-weight: bold;
            color: ${statusColor};
            font-size: 22px;
            letter-spacing: 2px;
          }
          /* Signatures */
          .signatures {
            display: flex;
            justify-content: space-between;
            margin-top: 60px;
          }
          .sign-box {
            text-align: center;
            width: 200px;
          }
          .sign-line {
            border-top: 1px solid #333;
            margin-top: 40px;
            padding-top: 5px;
            font-weight: bold;
          }
          
          /* Print Settings */
          @media print {
            body { background: #fff; padding: 0; }
            .container { 
              box-shadow: none; 
              border: 2px solid #000;
              outline: 4px solid double #000;
              margin: 0;
            }
            th { background-color: #e9ecef !important; -webkit-print-color-adjust: exact; }
            .summary-box { background-color: #f8f9fa !important; -webkit-print-color-adjust: exact; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          
          <div class="header">
            <h1>${collegeName}</h1>
            <p>${collegeAddress}</p>
          </div>

          <div class="report-title">Statement of Marks</div>

          <div class="student-info">
            <div class="info-row">
              <span class="info-label">Student Name:</span>
              <span class="info-value">${result.student?.user?.name || "N/A"}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Student ID:</span>
              <span class="info-value">${result.student?.id || "N/A"}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Examination:</span>
              <span class="info-value">${result.exam?.examName || "N/A"} (${result.exam?.examType || "N/A"})</span>
            </div>
            <div class="info-row">
              <span class="info-label">Semester:</span>
              <span class="info-value">${result.semester || "N/A"}</span>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Subject Code</th>
                <th>Subject Name</th>
                <th>Maximum Marks</th>
                <th>Marks Obtained</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${result.exam?.subject?.code || "N/A"}</td>
                <td class="subject-name">${result.exam?.subject?.name || "N/A"}</td>
                <td>${result.exam?.totalMarks || 0}</td>
                <td>${result.obtainedMarks || 0}</td>
              </tr>
            </tbody>
          </table>

          <div class="summary-box">
            <div><strong>Overall Percentage:</strong> ${percentage.toFixed(2)}%</div>
            <div><strong>Final Result:</strong> <span class="status">${statusText} ${isPass ? "✓" : "✗"}</span></div>
          </div>

          <div class="signatures">
            <div class="sign-box">
              <div class="sign-line">Class Teacher</div>
            </div>
            <div class="sign-box">
              <div class="sign-line">Controller of Exams</div>
            </div>
          </div>

        </div>
      </body>
    </html>
  `);

  printWindow?.document.close();
  
  setTimeout(() => {
    printWindow?.print();
  }, 250);
};
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* 🔥 HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">
              Examination Results
            </h1>
            <p className="text-gray-500 text-sm">
              Manage student results
            </p>
          </div>
        </div>

        {/* 🔥 FILTER */}
        <div className="bg-white p-5 rounded-xl shadow flex flex-wrap gap-4 items-end">

          {/* SEMESTER */}
          <select
            className="border p-2 rounded-lg"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >
            <option value="">Select Semester</option>
            {[1,2,3,4,5,6,7,8].map((s) => (
              <option key={s} value={s}>
                Semester {s}
              </option>
            ))}
          </select>

          {/* EXAM */}
          <select
            className="border p-2 rounded-lg"
            value={examId}
            onChange={(e) => setExamId(e.target.value)}
          >
            <option value="">All Exams</option>
            {exams.map((exam) => (
              <option key={exam.id} value={exam.id}>
                {exam.examName}
              </option>
            ))}
          </select>

          <button
            onClick={fetchResults}
            disabled={!semester || loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            {loading ? "Loading..." : "View Results"}
          </button>
        </div>

        {/* 🔥 TABLE */}
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full text-sm">

            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3 text-left">Student</th>
                <th className="p-3 text-left">Subject</th>
                <th className="p-3 text-left">Exam</th>
                <th className="p-3 text-center">Score</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {results.length > 0 ? (
                results.map((result) => {
                  const percentage =
                    (result.obtainedMarks /
                      result.exam?.totalMarks) *
                    100;

                  return (
                    <tr
                      key={result.id}
                      className={`border-b transition ${
                        percentage >= 35
                          ? "hover:bg-green-50"
                          : "hover:bg-red-50"
                      }`}
                    >
                      {/* STUDENT */}
                      <td className="p-3">
                        <div className="font-medium">
                          {result.student?.user?.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          ID: {result.student?.id}
                        </div>
                      </td>

                      {/* SUBJECT */}
                      <td className="p-3">
                        {result.exam?.subject?.name}
                      </td>

                      {/* EXAM */}
                      <td className="p-3">
                        {result.exam?.examName}
                      </td>

                      {/* SCORE */}
                      <td className="p-3 text-center">
                        <div className="font-bold">
                          {result.obtainedMarks} /{" "}
                          {result.exam?.totalMarks}
                        </div>

                        {/* 🔥 PROGRESS */}
                        <div className="w-full bg-gray-200 h-2 mt-2 rounded">
                          <div
                            className={`h-2 rounded ${
                              percentage >= 35
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                            style={{
                              width: `${percentage}%`,
                            }}
                          />
                        </div>
                      </td>

                      {/* STATUS */}
                      <td className="p-3 text-center">
                        <span
                          className={`px-2 py-1 rounded text-xs ${
                            percentage >= 35
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {percentage >= 35
                            ? "Passed"
                            : "Failed"}
                        </span>
                      </td>

                      {/* DOWNLOAD */}
                      <td className="p-3 text-center">
                        <button
                          onClick={() =>
                            downloadResult(result)
                          }
                          className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-xs"
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-10 text-gray-400"
                  >
                    No results found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}
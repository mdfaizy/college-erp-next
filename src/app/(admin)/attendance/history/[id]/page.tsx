// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { Printer, Clock } from "lucide-react";

// import {
//   getAttendanceSessionDetails,
// } from "@/services/attendanceService";

// export default function AttendanceDetailPage() {
//   const params = useParams();
//   const id = Number(params.id);

//   const [records, setRecords] = useState<any[]>([]);

//   useEffect(() => {
//     if (id) fetchDetails();
//   }, [id]);

//   const fetchDetails = async () => {
//     const data = await getAttendanceSessionDetails(id);
//     setRecords(data || []);
//   };

//   const presentCount = records.filter(
//     (r) => r.status === "present"
//   ).length;

//   const absentCount = records.filter(
//     (r) => r.status === "absent"
//   ).length;

//   const lateCount = records.filter(
//     (r) => r.status === "late"
//   ).length;

//   const leaveCount = records.filter(
//     (r) => r.status === "leave"
//   ).length;

//   const createdAt =
//     records?.[0]?.attendanceSession?.createdAt;

//   const handlePrint = () => {
//     window.print();
//   };

//   return (
//     <div className="space-y-6 p-6 print:p-0">
//       {/* Header */}
//       <div className="rounded-2xl border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark print:hidden">
//         <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//           <div>
//             <h2 className="text-2xl font-bold text-black dark:text-white">
//               Attendance Details
//             </h2>

//             <p className="text-sm text-body">
//               Session ID: #{id}
//             </p>

//             {createdAt && (
//               <p className="mt-2 flex items-center gap-2 text-sm text-body">
//                 <Clock size={16} />
//                 Marked At:{" "}
//                 {new Date(createdAt).toLocaleString()}
//               </p>
//             )}
//           </div>

//           <button
//             onClick={handlePrint}
//             className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-white hover:bg-opacity-90"
//           >
//             <Printer size={18} />
//             Print Attendance
//           </button>
//         </div>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid gap-4 md:grid-cols-4 print:hidden">
//         <SummaryCard
//           title="Present"
//           value={presentCount}
//           color="green"
//         />
//         <SummaryCard
//           title="Absent"
//           value={absentCount}
//           color="red"
//         />
//         <SummaryCard
//           title="Late"
//           value={lateCount}
//           color="yellow"
//         />
//         <SummaryCard
//           title="Leave"
//           value={leaveCount}
//           color="blue"
//         />
//       </div>

//       {/* Table */}
//       <div className="rounded-2xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse">
//             <thead className="bg-gray-2 dark:bg-meta-4">
//               <tr>
//                 <th className="px-6 py-4 text-left">
//                   #
//                 </th>
//                 <th className="px-6 py-4 text-left">
//                   Student Name
//                 </th>
//                 <th className="px-6 py-4 text-left">
//                   Roll No
//                 </th>
//                 <th className="px-6 py-4 text-left">
//                   Status
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {records.map((record, index) => (
//                 <tr
//                   key={record.id}
//                   className="border-b border-stroke dark:border-strokedark"
//                 >
//                   <td className="px-6 py-4">
//                     {index + 1}
//                   </td>

//                   <td className="px-6 py-4 font-medium">
//                     {record.student.user.name}
//                   </td>

//                   <td className="px-6 py-4">
//                     {record.student.academics?.[0]
//                       ?.rollNo || "-"}
//                   </td>

//                   <td className="px-6 py-4">
//                     <span
//                       className={`rounded-full px-3 py-1 text-sm font-medium ${
//                         record.status === "present"
//                           ? "bg-green-100 text-green-700"
//                           : record.status === "absent"
//                           ? "bg-red-100 text-red-700"
//                           : record.status === "late"
//                           ? "bg-yellow-100 text-yellow-700"
//                           : "bg-blue-100 text-blue-700"
//                       }`}
//                     >
//                       {record.status}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {records.length === 0 && (
//             <div className="p-8 text-center text-body">
//               No attendance records found
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// function SummaryCard({
//   title,
//   value,
//   color,
// }: {
//   title: string;
//   value: number;
//   color: string;
// }) {
//   const colorMap: any = {
//     green:
//       "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
//     red:
//       "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400",
//     yellow:
//       "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400",
//     blue:
//       "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
//   };

//   return (
//     <div
//       className={`rounded-xl p-5 ${colorMap[color]}`}
//     >
//       <p className="text-sm font-medium">
//         {title}
//       </p>
//       <h3 className="mt-2 text-2xl font-bold">
//         {value}
//       </h3>
//     </div>
//   );
// }       

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Printer, 
  Clock, 
  ArrowLeft, 
  UserCheck, 
  UserX, 
  Timer, 
  FileText,
  Calendar
} from "lucide-react";

import { getAttendanceSessionDetails } from "@/services/attendanceService";

export default function AttendanceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && id !== "undefined") {
      fetchDetails();
    } else {
      setLoading(false);
    }
  }, [id]);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const data = await getAttendanceSessionDetails(Number(id));
      setRecords(data || []);
    } catch (error) {
      console.error("Error fetching details", error);
    } finally {
      setLoading(false);
    }
  };

  const getCount = (status: string) => records.filter((r) => r.status === status).length;

  const sessionInfo = records?.[0]?.attendanceSession;
  const createdAt = sessionInfo?.createdAt;

  const handlePrint = () => window.print();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
          <p className="font-bold text-slate-500">Generating Report Details...</p>
        </div>
      </div>
    );
  }

  if (!id || id === "undefined" || (records.length === 0 && !loading)) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
        <FileText size={64} className="mb-4 text-slate-200" />
        <h2 className="text-xl font-bold text-slate-800">Invalid Session ID</h2>
        <p className="text-slate-500">The attendance record you are looking for does not exist.</p>
        <button 
          onClick={() => router.back()}
          className="mt-6 flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-bold text-white shadow-lg transition-all hover:bg-slate-800"
        >
          <ArrowLeft size={18} /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 print:bg-white print:p-0">
      <div className="mx-auto max-w-5xl space-y-6">
        
        {/* Navigation & Actions */}
        <div className="flex items-center justify-between print:hidden">
          <button 
            onClick={() => router.back()}
            className="group flex items-center gap-2 font-bold text-slate-500 transition-colors hover:text-slate-900"
          >
            <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
            Back to History
          </button>
          
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white shadow-lg shadow-indigo-100 transition-all hover:bg-indigo-700 active:scale-95"
          >
            <Printer size={18} />
            Download PDF / Print
          </button>
        </div>

        {/* Main Header Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1 text-xs font-black uppercase tracking-widest text-indigo-600">
                Official Attendance Report
              </div>
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                  Session Detail <span className="text-slate-400">#{id}</span>
                </h1>
                <div className="mt-4 flex flex-wrap gap-4 text-sm font-medium text-slate-500">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-slate-400" />
                    {sessionInfo?.date || "N/A"}
                  </div>
                  <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
                    <Clock size={16} className="text-slate-400" />
                    {createdAt ? new Date(createdAt).toLocaleTimeString() : "N/A"}
                  </div>
                  <div className="flex items-center gap-2 border-l border-slate-200 pl-4">
                    <span className="font-bold text-slate-900">Semester:</span> {sessionInfo?.semester || "N/A"}
                  </div>
                </div>
              </div>
            </div>

            {/* Subject Tag */}
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Subject</p>
              <p className="text-lg font-bold text-slate-800">{sessionInfo?.subject?.name || "No Subject Specified"}</p>
            </div>
          </div>

          {/* ERP Summary Grid */}
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatBox icon={<UserCheck />} label="Present" value={getCount("present")} color="emerald" />
            <StatBox icon={<UserX />} label="Absent" value={getCount("absent")} color="rose" />
            <StatBox icon={<Timer />} label="Late" value={getCount("late")} color="amber" />
            <StatBox icon={<FileText />} label="Leave" value={getCount("leave")} color="blue" />
          </div>
        </div>

        {/* Student List Table */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
            <h3 className="font-bold text-slate-800">Enrollment List</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-black uppercase tracking-wider text-slate-400">
                  <th className="px-6 py-4 font-bold">#</th>
                  <th className="px-6 py-4 font-bold">Student Identity</th>
                  <th className="px-6 py-4 font-bold">Roll Number</th>
                  <th className="px-6 py-4 text-center font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {records.map((record, index) => (
                  <tr key={record.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-slate-400">{(index + 1).toString().padStart(2, '0')}</td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-800">{record.student.user.name}</p>
                      <p className="text-xs text-slate-400">{record.student.user.email}</p>
                    </td>
                    <td className="px-6 py-4 font-mono text-sm font-semibold text-slate-600">
                      {record.student.academics?.[0]?.rollNo || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <StatusBadge status={record.status} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Utility Components
function StatBox({ icon, label, value, color }: any) {
  const colors: any = {
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
    rose: "bg-rose-50 text-rose-600 border-rose-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    blue: "bg-blue-50 text-blue-600 border-blue-100",
  };

  return (
    <div className={`flex flex-col items-center justify-center rounded-2xl border p-4 transition-all hover:shadow-md ${colors[color]}`}>
      <div className="mb-1 opacity-80">{icon}</div>
      <p className="text-[10px] font-black uppercase tracking-tighter opacity-70">{label}</p>
      <p className="text-2xl font-black">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    present: "bg-emerald-100 text-emerald-700 border-emerald-200",
    absent: "bg-rose-100 text-rose-700 border-rose-200",
    late: "bg-amber-100 text-amber-700 border-amber-200",
    leave: "bg-blue-100 text-blue-700 border-blue-200",
  };

  return (
    <span className={`inline-flex min-w-[80px] justify-center rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-widest ${styles[status] || "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
  );
}
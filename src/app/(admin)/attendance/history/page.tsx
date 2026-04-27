// "use client";

// import { useEffect, useState } from "react";
// import { CalendarDays, Lock, Pencil } from "lucide-react";
// import { useRouter } from "next/navigation";

// import { getAttendanceHistory } from "@/services/attendanceService";
// import EditAttendanceModal from "@/components/attendance/EditAttendanceModal";
// import ViewAttendanceModal from "@/components/attendance/ViewAttendanceModal";

// export default function AttendanceHistoryPage() {
//     const [history, setHistory] = useState<any[]>([]);
//     const [selectedSessionId, setSelectedSessionId] =
//     useState<number | null>(null);
//     const [viewSessionId, setViewSessionId] =
//     useState<number | null>(null);
//     const router = useRouter();

//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   const fetchHistory = async () => {
//     const data = await getAttendanceHistory();
//     setHistory(data || []);
//   };

//   return (
//     <div className="space-y-6 p-6">
//       {/* Header */}
//       <div className="rounded-2xl border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
//         <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
//           <div>
//             <h2 className="text-2xl font-bold text-black dark:text-white">
//               Attendance History
//             </h2>

//             <p className="text-sm text-body dark:text-bodydark">
//               View and manage previously marked attendance
//             </p>
//           </div>

//           <div className="flex items-center gap-2 rounded-lg bg-gray-2 px-4 py-2 dark:bg-meta-4">
//             <CalendarDays size={18} />
//             <span className="text-sm font-medium">
//               Total Sessions: {history.length}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Table Card */}
//       <div className="rounded-2xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="border-b border-stroke bg-gray-2 dark:border-strokedark dark:bg-meta-4">
//               <tr>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-white">
//                   Date
//                 </th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-white">
//                   Semester
//                 </th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-white">
//                   Subject
//                 </th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-white">
//                   Period
//                 </th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-white">
//                   Present
//                 </th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-white">
//                   Absent
//                 </th>
//                 <th className="px-6 py-4 text-left text-sm font-semibold text-black dark:text-white">
//                   Status
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {history.length > 0 ? (
//                 history.map((item) => (
//                   <tr
//                     key={item.id}
//                     className="border-b border-stroke transition hover:bg-gray-1 dark:border-strokedark dark:hover:bg-meta-4"
//                   >
//                     <td className="px-6 py-4 text-black dark:text-white">
//                       {item.date}
//                     </td>

//                     <td className="px-6 py-4 text-black dark:text-white">
//                       Semester {item.semester}
//                     </td>

//                     <td className="px-6 py-4 font-medium text-black dark:text-white">
//                       {item.subject}
//                     </td>

//                     <td className="px-6 py-4 text-black dark:text-white">
//                       Period {item.period}
//                     </td>

//                     <td className="px-6 py-4">
//                       <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
//                         {item.presentCount}
//                       </span>
//                     </td>

//                     <td className="px-6 py-4">
//                       <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">
//                         {item.absentCount}
//                       </span>
//                     </td>

//                     <td className="px-6 py-4">
//                         <button
//   onClick={() =>
//     router.push(`/attendance/history/${item.id}`)
//   }
//   className="rounded bg-info px-4 py-2 text-white"
// >
//   View
// </button>
//                       {item.canEdit ? (
//                         <button
//                           onClick={() =>
//                             setSelectedSessionId(item.id)
//                           }
//                           className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90"
//                         >
//                           <Pencil size={16} />
//                           Edit
//                         </button>
//                       ) : (
//                         <span className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-600 dark:bg-meta-4 dark:text-gray-300">
//                           <Lock size={14} />
//                           Locked
//                         </span>
//                       )}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan={7}
//                     className="px-6 py-12 text-center text-body dark:text-bodydark"
//                   >
//                     No attendance history found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Modal */}
//       {selectedSessionId && (
//         <EditAttendanceModal
//           sessionId={selectedSessionId}
//           onClose={() =>
//             setSelectedSessionId(null)
//           }
//           onUpdated={fetchHistory}
//         />
//       )}

//       {viewSessionId && (
//   <ViewAttendanceModal
//     sessionId={viewSessionId}
//     onClose={() => setViewSessionId(null)}
//   />
// )}
//     </div>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import {
//   CalendarDays,
//   Lock,
//   Pencil,
//   Eye,
// } from "lucide-react";
// import { useRouter } from "next/navigation";

// import { getAttendanceHistory } from "@/services/attendanceService";
// import EditAttendanceModal from "@/components/attendance/EditAttendanceModal";

// export default function AttendanceHistoryPage() {
//   const [history, setHistory] = useState<any[]>([]);
//   const [selectedSessionId, setSelectedSessionId] =
//     useState<number | null>(null);

//   const router = useRouter();

//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   const fetchHistory = async () => {
//     try {
//       const data = await getAttendanceHistory();
//       console.log(data);
//       setHistory(data || []);
//     } catch (error) {
//       console.error(
//         "Failed to load attendance history",
//         error
//       );
//     }
//   };

//   return (
//     <div className="space-y-6 p-6">
//       {/* Header */}
//       <div className="rounded-2xl border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
//         <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//           <div>
//             <h2 className="text-2xl font-bold text-black dark:text-white">
//               Attendance History
//             </h2>

//             <p className="text-sm text-body dark:text-bodydark">
//               View and manage previously marked attendance
//             </p>
//           </div>

//           <div className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-primary">
//             <CalendarDays size={18} />
//             <span className="font-medium">
//               Total Sessions: {history.length}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-hidden rounded-2xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[1000px]">
//             <thead className="bg-gray-2 dark:bg-meta-4">
//               <tr>
//                 <th className="px-6 py-4 text-left text-sm font-semibold">
//                   Date
//                 </th>

//                 <th className="px-6 py-4 text-left text-sm font-semibold">
//                   Semester
//                 </th>

//                 <th className="px-6 py-4 text-left text-sm font-semibold">
//                   Subject
//                 </th>

//                 <th className="px-6 py-4 text-left text-sm font-semibold">
//                   Period
//                 </th>

//                 <th className="px-6 py-4 text-left text-sm font-semibold">
//                   Present
//                 </th>

//                 <th className="px-6 py-4 text-left text-sm font-semibold">
//                   Absent
//                 </th>

//                 <th className="px-6 py-4 text-left text-sm font-semibold">
//                   Status
//                 </th>

//                 <th className="px-6 py-4 text-left text-sm font-semibold">
//                   Actions
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {history.length > 0 ? (
//                 history.map((item) => {
//                   const presentCount =
//                     item.records?.filter(
//                       (r: any) =>
//                         r.status === "present"
//                     ).length || 0;

//                   const absentCount =
//                     item.records?.filter(
//                       (r: any) =>
//                         r.status === "absent"
//                     ).length || 0;

//                   return (
//                     <tr
//                       key={item.id}
//                       className="border-t border-stroke hover:bg-gray-1 dark:border-strokedark dark:hover:bg-meta-4"
//                     >
//                       <td className="px-6 py-4">
//                         {item.date}
//                       </td>

//                       <td className="px-6 py-4">
//                         Semester{" "}
//                         {item.semester ||
//                           "-"}
//                       </td>

//                       <td className="px-6 py-4 font-medium">
//                         {item.subject?.name ||
//                           "-"}
//                       </td>

//                       <td className="px-6 py-4">
//                         Period {item.period}
//                       </td>

//                       <td className="px-6 py-4">
//                         <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
//                           {presentCount}
//                         </span>
//                       </td>

//                       <td className="px-6 py-4">
//                         <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">
//                           {absentCount}
//                         </span>
//                       </td>

//                       <td className="px-6 py-4">
//                         {item.canEdit ? (
//                           <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
//                             Editable
//                           </span>
//                         ) : (
//                           <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-600 dark:bg-meta-4 dark:text-gray-300">
//                             Locked
//                           </span>
//                         )}
//                       </td>

//                       <td className="px-6 py-4">
//                         <div className="flex gap-2">
//                           <button
                            // onClick={() =>
                            //   router.push(
                            //     `/attendance/history/${item.id}`
                            //   )
                            // }
//                             className="inline-flex items-center gap-2 rounded-lg bg-info px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90"
//                           >
//                             <Eye size={16} />
//                             View
//                           </button>

//                           {item.canEdit && (
//                             <button
//                               onClick={() =>
//                                 setSelectedSessionId(
//                                   item.id
//                                 )
//                               }
//                               className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90"
//                             >
//                               <Pencil size={16} />
//                               Edit
//                             </button>
//                           )}

//                           {!item.canEdit && (
//                             <span className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-600 dark:bg-meta-4 dark:text-gray-300">
//                               <Lock size={14} />
//                               Locked
//                             </span>
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })
//               ) : (
//                 <tr>
//                   <td
//                     colSpan={8}
//                     className="px-6 py-12 text-center text-body"
//                   >
//                     No attendance history found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Edit Modal */}
//       {selectedSessionId && (
//         <EditAttendanceModal
//           sessionId={selectedSessionId}
//           onClose={() =>
//             setSelectedSessionId(null)
//           }
//           onUpdated={fetchHistory}
//         />
//       )}
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Lock,
  Pencil,
  Eye,
  Filter,
  Download,
  History,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { getAttendanceHistory } from "@/services/attendanceService";
import EditAttendanceModal from "@/components/attendance/EditAttendanceModal";

export default function AttendanceHistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const data = await getAttendanceHistory();
      console.log('attendance data', data)
      setHistory(data || []);
    } catch (error) {
      console.error("Failed to load attendance history", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* TOP HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 mb-1">
              <History size={18} />
              <span className="text-xs font-bold uppercase tracking-widest">Academic Logs</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Attendance Records
            </h1>
            <p className="text-slate-500 text-sm">Review, audit, and modify historical attendance data.</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all shadow-sm">
              <Download size={18} />
              Export
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-indigo-600 px-4 py-2.5 rounded-xl text-sm font-semibold text-white hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100">
              <Filter size={18} />
              Filter
            </button>
          </div>
        </div>

        {/* QUICK STATS SUMMARY */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Sessions', value: history.length, color: 'blue' },
            { label: 'This Month', value: '24', color: 'indigo' },
            { label: 'Completion', value: '98%', color: 'emerald' },
            { label: 'Flags', value: '02', color: 'orange' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <p className={`text-xl font-black text-${stat.color}-600`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* DATA TABLE CONTAINER */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Session Details</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Subject & Period</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Statistics</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Security</th>
                  <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Control</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                   <tr>
                     <td colSpan={5} className="py-20 text-center text-slate-400 font-medium">
                       <div className="flex flex-col items-center gap-3">
                         <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                         Authenticating & Loading Logs...
                       </div>
                     </td>
                   </tr>
                ) : history.length > 0 ? (
                  history.map((item) => {
                    const presentCount = item.records?.filter((r: any) => r.status === "present").length || 0;
                    const absentCount = item.records?.filter((r: any) => r.status === "absent").length || 0;

                    return (
                      <tr key={item.id} className="group hover:bg-slate-50/80 transition-all duration-200">
                        {/* Session Date & Semester */}
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-800">{item.date}</span>
                            <span className="text-[11px] font-medium text-indigo-500 uppercase">Semester {item.semester || "N/A"}</span>
                          </div>
                        </td>

                        {/* Subject Info */}
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-slate-700">{item.subject || "-"}</span>
                            <span className="text-xs text-slate-400">Class Period: {item.period}</span>
                          </div>
                        </td>

                        {/* Attendance Stats */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-100">
                              <CheckCircle2 size={12} />
                              <span className="text-xs font-bold">{presentCount}</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-rose-50 text-rose-700 px-2.5 py-1 rounded-lg border border-rose-100">
                              <XCircle size={12} />
                              <span className="text-xs font-bold">{absentCount}</span>
                            </div>
                          </div>
                        </td>

                        {/* Status/Security */}
                        <td className="px-6 py-4 text-center">
                          {item.canEdit ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-50 text-blue-600 border border-blue-100 uppercase tracking-tighter">
                              Open for Edit
                            </span>
                          ) : (
                            <div className="flex items-center justify-center gap-1 text-slate-400">
                              <Lock size={12} />
                              <span className="text-[10px] font-bold uppercase">Locked</span>
                            </div>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                               onClick={() =>
                              router.push(
                                `/attendance/history/${item.id}`
                              )
                            }
                              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                              title="View Details"
                            >
                              <Eye size={18} />
                            </button>
                            
                            {item.canEdit && (
                              <button
                                onClick={() => setSelectedSessionId(item.id)}
                                className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all"
                                title="Edit Record"
                              >
                                <Pencil size={18} />
                              </button>
                            )}
                            
                            <button className="p-2 text-slate-400 hover:text-slate-600 rounded-xl transition-all">
                              <MoreHorizontal size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center opacity-30">
                        <History size={48} className="mb-2" />
                        <p className="font-bold">No historical data synchronization found.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* TABLE FOOTER / PAGINATION PLACEHOLDER */}
          <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Showing {history.length} audit logs</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs font-bold text-slate-400 cursor-not-allowed">Previous</button>
              <button className="px-3 py-1 text-xs font-bold text-indigo-600">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {selectedSessionId && (
        <EditAttendanceModal
          sessionId={selectedSessionId}
          onClose={() => setSelectedSessionId(null)}
          onUpdated={fetchHistory}
        />
      )}
    </div>
  );
}
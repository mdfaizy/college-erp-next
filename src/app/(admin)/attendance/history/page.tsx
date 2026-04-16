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


"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Lock,
  Pencil,
  Eye,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { getAttendanceHistory } from "@/services/attendanceService";
import EditAttendanceModal from "@/components/attendance/EditAttendanceModal";

export default function AttendanceHistoryPage() {
  const [history, setHistory] = useState<any[]>([]);
  const [selectedSessionId, setSelectedSessionId] =
    useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await getAttendanceHistory();
      setHistory(data || []);
    } catch (error) {
      console.error(
        "Failed to load attendance history",
        error
      );
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="rounded-2xl border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-black dark:text-white">
              Attendance History
            </h2>

            <p className="text-sm text-body dark:text-bodydark">
              View and manage previously marked attendance
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-primary">
            <CalendarDays size={18} />
            <span className="font-medium">
              Total Sessions: {history.length}
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-gray-2 dark:bg-meta-4">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Date
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Semester
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Subject
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Period
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Present
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Absent
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {history.length > 0 ? (
                history.map((item) => {
                  const presentCount =
                    item.records?.filter(
                      (r: any) =>
                        r.status === "present"
                    ).length || 0;

                  const absentCount =
                    item.records?.filter(
                      (r: any) =>
                        r.status === "absent"
                    ).length || 0;

                  return (
                    <tr
                      key={item.id}
                      className="border-t border-stroke hover:bg-gray-1 dark:border-strokedark dark:hover:bg-meta-4"
                    >
                      <td className="px-6 py-4">
                        {item.date}
                      </td>

                      <td className="px-6 py-4">
                        Semester{" "}
                        {item.semester?.number ||
                          "-"}
                      </td>

                      <td className="px-6 py-4 font-medium">
                        {item.subject?.name ||
                          "-"}
                      </td>

                      <td className="px-6 py-4">
                        Period {item.period}
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          {presentCount}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">
                          {absentCount}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        {item.canEdit ? (
                          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                            Editable
                          </span>
                        ) : (
                          <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-600 dark:bg-meta-4 dark:text-gray-300">
                            Locked
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              router.push(
                                `/attendance/history/${item.id}`
                              )
                            }
                            className="inline-flex items-center gap-2 rounded-lg bg-info px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90"
                          >
                            <Eye size={16} />
                            View
                          </button>

                          {item.canEdit && (
                            <button
                              onClick={() =>
                                setSelectedSessionId(
                                  item.id
                                )
                              }
                              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90"
                            >
                              <Pencil size={16} />
                              Edit
                            </button>
                          )}

                          {!item.canEdit && (
                            <span className="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-600 dark:bg-meta-4 dark:text-gray-300">
                              <Lock size={14} />
                              Locked
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-12 text-center text-body"
                  >
                    No attendance history found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {selectedSessionId && (
        <EditAttendanceModal
          sessionId={selectedSessionId}
          onClose={() =>
            setSelectedSessionId(null)
          }
          onUpdated={fetchHistory}
        />
      )}
    </div>
  );
}
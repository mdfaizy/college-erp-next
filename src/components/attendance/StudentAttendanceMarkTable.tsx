// interface Props {
//   students: any[];
//   attendanceMap: any;
//   setAttendanceMap: any;
// }

// export default function StudentAttendanceMarkTable({
//   students,
//   attendanceMap,
//   setAttendanceMap,
// }: Props) {
//   const statuses = [
//     "present",
//     "absent",
//     "late",
//     "leave",
//   ];

//   const markAllPresent = () => {
//     const updated: any = {};

//     students.forEach((s) => {
//       updated[s.id] = "present";
//     });

//     setAttendanceMap(updated);
//   };

//   return (
//     <div className="bg-white rounded-xl shadow border">
//       <div className="p-4 flex justify-between">
//         <h2 className="font-bold">Mark Attendance</h2>

//         <button
//           onClick={markAllPresent}
//           className="bg-green-600 text-white px-4 py-2 rounded"
//         >
//           Mark All Present
//         </button>
//       </div>

//       <table className="w-full text-sm">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-3">Student</th>
//             <th className="p-3">Status</th>
//           </tr>
//         </thead>

//         <tbody>
//           {students.map((student) => (
//             <tr key={student.id} className="border-t">
//               <td className="p-3">
//                 {student.user?.name || `Student ${student.id}`}
//               </td>

//               <td className="p-3">
//                 <select
//                   className="border rounded px-3 py-2"
//                   value={
//                     attendanceMap[student.id] || "present"
//                   }
//                   onChange={(e) =>
//                     setAttendanceMap({
//                       ...attendanceMap,
//                       [student.id]: e.target.value,
//                     })
//                   }
//                 >
//                   {statuses.map((status) => (
//                     <option key={status}>
//                       {status}
//                     </option>
//                   ))}
//                 </select>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }



interface Props {
  students: any[];
  attendanceMap: any;
  setAttendanceMap: any;
}

export default function StudentAttendanceMarkTable({
  students,
  attendanceMap,
  setAttendanceMap,
}: Props) {
  const statuses = [
    "present",
    "absent",
    "late",
    "leave",
  ];

  const markAllPresent = () => {
    const updated: any = {};

    students.forEach((student) => {
      updated[student.id] = "present";
    });

    setAttendanceMap(updated);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "text-green-600 dark:text-green-400";
      case "absent":
        return "text-red-600 dark:text-red-400";
      case "late":
        return "text-yellow-600 dark:text-yellow-400";
      case "leave":
        return "text-blue-600 dark:text-blue-400";
      default:
        return "";
    }
  };

  return (
    <div className="rounded-2xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stroke px-6 py-4 dark:border-strokedark">
        <div>
          <h3 className="text-lg font-semibold text-black dark:text-white">
            Mark Attendance
          </h3>
          <p className="text-sm text-body dark:text-bodydark">
            Total Students: {students.length}
          </p>
        </div>

        <button
          onClick={markAllPresent}
          className="rounded-lg bg-success px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90 transition"
        >
          Mark All Present
        </button>
      </div>

      {/* Table */}
      <div className="max-h-[550px] overflow-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-gray-2 dark:bg-meta-4">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-black dark:text-white">
                #
              </th>

              <th className="px-6 py-4 text-left text-sm font-medium text-black dark:text-white">
                Student Name
              </th>

              <th className="px-6 py-4 text-left text-sm font-medium text-black dark:text-white">
                Roll No
              </th>

              <th className="px-6 py-4 text-left text-sm font-medium text-black dark:text-white">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {students.map((student, index) => {
              const selectedStatus =
                attendanceMap[student.id] || "present";

              return (
                <tr
                  key={student.id}
                  className="border-b border-stroke hover:bg-gray-1 dark:border-strokedark dark:hover:bg-meta-4 transition"
                >
                  <td className="px-6 py-4 text-black dark:text-white">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-black dark:text-white">
                        {student.user?.name ||
                          `Student ${student.id}`}
                      </p>

                      <p className="text-xs text-body">
                        ID: {student.id}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-black dark:text-white">
                    {student.academics?.[0]?.rollNo || "-"}
                  </td>

                  <td className="px-6 py-4">
                    <select
                      className={`rounded-lg border border-stroke bg-transparent px-4 py-2 text-sm font-medium outline-none transition dark:border-strokedark dark:bg-form-input ${getStatusColor(
                        selectedStatus
                      )}`}
                      value={selectedStatus}
                      onChange={(e) =>
                        setAttendanceMap({
                          ...attendanceMap,
                          [student.id]:
                            e.target.value,
                        })
                      }
                    >
                      {statuses.map((status) => (
                        <option
                          key={status}
                          value={status}
                        >
                          {status.toUpperCase()}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
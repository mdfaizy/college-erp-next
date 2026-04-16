// interface RecordType {
//   id: number;
//   status: string;
//   subject: string;
//   date: string;
//   period: number;
// }

// export default function AttendanceTable({
//   records,
// }: {
//   records: RecordType[];
// }) {
//   return (
//     <div className="bg-white rounded-xl shadow border overflow-hidden">
//       <table className="w-full text-sm">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-3">Date</th>
//             <th className="p-3">Subject</th>
//             <th className="p-3">Period</th>
//             <th className="p-3">Status</th>
//           </tr>
//         </thead>

//         <tbody>
//           {records.map((r) => (
//             <tr key={r.id} className="border-t">
//               <td className="p-3">{r.date}</td>
//               <td className="p-3">{r.subject}</td>
//               <td className="p-3">{r.period}</td>
//               <td className="p-3 capitalize">
//                 <span
//                   className={`px-2 py-1 rounded text-white ${
//                     r.status === "present"
//                       ? "bg-green-500"
//                       : "bg-red-500"
//                   }`}
//                 >
//                   {r.status}
//                 </span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }


interface RecordType {
  id: number;
  status: string;

  attendanceSession: {
    date: string;
    period: number;

    subject?: {
      name: string;
    };
  };
}

export default function AttendanceTable({
  records,
}: {
  records: RecordType[];
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-4 font-semibold">
              Date
            </th>

            <th className="p-4 font-semibold">
              Subject
            </th>

            <th className="p-4 font-semibold">
              Period
            </th>

            <th className="p-4 font-semibold">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {records.length > 0 ? (
            records.map((record) => (
              <tr
                key={record.id}
                className="border-t"
              >
                <td className="p-4">
                  {new Date(
                    record
                      .attendanceSession
                      ?.date
                  ).toLocaleDateString()}
                </td>

                <td className="p-4">
                  {record
                    .attendanceSession
                    ?.subject?.name ||
                    "N/A"}
                </td>

                <td className="p-4">
                  Period{" "}
                  {
                    record
                      .attendanceSession
                      ?.period
                  }
                </td>

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${
                      record.status ===
                      "present"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {record.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="p-6 text-center text-gray-500"
              >
                No Attendance Records Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
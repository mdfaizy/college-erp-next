"use client";

import { useEffect, useState } from "react";
import { getAttendanceSessionDetails } from "@/services/attendanceService";

interface Props {
  sessionId: number;
  onClose: () => void;
}

export default function ViewAttendanceModal({
  sessionId,
  onClose,
}: Props) {
  const [records, setRecords] = useState<any[]>([]);

  useEffect(() => {
    loadDetails();
  }, []);

  const loadDetails = async () => {
    const data =
      await getAttendanceSessionDetails(sessionId);

    setRecords(data);
  };

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-2xl rounded-xl bg-white p-6 dark:bg-boxdark">
        <div className="mb-5 flex justify-between">
          <h2 className="text-xl font-bold">
            Attendance Details
          </h2>

          <button onClick={onClose}>✕</button>
        </div>

        <table className="w-full">
          <thead>
            <tr>
              <th className="p-3 text-left">
                Student
              </th>
              <th className="p-3 text-left">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td className="p-3">
                  {record.student.user.name}
                </td>

                <td className="p-3 capitalize">
                  {record.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
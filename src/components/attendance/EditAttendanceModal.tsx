"use client";

import { useEffect, useState } from "react";
import {
  getAttendanceSessionDetails,
  updateAttendance,
} from "@/services/attendanceService";

interface Props {
  sessionId: number;
  onClose: () => void;
  onUpdated: () => void;
}

export default function EditAttendanceModal({
  sessionId,
  onClose,
  onUpdated,
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

  const handleStatusChange = (
    recordId: number,
    status: string
  ) => {
    setRecords((prev) =>
      prev.map((record) =>
        record.id === recordId
          ? { ...record, status }
          : record
      )
    );
  };

  const handleSubmit = async () => {
    await updateAttendance(sessionId, {
      records: records.map((r) => ({
        id: r.id,
        status: r.status,
      })),
    });

    onUpdated();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-3xl rounded-xl bg-white p-6 dark:bg-boxdark">
        <div className="mb-4 flex justify-between">
          <h2 className="text-xl font-bold">
            Edit Attendance
          </h2>

          <button onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="max-h-[500px] overflow-auto">
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

                  <td className="p-3">
                    <select
                      value={record.status}
                      onChange={(e) =>
                        handleStatusChange(
                          record.id,
                          e.target.value
                        )
                      }
                      className="rounded border px-3 py-2"
                    >
                      <option value="present">
                        Present
                      </option>
                      <option value="absent">
                        Absent
                      </option>
                      <option value="late">
                        Late
                      </option>
                      <option value="leave">
                        Leave
                      </option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="rounded bg-primary px-5 py-2 text-white"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
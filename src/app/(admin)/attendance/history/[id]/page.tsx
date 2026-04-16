"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Printer, Clock } from "lucide-react";

import {
  getAttendanceSessionDetails,
} from "@/services/attendanceService";

export default function AttendanceDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const [records, setRecords] = useState<any[]>([]);

  useEffect(() => {
    if (id) fetchDetails();
  }, [id]);

  const fetchDetails = async () => {
    const data = await getAttendanceSessionDetails(id);
    setRecords(data || []);
  };

  const presentCount = records.filter(
    (r) => r.status === "present"
  ).length;

  const absentCount = records.filter(
    (r) => r.status === "absent"
  ).length;

  const lateCount = records.filter(
    (r) => r.status === "late"
  ).length;

  const leaveCount = records.filter(
    (r) => r.status === "leave"
  ).length;

  const createdAt =
    records?.[0]?.attendanceSession?.createdAt;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 p-6 print:p-0">
      {/* Header */}
      <div className="rounded-2xl border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark print:hidden">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-black dark:text-white">
              Attendance Details
            </h2>

            <p className="text-sm text-body">
              Session ID: #{id}
            </p>

            {createdAt && (
              <p className="mt-2 flex items-center gap-2 text-sm text-body">
                <Clock size={16} />
                Marked At:{" "}
                {new Date(createdAt).toLocaleString()}
              </p>
            )}
          </div>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-white hover:bg-opacity-90"
          >
            <Printer size={18} />
            Print Attendance
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4 print:hidden">
        <SummaryCard
          title="Present"
          value={presentCount}
          color="green"
        />
        <SummaryCard
          title="Absent"
          value={absentCount}
          color="red"
        />
        <SummaryCard
          title="Late"
          value={lateCount}
          color="yellow"
        />
        <SummaryCard
          title="Leave"
          value={leaveCount}
          color="blue"
        />
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-2 dark:bg-meta-4">
              <tr>
                <th className="px-6 py-4 text-left">
                  #
                </th>
                <th className="px-6 py-4 text-left">
                  Student Name
                </th>
                <th className="px-6 py-4 text-left">
                  Roll No
                </th>
                <th className="px-6 py-4 text-left">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {records.map((record, index) => (
                <tr
                  key={record.id}
                  className="border-b border-stroke dark:border-strokedark"
                >
                  <td className="px-6 py-4">
                    {index + 1}
                  </td>

                  <td className="px-6 py-4 font-medium">
                    {record.student.user.name}
                  </td>

                  <td className="px-6 py-4">
                    {record.student.academics?.[0]
                      ?.rollNo || "-"}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        record.status === "present"
                          ? "bg-green-100 text-green-700"
                          : record.status === "absent"
                          ? "bg-red-100 text-red-700"
                          : record.status === "late"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {records.length === 0 && (
            <div className="p-8 text-center text-body">
              No attendance records found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  const colorMap: any = {
    green:
      "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
    red:
      "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400",
    yellow:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400",
    blue:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
  };

  return (
    <div
      className={`rounded-xl p-5 ${colorMap[color]}`}
    >
      <p className="text-sm font-medium">
        {title}
      </p>
      <h3 className="mt-2 text-2xl font-bold">
        {value}
      </h3>
    </div>
  );
}       
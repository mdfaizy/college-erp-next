"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getStudentAttendance,
} from "@/services/attendanceService";

export default function MyAttendanceCard() {
  const [data, setData] =
    useState<any>(null);

  const studentId = 1;

  useEffect(() => {
    const fetchData =
      async () => {
        const res =
          await getStudentAttendance(
            studentId
          );

        setData(res);
      };

    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="p-4">
        Loading Overall Attendance...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow border p-6">
      <h2 className="text-xl font-bold mb-4">
        Overall Attendance
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card
          title="Total"
          value={
            data.totalClasses
          }
        />
        <Card
          title="Present"
          value={
            data.present
          }
        />
        <Card
          title="Absent"
          value={
            data.absent
          }
        />
        <Card
          title="%"
          value={`${data.percentage}%`}
        />
      </div>

      {data.shortAttendance && (
        <div className="mt-4 p-3 rounded bg-red-50 text-red-700">
          Attendance below 75%
        </div>
      )}
    </div>
  );
}

function Card({
  title,
  value,
}: {
  title: string;
  value: any;
}) {
  return (
    <div className="border rounded-lg p-4 text-center">
      <p className="text-sm text-gray-500">
        {title}
      </p>
      <h3 className="text-xl font-bold">
        {value}
      </h3>
    </div>
  );
}
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getMonthlyAttendance } from "@/services/attendanceService";

import AttendanceFilters from "@/components/attendance/AttendanceFilters";
import AttendanceSummaryCards from "@/components/attendance/AttendanceSummaryCards";
import AttendanceTable from "@/components/attendance/AttendanceTable";
import MyAttendanceCard from "@/components/attendance/MyAttendanceCard";

export default function AttendanceReportsPage() {
  const params = useParams();
  const studentId = Number(params.studentId);

  const [month, setMonth] = useState(4);
  const [year, setYear] = useState(2026);
  const [data, setData] = useState<any>(null);

  const fetchAttendance = async () => {
    const res = await getMonthlyAttendance(
      studentId,
      month,
      year
    );

    setData(res);
  };

  useEffect(() => {
    if (studentId) {
      fetchAttendance();
    }
  }, [studentId, month, year]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold">
        Attendance Report
      </h1>

      <MyAttendanceCard studentId={studentId} />

      <AttendanceFilters
        month={month}
        year={year}
        setMonth={setMonth}
        setYear={setYear}
      />

      <AttendanceSummaryCards
        total={data.totalClasses}
        present={data.present}
        absent={data.absent}
        percentage={data.percentage}
      />

      <AttendanceTable records={data.records} />
    </div>
  );
}
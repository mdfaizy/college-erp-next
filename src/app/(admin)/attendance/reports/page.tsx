"use client";

import { useEffect, useState } from "react";
import {
  getMonthlyAttendance,
} from "@/services/attendanceService";

import AttendanceFilters from "@/components/attendance/AttendanceFilters";
import AttendanceSummaryCards from "@/components/attendance/AttendanceSummaryCards";
import AttendanceTable from "@/components/attendance/AttendanceTable";
import MyAttendanceCard from "@/components/attendance/MyAttendanceCard";

export default function AttendanceReportsPage() {
  const [month, setMonth] = useState(4);
  const [year, setYear] = useState(2026);

  const [data, setData] = useState<any>(null);

  const studentId = 1;

  const fetchAttendance = async () => {
    const res = await getMonthlyAttendance(
      studentId,
      month,
      year
    );

    setData(res);
  };

  useEffect(() => {
    fetchAttendance();
  }, [month, year]);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        Attendance Report
      </h1>
<div className="mb-6">
      <MyAttendanceCard />
    </div>
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
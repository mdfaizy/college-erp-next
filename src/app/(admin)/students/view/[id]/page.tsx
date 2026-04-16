"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getStudentById } from "@/services/studentService";
import { Loader2, UserCircle2 } from "lucide-react";

export default function ViewStudentPage() {
  const { id } = useParams();
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    if (id) fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    const res = await getStudentById(Number(id));
    setStudent(res.data);
  };

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
      </div>
    );
  }

  const active =
    student.academics?.find(
      (a: any) => a.isActive
    ) || student.academics?.[0];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">

        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3">
          <UserCircle2 className="text-brand-500" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Student Application Details
            </h1>
            <p className="text-sm text-gray-500">
              Admission / Profile Summary
            </p>
          </div>
        </div>

        <div className="p-6 space-y-8">

          {/* Personal Details */}
          <Section title="Personal Information">
            <Field label="Name" value={student.user?.name} />
            <Field label="Email" value={student.user?.email} />
            <Field label="Mobile" value={student.mobile} />
            <Field label="DOB" value={student.dob?.split("T")[0]} />
            <Field label="Gender" value={student.gender} />
            <Field label="Aadhar Number" value={student.aadharNumber} />
            <Field label="Blood Group" value={student.bloodGroup} />
            <Field label="Religion" value={student.religion} />
            <Field label="Category" value={student.category} />
            <Field label="Nationality" value={student.nationality} />
          </Section>

          {/* Parent Details */}
          <Section title="Parent / Guardian Information">
            <Field label="Father Name" value={student.fatherName} />
            <Field label="Mother Name" value={student.motherName} />
            <Field label="Father Occupation" value={student.fatherOccupation} />
            <Field label="Mother Occupation" value={student.motherOccupation} />
            <Field label="Guardian Name" value={student.guardianName} />
            <Field label="Guardian Mobile" value={student.guardianMobile} />
            <Field label="Annual Income" value={student.annualIncome} />
          </Section>

          {/* Address */}
          <Section title="Address Information">
            <Field label="Address" value={student.address} />
            <Field label="City" value={student.city} />
            <Field label="State" value={student.state} />
            <Field label="Pincode" value={student.pincode} />
            <Field label="Country" value={student.country} />
          </Section>

          {/* Academic */}
          <Section title="Academic Information">
            <Field label="Course" value={active?.course?.name} />
            <Field label="Department" value={active?.department?.name} />
            <Field label="Semester" value={active?.semesterId} />
            <Field label="Session" value={active?.session?.name} />
            <Field label="Roll Number" value={active?.rollNo} />
            <Field label="Status" value={student.status} />
          </Section>

        </div>
      </div>
    </div>
  );
}

/* -------------------- Reusable Components -------------------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
        {title}
      </h2>

      <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
        <div className="grid md:grid-cols-2">
          {children}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
}: {
  label: string;
  value?: any;
}) {
  return (
    <div className="grid grid-cols-2 border-b border-r border-gray-200 dark:border-gray-800">
      <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 font-medium text-gray-700 dark:text-gray-300">
        {label}
      </div>

      <div className="px-4 py-3 text-gray-800 dark:text-white">
        {value || "-"}
      </div>
    </div>
  );
}
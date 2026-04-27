"use client";

import { useState, useEffect } from "react";
import { updateStudent } from "@/services/studentService";

export default function EditStudentModal({
  student,
  isOpen,
  onClose,
  onSuccess,
}: any) {
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    if (student) {
      setForm({
        name: student.user?.name || "",
        mobile: student.mobile || "",
        status: student.status || "ACTIVE",
        courseId: student.academics?.[0]?.course?.id || "",
        departmentId: student.academics?.[0]?.department?.id || "",
        sessionId: student.academics?.[0]?.session?.id || "",
      });
    }
  }, [student]);

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await updateStudent(student.id, form);
      alert("Updated successfully");
      onSuccess();
      onClose();
    } catch (err) {
      alert("Error updating student");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-[500px] space-y-4">
        <h2 className="text-xl font-semibold">Edit Student</h2>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border p-2 rounded"
        />

        <input
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
          placeholder="Mobile"
          className="w-full border p-2 rounded"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="ACTIVE">ACTIVE</option>
          <option value="SUSPENDED">SUSPENDED</option>
          <option value="DROPPED">DROPPED</option>
        </select>

        <input
          name="courseId"
          value={form.courseId}
          onChange={handleChange}
          placeholder="Course ID"
          className="w-full border p-2 rounded"
        />

        <input
          name="departmentId"
          value={form.departmentId}
          onChange={handleChange}
          placeholder="Department ID"
          className="w-full border p-2 rounded"
        />

        <input
          name="sessionId"
          value={form.sessionId}
          onChange={handleChange}
          placeholder="Session ID"
          className="w-full border p-2 rounded"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
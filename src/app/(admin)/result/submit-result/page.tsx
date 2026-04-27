"use client";

import { useState } from "react";
import {
  submitResult,
} from "@/services/resultService";

export default function SubmitResultPage() {
  const [form, setForm] = useState({
    studentId: "",
    examId: "",
    obtainedMarks: "",
  });

  const handleSubmit = async () => {
    await submitResult({
      studentId: Number(
        form.studentId
      ),
      examId: Number(
        form.examId
      ),
      obtainedMarks: Number(
        form.obtainedMarks
      ),
    });

    alert(
      "Result Submitted Successfully"
    );
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="bg-white p-6 rounded-xl shadow">
        <h1 className="text-xl font-bold mb-4">
          Submit Result
        </h1>

        <input
          type="number"
          placeholder="Student ID"
          className="w-full border p-2 mb-4"
          onChange={(e) =>
            setForm({
              ...form,
              studentId:
                e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Exam ID"
          className="w-full border p-2 mb-4"
          onChange={(e) =>
            setForm({
              ...form,
              examId:
                e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Obtained Marks"
          className="w-full border p-2 mb-4"
          onChange={(e) =>
            setForm({
              ...form,
              obtainedMarks:
                e.target.value,
            })
          }
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit Result
        </button>
      </div>
    </div>
  );
}
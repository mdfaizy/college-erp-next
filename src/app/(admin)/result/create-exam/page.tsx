"use client";

import { useEffect, useState } from "react";

import { createExam } from "@/services/resultService";
import { getSubjectsBySemester } from "@/services/subjectService";

export default function CreateExamPage() {
  const [subjects, setSubjects] =
    useState<any[]>([]);

  const [form, setForm] = useState({
    semesterId: "",
    subjectId: "",
    examName: "",
    totalMarks: "",
    examType: "INTERNAL",
  });

  useEffect(() => {
    if (form.semesterId) {
      fetchSubjectsBySemester();
    } else {
      setSubjects([]);
    }
  }, [form.semesterId]);

  const fetchSubjectsBySemester =
    async () => {
      const data =
        await getSubjectsBySemester(
          Number(form.semesterId)
        );

      setSubjects(data);
    };

  const handleSubmit = async () => {
    if (
      !form.semesterId ||
      !form.subjectId ||
      !form.examName ||
      !form.totalMarks
    ) {
      alert("Fill all fields");
      return;
    }

    await createExam({
      subject: Number(
        form.subjectId
      ),
      examName:
        form.examName,
      totalMarks: Number(
        form.totalMarks
      ),
      examType:
        form.examType,
    });

    alert(
      "Exam Created Successfully"
    );

    setForm({
      semesterId: "",
      subjectId: "",
      examName: "",
      totalMarks: "",
      examType: "INTERNAL",
    });

    setSubjects([]);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="bg-white rounded-2xl shadow border p-6">
        <h1 className="text-2xl font-bold mb-6">
          Create Exam
        </h1>

        {/* Semester */}
        <select
          className="w-full border rounded p-3 mb-4"
          value={form.semesterId}
          onChange={(e) =>
            setForm({
              ...form,
              semesterId:
                e.target.value,
              subjectId: "",
            })
          }
        >
          <option value="">
            Select Semester
          </option>

          {[1,2,3,4,5,6,7,8].map(
            (sem) => (
              <option
                key={sem}
                value={sem}
              >
                Semester {sem}
              </option>
            )
          )}
        </select>

        {/* Subject */}
        <select
          className="w-full border rounded p-3 mb-4"
          value={form.subjectId}
          onChange={(e) =>
            setForm({
              ...form,
              subjectId:
                e.target.value,
            })
          }
          disabled={!form.semesterId}
        >
          <option value="">
            {form.semesterId
              ? "Select Subject"
              : "Select Semester First"}
          </option>

          {subjects.map(
            (subject) => (
              <option
                key={subject.id}
                value={subject.id}
              >
                {subject.name} (
                {subject.code})
              </option>
            )
          )}
        </select>

        {/* Exam Name */}
        <input
          className="w-full border rounded p-3 mb-4"
          placeholder="Exam Name"
          value={form.examName}
          onChange={(e) =>
            setForm({
              ...form,
              examName:
                e.target.value,
            })
          }
        />

        {/* Total Marks */}
        <input
          type="number"
          className="w-full border rounded p-3 mb-4"
          placeholder="Total Marks"
          value={form.totalMarks}
          onChange={(e) =>
            setForm({
              ...form,
              totalMarks:
                e.target.value,
            })
          }
        />

        {/* Exam Type */}
        <select
          className="w-full border rounded p-3 mb-6"
          value={form.examType}
          onChange={(e) =>
            setForm({
              ...form,
              examType:
                e.target.value,
            })
          }
        >
          <option value="INTERNAL">
            Internal
          </option>
          <option value="MIDTERM">
            Mid Term
          </option>
          <option value="FINAL">
            Final
          </option>
        </select>

        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white rounded py-3"
        >
          Create Exam
        </button>
      </div>
    </div>
  );
}
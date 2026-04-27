"use client";

import { useEffect, useState } from "react";
import {
  deleteSubject,
  getSubjects,
  getSubjectsBySemester,
} from "@/services/subjectService";
import { useRouter } from "next/navigation";

interface Subject {
  id: number;
  name: string;
  code: string;
  semester?: {
    id: number;
    name: string;
  };
}

export default function SubjectListPage() {
  const router = useRouter();

  const [subjects, setSubjects] =
    useState<Subject[]>([]);

  const [semesterId, setSemesterId] =
    useState("");

  const fetchSubjects = async () => {
    const data = semesterId
      ? await getSubjectsBySemester(
          Number(semesterId)
        )
      : await getSubjects();
console.log(data);
    setSubjects(data);
  };

  useEffect(() => {
    fetchSubjects();
  }, [semesterId]);

  const handleDelete = async (
    id: number
  ) => {
    if (
      !confirm(
        "Delete this subject?"
      )
    )
      return;

    await deleteSubject(id);

    fetchSubjects();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Subject List
        </h1>

        <button
          onClick={() =>
            router.push(
              "/subjects/create"
            )
          }
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Subject
        </button>
      </div>

      {/* Semester Filter */}
      <div className="mb-4">
        <input
          type="number"
          placeholder="Filter By Semester ID"
          value={semesterId}
          onChange={(e) =>
            setSemesterId(
              e.target.value
            )
          }
          className="border p-2 rounded"
        />
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-3">
              ID
            </th>
            <th className="border p-3">
              Name
            </th>
            <th className="border p-3">
              Code
            </th>
            <th className="border p-3">
              Semester
            </th>
            <th className="border p-3">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {subjects.map(
            (subject) => (
              <tr
                key={subject.id}
              >
                <td className="border p-3">
                  {subject.id}
                </td>
                <td className="border p-3">
                  {subject.name}
                </td>
                <td className="border p-3">
                  {subject.code}
                </td>
                <td className="border p-3">
                  {subject.semester
                    ?.name || "-"}
                </td>
                <td className="border p-3 flex gap-2">
                  <button
                    onClick={() =>
                      router.push(
                        `/subjects/edit/${subject.id}`
                      )
                    }
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(
                        subject.id
                      )
                    }
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
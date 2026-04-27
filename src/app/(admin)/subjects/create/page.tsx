"use client";

import { useState } from "react";
import { createSubject } from "@/services/subjectService";
import { useRouter } from "next/navigation";

export default function CreateSubjectPage() {
  const router = useRouter();

  const [formData, setFormData] =
    useState({
      name: "",
      code: "",
      semesterId: "",
    });

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    await createSubject({
      ...formData,
      semesterId: Number(
        formData.semesterId
      ),
    });

    router.push(
      "/subjects/list"
    );
  };

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-6">
        Create Subject
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Subject Name"
          className="w-full border p-3 rounded"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value,
            })
          }
        />

        <input
          type="text"
          placeholder="Subject Code"
          className="w-full border p-3 rounded"
          value={formData.code}
          onChange={(e) =>
            setFormData({
              ...formData,
              code: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Semester ID"
          className="w-full border p-3 rounded"
          value={formData.semesterId}
          onChange={(e) =>
            setFormData({
              ...formData,
              semesterId:
                e.target.value,
            })
          }
        />

        <button className="bg-blue-600 text-white px-6 py-3 rounded">
          Create Subject
        </button>
      </form>
    </div>
  );
}
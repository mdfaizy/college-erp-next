"use client";

import {
  getSubjectById,
  updateSubject,
} from "@/services/subjectService";

import { getSemesters } from "@/services/semesterService";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  useEffect,
  useState,
} from "react";

interface Semester {
  id: number;
  name: string;
}

export default function EditSubjectPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [semesters, setSemesters] =
    useState<Semester[]>([]);

  const [formData, setFormData] =
    useState({
      name: "",
      code: "",
      semesterId: "",
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [
          subject,
          semesterList,
        ] = await Promise.all([
          getSubjectById(
            Number(id)
          ),
          getSemesters(),
        ]);

        if (!subject) return;

        setSemesters(
          semesterList
        );

        setFormData({
          name:
            subject.name ||
            "",
          code:
            subject.code ||
            "",
          semesterId:
            subject.semester?.id?.toString() ||
            "",
        });
      } catch (error) {
        console.error(
          "Fetch Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      await updateSubject(
        Number(id),
        {
          ...formData,
          semesterId: Number(
            formData.semesterId
          ),
        }
      );

      router.push(
        "/subjects/list"
      );
    } catch (error) {
      console.error(
        "Update Error:",
        error
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow border p-8">
        <h1 className="text-2xl font-bold mb-6">
          Edit Subject
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="block mb-2">
              Subject Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name:
                    e.target.value,
                })
              }
              className="w-full border rounded px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2">
              Subject Code
            </label>
            <input
              type="text"
              value={formData.code}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  code:
                    e.target.value,
                })
              }
              className="w-full border rounded px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2">
              Semester
            </label>
            <select
              value={
                formData.semesterId
              }
              onChange={(e) =>
                setFormData({
                  ...formData,
                  semesterId:
                    e.target.value,
                })
              }
              className="w-full border rounded px-4 py-3"
            >
              <option value="">
                Select Semester
              </option>

              {semesters.map(
                (
                  semester
                ) => (
                  <option
                    key={
                      semester.id
                    }
                    value={
                      semester.id
                    }
                  >
                    {
                      semester.name
                    }
                  </option>
                )
              )}
            </select>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={
                submitting
              }
              className="bg-green-600 text-white px-6 py-3 rounded"
            >
              {submitting
                ? "Updating..."
                : "Update"}
            </button>

            <button
              type="button"
              onClick={() =>
                router.back()
              }
              className="bg-gray-500 text-white px-6 py-3 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
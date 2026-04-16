
"use client";

import { useEffect, useState } from "react";
import { getCourses } from "@/services/courseService";

interface Course {
  id: number;
  name: string;
  code: string;
}

export default function CourseListPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await getCourses();
console.log(res)

      // ✅ Safe data handling
      setCourses(res||res?.data || []);
      
    } catch (err) {
      console.error("Error fetching courses", err);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

 

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      
      <div className="bg-white shadow-xl rounded-2xl p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Course List
          </h2>

          <span className="text-sm text-gray-500">
            Total: {courses?.length || 0}
          </span>
        </div>

        {/* Table */}
        {loading ? (
          <p className="text-center py-6">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border rounded-xl overflow-hidden">
              
              {/* Head */}
              <thead className="bg-purple-600 text-white">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3 text-left">Course Name</th>
                  <th className="p-3 text-left">Code</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {courses.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center p-6 text-gray-500">
                      No Courses Found
                    </td>
                  </tr>
                ) : (
                  courses.map((course, index) => (
                    <tr
                      key={course.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="p-3">{index + 1}</td>

                      {/* Name */}
                      <td className="p-3 font-medium">
                        {course.name}
                      </td>

                      {/* Code */}
                      <td className="p-3">
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm">
                          {course.code}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-3 text-center space-x-2">
                        <button className="bg-yellow-400 px-3 py-1 rounded text-white hover:bg-yellow-500">
                          Edit
                        </button>

                        <button
                        
                          className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
}
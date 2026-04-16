"use client";

import { useEffect, useState, useCallback } from "react";
import { createDepartment } from "@/services/departmentService";
import { getCourses } from "@/services/courseService";
import { 
  Building2, 
  Plus, 
  RefreshCw, 
  Loader2,
  BookOpen,
  ChevronRight
} from "lucide-react";

interface Course {
  id: string;
  name: string;
  code: string;
}



export default function DepartmentPage() {
  const [form, setForm] = useState({
    name: "",
    courseId: "",
  });
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fetchCourses = useCallback(async () => {
    try {
      const result = await getCourses();
      console.log("Full Response:", result);
    console.log("Actual Data:", result.data);
    //   if (result?.success && result.data) {
        setCourses(result);
    //   }
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  }, []);
  useEffect(() => {
    fetchCourses();
  }, [ fetchCourses]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
    if (success) setSuccess("");
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      setError("Department name is required");
      return false;
    }
    if (!form.courseId) {
      setError("Please select a course");
      return false;
    }
    return true;
  };
  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const result = await createDepartment({
        name: form.name,
       courseId: Number(form.courseId),     
      });
      
      if (result?.success) {
        setSuccess("Department created successfully!");
        setForm({ name: "", courseId: "" });
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(result?.message || "Failed to create department");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
console.log({
  name: form.name,
  courseId: Number(form.courseId),
});

  const handleReset = () => {
    setForm({ name: "", courseId: "" });
    setError("");
    setSuccess("");
   
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-2xl mb-4 shadow-lg">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Department Management</h1>
          <p className="text-gray-600">Create and manage academic departments</p>
        </div>

        
          {/* Create Department Form */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Plus className="w-5 h-5 mr-2 text-emerald-600" />
                Create New Department
              </h2>
              {/* Form Fields */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Department Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building2 className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g., Computer Science, Mechanical Engineering"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 outline-none"
                      disabled={loading}
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Enter the full name of the department</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Associated Course <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <BookOpen className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      name="courseId"
                      value={form.courseId}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 outline-none appearance-none bg-white"
                      disabled={loading}
                    >
                      <option value="">Select a course</option>
                      {courses.map((course) => (
                        <option key={course.id} value={course.id}>
                          {course.name} ({course.code})
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Select the course this department belongs to</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex gap-3">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-md"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Creating...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Plus className="w-5 h-5 mr-2" />
                      Create Department
                    </span>
                  )}
                </button>
                
                <button
                  onClick={handleReset}
                  disabled={loading}
                  className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

      </div>
    </div>
  );
}
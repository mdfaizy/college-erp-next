"use client";

import { useState } from "react";
import { createCourse } from "@/services/courseService";
import { 
  BookOpen, 
  Hash, 
  Plus, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle,
  Loader2,
  FileText
} from "lucide-react";

export default function CoursePage() {
  const [form, setForm] = useState({
    name: "",
    code: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear errors when user starts typing
    if (error) setError("");
    if (success) setSuccess("");
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      setError("Course name is required");
      return false;
    }
    if (!form.code.trim()) {
      setError("Course code is required");
      return false;
    }
    if (form.code.length < 3) {
      setError("Course code must be at least 3 characters");
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
      const result = await createCourse(form);
      
      if (result?.success) {
        setSuccess("Course created successfully!");
        setForm({ name: "", code: "" });
        // Auto clear success message after 3 seconds
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(result?.message || "Failed to create course");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm({ name: "", code: "" });
    setError("");
    setSuccess("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Course</h1>
          <p className="text-gray-600">Fill in the details to add a new course</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-8">
            {/* Alert Messages */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-shake">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-green-700 text-sm">{success}</span>
                </div>
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Course Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileText className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g., Web Development, Data Science"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none"
                    disabled={loading}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">Enter the full name of the course</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Course Code <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Hash className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="code"
                    type="text"
                    value={form.code}
                    onChange={handleChange}
                    placeholder="e.g., CS101, WEB202"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none uppercase"
                    disabled={loading}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">Unique identifier for the course (min. 3 characters)</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-3">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-md"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Creating Course...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Plus className="w-5 h-5 mr-2" />
                    Create Course
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

        {/* Info Section */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            By creating a course, you agree to our 
            <a href="#" className="text-blue-600 hover:underline mx-1">Terms</a>
            and
            <a href="#" className="text-blue-600 hover:underline mx-1">Privacy Policy</a>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
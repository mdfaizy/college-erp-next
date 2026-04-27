//   "use client";

//   import { useEffect, useState } from "react";
//   import { useParams, useRouter } from "next/navigation";
//   import {
//     getStudentById,
//     updateStudent,
//   } from "@/services/studentService";

//   import {
//     getCourses,
  
//   } from "@/services/courseService";
//   import { getSessions

//   } from "@/services/sessionService";
//   import { getDepartments } from "@/services/departmentService";
//   export default function EditStudentPage() {
//     const { id } = useParams();
//     const router = useRouter();

//     const [form, setForm] = useState<any>({});
//     const [loading, setLoading] = useState(true);

//     const [courses, setCourses] = useState<any[]>([]);
//     const [departments, setDepartments] = useState<any[]>([]);
//     const [sessions, setSessions] = useState<any[]>([]);

//     // 🔥 Load student + master data
//     useEffect(() => {
//       const loadData = async () => {
//         try {
//          const [studentRes, c, d, s] = await Promise.all([
//   getStudentById(Number(id)),
//   getCourses(),
//   getDepartments(),
//   getSessions(),
// ]);

// const student = studentRes.data;

// const coursesData = c;
// const departmentsData = d?.data || d;
// const sessionsData = s?.data || s;

// console.log("courseId:", form.courseId);
// console.log("courses:", courses);
// console.log("COURSE API:", c);
// setCourses(coursesData);
// setDepartments(departmentsData);
// setSessions(sessionsData);

// // 🔥 form AFTER dropdown loaded
// setForm({
//   name: student.user?.name || "",
//   mobile: student.mobile || "",
//   status: student.status || "ACTIVE",
//   courseId: Number(student.academics?.[0]?.course?.id) || "",
//   departmentId: Number(student.academics?.[0]?.department?.id) || "",
//   sessionId: Number(student.academics?.[0]?.session?.id) || "",
// });

//         } catch (err) {
//           console.log(err);
//           alert("Failed to load data");
//         } finally {
//           setLoading(false);
//         }
//       };

//       if (id) loadData();
//     }, [id]);

//     // 🔥 handle change
//     const handleChange = (e: any) => {
//       const { name, value } = e.target;

//       setForm({
//         ...form,
//         [name]:
//           name.includes("Id") ? Number(value) : value,
//       });
//     };

//     // 🔥 submit
//     const handleSubmit = async () => {
//       try {
//         await updateStudent(Number(id), form);

//         alert("Student updated successfully");

//         router.push("/students");
//       } catch (err) {
//         alert("Update failed");
//       }
//     };

//     if (loading) return <p className="p-5">Loading...</p>;

//     return (
//       <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
//         <h2 className="text-2xl font-bold mb-4">
//           Edit Student
//         </h2>

//         {/* Name */}
//         <input
//           name="name"
//           value={form.name}
//           onChange={handleChange}
//           placeholder="Name"
//           className="w-full mb-3 border p-2 rounded"
//         />

//         {/* Mobile */}
//         <input
//           name="mobile"
//           value={form.mobile}
//           onChange={handleChange}
//           placeholder="Mobile"
//           className="w-full mb-3 border p-2 rounded"
//         />

//         {/* Status */}
//         <select
//           name="status"
//           value={form.status}
//           onChange={handleChange}
//           className="w-full mb-3 border p-2 rounded"
//         >
//           <option value="ACTIVE">ACTIVE</option>
//           <option value="SUSPENDED">SUSPENDED</option>
//           <option value="DROPPED">DROPPED</option>
//           <option value="GRADUATED">GRADUATED</option>
//         </select>

//         {/* Course Dropdown */}
//         <select
//           name="courseId"
//           value={form.courseId}
//           onChange={handleChange}
//           className="w-full mb-3 border p-2 rounded"
//         >
//           <option value="">Select Course</option>
//           {courses.map((c: any) => (
//             <option key={c.id} value={c.id}>
//               {c.name}
//             </option>
//           ))}
//         </select>

//         {/* Department Dropdown */}
//         <select
//           name="departmentId"
//           value={form.departmentId}
//           onChange={handleChange}
//           className="w-full mb-3 border p-2 rounded"
//         >
//           <option value="">Select Department</option>
//           {departments.map((d: any) => (
//             <option key={d.id} value={d.id}>
//               {d.name}
//             </option>
//           ))}
//         </select>

//         {/* Session Dropdown */}
//         <select
//           name="sessionId"
//           value={form.sessionId}
//           onChange={handleChange}
//           className="w-full mb-3 border p-2 rounded"
//         >
//           <option value="">Select Session</option>
//           {sessions.map((s: any) => (
//             <option key={s.id} value={s.id}>
//               {s.name}
//             </option>
//           ))}
//         </select>

//         {/* Buttons */}
//         <div className="flex gap-2">
//           <button
//             onClick={() => router.back()}
//             className="px-4 py-2 border rounded"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={handleSubmit}
//             className="px-4 py-2 bg-blue-600 text-white rounded"
//           >
//             Update
//           </button>
//         </div>
//       </div>
//     );
//   }



"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getStudentById, updateStudent } from "@/services/studentService";
import { getCourses } from "@/services/courseService";
import { getSessions } from "@/services/sessionService";
import { getDepartments } from "@/services/departmentService";

// UI Components
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select"
import Form from "@/components/form/Form";

export default function EditStudentPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<any>({
    name: "",
    mobile: "",
    status: "ACTIVE",
    courseId: "",
    departmentId: "",
    sessionId: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [courses, setCourses] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [studentRes, c, d, s] = await Promise.all([
          getStudentById(Number(id)),
          getCourses(),
          getDepartments(),
          getSessions(),
        ]);

        const student = studentRes.data;
        
        // Handle API data variations
        setCourses(c?.data || c || []);
        setDepartments(d?.data || d || []);
        setSessions(s?.data || s || []);

        setForm({
          name: student.user?.name || "",
          mobile: student.mobile || "",
          status: student.status || "ACTIVE",
          courseId: String(student.academics?.[0]?.course?.id || ""),
          departmentId: String(student.academics?.[0]?.department?.id || ""),
          sessionId: String(student.academics?.[0]?.session?.id || ""),
        });
      } catch (err) {
        console.error(err);
        alert("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    if (id) loadData();
  }, [id]);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      // Data ko format karna (Numbers mein convert karna jahan zaroorat ho)
      const payload = {
        ...form,
        courseId: Number(form.courseId),
        departmentId: Number(form.departmentId),
        sessionId: Number(form.sessionId),
      };

      await updateStudent(Number(id), payload);
      alert("Student updated successfully");
      router.push("/students");
    } catch (err) {
      alert("Update failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Edit Student Profile
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Update student's personal and academic information.
          </p>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <Form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-1">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              {/* Mobile */}
              <div className="space-y-1">
                <Label htmlFor="mobile">Phone Number</Label>
                <Input
                  id="mobile"
                  name="mobile"
                  placeholder="e.g. +91 9876543210"
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                />
              </div>

              {/* Status */}
              <div className="space-y-1">
                <Label htmlFor="status">Student Status</Label>
                <Select
                  options={[
                    { value: "ACTIVE", label: "Active" },
                    { value: "SUSPENDED", label: "Suspended" },
                    { value: "DROPPED", label: "Dropped" },
                    { value: "GRADUATED", label: "Graduated" },
                  ]}
                  value={form.status}
                  onChange={(val) => setForm({ ...form, status: val })}
                />
              </div>

              {/* Course */}
              <div className="space-y-1">
                <Label htmlFor="courseId">Course</Label>
                <Select
                  placeholder="Select Course"
                  options={courses.map((c) => ({ value: String(c.id), label: c.name }))}
                  value={form.courseId}
                  onChange={(val) => setForm({ ...form, courseId: val })}
                />
              </div>

              {/* Department */}
              <div className="space-y-1">
                <Label htmlFor="departmentId">Department</Label>
                <Select
                  placeholder="Select Department"
                  options={departments.map((d) => ({ value: String(d.id), label: d.name }))}
                  value={form.departmentId}
                  onChange={(val) => setForm({ ...form, departmentId: val })}
                />
              </div>

              {/* Session */}
              <div className="space-y-1">
                <Label htmlFor="sessionId">Academic Session</Label>
                <Select
                  placeholder="Select Session"
                  options={sessions.map((s) => ({ value: String(s.id), label: s.name }))}
                  value={form.sessionId}
                  onChange={(val) => setForm({ ...form, sessionId: val })}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100 dark:border-gray-800">
              <button
                type="button"
                onClick={() => router.push(`/students/list/`)}
                className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-50"
              >
                {submitting ? "Saving Changes..." : "Update Student"}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
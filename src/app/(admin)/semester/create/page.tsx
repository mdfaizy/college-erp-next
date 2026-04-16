// "use client";

// import { useEffect, useState } from "react";
// import { createSemester } from "@/services/semesterService";
// import { getCourses } from "@/services/courseService";

// export default function SemesterPage() {
//   const [form, setForm] = useState({
//     name: "",
//     number: "",
//     courseId: "",
//   });

//   const [courses, setCourses] = useState([]);
// useEffect(() => {
//   getCourses().then((res) => {
//     console.log(res); // 👈 yaha check karo structure
//     setCourses(res);
//   });
// }, []);

//   const handleSubmit = async () => {
//     if (!form.name || !form.number || !form.courseId) {
//       alert("All fields are required");
//       return;
//     }

//     await createSemester({
//       name: form.name,
//       number: Number(form.number),
//       courseId: form.courseId,
//     });

//     alert("Semester Created ✅");

//     // reset form
//     setForm({
//       name: "",
//       number: "",
//       courseId: "",
//     });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
//           Create Semester
//         </h2>

//         {/* Name */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-600 mb-1">
//             Semester Name
//           </label>
//           <input
//             type="text"
//             value={form.name}
//             placeholder="Enter semester name"
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             onChange={(e) =>
//               setForm({ ...form, name: e.target.value })
//             }
//           />
//         </div>

//         {/* Number */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-600 mb-1">
//             Semester Number
//           </label>
//           <input
//             type="number"
//             value={form.number}
//             placeholder="Enter semester number"
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             onChange={(e) =>
//               setForm({ ...form, number: e.target.value })
//             }
//           />
//         </div>

//         {/* Course */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-600 mb-1">
//             Select Course
//           </label>
//           <select
//             value={form.courseId}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             onChange={(e) =>
//               setForm({ ...form, courseId: e.target.value })
//             }
//           >
//             <option value="">-- Select Course --</option>
//             {courses.map((c: any) => (
//               <option key={c.id} value={c.id}>
//                 {c.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Button */}
//         <button
//           onClick={handleSubmit}
//           className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
//         >
//           Create Semester
//         </button>
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { createSemester } from "@/services/semesterService";
import { getCourses } from "@/services/courseService";
import { GraduationCap } from "lucide-react";
import { toast } from "react-hot-toast";

export default function SemesterPage() {
  const [form, setForm] = useState({
    name: "",
    number: "",
    courseId: "",
  });

  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCourses().then((res) => {
      setCourses(res || []);
    });
  }, []);

  const handleSubmit = async () => {
    if (!form.name || !form.number || !form.courseId) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await createSemester({
        name: form.name,
        number: Number(form.number),
        courseId: Number(form.courseId),
      });

      toast.success("Semester Created Successfully ✅");

      setForm({
        name: "",
        number: "",
        courseId: "",
      });

    } catch (err) {
      toast.error("Failed to create semester");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex justify-center items-center p-6">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl p-8">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-500/20">
            <GraduationCap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              Create Semester
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Add new semester for a course
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6">

          {/* Semester Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              Semester Name
            </label>
            <input
              type="text"
              value={form.name}
              placeholder="e.g. Semester 1"
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Semester Number */}
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              Semester Number
            </label>
            <input
              type="number"
              value={form.number}
              placeholder="e.g. 1"
              onChange={(e) =>
                setForm({
                  ...form,
                  number: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Course Select */}
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              Select Course
            </label>

            <select
              value={form.courseId}
              onChange={(e) =>
                setForm({
                  ...form,
                  courseId: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option value="">-- Select Course --</option>

              {courses.map((course) => (
                <option
                  key={course.id}
                  value={course.id}
                >
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Semester"}
          </button>

        </div>
      </div>
    </div>
  );
}
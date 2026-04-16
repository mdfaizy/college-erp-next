// "use client";

// import { useEffect, useState } from "react";
// import { getStudents, deleteStudent } from "@/services/studentService";

// export default function StudentListPage() {
//   const [students, setStudents] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   const fetchStudents = async () => {
//     try {
//       setLoading(true);
//       const res = await getStudents();

//       // ✅ IMPORTANT
//      setStudents(res?.data || []);

//     } catch (err) {
//       console.error("Error fetching students", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const handleDelete = async (id: number) => {
//     if (!confirm("Delete this student?")) return;

//     try {
//       await deleteStudent(id);
//       fetchStudents();
//     } catch (err) {
//       alert("Delete failed ❌");
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
      
//       <div className="bg-white shadow-xl rounded-2xl p-6">

//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">
//             Student List
//           </h2>

//           <span className="text-sm text-gray-500">
//             Total: {students.length}
//           </span>
//         </div>

//         {/* Table */}
//         {loading ? (
//           <p className="text-center py-6">Loading...</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full border rounded-xl overflow-hidden">
              
//               {/* Head */}
//               <thead className="bg-blue-600 text-white">
//                 <tr>
//                   <th className="p-3">#</th>
//                   <th className="p-3 text-left">Name</th>
//                   <th className="p-3 text-left">Mobile</th>
//                   <th className="p-3 text-left">Address</th>
//                   <th className="p-3 text-left">Course</th>
//                   <th className="p-3 text-left">Department</th>
//                   <th className="p-3 text-left">Session</th>
//                   <th className="p-3 text-center">Actions</th>
//                 </tr>
//               </thead>

//               {/* Body */}
//               <tbody>
//                 {students.length === 0 ? (
//                   <tr>
//                     <td colSpan={8} className="text-center p-6 text-gray-500">
//                       No Students Found
//                     </td>
//                   </tr>
//                 ) : (
//                   students.map((stu, index) => {
                    
//                     // ✅ ACTIVE ACADEMIC
//                     const active = stu.academics?.find(
//                       (a: any) => a.isActive
//                     );

//                     return (
//                       <tr
//                         key={stu.id}
//                         className="border-b hover:bg-gray-50 transition"
//                       >
//                         <td className="p-3">{index + 1}</td>

//                         {/* Name */}
//                         <td className="p-3 font-medium">
//                           {stu.user?.name}
//                         </td>

//                         {/* Mobile */}
//                         <td className="p-3">{stu.mobile}</td>

//                         {/* Address */}
//                         <td className="p-3">{stu.address}</td>

//                         {/* Course */}
//                         <td className="p-3">
//                           {active?.course?.name || "N/A"}
//                         </td>

//                         {/* Department */}
//                         <td className="p-3">
//                           {active?.department?.name || "N/A"}
//                         </td>

//                         {/* Session */}
//                         <td className="p-3">
//                           <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
//                             {active?.session?.name || "N/A"}
//                           </span>
//                         </td>

//                         {/* Actions */}
//                         <td className="p-3 text-center space-x-2">
//                           <button className="bg-yellow-400 px-3 py-1 rounded text-white hover:bg-yellow-500">
//                             Edit
//                           </button>

//                           <button
//                             onClick={() => handleDelete(stu.id)}
//                             className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
//                           >
//                             Delete
//                           </button>
//                         </td>
//                       </tr>
//                     );
//                   })
//                 )}
//               </tbody>

//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import {
  getStudents,
  deleteStudent,
} from "@/services/studentService";
import { useRouter } from "next/navigation";

import {
  Loader2,
  Pencil,
  Trash2,
  Users,
} from "lucide-react";
import { Eye } from "lucide-react";

import { toast } from "react-hot-toast";

export default function StudentListPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const fetchStudents = async () => {
    try {
      setLoading(true);

      const res = await getStudents();
      console.log('res student',res);
      setStudents(res?.data || []);
    } catch (err) {
      toast.error("Failed to fetch students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = confirm(
      "Delete this student?"
    );

    if (!confirmed) return;

    try {
      await deleteStudent(id);

      toast.success("Student deleted");
      fetchStudents();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
              Students
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Manage all registered students
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 shadow-sm text-sm text-slate-600 dark:text-slate-300">
            Total Students:{" "}
            <span className="font-semibold">
              {students.length}
            </span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">

          {/* Top Bar */}
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40">
            <div className="flex items-center gap-3">
              <Users className="text-indigo-600" size={20} />
              <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                Student Records
              </h2>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              <thead className="bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400">
                <tr>
                  <th className="p-4 text-left">#</th>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Mobile</th>
                  <th className="p-4 text-left">Address</th>
                  <th className="p-4 text-left">Course</th>
                  <th className="p-4 text-left">Department</th>
                  <th className="p-4 text-left">Session</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>

                {loading ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="text-center py-10"
                    >
                      <div className="flex justify-center gap-2 text-slate-500 dark:text-slate-400">
                        <Loader2 className="animate-spin w-5 h-5" />
                        Loading Students...
                      </div>
                    </td>
                  </tr>
                ) : students.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="text-center py-10 text-slate-500 dark:text-slate-400"
                    >
                      No Students Found
                    </td>
                  </tr>
                ) : (
                  students.map((stu, index) => {
                    const active =
                      stu.academics?.find(
                        (a: any) => a.isActive
                      );

                    return (
                      <tr
                        key={stu.id}
                        className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition"
                      >
                        <td className="p-4 dark:text-slate-300">
                          {index + 1}
                        </td>

                        <td className="p-4 font-medium text-slate-800 dark:text-white">
                          {stu.user?.name}
                        </td>

                        <td className="p-4 dark:text-slate-300">
                          {stu.mobile}
                        </td>

                        <td className="p-4 dark:text-slate-300">
                          {stu.address}
                        </td>

                        <td className="p-4 dark:text-slate-300">
                          {active?.course?.name || "N/A"}
                        </td>

                        <td className="p-4 dark:text-slate-300">
                          {active?.department?.name || "N/A"}
                        </td>

                        <td className="p-4">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300">
                            {active?.session?.name || "N/A"}
                          </span>
                        </td>

                        {/* <td className="p-4">
                          <div className="flex justify-center gap-2">

                            <button className="p-2 rounded-lg bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300 hover:bg-yellow-200 transition">
                              <Pencil size={15} />
                            </button>

                            <button
                              onClick={() =>
                                handleDelete(stu.id)
                              }
                              className="p-2 rounded-lg bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300 hover:bg-red-200 transition"
                            >
                              <Trash2 size={15} />
                            </button>

                          </div>
                        </td> */}


                        <td className="p-4">
  <div className="flex justify-center gap-2">

    {/* VIEW */}
    <button
      onClick={() =>
        router.push(
          `/students/view/${stu.id}`
        )
      }
      className="p-2 rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 hover:bg-blue-200 transition"
    >
      <Eye size={15} />
    </button>

    {/* EDIT */}
    <button
      onClick={() =>
        router.push(
          `/admin/students/edit/${stu.id}`
        )
      }
      className="p-2 rounded-lg bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300 hover:bg-yellow-200 transition"
    >
      <Pencil size={15} />
    </button>

    {/* DELETE */}
    <button
      onClick={() =>
        handleDelete(stu.id)
      }
      className="p-2 rounded-lg bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300 hover:bg-red-200 transition"
    >
      <Trash2 size={15} />
    </button>

  </div>
</td>
                      </tr>
                    );
                  })
                )}

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
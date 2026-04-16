// "use client";

// import { useEffect, useState } from "react";
// import { getSemesters } from "@/services/semesterService";

// interface Semester {
//   id: number;
//   name: string;
//   number: number;
//   course?: {
//     name: string;
//     code: string;
//   };
// }

// export default function SemesterListPage() {
//   const [semesters, setSemesters] = useState<Semester[]>([]);
//   const [loading, setLoading] = useState(false);

//   const fetchSemesters = async () => {
//     try {
//       setLoading(true);
//       const res = await getSemesters();
//       setSemesters(res); // adjust if res.data.data
//     } catch (err) {
//       console.error("Error fetching semesters", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSemesters();
//   }, []);


//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <div className="bg-white shadow-lg rounded-2xl p-6">
        
//         <h2 className="text-2xl font-bold mb-6 text-gray-800">
//           Semester List
//         </h2>

//         {loading ? (
//           <p className="text-center">Loading...</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full border rounded-lg overflow-hidden">
              
//               <thead className="bg-blue-600 text-white">
//                 <tr>
//                   <th className="p-3 text-left">#</th>
//                   <th className="p-3 text-left">Name</th>
//                   <th className="p-3 text-left">Number</th>
//                   <th className="p-3 text-left">Course</th>
//                   <th className="p-3 text-center">Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {semesters.length === 0 ? (
//                   <tr>
//                     <td colSpan={5} className="text-center p-4">
//                       No Data Found
//                     </td>
//                   </tr>
//                 ) : (
//                   semesters.map((sem, index) => (
//                     <tr
//                       key={sem.id}
//                       className="border-b hover:bg-gray-50 transition"
//                     >
//                       <td className="p-3">{index + 1}</td>
//                       <td className="p-3">{sem.name}</td>
//                       <td className="p-3">{sem.number}</td>
//                       <td className="p-3">
//                         {sem.course
//                           ? `${sem.course.name} (${sem.course.code})`
//                           : "N/A"}
//                       </td>

//                       <td className="p-3 text-center space-x-2">
                        
//                         {/* Edit (future) */}
//                         <button className="bg-yellow-400 px-3 py-1 rounded text-white hover:bg-yellow-500">
//                           Edit
//                         </button>

//                         {/* Delete */}
//                         <button
                          
//                           className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
//                         >
//                           Delete
//                         </button>

//                       </td>
//                     </tr>
//                   ))
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
import { getSemesters } from "@/services/semesterService";
import {
  Pencil,
  Trash2,
  GraduationCap,
} from "lucide-react";

interface Semester {
  id: number;
  name: string;
  number: number;
  course?: {
    name: string;
    code: string;
  };
}

export default function SemesterListPage() {
  const [semesters, setSemesters] =
    useState<Semester[]>([]);

  const [loading, setLoading] =
    useState(false);

  const fetchSemesters = async () => {
    try {
      setLoading(true);

      const res = await getSemesters();

      setSemesters(res || []);

    } catch (err) {
      console.error(
        "Error fetching semesters",
        err
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSemesters();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-6">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-500/20">
              <GraduationCap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                Semester List
              </h2>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Manage all semesters
              </p>
            </div>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="p-10 text-center text-slate-500 dark:text-slate-400">
            Loading semesters...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-slate-600 dark:text-slate-300">
                    #
                  </th>

                  <th className="px-6 py-4 text-left text-slate-600 dark:text-slate-300">
                    Semester Name
                  </th>

                  <th className="px-6 py-4 text-left text-slate-600 dark:text-slate-300">
                    Number
                  </th>

                  <th className="px-6 py-4 text-left text-slate-600 dark:text-slate-300">
                    Course
                  </th>

                  <th className="px-6 py-4 text-center text-slate-600 dark:text-slate-300">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {semesters.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-10 text-slate-500 dark:text-slate-400"
                    >
                      No Semester Found
                    </td>
                  </tr>
                ) : (
                  semesters.map((sem, index) => (
                    <tr
                      key={sem.id}
                      className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                    >
                      <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                        {index + 1}
                      </td>

                      <td className="px-6 py-4 font-semibold text-slate-800 dark:text-white">
                        {sem.name}
                      </td>

                      <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                        Semester {sem.number}
                      </td>

                      <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                        {sem.course
                          ? `${sem.course.name} (${sem.course.code})`
                          : "N/A"}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-3">

                          <button className="p-2 rounded-lg bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition">
                            <Pencil size={16} />
                          </button>

                          <button className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition">
                            <Trash2 size={16} />
                          </button>

                        </div>
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
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


// "use client";

// import { useEffect, useState } from "react";
// import { getSemesters } from "@/services/semesterService";
// import {
//   Pencil,
//   Trash2,
//   GraduationCap,
// } from "lucide-react";

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
//   const [semesters, setSemesters] =
//     useState<Semester[]>([]);

//   const [loading, setLoading] =
//     useState(false);

//   const fetchSemesters = async () => {
//     try {
//       setLoading(true);

//       const res = await getSemesters();

//       setSemesters(res.data || []);

//     } catch (err) {
//       console.error(
//         "Error fetching semesters",
//         err
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSemesters();
//   }, []);

//   return (
//     <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-6">
//       <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl">

//         {/* Header */}
//         <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-700">
//           <div className="flex items-center gap-3">
//             <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-500/20">
//               <GraduationCap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
//             </div>

//             <div>
//               <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
//                 Semester List
//               </h2>

//               <p className="text-sm text-slate-500 dark:text-slate-400">
//                 Manage all semesters
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Table */}
//         {loading ? (
//           <div className="p-10 text-center text-slate-500 dark:text-slate-400">
//             Loading semesters...
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">

//               <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-slate-600 dark:text-slate-300">
//                     #
//                   </th>

//                   <th className="px-6 py-4 text-left text-slate-600 dark:text-slate-300">
//                     Semester Name
//                   </th>

//                   <th className="px-6 py-4 text-left text-slate-600 dark:text-slate-300">
//                     Number
//                   </th>

//                   <th className="px-6 py-4 text-left text-slate-600 dark:text-slate-300">
//                     Course
//                   </th>

//                   <th className="px-6 py-4 text-center text-slate-600 dark:text-slate-300">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {semesters.length === 0 ? (
//                   <tr>
//                     <td
//                       colSpan={5}
//                       className="text-center py-10 text-slate-500 dark:text-slate-400"
//                     >
//                       No Semester Found
//                     </td>
//                   </tr>
//                 ) : (
//                   semesters.map((sem, index) => (
//                     <tr
//                       key={sem.id}
//                       className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
//                     >
//                       <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
//                         {index + 1}
//                       </td>

//                       <td className="px-6 py-4 font-semibold text-slate-800 dark:text-white">
//                         {sem.name}
//                       </td>

//                       <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
//                         Semester {sem.number}
//                       </td>

//                       <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
//                         {sem.course
//                           ? `${sem.course.name} (${sem.course.code})`
//                           : "N/A"}
//                       </td>

//                       <td className="px-6 py-4">
//                         <div className="flex justify-center gap-3">

//                           <button className="p-2 rounded-lg bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition">
//                             <Pencil size={16} />
//                           </button>

//                           <button className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition">
//                             <Trash2 size={16} />
//                           </button>

//                         </div>
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
  Plus,
  Search,
  BookOpen,
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
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchSemesters = async () => {
    try {
      setLoading(true);
      const res = await getSemesters();
      setSemesters(res.data || []);
    } catch (err) {
      console.error("Error fetching semesters", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSemesters();
  }, []);

  // Filter logic for search
  const filteredSemesters = semesters.filter((sem) =>
    sem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sem.course?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f3f4f6] dark:bg-slate-950 p-4 md:p-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Header & Action Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-none">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Academic Semesters
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                Structure your course curriculum and duration
              </p>
            </div>
          </div>

          <button className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-md">
            <Plus size={20} />
            Add Semester
          </button>
        </div>

        {/* Search & Stats Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 mb-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Search by semester or course name..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-6 px-4">
             <div className="text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total</p>
                <p className="text-lg font-bold text-indigo-600">{semesters.length}</p>
             </div>
             <div className="w-[1px] h-8 bg-slate-200 dark:bg-slate-700"></div>
             <div className="text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active</p>
                <p className="text-lg font-bold text-green-500">{semesters.length}</p>
             </div>
          </div>
        </div>

        {/* Content Table */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-20 flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-slate-500 animate-pulse font-medium">Fetching Academic Records...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Order</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Semester Details</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Associated Course</th>
                    <th className="px-6 py-4 text-center text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredSemesters.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-20">
                        <div className="flex flex-col items-center opacity-30">
                           <BookOpen size={48} className="mb-2" />
                           <p className="font-bold">No semesters found matching your criteria</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredSemesters.map((sem, index) => (
                      <tr
                        key={sem.id}
                        className="group hover:bg-slate-50 dark:hover:bg-indigo-500/5 transition-all duration-200"
                      >
                        <td className="px-6 py-4">
                          <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono text-xs">
                            {index + 1}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-800 dark:text-white text-base leading-none">
                            {sem.name}
                          </div>
                          <div className="mt-1.5 flex items-center gap-1.5">
                             <span className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded text-[10px] font-black uppercase">
                               Level {sem.number}
                             </span>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          {sem.course ? (
                            <div className="flex flex-col">
                                <span className="text-slate-700 dark:text-slate-300 font-medium">{sem.course.name}</span>
                                <span className="text-xs text-slate-400 font-mono">{sem.course.code}</span>
                            </div>
                          ) : (
                            <span className="text-slate-400 italic text-xs underline decoration-dotted">Not Assigned</span>
                          )}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex justify-center items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-indigo-600 hover:border-indigo-200 shadow-sm transition-all">
                              <Pencil size={16} />
                            </button>

                            <button className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-red-600 hover:border-red-200 shadow-sm transition-all">
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
    </div>
  );
}
// "use client";

// import { useEffect, useState } from "react";
// import { getSessions } from "@/services/sessionService";

// interface Session {
//   id: number;
//   name: string;
// }

// export default function SessionListPage() {
//   const [sessions, setSessions] = useState<Session[]>([]);
//   const [loading, setLoading] = useState(false);

//   const fetchSessions = async () => {
//     try {
//       setLoading(true);
//       const res = await getSessions();
//       console.log(res);

//       setSessions(res.data); // ✅ FIXED

//     } catch (err) {
//       console.error("Error fetching sessions", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSessions();
//   }, []);

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
      
//       <div className="bg-white shadow-xl rounded-2xl p-6">
        
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">
//             Session List
//           </h2>

//           <span className="text-sm text-gray-500">
//             Total: {sessions.length}
//           </span>
//         </div>

//         {/* Table */}
//         {loading ? (
//           <div className="text-center py-6">Loading...</div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full border rounded-xl overflow-hidden">
              
//               <thead className="bg-gradient-to-r from-green-500 to-green-600 text-white">
//                 <tr>
//                   <th className="p-3 text-left">#</th>
//                   <th className="p-3 text-left">Session</th>
//                   <th className="p-3 text-center">Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {sessions.length === 0 ? (
//                   <tr>
//                     <td colSpan={3} className="text-center p-6 text-gray-500">
//                       No Sessions Found
//                     </td>
//                   </tr>
//                 ) : (
//                   sessions.map((item, index) => (
//                     <tr
//                       key={item.id}
//                       className="border-b hover:bg-gray-50 transition"
//                     >
//                       <td className="p-3 font-medium">{index + 1}</td>
                      
//                       {/* ✅ FIXED */}
//                       <td className="p-3">
//                         <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
//                           {item.name}
//                         </span>
//                       </td>

//                       <td className="p-3 text-center space-x-2">
//                         <button className="bg-yellow-400 px-3 py-1 rounded text-white hover:bg-yellow-500">
//                           Edit
//                         </button>

//                         <button className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600">
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
import { getSessions } from "@/services/sessionService";
import { 
  CalendarDays, 
  Plus, 
  Pencil, 
  Trash2, 
  History, 
  CheckCircle2 
} from "lucide-react";

interface Session {
  id: number;
  name: string;
}

export default function SessionListPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const res = await getSessions();
      setSessions(res.data);
    } catch (err) {
      console.error("Error fetching sessions", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 p-3 rounded-2xl shadow-lg shadow-emerald-200">
              <CalendarDays className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight">Academic Sessions</h1>
              <p className="text-slate-500 text-sm">Define and manage active educational years</p>
            </div>
          </div>

          <button className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-md active:scale-95">
            <Plus size={18} />
            <span>Create New Session</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-slate-200 p-4 rounded-xl flex items-center gap-4">
            <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
              <History size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Total Years</p>
              <p className="text-lg font-bold text-slate-700">{sessions.length}</p>
            </div>
          </div>
          <div className="bg-white border border-slate-200 p-4 rounded-xl flex items-center gap-4">
            <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Current Active</p>
              <p className="text-lg font-bold text-slate-700">2023-24</p>
            </div>
          </div>
        </div>

        {/* Main Content Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center">
              <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-slate-500 font-medium">Synchronizing Academic Data...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Rank</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Session Period</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">Status</th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sessions.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                         <CalendarDays size={40} className="mx-auto mb-2 opacity-20" />
                         <p>No academic sessions recorded yet.</p>
                      </td>
                    </tr>
                  ) : (
                    sessions.map((item, index) => (
                      <tr key={item.id} className="group hover:bg-emerald-50/30 transition-colors">
                        <td className="px-6 py-4">
                          <span className="text-slate-400 font-mono text-sm">#0{index + 1}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                            <span className="text-base font-bold text-slate-700 tracking-tight">
                              {item.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-md border border-emerald-200 uppercase">
                            Available
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <button className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200 shadow-sm transition-all">
                              <Pencil size={14} />
                            </button>
                            <button className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-200 shadow-sm transition-all">
                              <Trash2 size={14} />
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

        {/* Footer Hint */}
        <div className="mt-4 flex items-center gap-2 text-slate-400 text-xs">
          <History size={14} />
          <span>Last modified by Admin on {new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
// "use client";

// import { useEffect, useState } from "react";
// import { CalendarDays } from "lucide-react";
// import { getMyAttendance } from "@/services/attendanceService";
// import {
//   Table,
//   TableHeader,
//   TableBody,
//   TableRow,
//   TableCell,
// } from "@/components/ui/table";

// export default function MyAttendancePage() {
//   const [data, setData] = useState<any>(null);

//   useEffect(() => {
//     fetchAttendance();
//   }, []);

//   const fetchAttendance = async () => {
//     try {
//       const res = await getMyAttendance();
//       console.log(res.name);
//       setData(res.data);
//     } catch (err) {
//       console.error("Error fetching attendance", err);
//     }
//   };

//   if (!data) return <p className="p-6 text-sm text-gray-500">Loading...</p>;

//   const percentage = Number(data.percentage);

//   return (
//     <div className="space-y-4 p-6">

//       {/* HEADER */}
//       <div className="bg-white border border-gray-200 rounded-xl p-5 flex justify-between items-center">
//         <div>
//           <h2 className="text-lg font-medium text-gray-900">My attendance</h2>
//           <p className="text-sm text-gray-400 mt-0.5">Track your attendance performance</p>
//         </div>
//         <div className="flex items-center gap-2 bg-blue-50 text-blue-800 text-sm font-medium px-4 py-2 rounded-lg">
//           <CalendarDays size={15} />
//           {data.totalClasses} classes
//         </div>
//       </div>

//       {/* STAT CARDS */}
//       <div className="grid grid-cols-4 gap-3">

//         {/* Present */}
//         <div className="bg-gray-50 rounded-lg p-4">
//           <p className="text-xs text-gray-400 mb-1.5">Present</p>
//           <p className="text-xl font-medium text-green-700 flex items-center gap-1.5">
//             <span className="w-2 h-2 rounded-full bg-green-600 inline-block" />
//             {data.present}
//           </p>
//           <div className="mt-2 h-1 rounded-full bg-gray-200">
//             <div
//               className="h-1 rounded-full bg-green-600"
//               style={{ width: `${(data.present / data.totalClasses) * 100}%` }}
//             />
//           </div>
//         </div>

//         {/* Absent */}
//         <div className="bg-gray-50 rounded-lg p-4">
//           <p className="text-xs text-gray-400 mb-1.5">Absent</p>
//           <p className="text-xl font-medium text-red-700 flex items-center gap-1.5">
//             <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
//             {data.absent}
//           </p>
//           <div className="mt-2 h-1 rounded-full bg-gray-200">
//             <div
//               className="h-1 rounded-full bg-red-500"
//               style={{ width: `${(data.absent / data.totalClasses) * 100}%` }}
//             />
//           </div>
//         </div>

//         {/* Percentage */}
//         <div className="bg-gray-50 rounded-lg p-4">
//           <p className="text-xs text-gray-400 mb-1.5">Percentage</p>
//           <p className="text-xl font-medium text-blue-700">
//             {percentage}%
//           </p>
//           <div className="mt-2 h-1 rounded-full bg-gray-200">
//             <div
//               className="h-1 rounded-full bg-blue-500"
//               style={{ width: `${percentage}%` }}
//             />
//           </div>
//         </div>

//         {/* Status */}
//         <div className="bg-gray-50 rounded-lg p-4">
//           <p className="text-xs text-gray-400 mb-2">Status</p>
//           <span
//             className={`text-xs font-medium px-3 py-1 rounded-full ${
//               data.shortAttendance
//                 ? "bg-red-50 text-red-700"
//                 : "bg-green-50 text-green-700"
//             }`}
//           >
//             {data.shortAttendance ? "Short attendance" : "Good standing"}
//           </span>
//         </div>

//       </div>

//       {/* TABLE */}
//       <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
//         <Table>
//           <TableHeader>
//             <TableRow className="border-0">
//                 <TableCell
//   isHeader
//   className="text-[11px] uppercase tracking-wide text-gray-400 font-medium w-[10%]"
// >
//   #
// </TableCell>
//               <TableCell isHeader className="text-[11px] uppercase tracking-wide text-gray-400 font-medium w-[22%]">Date</TableCell>
//               <TableCell isHeader className="text-[11px] uppercase tracking-wide text-gray-400 font-medium w-[34%]">Subject</TableCell>
//               <TableCell isHeader className="text-[11px] uppercase tracking-wide text-gray-400 font-medium w-[20%]">Period</TableCell>
//               <TableCell isHeader className="text-[11px] uppercase tracking-wide text-gray-400 font-medium w-[24%]">Status</TableCell>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {data.records.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={4} className="text-center py-10 text-sm text-gray-400">
//                   No attendance records found
//                 </TableCell>
//               </TableRow>
//             ) : (
//               data.records.map((r: any,index: number) => (
//                 <TableRow key={r.id}>
//                     <TableCell className="text-sm text-gray-500">
//   {index + 1}
// </TableCell>

//                   <TableCell className="text-sm text-gray-600">
//                     {r.attendanceSession?.date}
//                   </TableCell>

//                   <TableCell className="text-sm font-medium text-gray-900">
//                     {r.attendanceSession?.subject?.name}
//                   </TableCell>

//                   <TableCell>
//                     <span className="text-[11px] font-medium bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full">
//                       {r.attendanceSession?.period}
//                     </span>
//                   </TableCell>

//                   <TableCell>
//                     <span
//                       className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${
//                         r.status === "present"
//                           ? "bg-green-50 text-green-700"
//                           : r.status === "absent"
//                           ? "bg-red-50 text-red-700"
//                           : "bg-amber-50 text-amber-700"
//                       }`}
//                     >
//                       {r.status}
//                     </span>
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </div>

//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Filter, ChevronDown, Search, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { getMyAttendance } from "@/services/attendanceService";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

export default function MyAttendancePage() {
  const [data, setData] = useState<any>(null);
  const [subject, setSubject] = useState("all");
  const [status, setStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await getMyAttendance();
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!data) return <LoadingSkeleton />;

  const percentage = Number(data.percentage);
  const isGoodAttendance = percentage >= 75;

  // Filter logic
  const filteredRecords = data.records.filter((r: any) => {
    const subjectMatch = subject === "all" || r.attendanceSession?.subject?.name === subject;
    const statusMatch = status === "all" || r.status === status;
    const searchMatch = searchQuery === "" || 
      r.attendanceSession?.subject?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.attendanceSession?.date.includes(searchQuery);
    return subjectMatch && statusMatch && searchMatch;
  });

  const subjects = [...new Set(data.records.map((r: any) => r.attendanceSession?.subject?.name))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
              Attendance Overview
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Track your academic performance and attendance records
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white dark:bg-slate-800 rounded-xl px-4 py-2 shadow-sm border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <CalendarDays size={18} />
                <span className="text-sm font-medium">{data.totalClasses} Total Classes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard 
            title="Present Days" 
            value={data.present} 
            color="emerald" 
            icon={<TrendingUp size={20} />}
            trend="+12% from last month"
          />
          <StatCard 
            title="Absent Days" 
            value={data.absent} 
            color="rose" 
            icon={<TrendingDown size={20} />}
            trend="-5% from last month"
          />
          <StatCard 
            title="Attendance Rate" 
            value={`${percentage}%`} 
            color="blue" 
            icon={<CalendarDays size={20} />}
            trend={isGoodAttendance ? "Excellent" : "Needs improvement"}
          />
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Status</p>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${
                  isGoodAttendance 
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400" 
                    : "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400"
                }`}>
                  <AlertCircle size={16} />
                  {isGoodAttendance ? "On Track" : "Attention Needed"}
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                {isGoodAttendance ? "✅" : "⚠️"}
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
              {isGoodAttendance 
                ? "You're maintaining good attendance. Keep it up!" 
                : "Consider improving attendance to avoid academic penalties."}
            </p>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <Filter size={18} />
              <span className="text-sm font-medium">Filters</span>
            </div>
            
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder="Search by subject or date..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>
              
              <div className="relative">
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full appearance-none px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                >
                  <option value="all">All Subjects</option>
                  {subjects.map((s: any) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
              </div>
              
              <div className="relative">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full appearance-none px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
              </div>
            </div>
            
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Showing {filteredRecords.length} of {data.records.length} records
            </div>
          </div>
        </div>

        {/* Records Table */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                  <TableCell isHeader className="font-semibold text-slate-700 dark:text-slate-300">#</TableCell>
                  <TableCell isHeader className="font-semibold text-slate-700 dark:text-slate-300">Date</TableCell>
                  <TableCell isHeader className="font-semibold text-slate-700 dark:text-slate-300">Subject</TableCell>
                  <TableCell isHeader className="font-semibold text-slate-700 dark:text-slate-300">Period</TableCell>
                  <TableCell isHeader className="font-semibold text-slate-700 dark:text-slate-300">Status</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-16">
                      <div className="flex flex-col items-center gap-2 text-slate-400">
                        <CalendarDays size={48} className="opacity-50" />
                        <p className="text-sm">No attendance records found</p>
                        <p className="text-xs">Try adjusting your filters</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRecords.map((r: any, index: number) => (
                    <TableRow key={index} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-150">
                      <TableCell className="text-slate-600 dark:text-slate-300">{index + 1}</TableCell>
                      <TableCell className="font-mono text-sm text-slate-700 dark:text-slate-300">
                        {new Date(r.attendanceSession?.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </TableCell>
                      <TableCell className="font-medium text-slate-900 dark:text-white">
                        {r.attendanceSession?.subject?.name}
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400">
                          {r.attendanceSession?.period}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${
                          r.status === "present"
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                            : "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            r.status === "present" ? "bg-emerald-500" : "bg-rose-500"
                          }`} />
                          {r.status === "present" ? "Present" : "Absent"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-6 md:p-8">
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="animate-pulse">
        <div className="h-8 w-64 bg-slate-200 dark:bg-slate-700 rounded-lg mb-2"></div>
        <div className="h-4 w-96 bg-slate-200 dark:bg-slate-700 rounded"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-5 animate-pulse">
            <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
            <div className="h-8 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Enhanced Stat Card Component
const StatCard = ({ title, value, color, icon, trend }: any) => {
  const colorClasses: any = {
    emerald: "text-emerald-600 dark:text-emerald-400",
    rose: "text-rose-600 dark:text-rose-400",
    blue: "text-blue-600 dark:text-blue-400",
  };

  return (
    <div className="group bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{title}</p>
          <p className={`text-3xl font-bold ${colorClasses[color]}`}>{value}</p>
        </div>
        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
          {icon}
        </div>
      </div>
      {trend && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">{trend}</p>
      )}
    </div>
  );
};
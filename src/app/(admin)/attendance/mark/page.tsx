// // "use client";

// // import { useState } from "react";

// // import {
// //   markAttendance,
// //   getStudentsForAttendance,
// // } from "@/services/attendanceService";

// // import TeacherAttendanceFilters from "@/components/attendance/TeacherAttendanceFilters";
// // import StudentAttendanceMarkTable from "@/components/attendance/StudentAttendanceMarkTable";

// // export default function MarkAttendancePage() {
// //   const [filters, setFilters] = useState<any>({});
// //   const [students, setStudents] = useState<any[]>([]);
// //   const [attendanceMap, setAttendanceMap] =
// //     useState<any>({});

// //   const loadStudents = async () => {
// //     const data = await getStudentsForAttendance(
// //       filters.semesterId
// //     );
// // console.log("Attendance Payload:", data);
// //     setStudents(data);
// //   };

// //   const submitAttendance = async () => {
// //     const payload = {
// //       subject: filters.subject,
// //       teacherId: 1,
// //       semesterId: filters.semesterId,
// //       sessionId: 1,
// //       date: filters.date,
// //       period: filters.period,
// //       records: students.map((student) => ({
// //         studentId: student.id,
// //         status:
// //           attendanceMap[student.id] || "present",
// //       })),
// //     };

// //     const res = await markAttendance(payload);

// //     alert(res.message);
// //   };

// //   return (
// //     <div className="p-6 bg-gray-50 min-h-screen">
// //       <h1 className="text-2xl font-bold mb-6">
// //         Teacher Attendance Mark
// //       </h1>

// //       <TeacherAttendanceFilters
// //         filters={filters}
// //         setFilters={setFilters}
// //       />

// //       <button
// //         onClick={loadStudents}
// //         className="bg-blue-600 text-white px-5 py-2 rounded mb-6"
// //       >
// //         Load Students
// //       </button>

// //       {students.length > 0 && (
// //         <>
// //           <StudentAttendanceMarkTable
// //             students={students}
// //             attendanceMap={attendanceMap}
// //             setAttendanceMap={setAttendanceMap}
// //           />

// //           <button
// //             onClick={submitAttendance}
// //             className="mt-6 bg-green-600 text-white px-6 py-3 rounded"
// //           >
// //             Submit Attendance
// //           </button>
// //         </>
// //       )}
// //     </div>
// //   );
// // }


// "use client";

// import { useState } from "react";
// import { useSelector } from "react-redux";
// import toast from "react-hot-toast";

// import {
//   markAttendance,
//   getStudentsForAttendance,
// } from "@/services/attendanceService";

// import TeacherAttendanceFilters from "@/components/attendance/TeacherAttendanceFilters";
// import StudentAttendanceMarkTable from "@/components/attendance/StudentAttendanceMarkTable";

// export default function MarkAttendancePage() {
//   const authUser = useSelector(
//     (state: any) => state.auth.user
//   );

//   const [filters, setFilters] = useState<any>(
//     {}
//   );

//   const [students, setStudents] = useState<any[]>(
//     []
//   );

//   const [attendanceMap, setAttendanceMap] =
//     useState<any>({});

//   const [loading, setLoading] =
//     useState(false);

//   // =========================
//   // LOAD STUDENTS
//   // =========================
//   const loadStudents = async () => {
//     try {
//       if (!filters.semesterId) {
//         return toast.error(
//           "Please select semester"
//         );
//       }

//       setLoading(true);

//       const data =
//         await getStudentsForAttendance(
//           filters.semesterId
//         );

//       setStudents(data || []);

//       if (!data?.length) {
//         toast.error(
//           "No students found"
//         );
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error(
//         "Failed to load students"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =========================
//   // SUBMIT ATTENDANCE
//   // =========================
//   const submitAttendance =
//     async () => {
//       try {
//         if (!filters.semesterId) {
//           return toast.error(
//             "Please select semester"
//           );
//         }

//         if (!filters.subjectId) {
//           return toast.error(
//             "Please select subject"
//           );
//         }

//         if (!filters.period) {
//           return toast.error(
//             "Please select period"
//           );
//         }

//         if (!filters.sessionId) {
//           return toast.error(
//             "Please select session"
//           );
//         }

//         if (!students.length) {
//           return toast.error(
//             "No students loaded"
//           );
//         }

//         setLoading(true);

//         const payload = {
//           subjectId:
//             filters.subjectId,

//          teacherId: authUser?.teachers?.[0]?.id,

//           semesterId:
//             filters.semesterId,

//           sessionId:
//             filters.sessionId,

//           period:
//             filters.period,

//           records:
//             students.map(
//               (student) => ({
//                 studentId:
//                   student.id,

//                 status:
//                   attendanceMap[
//                     student.id
//                   ] ||
//                   "present",
//               })
//             ),
//         };
// console.log(
//   "Teacher ID:",
//   authUser?.teacher?.id
// );
//         console.log(
//           "Attendance Payload:",
//           payload
//         );

//         const res =
//           await markAttendance(
//             payload
//           );

//         toast.success(
//           res.message
//         );

//         setStudents([]);
//         setAttendanceMap({});
//       } catch (error: any) {
//   console.error(
//     "Mark Attendance Error:",
//     error.response?.data || error
//   );

//   toast.error(
//     error.response?.data?.message ||
//       "Attendance submission failed"
//   );

//       } finally {
//         setLoading(false);
//       }
//     };

//   return (
//     <div className="space-y-6 p-6">
//       <div className="rounded-2xl border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark">
//         <h1 className="mb-6 text-2xl font-bold text-black dark:text-white">
//           Mark Attendance
//         </h1>

//         <TeacherAttendanceFilters
//           filters={filters}
//           setFilters={setFilters}
//         />

//         <div className="mt-6">
//           <button
//             onClick={loadStudents}
//             disabled={loading}
//             className="rounded-lg bg-primary px-6 py-3 text-white hover:bg-opacity-90 disabled:opacity-50"
//           >
//             {loading
//               ? "Loading..."
//               : "Load Students"}
//           </button>
//         </div>
//       </div>

//       {students.length > 0 && (
//         <div className="space-y-6">
//           <StudentAttendanceMarkTable
//             students={students}
//             attendanceMap={
//               attendanceMap
//             }
//             setAttendanceMap={
//               setAttendanceMap
//             }
//           />

//           <button
//             onClick={
//               submitAttendance
//             }
//             disabled={loading}
//             className="rounded-lg bg-green-600 px-8 py-3 text-white hover:bg-green-700 disabled:opacity-50"
//           >
//             {loading
//               ? "Submitting..."
//               : "Submit Attendance"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Clock,
  Calendar,
  BookOpen,
  GraduationCap,
  UserCheck,
  Loader2,
  Save,
  RefreshCw,
  ChevronRight
} from "lucide-react";

import {
  markAttendance,
  getStudentsForAttendance,
} from "@/services/attendanceService";

import TeacherAttendanceFilters from "@/components/attendance/TeacherAttendanceFilters";
import StudentAttendanceMarkTable from "@/components/attendance/StudentAttendanceMarkTable";

// Stats Card Component
const StatsCard = ({ icon: Icon, label, value, color }: any) => (
  <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
    <div className={`rounded-lg p-3 ${color}`}>
      <Icon className="h-6 w-6 text-white" />
    </div>
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
  </div>
);

export default function MarkAttendancePage() {
  const authUser = useSelector((state: any) => state.auth.user);
  
  const [filters, setFilters] = useState<any>({});
  const [students, setStudents] = useState<any[]>([]);
  const [attendanceMap, setAttendanceMap] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [bulkAction, setBulkAction] = useState<string | null>(null);

  // Calculate attendance statistics
  const stats = useMemo(() => {
    if (!students.length) return null;
    
    const total = students.length;
    const present = Object.values(attendanceMap).filter(v => v === "present").length;
    const absent = Object.values(attendanceMap).filter(v => v === "absent").length;
    const late = Object.values(attendanceMap).filter(v => v === "late").length;
    const unmarked = total - present - absent - late;
    
    return { total, present, absent, late, unmarked };
  }, [students, attendanceMap]);

  // Bulk actions
  const handleBulkAction = (status: string) => {
    const newMap: any = {};
    students.forEach(student => {
      newMap[student.id] = status;
    });
    setAttendanceMap(newMap);
    setBulkAction(null);
    toast.success(`All students marked as ${status}`);
  };

  // Load Students
  const loadStudents = async () => {
    try {
      if (!filters.semesterId) {
        return toast.error("Please select semester");
      }
      
      setLoading(true);
      const data = await getStudentsForAttendance(filters.semesterId);
      setStudents(data || []);
      
      if (!data?.length) {
        toast.error("No students found");
      } else {
        toast.success(`Loaded ${data.length} students`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  // Submit Attendance
  const submitAttendance = async () => {
    try {
      if (!filters.semesterId) return toast.error("Please select semester");
      if (!filters.subjectId) return toast.error("Please select subject");
      if (!filters.period) return toast.error("Please select period");
      if (!filters.sessionId) return toast.error("Please select session");
      if (!students.length) return toast.error("No students loaded");
      
      const unmarkedCount = stats?.unmarked || 0;
      if (unmarkedCount > 0) {
        const confirm = window.confirm(
          `${unmarkedCount} student(s) are unmarked. They will be marked as present. Continue?`
        );
        if (!confirm) return;
      }
      
      setLoading(true);
      
      const payload = {
        subjectId: filters.subjectId,
        teacherId: authUser?.teachers?.[0]?.id,
        semesterId: filters.semesterId,
        sessionId: filters.sessionId,
        period: filters.period,
        records: students.map((student) => ({
          studentId: student.id,
          status: attendanceMap[student.id] || "present",
        })),
      };
      
      const res = await markAttendance(payload);
      toast.success(res.message || "Attendance marked successfully");
      
      // Reset form
      setStudents([]);
      setAttendanceMap({});
    } catch (error: any) {
      console.error("Mark Attendance Error:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Attendance submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>Dashboard</span>
          <ChevronRight className="h-4 w-4" />
          <span>Attendance</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-primary font-medium">Mark Attendance</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Mark Attendance
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Record student attendance for your class sessions
        </p>
      </div>

      {/* Filters Card */}
      <div className="mb-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-900/50">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Session Details
          </h2>
        </div>
        
        <div className="p-6">
          <TeacherAttendanceFilters
            filters={filters}
            setFilters={setFilters}
          />
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={loadStudents}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg bg-gray-900 dark:bg-gray-400 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Users className="h-4 w-4" />
                  Load Students
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      {stats && (
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <StatsCard
            icon={Users}
            label="Total Students"
            value={stats.total}
            color="bg-blue-500"
          />
          <StatsCard
            icon={CheckCircle}
            label="Present"
            value={stats.present}
            color="bg-green-500"
          />
          <StatsCard
            icon={XCircle}
            label="Absent"
            value={stats.absent}
            color="bg-red-500"
          />
          <StatsCard
            icon={Clock}
            label="Late"
            value={stats.late}
            color="bg-yellow-500"
          />
          <StatsCard
            icon={AlertCircle}
            label="Unmarked"
            value={stats.unmarked}
            color="bg-gray-500"
          />
        </div>
      )}

      {/* Students Table */}
      {students.length > 0 && (
        <div className="space-y-6">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            {/* Table Header with Bulk Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-700 dark:bg-gray-900/50">
              <div className="flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Student Attendance List
                </h2>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {students.length} Students
                </span>
              </div>
              
              {/* Bulk Actions Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setBulkAction(bulkAction ? null : 'menu')}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <UserCheck className="h-4 w-4" />
                  Bulk Actions
                </button>
                
                {bulkAction === 'menu' && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setBulkAction(null)}
                    />
                    <div className="absolute right-0 z-20 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                      <button
                        onClick={() => handleBulkAction('present')}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Mark All Present
                      </button>
                      <button
                        onClick={() => handleBulkAction('absent')}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                      >
                        <XCircle className="h-4 w-4" />
                        Mark All Absent
                      </button>
                      <button
                        onClick={() => handleBulkAction('late')}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-yellow-600 hover:bg-yellow-50 dark:text-yellow-400 dark:hover:bg-yellow-900/20"
                      >
                        <Clock className="h-4 w-4" />
                        Mark All Late
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Table Content */}
            <div className="p-6">
              <StudentAttendanceMarkTable
                students={students}
                attendanceMap={attendanceMap}
                setAttendanceMap={setAttendanceMap}
              />
            </div>
          </div>

          {/* Submit Section */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
              <Calendar className="h-5 w-5" />
              <span>
                {stats?.unmarked === 0 ? (
                  <span className="text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" />
                    All students marked - Ready to submit
                  </span>
                ) : (
                  <span className="text-yellow-600 dark:text-yellow-400 font-medium">
                    {stats?.unmarked} student(s) unmarked (will be marked as present)
                  </span>
                )}
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setStudents([]);
                  setAttendanceMap({});
                }}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                Reset
              </button>
              
              <button
                onClick={submitAttendance}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-8 py-3 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Submit Attendance
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!students.length && !loading && (
        <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-800">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
            <Users className="h-10 w-10 text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            No students loaded
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Select filters and click "Load Students" to view the student list
          </p>
        </div>
      )}
    </div>
  );
}
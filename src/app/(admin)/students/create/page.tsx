// // "use client";

// // import { useEffect, useState } from "react";
// // import { createStudent } from "@/services/studentService";
// // import { getCourses } from "@/services/courseService";
// // import { getDepartments } from "@/services/departmentService";
// // import { getSessions } from "@/services/sessionService";

// // interface Course {
// //   id: number;
// //   name: string;
// // }

// // interface Department {
// //   id: number;
// //   name: string;
// // }

// // interface Session {
// //   id: number;
// //   name: string;
// // }

// // export default function StudentCreatePage() {
// //   const [form, setForm] = useState({
// //     userId: "",
// //     mobile: "",
// //     address: "",
// //     courseId: "",
// //     departmentId: "",
// //     sessionId: "",
// //   });

// //   const [courses, setCourses] = useState<Course[]>([]);
// //   const [departments, setDepartments] = useState<Department[]>([]);
// //   const [sessions, setSessions] = useState<Session[]>([]);
// //   const [loading, setLoading] = useState(false);

// //   // Fetch dropdown data
// //   useEffect(() => {
// //     getCourses().then((res) => setCourses(res));
// //     getDepartments().then((res) => setDepartments(res));
// //     getSessions().then((res) => setSessions(res));
// //   }, []);

// //   const handleSubmit = async () => {
// //     const { userId, mobile, address, courseId, departmentId, sessionId } = form;

// //     if (!userId || !mobile || !address || !courseId || !departmentId || !sessionId) {
// //       alert("All fields are required ❌");
// //       return;
// //     }

// //     try {
// //       setLoading(true);

// //       await createStudent({
// //         userId: Number(userId),
// //         mobile,
// //         address,
// //         courseId: Number(courseId),
// //         departmentId: Number(departmentId),
// //         sessionId: Number(sessionId),
// //       });

// //       alert("Student Created Successfully ✅");

// //       // reset form
// //       setForm({
// //         userId: "",
// //         mobile: "",
// //         address: "",
// //         courseId: "",
// //         departmentId: "",
// //         sessionId: "",
// //       });

// //     } catch (err) {
// //       alert("Error creating student ❌");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
// //       <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6">
        
// //         <h2 className="text-2xl font-bold text-center mb-6">
// //           Student Admission Form
// //         </h2>

// //         <div className="grid grid-cols-2 gap-4">

// //           {/* User ID */}
// //           <input
// //             type="number"
// //             placeholder="User ID"
// //             value={form.userId}
// //             className="border p-2 rounded"
// //             onChange={(e) => setForm({ ...form, userId: e.target.value })}
// //           />

// //           {/* Mobile */}
// //           <input
// //             type="text"
// //             placeholder="Mobile"
// //             value={form.mobile}
// //             className="border p-2 rounded"
// //             onChange={(e) => setForm({ ...form, mobile: e.target.value })}
// //           />

// //           {/* Address */}
// //           <input
// //             type="text"
// //             placeholder="Address"
// //             value={form.address}
// //             className="border p-2 rounded col-span-2"
// //             onChange={(e) => setForm({ ...form, address: e.target.value })}
// //           />

// //           {/* Course */}
// //           <select
// //             value={form.courseId}
// //             className="border p-2 rounded"
// //             onChange={(e) => setForm({ ...form, courseId: e.target.value })}
// //           >
// //             <option value="">Select Course</option>
// //             {courses.map((c) => (
// //               <option key={c.id} value={c.id}>
// //                 {c.name}
// //               </option>
// //             ))}
// //           </select>

// //           {/* Department */}
// //           <select
// //             value={form.departmentId}
// //             className="border p-2 rounded"
// //             onChange={(e) => setForm({ ...form, departmentId: e.target.value })}
// //           >
// //             <option value="">Select Department</option>
// //             {departments.map((d) => (
// //               <option key={d.id} value={d.id}>
// //                 {d.name}
// //               </option>
// //             ))}
// //           </select>

// //           {/* Session */}
// //           <select
// //             value={form.sessionId}
// //             className="border p-2 rounded col-span-2"
// //             onChange={(e) => setForm({ ...form, sessionId: e.target.value })}
// //           >
// //             <option value="">Select Session</option>
// //             {sessions.map((s) => (
// //               <option key={s.id} value={s.id}>
// //                 {s.name}
// //               </option>
// //             ))}
// //           </select>

// //         </div>

// //         {/* Button */}
// //         <button
// //           onClick={handleSubmit}
// //           disabled={loading}
// //           className="w-full mt-6 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
// //         >
// //           {loading ? "Submitting..." : "Create Student"}
// //         </button>

// //       </div>
// //     </div>
// //   );
// // }



// "use client";

// import { useEffect, useState } from "react";
// import {
//   Loader2,
//   GraduationCap,
// } from "lucide-react";
// import { toast } from "react-hot-toast";

// import { createStudent } from "@/services/studentService";
// import { getCourses } from "@/services/courseService";
// import { getDepartments } from "@/services/departmentService";
// import { getSessions } from "@/services/sessionService";
// import { getUsers } from "@/services/userServices";

// interface Course {
//   id: number;
//   name: string;
// }

// interface Department {
//   id: number;
//   name: string;
// }

// interface Session {
//   id: number;
//   name: string;
// }

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   roles: {
//     role: {
//       name: string;
//     };
//   }[];
// }

// export default function StudentCreatePage() {
//   const [form, setForm] = useState({
//     userId: "",
//     mobile: "",
//     address: "",
//     courseId: "",
//     departmentId: "",
//     sessionId: "",
//   });

//   const [courses, setCourses] = useState<Course[]>([]);
//   const [departments, setDepartments] = useState<Department[]>([]);
//   const [sessions, setSessions] = useState<Session[]>([]);
//   const [studentUsers, setStudentUsers] = useState<User[]>([]);

//   const [loading, setLoading] = useState(false);

//   /* ---------------- Fetch Data ---------------- */
//   useEffect(() => {
//     fetchInitialData();
//   }, []);

//   const fetchInitialData = async () => {
//     try {
//       const [
//         courseRes,
//         deptRes,
//         sessionRes,
//         userRes,
//       ] = await Promise.all([
//         getCourses(),
//         getDepartments(),
//         getSessions(),
//         getUsers(),
//       ]);

//       setCourses(courseRes || []);
//       setDepartments(deptRes || []);
//       setSessions(sessionRes || []);

//       const users = userRes || [];
//       console.log(users)

//       const onlyStudents = users.filter(
//         (u: User) =>
//           u.roles?.some(
//             (r) => r.role?.name === "STUDENT"
//           )
//       );

//       setStudentUsers(onlyStudents);
//     } catch {
//       toast.error("Failed to load form data");
//     }
//   };

//   /* ---------------- Submit ---------------- */
//   const handleSubmit = async () => {
//     const {
//       userId,
//       mobile,
//       address,
//       courseId,
//       departmentId,
//       sessionId,
//     } = form;

//     if (
//       !userId ||
//       !mobile ||
//       !address ||
//       !courseId ||
//       !departmentId ||
//       !sessionId
//     ) {
//       return toast.error("All fields are required");
//     }

//     try {
//       setLoading(true);

//       await createStudent({
//         userId: Number(userId),
//         mobile,
//         address,
//         courseId: Number(courseId),
//         departmentId: Number(departmentId),
//         sessionId: Number(sessionId),
//       });

//       toast.success(
//         "Student Created Successfully"
//       );

//       setForm({
//         userId: "",
//         mobile: "",
//         address: "",
//         courseId: "",
//         departmentId: "",
//         sessionId: "",
//       });
//     } catch {
//       toast.error("Error creating student");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-100 dark:bg-slate-900 py-8 px-4">
//       <div className="max-w-4xl mx-auto">

//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
//             Student Admission
//           </h1>
//           <p className="text-slate-500 dark:text-slate-400 mt-1">
//             Register a student into academic system
//           </p>
//         </div>

//         {/* Card */}
//         <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">

//           {/* Top Bar */}
//           <div className="px-8 py-5 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40">
//             <div className="flex items-center gap-3">
//               <GraduationCap
//                 className="text-indigo-600"
//                 size={22}
//               />
//               <div>
//                 <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
//                   Admission Details
//                 </h2>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">
//                   Fill student admission information
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Form */}
//           <div className="p-8 grid md:grid-cols-2 gap-6">

//             {/* Student User */}
//             <div className="md:col-span-2">
//               <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
//                 Select Student User
//               </label>

//               <select
//                 value={form.userId}
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     userId: e.target.value,
//                   })
//                 }
//                 className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
//               >
//                 <option value="">
//                   Select Student User
//                 </option>

//                 {studentUsers.map((user) => (
//                   <option
//                     key={user.id}
//                     value={user.id}
//                   >
//                     {user.name} ({user.email})
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Mobile */}
//             <div>
//               <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
//                 Mobile Number
//               </label>

//               <input
//                 type="text"
//                 value={form.mobile}
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     mobile: e.target.value,
//                   })
//                 }
//                 className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
//               />
//             </div>

//             {/* Address */}
//             <div>
//               <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
//                 Address
//               </label>

//               <input
//                 type="text"
//                 value={form.address}
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     address: e.target.value,
//                   })
//                 }
//                 className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
//               />
//             </div>

//             {/* Course */}
//             <div>
//               <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
//                 Course
//               </label>

//               <select
//                 value={form.courseId}
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     courseId: e.target.value,
//                   })
//                 }
//                 className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
//               >
//                 <option value="">
//                   Select Course
//                 </option>

//                 {courses.map((c) => (
//                   <option
//                     key={c.id}
//                     value={c.id}
//                   >
//                     {c.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Department */}
//             <div>
//               <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
//                 Department
//               </label>

//               <select
//                 value={form.departmentId}
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     departmentId: e.target.value,
//                   })
//                 }
//                 className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
//               >
//                 <option value="">
//                   Select Department
//                 </option>

//                 {departments.map((d) => (
//                   <option
//                     key={d.id}
//                     value={d.id}
//                   >
//                     {d.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Session */}
//             <div className="md:col-span-2">
//               <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
//                 Academic Session
//               </label>

//               <select
//                 value={form.sessionId}
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     sessionId: e.target.value,
//                   })
//                 }
//                 className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
//               >
//                 <option value="">
//                   Select Session
//                 </option>

//                 {sessions.map((s) => (
//                   <option
//                     key={s.id}
//                     value={s.id}
//                   >
//                     {s.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//           </div>

//           {/* Submit */}
//           <div className="px-8 pb-8">
//             <button
//               onClick={handleSubmit}
//               disabled={loading}
//               className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium flex justify-center items-center gap-2 transition disabled:opacity-50"
//             >
//               {loading && (
//                 <Loader2 className="animate-spin h-4 w-4" />
//               )}

//               {loading
//                 ? "Submitting..."
//                 : "Create Student Admission"}
//             </button>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }





// "use client";

// import { useEffect, useState } from "react";
// import {
//   Loader2,
//   GraduationCap,
// } from "lucide-react";
// import { toast } from "react-hot-toast";

// import { createStudent } from "@/services/studentService";
// import { getCourses } from "@/services/courseService";
// import { getDepartments } from "@/services/departmentService";
// import { getSessions } from "@/services/sessionService";
// import { getUsers } from "@/services/userServices";

// interface Course {
//   id: number;
//   name: string;
// }

// interface Department {
//   id: number;
//   name: string;
// }

// interface Session {
//   id: number;
//   name: string;
// }

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   roles: {
//     role: {
//       name: string;
//     };
//   }[];
// }

// export default function StudentCreatePage() {
//   const [form, setForm] = useState({
//     userId: "",
//     mobile: "",
//     address: "",
//     courseId: "",
//     departmentId: "",
//     sessionId: "",
//   });

//   const [courses, setCourses] = useState<Course[]>([]);
//   const [departments, setDepartments] = useState<
//     Department[]
//   >([]);
//   const [sessions, setSessions] = useState<Session[]>(
//     []
//   );

//   const [studentUsers, setStudentUsers] = useState<
//     User[]
//   >([]);

//   const [loading, setLoading] = useState(false);

//   /* ---------------- Fetch Initial Data ---------------- */
//   useEffect(() => {
//     fetchInitialData();
//   }, []);

//   const fetchInitialData = async () => {
//     try {
//       const [
//         courseRes,
//         deptRes,
//         sessionRes,
//         userRes,
//       ] = await Promise.all([
//         getCourses(),
//         getDepartments(),
//         getSessions(),
//         getUsers(),
//       ]);

//       setCourses(courseRes || []);
//       setDepartments(deptRes || []);
//       setSessions(sessionRes || []);

//       const users = userRes || [];

//       const onlyStudents = users.filter(
//         (u: User) =>
//           u.roles?.some(
//             (r) =>
//               r.role?.name === "STUDENT"
//           )
//       );

//       setStudentUsers(onlyStudents);
//     } catch (error) {
//       toast.error("Failed to load form data");
//     }
//   };

//   /* ---------------- Submit ---------------- */
//   const handleSubmit = async () => {
//     const {
//       userId,
//       mobile,
//       address,
//       courseId,
//       departmentId,
//       sessionId,
//     } = form;

//     if (
//       !userId ||
//       !mobile ||
//       !address ||
//       !courseId ||
//       !departmentId ||
//       !sessionId
//     ) {
//       return toast.error(
//         "All fields are required"
//       );
//     }

//     try {
//       setLoading(true);

//       await createStudent({
//         userId: Number(userId),
//         mobile,
//         address,
//         courseId: Number(courseId),
//         departmentId: Number(departmentId),
//         sessionId: Number(sessionId),
//       });

//       toast.success(
//         "Student Created Successfully"
//       );

//       setForm({
//         userId: "",
//         mobile: "",
//         address: "",
//         courseId: "",
//         departmentId: "",
//         sessionId: "",
//       });

//     } catch (error) {
//       toast.error("Error creating student");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-100 dark:bg-slate-900 py-8 px-4">
//       <div className="max-w-4xl mx-auto">

//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
//             Student Admission
//           </h1>
//           <p className="text-slate-500 dark:text-slate-400 mt-1">
//             Register a student into academic system
//           </p>
//         </div>

//         {/* Card */}
//         <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">

//           {/* Top Bar */}
//           <div className="px-8 py-5 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40">
//             <div className="flex items-center gap-3">
//               <GraduationCap
//                 className="text-indigo-600"
//                 size={22}
//               />
//               <div>
//                 <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
//                   Admission Details
//                 </h2>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">
//                   Fill student admission information
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Form */}
//           <div className="p-8 grid md:grid-cols-2 gap-6">

//             {/* Student User Dropdown */}
//             <div className="md:col-span-2">
//               <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
//                 Select Student User
//               </label>

//               <select
//                 value={form.userId}
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     userId: e.target.value,
//                   })
//                 }
//                 className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
//               >
//                 <option value="">
//                   Select Student User
//                 </option>

//                 {studentUsers.map((user) => (
//                   <option
//                     key={user.id}
//                     value={user.id}
//                   >
//                     {user.name} ({user.email})
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Mobile */}
//             <div>
//               <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
//                 Mobile Number
//               </label>

//               <input
//                 type="text"
//                 value={form.mobile}
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     mobile: e.target.value,
//                   })
//                 }
//                 className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
//               />
//             </div>

//             {/* Address */}
//             <div>
//               <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
//                 Address
//               </label>

//               <input
//                 type="text"
//                 value={form.address}
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     address: e.target.value,
//                   })
//                 }
//                 className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
//               />
//             </div>

//             {/* Course */}
//             <div>
//               <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
//                 Course
//               </label>

//               <select
//                 value={form.courseId}
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     courseId: e.target.value,
//                   })
//                 }
//                 className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
//               >
//                 <option value="">
//                   Select Course
//                 </option>

//                 {courses.map((c) => (
//                   <option
//                     key={c.id}
//                     value={c.id}
//                   >
//                     {c.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Department */}
//             <div>
//               <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
//                 Department
//               </label>

//               <select
//                 value={form.departmentId}
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     departmentId: e.target.value,
//                   })
//                 }
//                 className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
//               >
//                 <option value="">
//                   Select Department
//                 </option>

//                 {departments.map((d) => (
//                   <option
//                     key={d.id}
//                     value={d.id}
//                   >
//                     {d.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Session */}
//             <div className="md:col-span-2">
//               <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
//                 Academic Session
//               </label>

//               <select
//                 value={form.sessionId}
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     sessionId: e.target.value,
//                   })
//                 }
//                 className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
//               >
//                 <option value="">
//                   Select Session
//                 </option>

//                 {sessions.map((s) => (
//                   <option
//                     key={s.id}
//                     value={s.id}
//                   >
//                     {s.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//           </div>

//           {/* Submit */}
//           <div className="px-8 pb-8">
//             <button
//               onClick={handleSubmit}
//               disabled={loading}
//               className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium flex justify-center items-center gap-2 transition disabled:opacity-50"
//             >
//               {loading && (
//                 <Loader2 className="animate-spin h-4 w-4" />
//               )}

//               {loading
//                 ? "Submitting..."
//                 : "Create Student Admission"}
//             </button>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }











// "use client";

// import { useEffect, useState } from "react";
// import { Loader2, GraduationCap } from "lucide-react";
// import { toast } from "react-hot-toast";

// import { createStudent } from "@/services/studentService";
// import { getCourses } from "@/services/courseService";
// import { getDepartments } from "@/services/departmentService";
// import { getSessions } from "@/services/sessionService";

// interface Course {
//   id: number;
//   name: string;
// }

// interface Department {
//   id: number;
//   name: string;
// }

// interface Session {
//   id: number;
//   name: string;
// }

// export default function StudentCreatePage() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     mobile: "",
    
//     dob: "",
//     gender: "",
//     courseId: "",
//     departmentId: "",
//     sessionId: "",
//     semesterId: "1",
//   });

//   const [courses, setCourses] = useState<Course[]>([]);
//   const [departments, setDepartments] = useState<Department[]>([]);
//   const [semesters, setSemesters] = useState([]);
//   const [sessions, setSessions] = useState<Session[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchInitialData();
//   }, []);

//   const fetchInitialData = async () => {
//     try {
//       const [courseRes, deptRes, sessionRes] =
//         await Promise.all([
//           getCourses(),
//           getDepartments(),
//           getSessions(),
//         ]);

//       setCourses(courseRes || []);
//       setDepartments(deptRes || []);
//       setSessions(sessionRes || []);
//     } catch {
//       toast.error("Failed to load form data");
//     }
//   };

  
//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement
//     >
//   ) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async () => {
//     for (const key in form) {
//       if (!form[key as keyof typeof form]) {
//         return toast.error("All fields are required");
//       }
//     }

//     try {
//       setLoading(true);

//       await createStudent({
//         ...form,
//         courseId: Number(form.courseId),
//         departmentId: Number(form.departmentId),
//         sessionId: Number(form.sessionId),
//         semesterId: Number(form.semesterId),
//       });

//       toast.success("Student Admission Created");

//       setForm({
//         name: "",
//         email: "",
//         password: "",
//         mobile: "",
//         dob: "",
//         gender: "",
//         courseId: "",
//         departmentId: "",
//         sessionId: "",
//         semesterId: "1",
//       });

//     } catch (error: any) {
//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to create student"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-100 py-8 px-4">
//       <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg">

//         <div className="p-6 border-b flex items-center gap-3">
//           <GraduationCap className="text-indigo-600" />
//           <div>
//             <h1 className="text-xl font-bold">
//               Student Admission
//             </h1>
//             <p className="text-sm text-gray-500">
//               Create student account and admission
//             </p>
//           </div>
//         </div>

//         <div className="p-6 grid md:grid-cols-2 gap-4">

//           {[
//             "name",
//             "email",
//             "password",
//             "mobile",
//             "dob",
//           ].map((field) => (
//             <input
//               key={field}
//               name={field}
//               type={
//                 field === "password"
//                   ? "password"
//                   : field === "dob"
//                   ? "date"
//                   : "text"
//               }
//               placeholder={field}
//               value={form[field as keyof typeof form]}
//               onChange={handleChange}
//               className="border rounded-lg px-4 py-3"
//             />
//           ))}

//           <select
//             name="gender"
//             value={form.gender}
//             onChange={handleChange}
//             className="border rounded-lg px-4 py-3"
//           >
//             <option value="">Select Gender</option>
//             <option value="MALE">Male</option>
//             <option value="FEMALE">Female</option>
//             <option value="OTHER">Other</option>
//           </select>

//           <select
//             name="courseId"
//             value={form.courseId}
//             onChange={handleChange}
//             className="border rounded-lg px-4 py-3"
//           >
//             <option value="">Select Course</option>
//             {courses.map((c) => (
//               <option key={c.id} value={c.id}>
//                 {c.name}
//               </option>
//             ))}
//           </select>

//           <select
//             name="departmentId"
//             value={form.departmentId}
//             onChange={handleChange}
//             className="border rounded-lg px-4 py-3"
//           >
//             <option value="">Select Department</option>
//             {departments.map((d) => (
//               <option key={d.id} value={d.id}>
//                 {d.name}
//               </option>
//             ))}
//           </select>

//           <select
//             name="sessionId"
//             value={form.sessionId}
//             onChange={handleChange}
//             className="border rounded-lg px-4 py-3"
//           >
//             <option value="">Select Session</option>
//             {sessions.map((s) => (
//               <option key={s.id} value={s.id}>
//                 {s.name}
//               </option>
//             ))}
//           </select>

//           <select
//             name="semesterId"
//             value={form.semesterId}
//             onChange={handleChange}
//             className="border rounded-lg px-4 py-3"
//           >
//             {[1,2,3,4,5,6,7,8].map((sem) => (
//               <option key={sem} value={sem}>
//                 Semester {sem}
//               </option>
//             ))}
//           </select>

//         </div>

//         <div className="p-6">
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className="w-full bg-indigo-600 text-white h-12 rounded-xl flex justify-center items-center gap-2"
//           >
//             {loading && (
//               <Loader2 className="animate-spin h-4 w-4" />
//             )}
//             {loading
//               ? "Submitting..."
//               : "Create Admission"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }








"use client";

import { useEffect, useState } from "react";
import { Loader2, GraduationCap } from "lucide-react";
import { toast } from "react-hot-toast";

import Form from "@/components/form/Form";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";

import { createStudent } from "@/services/studentService";
import { getCourses } from "@/services/courseService";
import { getDepartments } from "@/services/departmentService";
import { getSessions } from "@/services/sessionService";
import { getSemesters } from "@/services/semesterService";

interface Course {
  id: number;
  name: string;
  code: string;
}

interface Department {
  id: number;
  name: string;
  course?: {
    id: number;
  };
}

interface Session {
  id: number;
  name: string;
}

interface Semester {
  id: number;
  name: string;
  course?: {
    id: number;
  };
}

export default function StudentCreatePage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    dob: "",
    gender: "",
    courseId: "",
    departmentId: "",
    sessionId: "",
    semesterId: "",
  });

  const [courses, setCourses] = useState<Course[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [allDepartments, setAllDepartments] = useState<Department[]>([]);
  const [allSemesters, setAllSemesters] = useState<Semester[]>([]);

  const [filteredDepartments, setFilteredDepartments] = useState<Department[]>([]);
  const [filteredSemesters, setFilteredSemesters] = useState<Semester[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (!form.courseId) {
      setFilteredDepartments([]);
      setFilteredSemesters([]);
      return;
    }

    const courseId = Number(form.courseId);

    setFilteredDepartments(
      allDepartments.filter(
        (d) => d.course?.id === courseId
      )
    );

    setFilteredSemesters(
      allSemesters.filter(
        (s) => s.course?.id === courseId
      )
    );
  }, [form.courseId]);

  const fetchInitialData = async () => {
    try {
      const [
        courseRes,
        deptRes,
        sessionRes,
        semesterRes,
      ] = await Promise.all([
        getCourses(),
        getDepartments(),
        getSessions(),
        getSemesters(),
      ]);

      setCourses(courseRes || []);
      setAllDepartments(deptRes || []);
      setSessions(sessionRes || []);
      setAllSemesters(semesterRes || []);

    } catch {
      toast.error("Failed to load form data");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (
    field: string,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,

      ...(field === "courseId" && {
        departmentId: "",
        semesterId: "",
      }),
    }));
  };

  const handleSubmit = async () => {
    for (const key in form) {
      if (!form[key as keyof typeof form]) {
        return toast.error("All fields are required");
      }
    }

    try {
      setLoading(true);

      await createStudent({
        ...form,
        courseId: Number(form.courseId),
        departmentId: Number(form.departmentId),
        sessionId: Number(form.sessionId),
        semesterId: Number(form.semesterId),
      });

      toast.success("Student Admission Created");

      setForm({
        name: "",
        email: "",
        password: "",
        mobile: "",
        dob: "",
        gender: "",
        courseId: "",
        departmentId: "",
        sessionId: "",
        semesterId: "",
      });

      setFilteredDepartments([]);
      setFilteredSemesters([]);

    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to create student"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4">
      <div className="max-w-5xl mx-auto rounded-2xl border border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800 shadow-lg">

        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3">
          <GraduationCap className="text-brand-500" />
          <div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              Student Admission
            </h1>
            <p className="text-sm text-gray-500">
              Create student account and admission
            </p>
          </div>
        </div>

        <Form onSubmit={handleSubmit} className="p-6 grid md:grid-cols-2 gap-4">

          <div>
            <Label>Name</Label>
            <Input name="name" value={form.name} onChange={handleInputChange} />
          </div>

          <div>
            <Label>Email</Label>
            <Input type="email" name="email" value={form.email} onChange={handleInputChange} />
          </div>

          <div>
            <Label>Password</Label>
            <Input type="password" name="password" value={form.password} onChange={handleInputChange} />
          </div>

          <div>
            <Label>Mobile</Label>
            <Input name="mobile" value={form.mobile} onChange={handleInputChange} />
          </div>

          <div>
            <Label>Date of Birth</Label>
            <Input type="date" name="dob" value={form.dob} onChange={handleInputChange} />
          </div>

          <div>
            <Label>Gender</Label>
            <Select
              placeholder="Select Gender"
              defaultValue={form.gender}
              onChange={(value) =>
                handleSelectChange("gender", value)
              }
              options={[
                { label: "Male", value: "MALE" },
                { label: "Female", value: "FEMALE" },
                { label: "Other", value: "OTHER" },
              ]}
            />
          </div>

          <div>
            <Label>Course</Label>
            <Select
              placeholder="Select Course"
              defaultValue={form.courseId}
              onChange={(value) =>
                handleSelectChange("courseId", value)
              }
              options={courses.map((c) => ({
                label: `${c.name} (${c.code})`,
                value: String(c.id),
              }))}
            />
          </div>

          <div>
            <Label>Department</Label>
            <Select
              placeholder="Select Department"
              defaultValue={form.departmentId}
              onChange={(value) =>
                handleSelectChange("departmentId", value)
              }
              options={filteredDepartments.map((d) => ({
                label: d.name,
                value: String(d.id),
              }))}
            />
          </div>

          <div>
            <Label>Session</Label>
            <Select
              placeholder="Select Session"
              defaultValue={form.sessionId}
              onChange={(value) =>
                handleSelectChange("sessionId", value)
              }
              options={sessions.map((s) => ({
                label: s.name,
                value: String(s.id),
              }))}
            />
          </div>

          <div>
            <Label>Semester</Label>
            <Select
              placeholder="Select Semester"
              defaultValue={form.semesterId}
              onChange={(value) =>
                handleSelectChange("semesterId", value)
              }
              options={filteredSemesters.map((sem) => ({
                label: sem.name,
                value: String(sem.id),
              }))}
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-brand-500 hover:bg-brand-600 text-white flex items-center justify-center gap-2"
            >
              {loading && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              {loading
                ? "Submitting..."
                : "Create Admission"}
            </button>
          </div>

        </Form>
      </div>
    </div>
  );
}
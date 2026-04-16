// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAppDispatch, useAppSelector } from "@/components/redux/slices/hooks";
// import { setLoading, setError } from "@/components/redux/slices/teacherSlice";
// import { createTeacher } from "@/services/teacherService";

// export default function CreateTeacherPage() {
//   const dispatch = useAppDispatch();
//   const router = useRouter();

//   const { loading, error } = useAppSelector((state) => state.teacher);

//   const [formData, setFormData] = useState({
//     userId: "",
//     subject: "",
//     qualification: "",
//     experience: "",
//     phone: "",
//   });

//   // ✅ Handle Input
// //   const handleChange = (e: any) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value,
// //     });
// //   };

// const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   setFormData({
//     ...formData,
//     [e.target.name]: e.target.value,
//   });
// };

// const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault();

//   try {
//     dispatch(setLoading(true));
//     dispatch(setError(null));

//     await createTeacher({
//       ...formData,
//       userId: Number(formData.userId), // 🔥 important
//     });

//     alert("Teacher Created ✅");
//     router.push("/teachers/list");

//   } catch (err: unknown) {
//     if (err instanceof Error) {
//       dispatch(setError(err.message));
//       alert(err.message);
//     }
//   } finally {
//     dispatch(setLoading(false));
//   }
// };

//   // ✅ Submit
// //   const handleSubmit = async (e: any) => {
// //     e.preventDefault();

// //     try {
// //       dispatch(setLoading(true));
// //       dispatch(setError(null));

// //       await createTeacher(formData);

// //       alert("Teacher Created ✅");
// //       router.push("/teachers/list");

// //     } catch (err: any) {
// //       dispatch(setError(err));
// //       alert(err);
// //     } finally {
// //       dispatch(setLoading(false));
// //     }
// //   };

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
//       <h2 className="text-xl font-bold mb-4">Create Teacher</h2>

//       {/* Error */}
//       {error && <p className="text-red-500">{error}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">

//         {/* User ID */}
//         <input
//           name="userId"
//           placeholder="User ID (teacher user)"
//           onChange={handleChange}
//           className="w-full border p-2"
//         />

//         {/* Subject */}
//         <input
//           name="subject"
//           placeholder="Subject"
//           onChange={handleChange}
//           className="w-full border p-2"
//         />

//         {/* Qualification */}
//         <input
//           name="qualification"
//           placeholder="Qualification"
//           onChange={handleChange}
//           className="w-full border p-2"
//         />

//         {/* Experience */}
//         <input
//           name="experience"
//           placeholder="Experience (e.g. 5 years)"
//           onChange={handleChange}
//           className="w-full border p-2"
//         />

//         {/* Phone */}
//         <input
//           name="phone"
//           placeholder="Phone"
//           onChange={handleChange}
//           className="w-full border p-2"
//         />

//         {/* Button */}
//         <button
//           disabled={loading}
//           className="bg-blue-600 text-white w-full py-2 rounded"
//         >
//           {loading ? "Creating..." : "Create Teacher"}
//         </button>
//       </form>
//     </div>
//   );
// }



// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Loader2,
//   GraduationCap,
// } from "lucide-react";
// import { toast } from "react-hot-toast";

// import {
//   useAppDispatch,
//   useAppSelector,
// } from "@/components/redux/slices/hooks";

// import {
//   setLoading,
//   setError,
// } from "@/components/redux/slices/teacherSlice";

// import { createTeacher } from "@/services/teacherService";
// import { getUsers } from "@/services/userServices";

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

// export default function CreateTeacherPage() {
//   const dispatch = useAppDispatch();
//   const router = useRouter();

//   const { loading, error } =
//     useAppSelector(
//       (state) => state.teacher
//     );

//   const [teacherUsers, setTeacherUsers] =
//     useState<User[]>([]);

//   const [formData, setFormData] =
//     useState({
//       userId: "",
//       subject: "",
//       qualification: "",
//       experience: "",
//       phone: "",
//     });

//   /* ---------------- Fetch Teacher Users ---------------- */
//   useEffect(() => {
//     fetchTeacherUsers();
//   }, []);

//   const fetchTeacherUsers = async () => {
//     try {
//       const users = await getUsers();
//      console.log("get users",users)
//       const onlyTeachers =
//         users.filter((u: User) =>
//           u.roles?.some(
//             (r) =>
//               r.role?.name === "TEACHER2"
//           )
//         );

//       setTeacherUsers(onlyTeachers);

//     } catch {
//       toast.error(
//         "Failed to load teacher users"
//       );
//     }
//   };

//   /* ---------------- Handle Change ---------------- */
//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement
//     >
//   ) => {
//     setFormData({
//       ...formData,
//       [e.target.name]:
//         e.target.value,
//     });
//   };

//   /* ---------------- Submit ---------------- */
//   const handleSubmit = async (
//     e: React.FormEvent<HTMLFormElement>
//   ) => {
//     e.preventDefault();

//     if (
//       !formData.userId ||
//       !formData.subject ||
//       !formData.qualification ||
//       !formData.phone
//     ) {
//       return toast.error(
//         "Please fill all required fields"
//       );
//     }

//     try {
//       dispatch(setLoading(true));
//       dispatch(setError(null));

//       await createTeacher({
//         ...formData,
//         userId: Number(
//           formData.userId
//         ),
//       });

//       toast.success(
//         "Teacher Created Successfully"
//       );

//       router.push(
//         "/teachers/list"
//       );

//     } catch (err: any) {
//       dispatch(
//         setError(
//           err.message
//         )
//       );

//       toast.error(
//         err.message
//       );

//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-100 dark:bg-slate-900 py-8 px-4">
//       <div className="max-w-4xl mx-auto">

//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
//             Create Teacher
//           </h1>
//           <p className="text-slate-500 dark:text-slate-400 mt-1">
//             Register teacher profile
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
//                   Teacher Information
//                 </h2>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">
//                   Fill teacher details below
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Error */}
//           {error && (
//             <div className="mx-8 mt-6 p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-200">
//               {error}
//             </div>
//           )}

//           {/* Form */}
//           <form
//             onSubmit={
//               handleSubmit
//             }
//             className="p-8 grid md:grid-cols-2 gap-6"
//           >

//             {/* Teacher User */}
//             <div className="md:col-span-2">
//               <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
//                 Select Teacher User
//               </label>

//               <select
//                 name="userId"
//                 value={
//                   formData.userId
//                 }
//                 onChange={
//                   handleChange
//                 }
//                 className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
//               >
//                 <option value="">
//                   Select Teacher User
//                 </option>

//                 {teacherUsers.map(
//                   (user) => (
//                     <option
//                       key={
//                         user.id
//                       }
//                       value={
//                         user.id
//                       }
//                     >
//                       {user.name} (
//                       {
//                         user.email
//                       }
//                       )
//                     </option>
//                   )
//                 )}
//               </select>
//             </div>

//             {/* Subject */}
//             <input
//               name="subject"
//               placeholder="Subject"
//               value={
//                 formData.subject
//               }
//               onChange={
//                 handleChange
//               }
//               className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
//             />

//             {/* Qualification */}
//             <input
//               name="qualification"
//               placeholder="Qualification"
//               value={
//                 formData.qualification
//               }
//               onChange={
//                 handleChange
//               }
//               className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
//             />

//             {/* Experience */}
//             <input
//               name="experience"
//               placeholder="Experience (e.g. 5 years)"
//               value={
//                 formData.experience
//               }
//               onChange={
//                 handleChange
//               }
//               className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
//             />

//             {/* Phone */}
//             <input
//               name="phone"
//               placeholder="Phone Number"
//               value={
//                 formData.phone
//               }
//               onChange={
//                 handleChange
//               }
//               className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
//             />

//             {/* Submit */}
//             <div className="md:col-span-2">
//               <button
//                 type="submit"
//                 disabled={
//                   loading
//                 }
//                 className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium flex justify-center items-center gap-2 transition disabled:opacity-50"
//               >
//                 {loading && (
//                   <Loader2 className="animate-spin h-4 w-4" />
//                 )}

//                 {loading
//                   ? "Creating..."
//                   : "Create Teacher"}
//               </button>
//             </div>

//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   Loader2,
//   GraduationCap,
// } from "lucide-react";
// import { toast } from "react-hot-toast";

// import {
//   useAppDispatch,
//   useAppSelector,
// } from "@/components/redux/slices/hooks";

// import {
//   setLoading,
//   setError,
// } from "@/components/redux/slices/teacherSlice";

// import { createTeacher } from "@/services/teacherService";

// export default function CreateTeacherPage() {
//   const dispatch = useAppDispatch();
//   const router = useRouter();

//   const { loading, error } =
//     useAppSelector((state) => state.teacher);

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     subject: "",
//     qualification: "",
//     experience: "",
//     phone: "",
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (
//     e: React.FormEvent<HTMLFormElement>
//   ) => {
//     e.preventDefault();

//     for (const key in formData) {
//       if (!formData[key as keyof typeof formData]) {
//         return toast.error(
//           "Please fill all required fields"
//         );
//       }
//     }

//     try {
//       dispatch(setLoading(true));
//       dispatch(setError(null));

//       await createTeacher(formData);

//       toast.success(
//         "Teacher Created Successfully"
//       );

//       router.push("/teachers/list");

//     } catch (err: any) {
//       dispatch(
//         setError(
//           err?.response?.data?.message ||
//             err.message
//         )
//       );

//       toast.error(
//         err?.response?.data?.message ||
//           err.message
//       );

//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-100 dark:bg-slate-900 py-8 px-4">
//       <div className="max-w-4xl mx-auto">

//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
//             Teacher Registration
//           </h1>
//           <p className="text-slate-500 dark:text-slate-400 mt-1">
//             Create teacher account and profile
//           </p>
//         </div>

//         <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">

//           <div className="px-8 py-5 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40">
//             <div className="flex items-center gap-3">
//               <GraduationCap
//                 className="text-indigo-600"
//                 size={22}
//               />
//               <div>
//                 <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
//                   Teacher Information
//                 </h2>
//                 <p className="text-sm text-slate-500 dark:text-slate-400">
//                   Fill teacher details below
//                 </p>
//               </div>
//             </div>
//           </div>

//           {error && (
//             <div className="mx-8 mt-6 p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-200">
//               {error}
//             </div>
//           )}

//           <form
//             onSubmit={handleSubmit}
//             className="p-8 grid md:grid-cols-2 gap-6"
//           >

//             <input
//               name="name"
//               placeholder="Full Name"
//               value={formData.name}
//               onChange={handleChange}
//               className="input"
//             />

//             <input
//               name="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               className="input"
//             />

//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               className="input"
//             />

//             <input
//               name="phone"
//               placeholder="Phone Number"
//               value={formData.phone}
//               onChange={handleChange}
//               className="input"
//             />

//             <input
//               name="subject"
//               placeholder="Subject"
//               value={formData.subject}
//               onChange={handleChange}
//               className="input"
//             />

//             <input
//               name="qualification"
//               placeholder="Qualification"
//               value={formData.qualification}
//               onChange={handleChange}
//               className="input"
//             />

//             <input
//               name="experience"
//               placeholder="Experience (e.g. 5 Years)"
//               value={formData.experience}
//               onChange={handleChange}
//               className="input"
//             />

//             <div className="md:col-span-2">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium flex justify-center items-center gap-2"
//               >
//                 {loading && (
//                   <Loader2 className="animate-spin h-4 w-4" />
//                 )}

//                 {loading
//                   ? "Creating..."
//                   : "Create Teacher"}
//               </button>
//             </div>

//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, GraduationCap } from "lucide-react";
import { toast } from "react-hot-toast";

import Form from "@/components/form/Form";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";

import {
  useAppDispatch,
  useAppSelector,
} from "@/components/redux/slices/hooks";

import {
  setLoading,
  setError,
} from "@/components/redux/slices/teacherSlice";

import { createTeacher } from "@/services/teacherService";

export default function CreateTeacherPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { loading, error } =
    useAppSelector((state) => state.teacher);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    subject: "",
    qualification: "",
    experience: "",
    phone: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    for (const key in formData) {
      if (!formData[key as keyof typeof formData]) {
        return toast.error(
          "Please fill all required fields"
        );
      }
    }

    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      await createTeacher(formData);

      toast.success("Teacher Created Successfully");

      router.push("/teachers/list");

    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err.message;

      dispatch(setError(msg));
      toast.error(msg);

    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-brand-100 dark:bg-brand-900/30">
            <GraduationCap className="text-brand-600" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Create Teacher
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Add a new teacher account and profile
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">

          {/* Error */}
          {error && (
            <div className="m-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
              {error}
            </div>
          )}

          <Form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2"
          >
            <div>
              <Label>Full Name</Label>
              <Input
                name="name"
                placeholder="Enter full name"
                defaultValue={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Email Address</Label>
              <Input
                type="email"
                name="email"
                placeholder="Enter email"
                defaultValue={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="Enter password"
                defaultValue={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Phone Number</Label>
              <Input
                name="phone"
                placeholder="Enter phone number"
                defaultValue={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Subject</Label>
              <Input
                name="subject"
                placeholder="Enter subject"
                defaultValue={formData.subject}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Qualification</Label>
              <Input
                name="qualification"
                placeholder="Enter qualification"
                defaultValue={formData.qualification}
                onChange={handleChange}
              />
            </div>

            <div className="md:col-span-2">
              <Label>Experience</Label>
              <Input
                name="experience"
                placeholder="e.g. 5 Years"
                defaultValue={formData.experience}
                onChange={handleChange}
              />
            </div>

            <div className="md:col-span-2 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-600 text-white font-medium hover:bg-brand-700 disabled:opacity-70"
              >
                {loading && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}

                {loading
                  ? "Creating Teacher..."
                  : "Create Teacher"}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
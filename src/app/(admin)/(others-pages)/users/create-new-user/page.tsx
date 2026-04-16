"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/components/redux/slices/hooks";
import { setLoading, setRoles, setError } from "@/components/redux/slices/userSlice";
import { createUser } from "@/services/userServices";
import { getRoles } from "@/services/roleService";
export default function CreateUserPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const { roles, loading, error } = useAppSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    roleId: "",
  });

  // ✅ Load Roles
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        dispatch(setLoading(true));

        const data = await getRoles();
        dispatch(setRoles(data));

      } catch (err: any) {
        dispatch(setError(err));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchRoles();
  }, [dispatch]);

  // ✅ Handle Input
  // const handleChange = (e: any) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleChange = (e: any) => {
  const { name, value } = e.target;

  setFormData({
    ...formData,
    [name]: name === "roleId" ? Number(value) : value, // ✅ convert to number
  });
};

  // ✅ Submit
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      await createUser(formData);

      alert("User Created ✅");
      router.push("/users/user-list");

    } catch (err: any) {
      dispatch(setError(err));
      alert(err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create User</h2>

      {/* ❗ Error */}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-2 border"
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 border"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 border"
        />

        <select
          name="roleId"
          onChange={handleChange}
          className="w-full p-2 border"
        >
          <option value="">Select Role</option>
          {roles.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}




// "use client";

// import React, { useState } from "react";
// import DynamicForm from "@/components/form/DynamicForm";
// import { userFormConfig } from "@/utils/userFormConfig";
// import { createStudent } from "@/services/studentService";
// export default function CreateUserPage() {
//   const [userType, setUserType] = useState("");
//   const [formData, setFormData] = useState<any>({});

//   const handleChange = (e: any) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//  const handleSubmit = async (
//   e: React.FormEvent
// ) => {
//   e.preventDefault();

//   try {
//     const payload = {
//       ...formData,

//       courseId: formData.courseId
//         ? Number(formData.courseId)
//         : undefined,

//       departmentId: formData.departmentId
//         ? Number(formData.departmentId)
//         : undefined,

//       sessionId: formData.sessionId
//         ? Number(formData.sessionId)
//         : undefined,

//       roleId: formData.roleId
//         ? Number(formData.roleId)
//         : undefined,
//     };

//     if (userType === "STUDENT") {
//       await createStudent(payload);
//     }

//     else if (userType === "TEACHER") {
//       await createTeacher(payload);
//     }

//     else if (userType === "ADMIN") {
//       await createUser(payload);
//     }

//     alert(`${userType} Created Successfully`);

//   } catch (error: any) {
//     alert(error.message);
//   }
// };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white rounded">
//       <form onSubmit={handleSubmit}>
//         <select
//           value={userType}
//           onChange={(e) => {
//             setUserType(e.target.value);
//             setFormData({});
//           }}
//           className="w-full border p-2 rounded mb-4"
//         >
//           <option value="">Select User Type</option>
//           <option value="STUDENT">Student</option>
//           <option value="TEACHER">Teacher</option>
//           <option value="ADMIN">Admin</option>
//         </select>

//         {userType && (
//           <>
//             <DynamicForm
//               fields={userFormConfig[userType]}
//               formData={formData}
//               onChange={handleChange}
//             />

//             <button
//               type="submit"
//               className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//             >
//               Create {userType}
//             </button>
//           </>
//         )}
//       </form>
//     </div>
//   );
// }








// "use client";

// import React, {
//   useEffect,
//   useState,
// } from "react";
// import toast from "react-hot-toast";
// import {
//   UserPlus,
//   Loader2,
// } from "lucide-react";

// import DynamicForm from "@/components/form/DynamicForm";
// import { userFormConfig } from "@/utils/userFormConfig";

// import { getRoles } from "@/services/roleService";
// import { getCourses } from "@/services/courseService";
// import { getDepartments } from "@/services/departmentService";
// import { getSessions } from "@/services/sessionService";

// import { createStudent } from "@/services/studentService";
// import { createTeacher } from "@/services/teacherService";
// import { createUser } from "@/services/userServices";

// export default function CreateUserPage() {
//   const [roles, setRoles] = useState<any[]>([]);
//   const [dynamicFields, setDynamicFields] =
//   useState<any[]>([]);
//   const [selectedRole, setSelectedRole] =
//     useState("");
//   const [formData, setFormData] =
//     useState<any>({});
//   const [loading, setLoading] =
//     useState(false);

//     const handleRoleChange = async (
//   roleId: number,
//   roleName: string
// ) => {
//   try {
//     setSelectedRole(roleName);

//     const fields =
//       await getRoleFormFields(roleId);

//     setDynamicFields(fields);

//     setFormData({});
//   } catch (error) {
//     console.error(
//       "Failed to load role form fields",
//       error
//     );
//   }
// };
//   const [dynamicOptions, setDynamicOptions] =
//     useState({
//       courses: [],
//       departments: [],
//       sessions: [],
//     });

//   useEffect(() => {
//     loadInitialData();
//   }, []);

//   const loadInitialData = async () => {
//     try {
//       const [
//         roles,
//         courses,
//         departments,
//         sessions,
//       ] = await Promise.all([
//         getRoles(),
//         getCourses(),
//         getDepartments(),
//         getSessions(),
//       ]);

//       setRoles(roles);

//       setDynamicOptions({
//         courses,
//         departments,
//         sessions,
//       });

//     } catch {
//       toast.error(
//         "Failed to load dropdown data"
//       );
//     }
//   };

//   const handleChange = (e: any) => {
//     const { name, value } = e.target;

//     setFormData((prev: any) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (
//     e: React.FormEvent
//   ) => {
//     e.preventDefault();

//     const role = roles.find(
//       (r) => r.name === selectedRole
//     );

//     const payload = {
//       ...formData,
//       roleId: role?.id,
//       courseId: formData.courseId
//         ? Number(formData.courseId)
//         : undefined,
//       departmentId:
//         formData.departmentId
//           ? Number(
//               formData.departmentId
//             )
//           : undefined,
//       sessionId: formData.sessionId
//         ? Number(formData.sessionId)
//         : undefined,
//     };

//     try {
//       setLoading(true);

//       if (
//         selectedRole === "STUDENT"
//       ) {
//         await createStudent(payload);
//       } else if (
//         selectedRole === "TEACHER"
//       ) {
//         await createTeacher(payload);
//       } else {
//         await createUser(payload);
//       }

//       toast.success(
//         `${selectedRole} created successfully`
//       );

//       setFormData({});
//       setSelectedRole("");

//     } catch (error: any) {
//       toast.error(
//         error.message ||
//           "Something went wrong"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const selectedFields =
//     userFormConfig[selectedRole] || [];

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
//       <div className="max-w-6xl mx-auto">

//         <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden">

//           {/* Header */}
//           <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
//             <div className="flex items-center gap-3">
//               <UserPlus className="text-blue-600" />
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//                   Create User
//                 </h1>
//                 <p className="text-sm text-gray-500">
//                   Select role and fill details
//                 </p>
//               </div>
//             </div>
//           </div>

//           <form
//             onSubmit={handleSubmit}
//             className="p-8"
//           >
//             {/* Role Select */}
//             <div className="mb-8">
//               <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Select Role
//               </label>

//               <select
//                 value={selectedRole}
//                 onChange={(e) => {
//                   setSelectedRole(
//                     e.target.value
//                   );
//                   setFormData({});
//                 }}
//                 className="w-full h-12 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="">
//                   Select Role
//                 </option>

//                 {roles.map((role) => (
//                   <option
//                     key={role.id}
//                     value={role.name}
//                   >
//                     {role.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {/* Dynamic Fields */}
//             {selectedFields.length > 0 && (
//               <>
//                 <DynamicForm
//                   fields={selectedFields}
//                   formData={formData}
//                   onChange={handleChange}
//                   dynamicOptions={
//                     dynamicOptions
//                   }
//                 />

//                 <div className="mt-8 flex justify-end">
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="h-12 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center gap-2 disabled:opacity-50"
//                   >
//                     {loading && (
//                       <Loader2 className="w-4 h-4 animate-spin" />
//                     )}

//                     {loading
//                       ? "Creating..."
//                       : `Create ${selectedRole}`}
//                   </button>
//                 </div>
//               </>
//             )}

//             {/* No Config Warning */}
//             {selectedRole &&
//               selectedFields.length ===
//                 0 && (
//                 <p className="text-red-500 mt-4">
//                   No form configuration
//                   found for this role.
//                 </p>
//               )}
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
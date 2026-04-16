// "use client";

// import Checkbox from "@/components/form/input/Checkbox";
// import Input from "@/components/form/input/InputField";
// import Label from "@/components/form/Label";
// import { ChevronLeft, Eye, EyeOff } from "lucide-react";
// import Link from "next/link";
// import React, { useState } from "react";
// import { createUser } from "@/services/userServices";

// export default function SignUpForm() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [isChecked, setIsChecked] = useState(false);

//   const [formData, setFormData] = useState({
//     collegeName: "",
//     collegeEmail: "",
//     phone: "",
//     address: "",
//     adminName: "",
//     adminEmail: "",
//     password: "",
//   });

//   const handleChange = (e: any) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     if (!isChecked) {
//       alert("Please accept terms");
//       return;
//     }

//     try {
//       const res = await createUser(formData);
//       alert("College & Admin Created Successfully ✅");
//       console.log(res);
//     } catch (err: any) {
//       alert(err.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900">
//       <div className="flex flex-col justify-center w-full px-6 sm:px-12">

//         <Link
//           href="/"
//           className="inline-flex items-center text-sm text-gray-500 hover:text-blue-500 mb-6"
//         >
//           <ChevronLeft size={18} />
//           Back to dashboard
//         </Link>

//         <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-md mx-auto">

//           <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
//             Register College
//           </h1>

//           <form onSubmit={handleSubmit} className="space-y-5">

//             {/* College Name */}
//             <div>
//               <Label>College Name *</Label>
//               <Input name="collegeName" onChange={handleChange} />
//             </div>

//             {/* College Email */}
//             <div>
//               <Label>College Email *</Label>
//               <Input name="collegeEmail" type="email" onChange={handleChange} />
//             </div>

//             {/* Phone */}
//             <div>
//               <Label>Phone *</Label>
//               <Input name="phone" onChange={handleChange} />
//             </div>

//             {/* Address */}
//             <div>
//               <Label>Address *</Label>
//               <Input name="address" onChange={handleChange} />
//             </div>

//             {/* Admin Name */}
//             <div>
//               <Label>Admin Name *</Label>
//               <Input name="adminName" onChange={handleChange} />
//             </div>

//             {/* Admin Email */}
//             <div>
//               <Label>Admin Email *</Label>
//               <Input name="adminEmail" type="email" onChange={handleChange} />
//             </div>

//             {/* Password */}
//             <div>
//               <Label>Password *</Label>
//               <div className="relative">
//                 <Input
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   onChange={handleChange}
//                   className="pr-10"
//                 />
//                 <span
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
//                 >
//                   {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
//                 </span>
//               </div>
//             </div>

//             {/* Checkbox */}
//             <div className="flex items-center gap-2 text-sm">
//               <Checkbox checked={isChecked} onChange={setIsChecked} />
//               <p>I agree to Terms & Conditions</p>
//             </div>

//             {/* Submit */}
//             <button className="w-full py-3 bg-blue-600 text-white rounded-xl">
//               Register College
//             </button>

//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


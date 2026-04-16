// "use client";

// import Checkbox from "@/components/form/input/Checkbox";
// import Input from "@/components/form/input/InputField";
// import Label from "@/components/form/Label";
// import Button from "@/components/ui/button/Button";
// import { Eye, EyeOff } from "lucide-react";
// import Link from "next/link";
// import React, { useState } from "react";
// import { useRouter } from "next/navigation"; // ✅ ADD

// import { useDispatch } from "react-redux";
// import {
//   setToken,
//   setUser,
// } from "@/components/redux/slices/authSlice";
// import { loginUser } from "@/services/authService";
// export default function SignInForm() {
//   const router = useRouter(); // ✅ ADD
// const dispatch = useDispatch();
//   const [showPassword, setShowPassword] = useState(false);
//   const [isChecked, setIsChecked] = useState(false);
//   const [loading, setLoading] = useState(false); // ✅ ADD

//   // ✅ ADD FORM STATE
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   // ✅ HANDLE INPUT
//   const handleChange = (e: any) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // ✅ LOGIN API
//  const handleSubmit = async (e: any) => {
//   e.preventDefault();
//   setLoading(true);

//   try {
//     const data = await loginUser(formData);

//     dispatch(setUser(data.user));
//     dispatch(setToken(data.accessToken));

//     alert("Login successful");

//     router.push("/admin");

//   } catch (err: any) {
//     alert(err.message);

//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="flex flex-col flex-1 lg:w-1/2 w-full">
//       <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
//         <div>
//           <div className="mb-5 sm:mb-8">
//             <h1 className="mb-2 font-semibold text-gray-800 text-title-sm">
//               Sign In
//             </h1>
//             <p className="text-sm text-gray-500">
//               Enter your email and password to sign in!
//             </p>
//           </div>

//           {/* 🔥 FORM */}
//           <form onSubmit={handleSubmit}>
//             <div className="space-y-6">

//               {/* Email */}
//               <div>
//                 <Label>Email *</Label>
//                 <Input
//                   type="email"
//                   name="email"
//                   placeholder="info@gmail.com"
//                   onChange={handleChange}
//                 />
//               </div>

//               {/* Password */}
//               <div>
//                 <Label>Password *</Label>
//                 <div className="relative">
//                   <Input
//                     name="password"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter your password"
//                     onChange={handleChange}
//                   />
//                   <span
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
//                   >
//                     {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
//                   </span>
//                 </div>
//               </div>

//               {/* Checkbox */}
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-3">
//                   <Checkbox checked={isChecked} onChange={setIsChecked} />
//                   <span className="text-sm">Keep me logged in</span>
//                 </div>
//                 <Link href="/reset-password" className="text-sm text-blue-500">
//                   Forgot password?
//                 </Link>
//               </div>

//               {/* Button */}
//               <div>
//                 <Button className="w-full" size="sm" disabled={loading}>
//                   {loading ? "Logging in..." : "Sign in"}
//                 </Button>
//               </div>
//             </div>
//           </form>

//           <div className="mt-5 text-center">
//             <p className="text-sm">
//               Don&apos;t have an account?{" "}
//               <Link href="/signup" className="text-blue-500">
//                 Sign Up
//               </Link>
//             </p>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { useDispatch } from "react-redux";
import {
  setToken,
  setUser,
} from "@/components/redux/slices/authSlice";

import { loginUser } from "@/services/authService";
import { toast } from "react-hot-toast";

export default function SignInForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

 const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  setFormData((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
  }));
};

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const data = await loginUser(formData);

      dispatch(setUser(data.user));
      dispatch(setToken(data.accessToken));

      toast.success("Login successful ✅");

      router.push("/admin");

    } catch (err: any) {
      toast.error(
  err?.response?.data?.message ||
  err?.message ||
  "Login failed"
);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm">
              Sign In
            </h1>
            <p className="text-sm text-gray-500">
              Enter your email and password to sign in!
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">

              <div>
                <Label>Email *</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="info@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Label>Password *</Label>
                <div className="relative">
                  <Input
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <span
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                  >
                    {showPassword ? (
                      <Eye size={18} />
                    ) : (
                      <EyeOff size={18} />
                    )}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={isChecked}
                    onChange={setIsChecked}
                  />
                  <span className="text-sm">
                    Keep me logged in
                  </span>
                </div>

                <Link
                  href="/reset-password"
                  className="text-sm text-blue-500"
                >
                  Forgot password?
                </Link>
              </div>

              <div>
                <Button
                  className="w-full"
                  size="sm"
                  disabled={loading}
                >
                  {loading
                    ? "Logging in..."
                    : "Sign in"}
                </Button>
              </div>

            </div>
          </form>

          <div className="mt-5 text-center">
            <p className="text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-blue-500"
              >
                Sign Up
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
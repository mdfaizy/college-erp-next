// "use client";

// import { useEffect, useState } from "react";
// import { Loader2, UserCircle2 } from "lucide-react";
// import { toast } from "react-hot-toast";

// import Form from "@/components/form/Form";
// import Label from "@/components/form/Label";
// import Input from "@/components/form/input/InputField";
// import Select from "@/components/form/Select";

// import {
//   getMyStudentProfile,
// } from "@/services/studentService";
// import {completeStudentProfile} from "@/services/profileService"
// export default function CompleteProfilePage() {
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     address: "",
//     fatherName: "",
//     motherName: "",
//     dob: "",
//     gender: "",
//   });

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const res = await getMyStudentProfile();


//       console.log(res);
//       const student = res;

//       setForm({
//         name: student.user?.name || "",
//         email: student.user?.email || "",
//         mobile: student.mobile || "",
//         address: student.address || "",
//         fatherName: student.fatherName || "",
//         motherName: student.motherName || "",
//         dob: student.dob
//           ? student.dob.split("T")[0]
//           : "",
//         gender: student.gender || "",
//       });

//     } catch {
//       toast.error(
//         "Failed to load profile"
//       );

//     } finally {
//       setFetching(false);
//     }
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const { name, value } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSelectChange = (
//     field: string,
//     value: string
//   ) => {
//     setForm((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);

//       await completeStudentProfile(form);

//       toast.success(
//         "Profile Completed Successfully"
//       );

//     } catch (error: any) {
//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to complete profile"
//       );

//     } finally {
//       setLoading(false);
//     }
//   };

//   if (fetching) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Loader2 className="animate-spin w-8 h-8 text-brand-500" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4">
//       <div className="max-w-4xl mx-auto rounded-2xl border border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800 shadow-lg">

//         <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3">
//           <UserCircle2 className="text-brand-500" />
//           <div>
//             <h1 className="text-xl font-bold text-gray-800 dark:text-white">
//               Complete Your Profile
//             </h1>
//             <p className="text-sm text-gray-500">
//               Fill your personal details to continue
//             </p>
//           </div>
//         </div>

//         <Form
//           onSubmit={handleSubmit}
//           className="p-6 grid md:grid-cols-2 gap-4"
//         >
//           <div>
//             <Label>Name</Label>
//             <Input
//               name="name"
//               value={form.name}
//               disabled
//             />
//           </div>

//           <div>
//             <Label>Email</Label>
//             <Input
//               name="email"
//               value={form.email}
//               disabled
//             />
//           </div>

//           <div>
//             <Label>Mobile</Label>
//             <Input
//               name="mobile"
//               value={form.mobile}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div>
//             <Label>Address</Label>
//             <Input
//               name="address"
//               value={form.address}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div>
//             <Label>Father Name</Label>
//             <Input
//               name="fatherName"
//               value={form.fatherName}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div>
//             <Label>Mother Name</Label>
//             <Input
//               name="motherName"
//               value={form.motherName}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div>
//             <Label>Date of Birth</Label>
//             <Input
//               type="date"
//               name="dob"
//               value={form.dob}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div>
//             <Label>Gender</Label>
//             <Select
//               placeholder="Select Gender"
//               defaultValue={form.gender}
//               onChange={(value) =>
//                 handleSelectChange(
//                   "gender",
//                   value
//                 )
//               }
//               options={[
//                 {
//                   label: "Male",
//                   value: "MALE",
//                 },
//                 {
//                   label: "Female",
//                   value: "FEMALE",
//                 },
//                 {
//                   label: "Other",
//                   value: "OTHER",
//                 },
//               ]}
//             />
//           </div>

//           <div className="md:col-span-2">
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full h-12 rounded-xl bg-brand-500 hover:bg-brand-600 text-white flex items-center justify-center gap-2"
//             >
//               {loading && (
//                 <Loader2 className="w-4 h-4 animate-spin" />
//               )}

//               {loading
//                 ? "Saving..."
//                 : "Complete Profile"}
//             </button>
//           </div>
//         </Form>
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { Loader2, UserCircle2 } from "lucide-react";
import { toast } from "react-hot-toast";

import Form from "@/components/form/Form";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";

import { getMyStudentProfile } from "@/services/studentService";
import { completeStudentProfile } from "@/services/profileService";

export default function CompleteProfilePage() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    fatherName: "",
    motherName: "",
    dob: "",
    gender: "",

    aadharNumber: "",
    bloodGroup: "",
    religion: "",
    category: "",
    nationality: "",

    fatherOccupation: "",
    motherOccupation: "",

    guardianName: "",
    guardianMobile: "",

    annualIncome: "",

    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const student = await getMyStudentProfile();

      setForm({
        name: student.user?.name || "",
        email: student.user?.email || "",
        mobile: student.mobile || "",
        address: student.address || "",
        fatherName: student.fatherName || "",
        motherName: student.motherName || "",
        dob: student.dob?.split("T")[0] || "",
        gender: student.gender || "",

        aadharNumber: student.aadharNumber || "",
        bloodGroup: student.bloodGroup || "",
        religion: student.religion || "",
        category: student.category || "",
        nationality: student.nationality || "",

        fatherOccupation:
          student.fatherOccupation || "",

        motherOccupation:
          student.motherOccupation || "",

        guardianName:
          student.guardianName || "",

        guardianMobile:
          student.guardianMobile || "",

        annualIncome:
          student.annualIncome || "",

        city: student.city || "",
        state: student.state || "",
        pincode: student.pincode || "",
        country: student.country || "",
      });

    } catch {
      toast.error("Failed to load profile");

    } finally {
      setFetching(false);
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
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await completeStudentProfile(form);

      toast.success(
        "Profile Completed Successfully"
      );

    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to complete profile"
      );

    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin w-8 h-8 text-brand-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4">
      <div className="max-w-6xl mx-auto rounded-2xl border border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800 shadow-lg">

        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3">
          <UserCircle2 className="text-brand-500" />
          <div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              Complete Your Profile
            </h1>
          </div>
        </div>

        <Form
          onSubmit={handleSubmit}
          className="p-6 grid md:grid-cols-2 gap-4"
        >

          <InputSection label="Name" name="name" value={form.name} disabled />
          <InputSection label="Email" name="email" value={form.email} disabled />

          <InputSection label="Mobile" name="mobile" value={form.mobile} onChange={handleInputChange} />
          <InputSection label="Address" name="address" value={form.address} onChange={handleInputChange} />

          <InputSection label="Father Name" name="fatherName" value={form.fatherName} onChange={handleInputChange} />
          <InputSection label="Mother Name" name="motherName" value={form.motherName} onChange={handleInputChange} />

          <InputSection label="Father Occupation" name="fatherOccupation" value={form.fatherOccupation} onChange={handleInputChange} />
          <InputSection label="Mother Occupation" name="motherOccupation" value={form.motherOccupation} onChange={handleInputChange} />

          <InputSection label="Guardian Name" name="guardianName" value={form.guardianName} onChange={handleInputChange} />
          <InputSection label="Guardian Mobile" name="guardianMobile" value={form.guardianMobile} onChange={handleInputChange} />

          <InputSection label="Date of Birth" type="date" name="dob" value={form.dob} onChange={handleInputChange} />
          <InputSection label="Aadhar Number" name="aadharNumber" value={form.aadharNumber} onChange={handleInputChange} />

          <InputSection label="Religion" name="religion" value={form.religion} onChange={handleInputChange} />
          <InputSection label="Category" name="category" value={form.category} onChange={handleInputChange} />

          <InputSection label="Nationality" name="nationality" value={form.nationality} onChange={handleInputChange} />
          <InputSection label="Annual Income" name="annualIncome" value={form.annualIncome} onChange={handleInputChange} />

          <InputSection label="City" name="city" value={form.city} onChange={handleInputChange} />
          <InputSection label="State" name="state" value={form.state} onChange={handleInputChange} />

          <InputSection label="Pincode" name="pincode" value={form.pincode} onChange={handleInputChange} />
          <InputSection label="Country" name="country" value={form.country} onChange={handleInputChange} />

          <div>
            <Label>Gender</Label>
            <Select
              placeholder="Select Gender"
              defaultValue={form.gender}
              onChange={(v) =>
                handleSelectChange("gender", v)
              }
              options={[
                { label: "Male", value: "MALE" },
                { label: "Female", value: "FEMALE" },
                { label: "Other", value: "OTHER" },
              ]}
            />
          </div>

          <div>
            <Label>Blood Group</Label>
            <Select
              placeholder="Blood Group"
              defaultValue={form.bloodGroup}
              onChange={(v) =>
                handleSelectChange("bloodGroup", v)
              }
              options={[
                { label: "A+", value: "A+" },
                { label: "A-", value: "A-" },
                { label: "B+", value: "B+" },
                { label: "B-", value: "B-" },
                { label: "O+", value: "O+" },
                { label: "O-", value: "O-" },
                { label: "AB+", value: "AB+" },
                { label: "AB-", value: "AB-" },
              ]}
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-brand-500 hover:bg-brand-600 text-white flex items-center justify-center gap-2"
            >
              {loading && (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
              {loading ? "Saving..." : "Complete Profile"}
            </button>
          </div>

        </Form>
      </div>
    </div>
  );
}

function InputSection({
  label,
  ...props
}: any) {
  return (
    <div>
      <Label>{label}</Label>
      <Input {...props} />
    </div>
  );
}
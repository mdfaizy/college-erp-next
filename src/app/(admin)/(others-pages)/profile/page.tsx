// import UserAddressCard from "@/components/user-profile/UserAddressCard";
// import UserInfoCard from "@/components/user-profile/UserInfoCard";
// import UserMetaCard from "@/components/user-profile/UserMetaCard";
// import { Metadata } from "next";
// import React from "react";

// export const metadata: Metadata = {
//   title: "",
//   description:
//     "",
// };

// export default function Profile() {
//   return (
//     <div>
//       <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
//         <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
//           Profile
//         </h3>
//         <div className="space-y-6">
//           <UserMetaCard />
//           <UserInfoCard />
//           <UserAddressCard />
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { getMyProfile } from "@/services/profileService";

// export default function ProfilePage() {
//   const [profile, setProfile] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   const router = useRouter();

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const res = await getMyProfile();
//       console.log("PROFILE API RESPONSE:", res);
//       setProfile(res);
//     } catch (error) {
//       console.error("Profile Fetch Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="p-6 text-lg font-medium">
//         Loading Profile...
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="p-6 text-red-500">
//         Profile not found
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <div className="bg-white rounded-2xl shadow-lg border p-6">

//         {/* HEADER */}
//         <div className="flex justify-between items-start mb-6">
//           <div className="flex gap-4 items-center">
//             <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600">
//               {profile?.user?.name?.charAt(0)}
//             </div>

//             <div>
//               <h1 className="text-2xl font-bold">
//                 {profile?.user?.name}
//               </h1>

//               <p className="text-gray-500">
//                 {profile?.user?.email}
//               </p>

//               <span className="text-sm text-green-600 font-medium">
//                 {profile?.status}
//               </span>
//             </div>
//           </div>

//           <button
//             onClick={() => router.push("/profile/edit")}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             Edit Profile
//           </button>
//         </div>

//         {/* ALERT */}
//         {!profile.profileCompleted && (
//           <div className="mb-6 p-4 rounded-lg bg-yellow-100 text-yellow-800">
//             Your profile is incomplete. Please complete your profile.
//           </div>
//         )}

//         {/* PERSONAL INFO */}
//         <h2 className="text-lg font-semibold mb-4">
//           Personal Information
//         </h2>

//         <div className="grid md:grid-cols-2 gap-4 mb-8">
//           <ProfileField label="Mobile" value={profile.mobile} />
//           <ProfileField label="Address" value={profile.address} />
//           <ProfileField label="Father Name" value={profile.fatherName} />
//           <ProfileField label="Mother Name" value={profile.motherName} />
//           <ProfileField label="DOB" value={profile.dob} />
//           <ProfileField label="Gender" value={profile.gender} />
//         </div>

//         {/* ACADEMIC INFO */}
//         <h2 className="text-lg font-semibold mb-4">
//           Academic Information
//         </h2>

//         <div className="grid md:grid-cols-2 gap-4">
//           <ProfileField
//             label="College"
//             value={profile?.college?.name}
//           />

//           <ProfileField
//             label="Course"
//             value={profile?.academics?.[0]?.course?.name}
//           />

//           <ProfileField
//             label="Department"
//             value={profile?.academics?.[0]?.department?.name}
//           />

//           <ProfileField
//             label="Session"
//             value={profile?.academics?.[0]?.session?.name}
//           />

//           <ProfileField
//             label="Semester"
//             value={profile?.academics?.[0]?.semesterId}
//           />

//           <ProfileField
//             label="Roll No"
//             value={profile?.academics?.[0]?.rollNo}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// function ProfileField({
//   label,
//   value,
// }: {
//   label: string;
//   value: any;
// }) {
//   return (
//     <div className="border rounded-lg p-4 bg-gray-50">
//       <p className="text-sm text-gray-500">
//         {label}
//       </p>

//       <p className="font-medium text-gray-800">
//         {value || "Not Added"}
//       </p>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getMyProfile } from "@/services/profileService";

export default function ProfilePage() {
  const [profile, setProfile] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const router = useRouter();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getMyProfile();

      setProfile(res);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <div>Loading...</div>;

  if (!profile)
    return <div>Profile not found</div>;

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow p-6">

        <div className="flex justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              {profile?.user?.name}
            </h1>

            <p className="text-gray-500">
              {profile?.user?.email}
            </p>
          </div>

          <button
            onClick={() =>
              router.push("/profile/edit")
            }
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Edit Profile
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Field
            label="Mobile"
            value={profile.mobile}
          />
          <Field
            label="Address"
            value={profile.address}
          />
          <Field
            label="Father Name"
            value={profile.fatherName}
          />
          <Field
            label="Mother Name"
            value={profile.motherName}
          />
          <Field
            label="DOB"
            value={profile.dob}
          />
          <Field
            label="Gender"
            value={profile.gender}
          />
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
}: any) {
  return (
    <div className="border rounded p-4">
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p>{value || "Not Added"}</p>
    </div>
  );
}
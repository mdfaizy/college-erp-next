"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getMyProfile,
  updateMyProfile,
} from "@/services/profileService";

export default function EditProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState<any>(null);

  const [formData, setFormData] = useState({
    mobile: "",
    address: "",
    fatherName: "",
    motherName: "",
    dob: "",
    gender: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getMyProfile();

      const data = res              ;

      setProfile(data);

      setFormData({
        mobile: data.mobile || "",
        address: data.address || "",
        fatherName: data.fatherName || "",
        motherName: data.motherName || "",
        dob: data.dob || "",
        gender: data.gender || "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await updateMyProfile(formData);

      router.push("/profile");
    } catch (error) {
      console.error(error);
    }
  };

  if (!profile) {
    return <div className="p-6">Loading...</div>;
  }

  const academic = profile.academics?.[0];

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow p-6 max-w-5xl">
        <h1 className="text-2xl font-bold mb-6">
          Complete / Edit Profile
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-4"
        >
          {/* READONLY FIELDS */}
          <Input
            label="Name"
            value={profile.user?.name}
            readOnly
          />

          <Input
            label="Email"
            value={profile.user?.email}
            readOnly
          />

          <Input
            label="Course"
            value={academic?.course?.name}
            readOnly
          />

          <Input
            label="Department"
            value={academic?.department?.name}
            readOnly
          />

          <Input
            label="Semester"
            value={academic?.semesterId}
            readOnly
          />

          <Input
            label="Roll No"
            value={academic?.rollNo}
            readOnly
          />

          {/* EDITABLE FIELDS */}
          <Input
            label="Mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />

          <Input
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />

          <Input
            label="Father Name"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleChange}
          />

          <Input
            label="Mother Name"
            name="motherName"
            value={formData.motherName}
            onChange={handleChange}
          />

          <Input
            label="DOB"
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />

          <div>
            <label className="block mb-1 font-medium">
              Gender
            </label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="">
                Select Gender
              </option>
              <option value="Male">
                Male
              </option>
              <option value="Female">
                Female
              </option>
              <option value="Other">
                Other
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="col-span-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}

function Input({
  label,
  ...props
}: any) {
  return (
    <div>
      <label className="block mb-1 font-medium">
        {label}
      </label>

      <input
        {...props}
        className={`w-full border rounded p-2 ${
          props.readOnly
            ? "bg-gray-100 cursor-not-allowed"
            : ""
        }`}
      />
    </div>
  );
}
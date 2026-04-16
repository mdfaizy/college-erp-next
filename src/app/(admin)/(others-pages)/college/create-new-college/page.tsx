"use client";

import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import {
  Eye,
  EyeOff,
  Building2,
  UserCog,
  Loader2,
} from "lucide-react";
import React, { useState } from "react";
import { createUser } from "@/services/userServices";
import { toast } from "react-hot-toast";

export default function RegisterCollege() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    collegeName: "",
    collegeEmail: "",
    phone: "",
    address: "",
    adminName: "",
    adminEmail: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isChecked) {
      return toast.error(
        "Please accept Terms & Conditions"
      );
    }

    try {
      setLoading(true);

      await createUser(formData);

      toast.success(
        "College & Admin Created Successfully"
      );

      setFormData({
        collegeName: "",
        collegeEmail: "",
        phone: "",
        address: "",
        adminName: "",
        adminEmail: "",
        password: "",
      });

      setIsChecked(false);
    } catch (err: any) {
      toast.error(
        err?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
            Register New College
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Create institution profile and admin account
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">

          <form
            onSubmit={handleSubmit}
            className="p-8 space-y-8"
          >

            {/* Institution Details */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <Building2 className="text-indigo-600" />
                <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                  Institution Details
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">

                <div>
                  <Label>College Name *</Label>
                  <Input
                    name="collegeName"
                    value={formData.collegeName}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label>College Email *</Label>
                  <Input
                    name="collegeEmail"
                    type="email"
                    value={formData.collegeEmail}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label>Phone *</Label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label>Address *</Label>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

              </div>
            </div>

            {/* Admin Details */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <UserCog className="text-indigo-600" />
                <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                  Admin Account
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">

                <div>
                  <Label>Admin Name *</Label>
                  <Input
                    name="adminName"
                    value={formData.adminName}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label>Admin Email *</Label>
                  <Input
                    name="adminEmail"
                    type="email"
                    value={formData.adminEmail}
                    onChange={handleChange}
                  />
                </div>

                <div className="md:col-span-2">
                  <Label>Password *</Label>

                  <div className="relative">
                    <Input
                      name="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={formData.password}
                      onChange={handleChange}
                      className="pr-12"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? (
                        <Eye size={18} />
                      ) : (
                        <EyeOff size={18} />
                      )}
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <Checkbox
                checked={isChecked}
                onChange={setIsChecked}
              />

              <p className="text-sm text-slate-600 dark:text-slate-400">
                I agree to the{" "}
                <span className="text-indigo-600 font-medium cursor-pointer">
                  Terms & Conditions
                </span>
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium flex justify-center items-center gap-2 transition disabled:opacity-50"
            >
              {loading && (
                <Loader2 className="animate-spin h-4 w-4" />
              )}

              {loading
                ? "Registering..."
                : "Register College"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
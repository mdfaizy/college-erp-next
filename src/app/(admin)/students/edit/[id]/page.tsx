"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, UserPen } from "lucide-react";
import { toast } from "react-hot-toast";

import Form from "@/components/form/Form";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";

import {
  getStudentById,
  updateStudentById,
} from "@/services/studentService";

export default function EditStudentPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [fetching, setFetching] =
    useState(true);

  const [form, setForm] = useState<any>({
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
    if (id) fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    try {
      const res =
        await getStudentById(Number(id));

      const student = res.data;

      setForm({
        name: student.user?.name || "",
        email: student.user?.email || "",
        mobile: student.mobile || "",
        address: student.address || "",
        fatherName:
          student.fatherName || "",
        motherName:
          student.motherName || "",
        dob: student.dob
          ? student.dob.split("T")[0]
          : "",
        gender: student.gender || "",

        aadharNumber:
          student.aadharNumber || "",

        bloodGroup:
          student.bloodGroup || "",

        religion:
          student.religion || "",

        category:
          student.category || "",

        nationality:
          student.nationality || "",

        fatherOccupation:
          student.fatherOccupation ||
          "",

        motherOccupation:
          student.motherOccupation ||
          "",

        guardianName:
          student.guardianName || "",

        guardianMobile:
          student.guardianMobile ||
          "",

        annualIncome:
          student.annualIncome || "",

        city: student.city || "",
        state: student.state || "",
        pincode:
          student.pincode || "",
        country:
          student.country || "",
      });

    } catch {
      toast.error(
        "Failed to load student"
      );

    } finally {
      setFetching(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (
    field: string,
    value: string
  ) => {
    setForm((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await updateStudentById(
        Number(id),
        form
      );

      toast.success(
        "Student Updated Successfully"
      );

      router.push(
        "/students/list"
      );

    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Update failed"
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
          <UserPen className="text-brand-500" />

          <div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
              Edit Student Profile
            </h1>

            <p className="text-sm text-gray-500">
              Update student details
            </p>
          </div>
        </div>

        <Form
          onSubmit={handleSubmit}
          className="p-6 grid md:grid-cols-2 gap-4"
        >

          {Object.entries(form).map(
            ([key, value]) => {
              if (
                key === "gender" ||
                key === "bloodGroup"
              )
                return null;

              return (
                <div key={key}>
                  <Label>
                    {key
                      .replace(
                        /([A-Z])/g,
                        " $1"
                      )
                      .replace(
                        /^./,
                        (str) =>
                          str.toUpperCase()
                      )}
                  </Label>

                  <Input
                    name={key}
                    value={value as string}
                    onChange={
                      handleInputChange
                    }
                    disabled={
                      key === "name" ||
                      key === "email"
                    }
                  />
                </div>
              );
            }
          )}

          <div>
            <Label>Gender</Label>
            <Select
              defaultValue={form.gender}
              onChange={(v) =>
                handleSelectChange(
                  "gender",
                  v
                )
              }
              options={[
                {
                  label: "Male",
                  value: "MALE",
                },
                {
                  label: "Female",
                  value: "FEMALE",
                },
                {
                  label: "Other",
                  value: "OTHER",
                },
              ]}
            />
          </div>

          <div>
            <Label>Blood Group</Label>
            <Select
              defaultValue={
                form.bloodGroup
              }
              onChange={(v) =>
                handleSelectChange(
                  "bloodGroup",
                  v
                )
              }
              options={[
                {
                  label: "A+",
                  value: "A+",
                },
                {
                  label: "A-",
                  value: "A-",
                },
                {
                  label: "B+",
                  value: "B+",
                },
                {
                  label: "B-",
                  value: "B-",
                },
                {
                  label: "O+",
                  value: "O+",
                },
                {
                  label: "O-",
                  value: "O-",
                },
                {
                  label: "AB+",
                  value: "AB+",
                },
                {
                  label: "AB-",
                  value: "AB-",
                },
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

              {loading
                ? "Updating..."
                : "Update Student"}
            </button>
          </div>

        </Form>
      </div>
    </div>
  );
}
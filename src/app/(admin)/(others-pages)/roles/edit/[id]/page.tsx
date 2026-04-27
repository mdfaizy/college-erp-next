"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import Form from "@/components/form/Form";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";

import {
  getRoleById,
  updateRole,
} from "@/services/roleService";

export default function RoleEditPage() {
  const { id } = useParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 Fetch role
 useEffect(() => {
  const fetchRole = async () => {
    try {
      const res = await getRoleById(Number(id));

      console.log("ROLE RESPONSE:", res);

      const role = res.data?.data || res.data || res;

      setName(role?.name || "");

    } catch (err) {
      toast.error("Failed to load role");
    }
  };

  if (id) fetchRole();
}, [id]);

  

  // 🔥 Submit
  const handleSubmit = async () => {
    if (!name.trim()) {
      return toast.error("Role name is required");
    }

    try {
      setLoading(true);

      await updateRole(Number(id), { name });

      toast.success("Role updated successfully");

      router.push("/roles");

    } catch (err: any) {
      toast.error(
        err?.response?.data?.message ||
          "Update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
      
      <h1 className="text-2xl font-bold mb-6">
        ✏️ Edit Role
      </h1>

      <Form className="space-y-5">
        
        {/* ROLE NAME */}
        <div>
          <Label>Role Name</Label>
          <Input
            value={name}
            onChange={(e: any) =>
              setName(e.target.value)
            }
            placeholder="Enter role name"
          />
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3">
          
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {loading ? "Updating..." : "Update"}
          </button>

        </div>

      </Form>
    </div>
  );
}
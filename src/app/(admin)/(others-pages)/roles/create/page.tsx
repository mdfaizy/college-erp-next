"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createRole } from "@/services/roleService";

export default function CreateRolePage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!name) {
      alert("Role name required");
      return;
    }

    setLoading(true);

    try {
      await createRole({ name });

      alert("Role created successfully ✅");
      router.push("/roles/list");

    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-xl font-bold mb-4">Create Role</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Role Name */}
        <div>
          <label className="block text-sm font-medium">Role Name</label>
          <input
            type="text"
            placeholder="Enter role name"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            className="mt-1 w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Create Role"}
        </button>

      </form>
    </div>
  );
}
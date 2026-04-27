"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { Shield, ArrowLeft } from "lucide-react";

import { getRoleById } from "@/services/roleService";

export default function RoleViewPage() {
  const { id } = useParams();
  const router = useRouter();

  const [role, setRole] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH ROLE
  useEffect(() => {
    const fetchRole = async () => {
      try {
        setLoading(true);

        const res = await getRoleById(Number(id));

        const data = res?.data || res; // handle both API formats
        setRole(data);

      } catch (err) {
        toast.error("Failed to load role");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRole();
  }, [id]);

  // 🔄 LOADING
  if (loading) {
    return (
      <div className="p-6 text-center">
        <p>Loading role details...</p>
      </div>
    );
  }

  // ❌ NOT FOUND
  if (!role) {
    return (
      <div className="p-6 text-center">
        <p>Role not found</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-black"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <h1 className="text-2xl font-bold">
          Role Details
        </h1>
      </div>

      {/* CARD */}
      <div className="bg-white shadow-lg rounded-xl p-6 border">

        {/* ROLE NAME */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-100 rounded-lg">
            <Shield className="text-purple-600" />
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              {role.name}
            </h2>
            <p className="text-sm text-gray-500">
              Role ID: {role.id}
            </p>
          </div>
        </div>

        {/* PERMISSIONS */}
        <div>
          <h3 className="text-lg font-semibold mb-3">
            Permissions
          </h3>

          {role.permissions && role.permissions.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {role.permissions.map((p: any, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm"
                >
                  {p}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              No permissions assigned
            </p>
          )}
        </div>

      </div>

      {/* ACTIONS */}
      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={() => router.push(`/roles/edit/${role.id}`)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Edit Role
        </button>
      </div>

    </div>
  );
}
"use client";

import React, { useEffect, useState } from "react";
import {
  ShieldCheck,
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";
import { toast } from "react-hot-toast";

import { getPermissions } from "@/services/permissionService";

interface Permission {
  id: number;
  key: string;
  name: string;
  module?: string;
  description?: string;
}

export default function PermissionListPage() {
  const [permissions, setPermissions] = useState<
    Permission[]
  >([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      const data = await getPermissions();

      setPermissions(data?.data || data || []);

    } catch {
      toast.error(
        "Failed to load permissions"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-brand-100 dark:bg-brand-900/30">
              <ShieldCheck className="text-brand-600" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Permissions
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage system permissions
              </p>
            </div>
          </div>

          <button className="flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-white hover:bg-brand-700">
            <Plus size={18} />
            Add Permission
          </button>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Key
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Module
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Description
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 dark:text-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      Loading permissions...
                    </td>
                  </tr>
                ) : permissions.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      No permissions found
                    </td>
                  </tr>
                ) : (
                  permissions.map((perm) => (
                    <tr
                      key={perm.id}
                      className="border-t border-gray-100 dark:border-gray-800"
                    >
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {perm.id}
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-brand-600">
                        {perm.key}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {perm.name}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {perm.module || "-"}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-500">
                        {perm.description || "-"}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-3">
                          <button className="rounded-lg p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                            <Pencil
                              size={18}
                              className="text-blue-600"
                            />
                          </button>

                          <button className="rounded-lg p-2 hover:bg-red-50 dark:hover:bg-red-900/20">
                            <Trash2
                              size={18}
                              className="text-red-600"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
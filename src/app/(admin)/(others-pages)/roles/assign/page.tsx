"use client";

import React, { useEffect, useState } from "react";
import { ShieldCheck, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

import { getUsers } from "@/services/userServices";
import {
  getRoles,
  assignPermissions,
} from "@/services/roleService";
import { getPermissions } from "@/services/permissionService";

import Form from "@/components/form/Form";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";

export default function AssignPermissionPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [permissions, setPermissions] = useState<any[]>([]);

  const [selectedRole, setSelectedRole] =
    useState<number | null>(null);

  const [selectedUser, setSelectedUser] =
    useState<number | null>(null);

  const [selectedPermissions, setSelectedPermissions] =
    useState<number[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [userData, roleData, permData] =
        await Promise.all([
          getUsers(),
          getRoles(),
          getPermissions(),
        ]);

      setUsers(userData?.data || userData || []);
      setRoles(roleData?.data || roleData || []);
      setPermissions(permData?.data || permData || []);
      console.log(roleData)
    } catch {
      toast.error("Failed to load data");
    }
  };

  /*
   |--------------------------------------------------
   | ROLE → FILTER USERS + AUTO LOAD PERMISSIONS
   |--------------------------------------------------
   */
  useEffect(() => {
    if (!selectedRole) {
      setSelectedPermissions([]);
      setSelectedUser(null);
      return;
    }

    const role = roles.find(
      (r) => r.id === selectedRole
    );

    if (role) {
      const assigned = role.permissions || [];

      const ids = permissions
        .filter((p) =>
          assigned.includes(p.key)
        )
        .map((p) => p.id);

      setSelectedPermissions(ids);
    }
  }, [selectedRole, roles, permissions]);

  const filteredUsers = users.filter(
    (u) =>
      u.roles?.[0]?.role?.id === selectedRole
  );

  const handleCheckbox = (id: number) => {
    setSelectedPermissions((prev) =>
      prev.includes(id)
        ? prev.filter((p) => p !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    if (!selectedRole) {
      return toast.error("Select Role");
    }

    try {
      setLoading(true);

      await assignPermissions({
        roleId: selectedRole,
        permissionIds: selectedPermissions,
      });

      toast.success(
        "Permissions Assigned Successfully"
      );

    } catch {
      toast.error(
        "Failed to assign permissions"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-brand-100 dark:bg-brand-900/30">
            <ShieldCheck className="text-brand-600" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Assign Permissions
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage role permissions and users
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">

          <Form
            onSubmit={() => {}}
            className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2"
          >
            {/* ROLE SELECT */}
            <div>
              <Label>Select Role</Label>
              <Select
                options={roles.map((r) => ({
                  value: String(r.id),
                  label: r.name,
                }))}
                placeholder="Choose Role"
                onChange={(val) =>
                  setSelectedRole(Number(val))
                }
              />
            </div>

            {/* USER SELECT */}
            <div>
              <Label>Select User</Label>
              <Select
                options={filteredUsers.map((u) => ({
                  value: String(u.id),
                  label: u.name,
                }))}
                placeholder="Choose User"
                onChange={(val) =>
                  setSelectedUser(Number(val))
                }
              />
            </div>
          </Form>

          {/* Permissions */}
          {selectedRole && (
            <div className="border-t border-gray-200 dark:border-gray-800 p-6">
              <Label className="mb-4">
                Permissions
              </Label>

              <div className="grid md:grid-cols-3 gap-4">
                {permissions.map((p) => (
                  <label
                    key={p.id}
                    className="flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-700 px-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <input
                      type="checkbox"
                      checked={selectedPermissions.includes(
                        p.id
                      )}
                      onChange={() =>
                        handleCheckbox(p.id)
                      }
                      className="h-4 w-4"
                    />

                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {p.key}
                    </span>
                  </label>
                ))}
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-600 text-white font-medium hover:bg-brand-700 disabled:opacity-70"
              >
                {loading && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}

                {loading
                  ? "Saving..."
                  : "Assign Permissions"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";

import {
  getAllHostels,
  toggleHostel,
  deleteHostel,
} from "@/services/hostelService";

export default function HostelListPage() {
  const [hostels, setHostels] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchHostels();
  }, []);

  const fetchHostels = async () => {
    try {
      const res =
        await getAllHostels();

      setHostels(res.data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (
    id: number
  ) => {
    try {
      await toggleHostel(id);
      fetchHostels();
    } catch (err) {
      alert("Toggle Failed");
    }
  };

  const handleDelete = async (
    id: number
  ) => {
    const confirmed =
      confirm(
        "Delete this hostel?"
      );

    if (!confirmed) return;

    try {
      await deleteHostel(id);
      fetchHostels();
    } catch (err) {
      alert("Delete Failed");
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        Loading Hostels...
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow border p-6">
        <h1 className="text-2xl font-bold mb-6">
          Hostel List
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full border">
           <thead className="bg-gray-100">
  <tr>
    <th className="border p-3">Name</th>
    <th className="border p-3">Code</th>
    <th className="border p-3">Type</th>
    <th className="border p-3">Capacity</th>
    <th className="border p-3">Occupied</th>
    <th className="border p-3">Available</th>
    <th className="border p-3">Status</th>
    <th className="border p-3">Actions</th>
  </tr>
</thead>

           <tbody>
  {hostels.map((hostel) => (
    <tr key={hostel.id}>
      <td className="border p-3">
        {hostel.name}
      </td>

      <td className="border p-3">
        {hostel.code}
      </td>

      <td className="border p-3">
        {hostel.type}
      </td>

      <td className="border p-3">
        {hostel.totalCapacity}
      </td>

      <td className="border p-3">
        {hostel.occupiedBeds}
      </td>

      <td className="border p-3 text-green-600 font-semibold">
        {hostel.totalCapacity -
          hostel.occupiedBeds}
      </td>

      <td className="border p-3">
        <span
          className={`px-3 py-1 rounded text-xs font-semibold ${
            hostel.isActive
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {hostel.isActive
            ? "ACTIVE"
            : "INACTIVE"}
        </span>
      </td>

      <td className="border p-3 space-x-2">
        <button
          onClick={() =>
            handleToggle(
              hostel.id
            )
          }
          className="rounded bg-yellow-500 px-3 py-1 text-white"
        >
          Toggle
        </button>

        <button
          onClick={() =>
            handleDelete(
              hostel.id
            )
          }
          className="rounded bg-red-600 px-3 py-1 text-white"
        >
          Delete
        </button>

        <button className="rounded bg-blue-600 px-3 py-1 text-white">
          Edit
        </button>
      </td>
    </tr>
  ))}
</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
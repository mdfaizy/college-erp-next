"use client";

import { useEffect, useState } from "react";
import { getAllocations } from "@/services/hostelService";

export default function AllocationListPage() {
  const [allocations, setAllocations] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchAllocations();
  }, []);

  const fetchAllocations = async () => {
    try {
      const res =
        await getAllocations();

      setAllocations(res.data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        Loading Allocations...
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow border p-6">
        <h1 className="text-2xl font-bold mb-6">
          Hostel Allocation List
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3">
                  Student
                </th>
                <th className="border p-3">
                  Student ID
                </th>
                <th className="border p-3">
                  Hostel
                </th>
                <th className="border p-3">
                  Floor
                </th>
                <th className="border p-3">
                  Room
                </th>
                <th className="border p-3">
                  Status
                </th>
                <th className="border p-3">
                  Allocated At
                </th>
              </tr>
            </thead>

            <tbody>
              {allocations.map(
                (allocation) => (
                  <tr
                    key={allocation.id}
                  >
                    <td className="border p-3">
                      {
                        allocation
                          .student?.user
                          ?.name
                      }
                    </td>

                    <td className="border p-3">
                      {
                        allocation
                          .student?.id
                      }
                    </td>

                    <td className="border p-3">
                      {
                        allocation
                          .hostel?.name
                      }
                    </td>

                    <td className="border p-3">
                      {
                        allocation
                          .floor?.name
                      }
                    </td>

                    <td className="border p-3">
                      {
                        allocation
                          .room
                          ?.roomNumber
                      }
                    </td>

                    <td className="border p-3">
                      <span className="px-3 py-1 rounded bg-green-100 text-green-600 text-xs font-semibold">
                        {
                          allocation.status
                        }
                      </span>
                    </td>

                    <td className="border p-3">
                      {new Date(
                        allocation.allocatedAt
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
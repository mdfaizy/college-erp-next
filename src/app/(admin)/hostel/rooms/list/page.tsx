"use client";

import { useEffect, useState } from "react";
import { getRooms } from "@/services/hostelService";

export default function RoomListPage() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await getRooms();
      setRooms(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading Rooms...</div>;
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow border p-6">
        <h1 className="text-2xl font-bold mb-6">
          Hostel Room List
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3">
                  Room No
                </th>
                <th className="border p-3">
                  Hostel
                </th>
                <th className="border p-3">
                  Floor
                </th>
                <th className="border p-3">
                  Capacity
                </th>
                <th className="border p-3">
                  Occupied
                </th>
                <th className="border p-3">
                  Available
                </th>
                <th className="border p-3">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {rooms.map((room) => (
                <tr key={room.id}>
                  <td className="border p-3">
                    {room.roomNumber}
                  </td>

                  <td className="border p-3">
                    {room.hostel?.name}
                  </td>

                  <td className="border p-3">
                    {room.floor?.name}
                  </td>

                  <td className="border p-3">
                    {room.capacity}
                  </td>

                  <td className="border p-3">
                    {room.occupiedBeds}
                  </td>

                  <td className="border p-3">
                    {room.capacity -
                      room.occupiedBeds}
                  </td>

                  <td className="border p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        room.status ===
                        "FULL"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {room.status}
                    </span>
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
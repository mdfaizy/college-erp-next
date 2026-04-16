// "use client";

// import { useEffect, useState } from "react";
// import { getAllocations } from "@/services/hostelService";

// export default function HostelAllocationsPage() {
//   const [allocations, setAllocations] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchAllocations();
//   }, []);

//   const fetchAllocations = async () => {
//     try {
//       const res = await getAllocations();
//       setAllocations(res.data || []);
//     } catch (err: any) {
//       alert(err.message || "Failed to fetch allocations");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <div className="p-6">Loading allocations...</div>;
//   }

//   return (
//     <div className="p-6 bg-white rounded-xl shadow">
//       <h1 className="text-2xl font-bold mb-6">
//         Hostel Allocations
//       </h1>

//       <div className="overflow-x-auto">
//         <table className="w-full border">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border p-3">Student ID</th>
//               <th className="border p-3">Hostel</th>
//               <th className="border p-3">Floor</th>
//               <th className="border p-3">Room</th>
//               <th className="border p-3">Status</th>
//               <th className="border p-3">Allocated At</th>
//             </tr>
//           </thead>

//           <tbody>
//             {allocations.map((item) => (
//               <tr key={item.id}>
//                 <td className="border p-3">
//                   {item.student?.id}
//                 </td>

//                 <td className="border p-3">
//                   {item.hostel?.name}
//                 </td>

//                 <td className="border p-3">
//                   {item.floor?.name}
//                 </td>

//                 <td className="border p-3">
//                   {item.room?.roomNumber}
//                 </td>

//                 <td className="border p-3">
//                   {item.status}
//                 </td>

//                 <td className="border p-3">
//                   {new Date(
//                     item.allocatedAt
//                   ).toLocaleDateString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getHostels,
  getRoomsByFloor,
  getFilteredAllocations,
  getFloorsByHostel,
} from "@/services/hostelService";

import Select from "@/components/form/Select";
import Label from "@/components/form/Label";

export default function AllocationListPage() {
  const [hostels, setHostels] =
    useState<any[]>([]);

  const [floors, setFloors] =
    useState<any[]>([]);

  const [rooms, setRooms] =
    useState<any[]>([]);

  const [allocations, setAllocations] =
    useState<any[]>([]);

  const [filters, setFilters] =
    useState({
      hostelId: "",
      floorId: "",
      roomId: "",
    });

  useEffect(() => {
    fetchHostels();
    fetchAllocations();
  }, []);

  const fetchHostels = async () => {
    const res =
      await getHostels();

    setHostels(
      res.data.map((hostel: any) => ({
        label: hostel.name,
        value: String(hostel.id),
      }))
    );
  };

  const fetchAllocations =
    async (
      hostelId?: number,
      roomId?: number
    ) => {
      const res =
        await getFilteredAllocations(
          hostelId,
          roomId
        );

      setAllocations(res.data);
    };

  const handleHostelChange =
    async (hostelId: string) => {
      setFilters({
        hostelId,
        floorId: "",
        roomId: "",
      });

      const res =
        await getFloorsByHostel(
          Number(hostelId)
        );

      setFloors(
        res.data.map((floor: any) => ({
          label: floor.name,
          value: String(floor.id),
        }))
      );

      setRooms([]);

      fetchAllocations(
        Number(hostelId)
      );
    };

  const handleFloorChange =
    async (floorId: string) => {
      setFilters((prev) => ({
        ...prev,
        floorId,
        roomId: "",
      }));

      const res =
        await getRoomsByFloor(
          Number(floorId)
        );

      setRooms(
        res.data.map((room: any) => ({
          label: room.roomNumber,
          value: String(room.id),
        }))
      );
    };

  const handleRoomChange = async (
    roomId: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      roomId,
    }));

    fetchAllocations(
      Number(filters.hostelId),
      Number(roomId)
    );
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-2xl shadow border p-6">
        <h1 className="text-2xl font-bold mb-6">
          Hostel Allocation List
        </h1>

        {/* Filters */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <Label>Hostel</Label>

            <Select
              options={hostels}
              placeholder="Select Hostel"
              defaultValue={
                filters.hostelId
              }
              onChange={
                handleHostelChange
              }
            />
          </div>

          <div>
            <Label>Floor</Label>

            <Select
              options={floors}
              placeholder="Select Floor"
              defaultValue={
                filters.floorId
              }
              onChange={
                handleFloorChange
              }
            />
          </div>

          <div>
            <Label>Room</Label>

            <Select
              options={rooms}
              placeholder="Select Room"
              defaultValue={
                filters.roomId
              }
              onChange={
                handleRoomChange
              }
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3">
                  Student
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
                          .student
                          ?.user?.name
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
                      <span className="px-2 py-1 rounded bg-green-100 text-green-600 text-xs">
                        {
                          allocation.status
                        }
                      </span>
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
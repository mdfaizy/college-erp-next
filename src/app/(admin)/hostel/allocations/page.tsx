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


// "use client";

// import {
//   useEffect,
//   useState,
// } from "react";

// import {
//   getHostels,
//   getRoomsByFloor,
//   getFilteredAllocations,
//   getFloorsByHostel,
// } from "@/services/hostelService";

// import Select from "@/components/form/Select";
// import Label from "@/components/form/Label";

// export default function AllocationListPage() {
//   const [hostels, setHostels] =
//     useState<any[]>([]);

//   const [floors, setFloors] =
//     useState<any[]>([]);

//   const [rooms, setRooms] =
//     useState<any[]>([]);

//   const [allocations, setAllocations] =
//     useState<any[]>([]);

//   const [filters, setFilters] =
//     useState({
//       hostelId: "",
//       floorId: "",
//       roomId: "",
//     });

//   useEffect(() => {
//     fetchHostels();
//     fetchAllocations();
//   }, []);

//   const fetchHostels = async () => {
//     const res =
//       await getHostels();

//     setHostels(
//       res.data.map((hostel: any) => ({
//         label: hostel.name,
//         value: String(hostel.id),
//       }))
//     );
//   };

//   const fetchAllocations =
//     async (
//       hostelId?: number,
//       roomId?: number
//     ) => {
//       const res =
//         await getFilteredAllocations(
//           hostelId,
//           roomId
//         );

//       setAllocations(res.data);
//     };

//   const handleHostelChange =
//     async (hostelId: string) => {
//       setFilters({
//         hostelId,
//         floorId: "",
//         roomId: "",
//       });

//       const res =
//         await getFloorsByHostel(
//           Number(hostelId)
//         );

//       setFloors(
//         res.data.map((floor: any) => ({
//           label: floor.name,
//           value: String(floor.id),
//         }))
//       );

//       setRooms([]);

//       fetchAllocations(
//         Number(hostelId)
//       );
//     };

//   const handleFloorChange =
//     async (floorId: string) => {
//       setFilters((prev) => ({
//         ...prev,
//         floorId,
//         roomId: "",
//       }));

//       const res =
//         await getRoomsByFloor(
//           Number(floorId)
//         );

//       setRooms(
//         res.data.map((room: any) => ({
//           label: room.roomNumber,
//           value: String(room.id),
//         }))
//       );
//     };

//   const handleRoomChange = async (
//     roomId: string
//   ) => {
//     setFilters((prev) => ({
//       ...prev,
//       roomId,
//     }));

//     fetchAllocations(
//       Number(filters.hostelId),
//       Number(roomId)
//     );
//   };

//   return (
//     <div className="p-6">
//       <div className="bg-white rounded-2xl shadow border p-6">
//         <h1 className="text-2xl font-bold mb-6">
//           Hostel Allocation List
//         </h1>

//         {/* Filters */}
//         <div className="grid grid-cols-3 gap-4 mb-6">
//           <div>
//             <Label>Hostel</Label>

//             <Select
//               options={hostels}
//               placeholder="Select Hostel"
//               defaultValue={
//                 filters.hostelId
//               }
//               onChange={
//                 handleHostelChange
//               }
//             />
//           </div>

//           <div>
//             <Label>Floor</Label>

//             <Select
//               options={floors}
//               placeholder="Select Floor"
//               defaultValue={
//                 filters.floorId
//               }
//               onChange={
//                 handleFloorChange
//               }
//             />
//           </div>

//           <div>
//             <Label>Room</Label>

//             <Select
//               options={rooms}
//               placeholder="Select Room"
//               defaultValue={
//                 filters.roomId
//               }
//               onChange={
//                 handleRoomChange
//               }
//             />
//           </div>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full border">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="border p-3">
//                   Student
//                 </th>
//                 <th className="border p-3">
//                   Hostel
//                 </th>
//                 <th className="border p-3">
//                   Floor
//                 </th>
//                 <th className="border p-3">
//                   Room
//                 </th>
//                 <th className="border p-3">
//                   Status
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {allocations.map(
//                 (allocation) => (
//                   <tr
//                     key={allocation.id}
//                   >
//                     <td className="border p-3">
//                       {
//                         allocation
//                           .student
//                           ?.user?.name
//                       }
//                     </td>

//                     <td className="border p-3">
//                       {
//                         allocation
//                           .hostel?.name
//                       }
//                     </td>

//                     <td className="border p-3">
//                       {
//                         allocation
//                           .floor?.name
//                       }
//                     </td>

//                     <td className="border p-3">
//                       {
//                         allocation
//                           .room
//                           ?.roomNumber
//                       }
//                     </td>

//                     <td className="border p-3">
//                       <span className="px-2 py-1 rounded bg-green-100 text-green-600 text-xs">
//                         {
//                           allocation.status
//                         }
//                       </span>
//                     </td>
//                   </tr>
//                 )
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";

// import {
//   getHostels,
//   getAllocations,
// } from "@/services/hostelService";

// import Select from "@/components/form/Select";
// import Label from "@/components/form/Label";

// export default function AllocationListPage() {
//   const [hostels, setHostels] =
//     useState<any[]>([]);

//   const [allocations, setAllocations] =
//     useState<any[]>([]);

//   const [selectedHostel, setSelectedHostel] =
//     useState("");

//   useEffect(() => {
//     fetchHostels();
//     fetchAllocations();
//   }, []);

//   const fetchHostels = async () => {
//     const res = await getHostels();

//     setHostels(
//       res.data.map((hostel: any) => ({
//         label: hostel.name,
//         value: String(hostel.id),
//       }))
//     );
//   };

//   const fetchAllocations = async (
//     hostelId?: number
//   ) => {
//     const res = await getAllocations();

//     let data = res.data;

//     if (hostelId) {
//       data = data.filter(
//         (item: any) =>
//           item.hostel?.id === hostelId
//       );
//     }

//     setAllocations(data);
//   };

//   const handleHostelChange = (
//     hostelId: string
//   ) => {
//     setSelectedHostel(hostelId);

//     fetchAllocations(
//       hostelId
//         ? Number(hostelId)
//         : undefined
//     );
//   };

//   return (
//     <div className="p-6">
//       <div className="bg-white rounded-2xl shadow border p-6">
//         <h1 className="text-2xl font-bold mb-6">
//           Hostel Allocation List
//         </h1>

//         {/* Filter */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//           <div>
//             <Label>Filter By Hostel</Label>

//             <Select
//               options={hostels}
//               placeholder="All Hostels"
//               defaultValue={selectedHostel}
//               onChange={handleHostelChange}
//             />
//           </div>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full border">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="border p-3">
//                   Student Name
//                 </th>
//                 <th className="border p-3">
//                   Hostel
//                 </th>
//                 <th className="border p-3">
//                   Semester
//                 </th>
//                 <th className="border p-3">
//                   Status
//                 </th>
//                 <th className="border p-3">
//                   Allocated At
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {allocations.length > 0 ? (
//                 allocations.map(
//                   (allocation: any) => (
//                     <tr
//                       key={allocation.id}
//                     >
//                       <td className="border p-3">
//                         {
//                           allocation
//                             .student?.user
//                             ?.name
//                         }
//                       </td>

//                       <td className="border p-3">
//                         {
//                           allocation
//                             .hostel?.name
//                         }
//                       </td>

//                       <td className="border p-3">
//                         {
//                           allocation.semester
//                         }
//                       </td>

//                       <td className="border p-3">
//                         <span className="px-2 py-1 rounded bg-green-100 text-green-600 text-xs">
//                           {
//                             allocation.status
//                           }
//                         </span>
//                       </td>

//                       <td className="border p-3">
//                         {new Date(
//                           allocation.allocatedAt
//                         ).toLocaleDateString()}
//                       </td>
//                     </tr>
//                   )
//                 )
//               ) : (
//                 <tr>
//                   <td
//                     colSpan={5}
//                     className="text-center p-4"
//                   >
//                     No Allocation Found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }





"use client";

import { useEffect, useState } from "react";

import {
  getHostels,
  getAllocations,
} from "@/services/hostelService";

import Select from "@/components/form/Select";
import Label from "@/components/form/Label";

export default function AllocationListPage() {
  const [hostels, setHostels] = useState<any[]>([]);
  const [allAllocations, setAllAllocations] =
    useState<any[]>([]);
  const [allocations, setAllocations] =
    useState<any[]>([]);

  const [filters, setFilters] = useState({
    hostelId: "",
    semester: "",
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    const [hostelRes, allocationRes] =
      await Promise.all([
        getHostels(),
        getAllocations(),
      ]);

    setHostels(
      hostelRes.data.map((hostel: any) => ({
        label: hostel.name,
        value: String(hostel.id),
      }))
    );
    
    setAllAllocations(allocationRes.data);
    setAllocations(allocationRes.data);
  };

  const applyFilters = (
    hostelId?: string,
    semester?: string
  ) => {
    let filtered = [...allAllocations];

    if (hostelId) {
      filtered = filtered.filter(
        (item) =>
          String(item.hostel?.id) === hostelId
      );
    }

    if (semester) {
      filtered = filtered.filter(
        (item) =>
          String(item.semester) === semester
      );
    }

    setAllocations(filtered);
  };

  const handleHostelChange = (
    hostelId: string
  ) => {
    const updatedFilters = {
      ...filters,
      hostelId,
    };

    setFilters(updatedFilters);

    applyFilters(
      updatedFilters.hostelId,
      updatedFilters.semester
    );
  };

  const handleSemesterChange = (
    semester: string
  ) => {
    const updatedFilters = {
      ...filters,
      semester,
    };

    setFilters(updatedFilters);

    applyFilters(
      updatedFilters.hostelId,
      updatedFilters.semester
    );
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 print:p-0">
      <div className="bg-white rounded-2xl shadow border p-6 print:shadow-none print:border-none">
        <div className="flex justify-between items-center mb-6 print:hidden">
          <h1 className="text-2xl font-bold">
            Hostel Allocation List
          </h1>

          <button
            onClick={handlePrint}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Print
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 print:hidden">
          <div>
            <Label>Filter By Hostel</Label>
            <Select
              options={hostels}
              placeholder="All Hostels"
              defaultValue={filters.hostelId}
              onChange={handleHostelChange}
            />
          </div>

          <div>
            <Label>Filter By Semester</Label>
            <Select
              options={[
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
                { label: "5", value: "5" },
                { label: "6", value: "6" },
                { label: "7", value: "7" },
                { label: "8", value: "8" },
              ]}
              placeholder="All Semester"
              defaultValue={filters.semester}
              onChange={handleSemesterChange}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3">
                  Student Name
                </th>
                <th className="border p-3">
                  Hostel
                </th>
                <th className="border p-3">
                  Semester
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
              {allocations.length > 0 ? (
                allocations.map(
                  (allocation: any) => (
                    <tr key={allocation.id}>
                      <td className="border p-3">
                        {
                          allocation.student?.user?.name
                        }
                      </td>

                      <td className="border p-3">
                        {
                          allocation.hostel?.name
                        }
                      </td>

                      <td className="border p-3">
                        {allocation.semester}
                      </td>

                      <td className="border p-3">
                        <span className="px-2 py-1 rounded bg-green-100 text-green-600 text-xs">
                          {allocation.status}
                        </span>
                      </td>

                      <td className="border p-3">
                        {new Date(
                          allocation.allocatedAt
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center p-4"
                  >
                    No Allocation Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
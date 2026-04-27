// "use client";

// import { useEffect, useState } from "react";

// import {
//   getAllHostels,
//   toggleHostel,
//   deleteHostel,
// } from "@/services/hostelService";

// export default function HostelListPage() {
//   const [hostels, setHostels] =
//     useState<any[]>([]);

//   const [loading, setLoading] =
//     useState(true);

//   useEffect(() => {
//     fetchHostels();
//   }, []);

//   const fetchHostels = async () => {
//     try {
//       const res =
//         await getAllHostels();

//       setHostels(res.data);

//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleToggle = async (
//     id: number
//   ) => {
//     try {
//       await toggleHostel(id);
//       fetchHostels();
//     } catch (err) {
//       alert("Toggle Failed");
//     }
//   };

//   const handleDelete = async (
//     id: number
//   ) => {
//     const confirmed =
//       confirm(
//         "Delete this hostel?"
//       );

//     if (!confirmed) return;

//     try {
//       await deleteHostel(id);
//       fetchHostels();
//     } catch (err) {
//       alert("Delete Failed");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="p-6">
//         Loading Hostels...
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <div className="bg-white rounded-2xl shadow border p-6">
//         <h1 className="text-2xl font-bold mb-6">
//           Hostel List
//         </h1>

//         <div className="overflow-x-auto">
//           <table className="w-full border">
//            <thead className="bg-gray-100">
//   <tr>
//     <th className="border p-3">Name</th>
//     <th className="border p-3">Code</th>
//     <th className="border p-3">Type</th>
//     <th className="border p-3">Capacity</th>
//     <th className="border p-3">Occupied</th>
//     <th className="border p-3">Available</th>
//     <th className="border p-3">Status</th>
//     <th className="border p-3">Actions</th>
//   </tr>
// </thead>

//            <tbody>
//   {hostels.map((hostel) => (
//     <tr key={hostel.id}>
//       <td className="border p-3">
//         {hostel.name}
//       </td>

//       <td className="border p-3">
//         {hostel.code}
//       </td>

//       <td className="border p-3">
//         {hostel.type}
//       </td>

//       <td className="border p-3">
//         {hostel.totalCapacity}
//       </td>

//       <td className="border p-3">
//         {hostel.occupiedBeds}
//       </td>

//       <td className="border p-3 text-green-600 font-semibold">
//         {hostel.totalCapacity -
//           hostel.occupiedBeds}
//       </td>

//       <td className="border p-3">
//         <span
//           className={`px-3 py-1 rounded text-xs font-semibold ${
//             hostel.isActive
//               ? "bg-green-100 text-green-600"
//               : "bg-red-100 text-red-600"
//           }`}
//         >
//           {hostel.isActive
//             ? "ACTIVE"
//             : "INACTIVE"}
//         </span>
//       </td>

//       <td className="border p-3 space-x-2">
//         <button
//           onClick={() =>
//             handleToggle(
//               hostel.id
//             )
//           }
//           className="rounded bg-yellow-500 px-3 py-1 text-white"
//         >
//           Toggle
//         </button>

//         <button
//           onClick={() =>
//             handleDelete(
//               hostel.id
//             )
//           }
//           className="rounded bg-red-600 px-3 py-1 text-white"
//         >
//           Delete
//         </button>

//         <button className="rounded bg-blue-600 px-3 py-1 text-white">
//           Edit
//         </button>
//       </td>
//     </tr>
//   ))}
// </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";

// import {
//   getAllHostels,
//   toggleHostel,
//   deleteHostel,
// } from "@/services/hostelService";

// export default function HostelListPage() {
//   const [hostels, setHostels] =
//     useState<any[]>([]);

//   const [loading, setLoading] =
//     useState(true);

//   useEffect(() => {
//     fetchHostels();
//   }, []);

//   const fetchHostels = async () => {
//     try {
//       const res =
//         await getAllHostels();

//       setHostels(res.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleToggle = async (
//     id: number
//   ) => {
//     try {
//       await toggleHostel(id);
//       fetchHostels();
//     } catch {
//       alert("Toggle Failed");
//     }
//   };

//   const handleDelete = async (
//     id: number
//   ) => {
//     const confirmed = confirm(
//       "Delete this hostel?"
//     );

//     if (!confirmed) return;

//     try {
//       await deleteHostel(id);
//       fetchHostels();
//     } catch {
//       alert("Delete Failed");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="p-6">
//         Loading Hostels...
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <div className="bg-white rounded-2xl shadow border p-6">
//         <h1 className="text-2xl font-bold mb-6">
//           Hostel List
//         </h1>

//         <div className="overflow-x-auto">
//           <table className="w-full border">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="border p-3">
//                   Name
//                 </th>

//                 <th className="border p-3">
//                   Type
//                 </th>

//                 <th className="border p-3">
//                   Address
//                 </th>

//                 <th className="border p-3">
//                   Capacity
//                 </th>

//                 <th className="border p-3">
//                   Occupied
//                 </th>

//                 <th className="border p-3">
//                   Available
//                 </th>

//                 <th className="border p-3">
//                   Status
//                 </th>

//                 <th className="border p-3">
//                   Actions
//                 </th>
//               </tr>
//             </thead>

//             <tbody>
//               {hostels.length > 0 ? (
//                 hostels.map((hostel) => (
//                   <tr key={hostel.id}>
//                     <td className="border p-3">
//                       {hostel.name}
//                     </td>

//                     <td className="border p-3">
//                       {hostel.type}
//                     </td>

//                     <td className="border p-3">
//                       {hostel.address}
//                     </td>

//                     <td className="border p-3">
//                       {hostel.totalCapacity}
//                     </td>

//                     <td className="border p-3">
//                       {hostel.occupiedBeds}
//                     </td>

//                     <td className="border p-3 text-green-600 font-semibold">
//                       {hostel.totalCapacity -
//                         hostel.occupiedBeds}
//                     </td>

//                     <td className="border p-3">
//                       <span
//                         className={`px-3 py-1 rounded text-xs font-semibold ${
//                           hostel.isActive
//                             ? "bg-green-100 text-green-600"
//                             : "bg-red-100 text-red-600"
//                         }`}
//                       >
//                         {hostel.isActive
//                           ? "ACTIVE"
//                           : "INACTIVE"}
//                       </span>
//                     </td>

//                     <td className="border p-3 space-x-2">
//                       <button
//                         onClick={() =>
//                           handleToggle(
//                             hostel.id
//                           )
//                         }
//                         className="rounded bg-yellow-500 px-3 py-1 text-white"
//                       >
//                         Toggle
//                       </button>

//                       <button
//                         onClick={() =>
//                           handleDelete(
//                             hostel.id
//                           )
//                         }
//                         className="rounded bg-red-600 px-3 py-1 text-white"
//                       >
//                         Delete
//                       </button>

//                       <button className="rounded bg-blue-600 px-3 py-1 text-white">
//                         Edit
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan={8}
//                     className="text-center p-4"
//                   >
//                     No Hostels Found
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
import { getAllHostels, toggleHostel, deleteHostel } from "@/services/hostelService";

export default function HostelListPage() {
  const [hostels, setHostels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHostels();
  }, []);

  const fetchHostels = async () => {
    try {
      const res = await getAllHostels();
      setHostels(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id: number) => {
    try {
      await toggleHostel(id);
      fetchHostels();
    } catch {
      alert("Toggle Failed");
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Are you sure you want to delete this hostel? This action cannot be undone.");
    if (!confirmed) return;

    try {
      await deleteHostel(id);
      fetchHostels();
    } catch {
      alert("Delete Failed");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Loading Inventory...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Hostel Management</h1>
            <p className="text-gray-500 text-sm mt-1">Monitor capacity, occupancy, and status of all building wings.</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-all flex items-center gap-2">
            <span>+ Add New Hostel</span>
          </button>
        </div>

        {/* Stats Summary (Mini Widgets) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Wings</p>
                <h2 className="text-2xl font-bold text-gray-900">{hostels.length}</h2>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Hostels</p>
                <h2 className="text-2xl font-bold text-green-600">{hostels.filter(h => h.isActive).length}</h2>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">System Health</p>
                <h2 className="text-2xl font-bold text-blue-600">Stable</h2>
            </div>
        </div>

        {/* Data Table Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600 font-semibold border-b">
                <tr>
                  <th className="px-6 py-4">Wing Details</th>
                  <th className="px-6 py-4 text-center">Accommodation</th>
                  <th className="px-6 py-4 text-center">Occupancy Rate</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-right">Administrative Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {hostels.length > 0 ? (
                  hostels.map((hostel) => {
                    const available = hostel.totalCapacity - hostel.occupiedBeds;
                    const occupancyPercent = ((hostel.occupiedBeds / hostel.totalCapacity) * 100).toFixed(0);

                    return (
                      <tr key={hostel.id} className="hover:bg-gray-50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="font-bold text-gray-900">{hostel.name}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] font-bold bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded uppercase">{hostel.type}</span>
                            <span className="text-gray-400 text-xs truncate max-w-[150px]">{hostel.address}</span>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                            <div className="flex flex-col items-center">
                                <div className="text-gray-900 font-medium">{available} <span className="text-gray-400 text-xs">Available</span></div>
                                <div className="text-[11px] text-gray-400">of {hostel.totalCapacity} Total Beds</div>
                            </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="w-full max-w-[100px] mx-auto">
                            <div className="flex justify-between mb-1 text-[10px] font-bold text-gray-500">
                                <span>{occupancyPercent}%</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-1.5">
                              <div 
                                className={`h-1.5 rounded-full ${Number(occupancyPercent) > 90 ? 'bg-red-500' : 'bg-blue-500'}`} 
                                style={{ width: `${occupancyPercent}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                            hostel.isActive 
                            ? "bg-green-50 text-green-700 border-green-200" 
                            : "bg-red-50 text-red-700 border-red-200"
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${hostel.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            {hostel.isActive ? "ACTIVE" : "INACTIVE"}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-right space-x-2">
                          <button
                            onClick={() => handleToggle(hostel.id)}
                            className="text-gray-600 hover:text-yellow-600 bg-gray-50 hover:bg-yellow-50 p-2 rounded-lg transition-all border border-transparent hover:border-yellow-200"
                            title="Toggle Status"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                          </button>
                          
                          <button
                            className="text-gray-600 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 p-2 rounded-lg transition-all border border-transparent hover:border-blue-200"
                            title="Edit"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                          </button>

                          <button
                            onClick={() => handleDelete(hostel.id)}
                            className="text-gray-600 hover:text-red-600 bg-gray-50 hover:bg-red-50 p-2 rounded-lg transition-all border border-transparent hover:border-red-200"
                            title="Delete"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center opacity-40">
                        <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        <p className="text-lg font-semibold text-gray-500">No Hostels Registered</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
// "use client";

// import {
//   useEffect,
//   useState,
// } from "react";
// import {getStudents,} from "@/services/studentService"
// import {
//   assignHostel,
  
//   getHostels,
//   getFloorsByHostel,
//   getRoomsByFloor,
// } from "@/services/hostelService";

// import Select from "@/components/form/Select";
// import Label from "@/components/form/Label";
// import Form from "@/components/form/Form";

// export default function AssignHostelPage() {
//   const [students, setStudents] =
//     useState<any[]>([]);

//   const [hostels, setHostels] =
//     useState<any[]>([]);

//   const [floors, setFloors] =
//     useState<any[]>([]);

//   const [rooms, setRooms] =
//     useState<any[]>([]);

//   const [loading, setLoading] =
//     useState(false);

//   const [form, setForm] = useState({
//     studentId: "",
//     hostelId: "",
//     floorId: "",
//     roomId: "",
//   });

//   useEffect(() => {
//     fetchInitialData();
//   }, []);

//   const fetchInitialData = async () => {
//     const [studentRes, hostelRes] =
//       await Promise.all([
//         getStudents(),
//         getHostels(),
//       ]);

//     setStudents(
//       studentRes.data.map(
//         (student: any) => ({
//           label: `${student.user?.name} (${student.id})`,
//           value: String(student.id),
//         })
//       )
//     );

//     setHostels(
//       hostelRes.data.map(
//         (hostel: any) => ({
//           label: hostel.name,
//           value: String(hostel.id),
//         })
//       )
//     );
//   };

//   const handleHostelChange =
//     async (hostelId: string) => {
//       setForm({
//         ...form,
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
//     };

//   const handleFloorChange =
//     async (floorId: string) => {
//       setForm({
//         ...form,
//         floorId,
//         roomId: "",
//       });

//       const res =
//         await getRoomsByFloor(
//           Number(floorId)
//         );

//       setRooms(
//         res.data.map((room: any) => ({
//           label: `${room.roomNumber} (Available: ${
//             room.capacity -
//             room.occupiedBeds
//           })`,
//           value: String(room.id),
//         }))
//       );
//     };

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);

//       await assignHostel({
//         studentId: Number(
//           form.studentId
//         ),
//         roomId: Number(form.roomId),
//       });

//       alert(
//         "Hostel Assigned Successfully"
//       );

//       setForm({
//         studentId: "",
//         hostelId: "",
//         floorId: "",
//         roomId: "",
//       });

//       setFloors([]);
//       setRooms([]);

//     } catch (err: any) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <div className="bg-white rounded-2xl shadow border p-8">
//         <h1 className="text-2xl font-bold mb-6">
//           Assign Hostel
//         </h1>

//         <Form
//           onSubmit={handleSubmit}
//           className="space-y-5"
//         >
//           <div>
//             <Label>Select Student</Label>
//             <Select
//               options={students}
//               placeholder="Choose Student"
//               defaultValue={form.studentId}
//               onChange={(value) =>
//                 setForm({
//                   ...form,
//                   studentId: value,
//                 })
//               }
//             />
//           </div>

//           <div>
//             <Label>Select Hostel</Label>
//             <Select
//               options={hostels}
//               placeholder="Choose Hostel"
//               defaultValue={form.hostelId}
//               onChange={
//                 handleHostelChange
//               }
//             />
//           </div>

//           <div>
//             <Label>Select Floor</Label>
//             <Select
//               options={floors}
//               placeholder="Choose Floor"
//               defaultValue={form.floorId}
//               onChange={
//                 handleFloorChange
//               }
//             />
//           </div>

//           <div>
//             <Label>Select Room</Label>
//             <Select
//               options={rooms}
//               placeholder="Choose Room"
//               defaultValue={form.roomId}
//               onChange={(value) =>
//                 setForm({
//                   ...form,
//                   roomId: value,
//                 })
//               }
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full h-11 rounded-lg bg-green-600 text-white"
//           >
//             {loading
//               ? "Assigning..."
//               : "Assign Hostel"}
//           </button>
//         </Form>
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
  assignHostel,
  getHostels,
  getFloorsByHostel,
  getRoomsByFloor,
  getStudentAllocation,
} from "@/services/hostelService";

import { getStudents } from "@/services/studentService";

import Select from "@/components/form/Select";
import Label from "@/components/form/Label";
import Form from "@/components/form/Form";

export default function AssignHostelPage() {
  const [students, setStudents] =
    useState<any[]>([]);

  const [hostels, setHostels] =
    useState<any[]>([]);

  const [floors, setFloors] =
    useState<any[]>([]);

  const [rooms, setRooms] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [currentAllocation, setCurrentAllocation] =
    useState<any>(null);

  const [form, setForm] = useState({
    studentId: "",
    hostelId: "",
    floorId: "",
    roomId: "",
  });

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [studentRes, hostelRes] =
        await Promise.all([
          getStudents(),
          getHostels(),
        ]);

      setStudents(
        studentRes.data.map(
          (student: any) => ({
            label: `${student.user?.name} (${student.id})`,
            value: String(student.id),
          })
        )
      );

      setHostels(
        hostelRes.data.map(
          (hostel: any) => ({
            label: hostel.name,
            value: String(hostel.id),
          })
        )
      );

    } catch (err) {
      console.error(err);
    }
  };

  const handleStudentChange =
    async (studentId: string) => {
      try {
        setForm({
          studentId,
          hostelId: "",
          floorId: "",
          roomId: "",
        });

        setFloors([]);
        setRooms([]);

        const res =
          await getStudentAllocation(
            Number(studentId)
          );

        setCurrentAllocation(
          res.data || null
        );

      } catch (err) {
        console.error(err);
      }
    };

  const handleHostelChange =
    async (hostelId: string) => {
      setForm((prev) => ({
        ...prev,
        hostelId,
        floorId: "",
        roomId: "",
      }));

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
    };

  const handleFloorChange =
    async (floorId: string) => {
      setForm((prev) => ({
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
          label: `${room.roomNumber} (Available: ${
            room.capacity -
            room.occupiedBeds
          })`,
          value: String(room.id),
        }))
      );
    };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await assignHostel({
        studentId: Number(
          form.studentId
        ),
        roomId: Number(form.roomId),
      });

      alert(
        "Hostel Assigned Successfully"
      );

      setForm({
        studentId: "",
        hostelId: "",
        floorId: "",
        roomId: "",
      });

      setCurrentAllocation(null);
      setFloors([]);
      setRooms([]);

    } catch (err: any) {
      alert(
        err?.message ||
          "Assignment Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow border p-8">
        <h1 className="text-2xl font-bold mb-6">
          Assign Hostel
        </h1>

        <Form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Student */}
          <div>
            <Label>Select Student</Label>

            <Select
              options={students}
              placeholder="Choose Student"
              defaultValue={form.studentId}
              onChange={
                handleStudentChange
              }
            />
          </div>

          {/* Existing Allocation */}
          {currentAllocation && (
            <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-300">
              <p className="font-semibold text-yellow-700">
                Student Already Assigned Hostel
              </p>

              <p className="text-sm mt-2">
                Hostel:{" "}
                {
                  currentAllocation
                    .hostel?.name
                }
              </p>

              <p className="text-sm">
                Floor:{" "}
                {
                  currentAllocation
                    .floor?.name
                }
              </p>

              <p className="text-sm">
                Room:{" "}
                {
                  currentAllocation
                    .room
                    ?.roomNumber
                }
              </p>
            </div>
          )}

          {/* Hostel */}
          <div>
            <Label>Select Hostel</Label>

            <Select
              options={hostels}
              placeholder="Choose Hostel"
              defaultValue={form.hostelId}
              onChange={
                handleHostelChange
              }
            />
          </div>

          {/* Floor */}
          <div>
            <Label>Select Floor</Label>

            <Select
              options={floors}
              placeholder="Choose Floor"
              defaultValue={form.floorId}
              onChange={
                handleFloorChange
              }
            />
          </div>

          {/* Room */}
          <div>
            <Label>Select Room</Label>

            <Select
              options={rooms}
              placeholder="Choose Room"
              defaultValue={form.roomId}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  roomId: value,
                }))
              }
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={
              loading ||
              !!currentAllocation
            }
            className="w-full h-11 rounded-lg bg-green-600 text-white disabled:opacity-50"
          >
            {loading
              ? "Assigning..."
              : currentAllocation
              ? "Already Assigned"
              : "Assign Hostel"}
          </button>
        </Form>
      </div>
    </div>
  );
}
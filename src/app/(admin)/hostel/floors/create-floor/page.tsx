// "use client";

// import { useEffect, useState } from "react";

// import {
//   createFloor,
//   getHostels,
// } from "@/services/hostelService";

// import Input from "@/components/form/input/InputField";
// import Label from "@/components/form/Label";
// import Select from "@/components/form/Select";
// import Form from "@/components/form/Form";

// export default function CreateFloorPage() {
//   const [loading, setLoading] = useState(false);

//   const [hostels, setHostels] = useState<any[]>([]);

//   const [form, setForm] = useState({
//     hostelId: "",
//     floorNumber: "",
//     name: "",
//   });

//   useEffect(() => {
//     fetchHostels();
//   }, []);

//   const fetchHostels = async () => {
//     try {
//       const res = await getHostels();

//       const formatted =
//         res.data.map((hostel: any) => ({
//           label: hostel.name,
//           value: String(hostel.id),
//         }));

//       setHostels(formatted);

//     } catch (err) {
//       console.error(
//         "Failed to fetch hostels"
//       );
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);

//       await createFloor({
//         ...form,
//         hostelId: Number(form.hostelId),
//         floorNumber: Number(
//           form.floorNumber
//         ),
//       });

//       alert("Floor Created Successfully");

//       setForm({
//         hostelId: "",
//         floorNumber: "",
//         name: "",
//       });

//     } catch (err: any) {
//       alert(
//         err?.message ||
//           "Failed to create floor"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-8">
//         <h1 className="text-2xl font-bold mb-6">
//           Create Floor
//         </h1>

//         <Form
//           onSubmit={handleSubmit}
//           className="space-y-5"
//         >
//           <div>
//             <Label>Select Hostel</Label>

//             <Select
//               options={hostels}
//               placeholder="Choose Hostel"
//               defaultValue={form.hostelId}
//               onChange={(value) =>
//                 setForm({
//                   ...form,
//                   hostelId: value,
//                 })
//               }
//             />
//           </div>

//           <div>
//             <Label>Floor Number</Label>

//             <Input
//               type="number"
//               placeholder="Enter floor number"
//               value={form.floorNumber}
//               onChange={(e) =>
//                 setForm({
//                   ...form,
//                   floorNumber:
//                     e.target.value,
//                 })
//               }
//             />
//           </div>

//           <div>
//             <Label>Floor Name</Label>

//             <Input
//               placeholder="Enter floor name"
//               value={form.name}
//               onChange={(e) =>
//                 setForm({
//                   ...form,
//                   name: e.target.value,
//                 })
//               }
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full h-11 rounded-lg bg-brand-600 text-white"
//           >
//             {loading
//               ? "Creating..."
//               : "Create Floor"}
//           </button>
//         </Form>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";

import {
  createFloor,
  getHostels,
} from "@/services/hostelService";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import Form from "@/components/form/Form";

export default function CreateFloorPage() {
  const [loading, setLoading] =
    useState(false);

  const [hostels, setHostels] =
    useState<any[]>([]);

  const [form, setForm] = useState({
    hostelId: "",
    floorNumber: "",
    name: "",
    totalCapacity: "",
  });

  useEffect(() => {
    fetchHostels();
  }, []);

  const fetchHostels = async () => {
    const res = await getHostels();

    setHostels(
      res.data.map((hostel: any) => ({
        label: `${hostel.name} (Cap: ${hostel.totalCapacity})`,
        value: String(hostel.id),
      }))
    );
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await createFloor({
        ...form,
        hostelId: Number(form.hostelId),
        floorNumber: Number(
          form.floorNumber
        ),
        totalCapacity: Number(
          form.totalCapacity
        ),
      });

      alert(
        "Floor Created Successfully"
      );

      setForm({
        hostelId: "",
        floorNumber: "",
        name: "",
        totalCapacity: "",
      });

    } catch (err: any) {
      alert(
        err?.message ||
          "Failed to create floor"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="rounded-2xl border bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold">
          Create Floor
        </h1>

        <Form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <Label>
              Select Hostel
            </Label>
            <Select
              options={hostels}
              placeholder="Choose Hostel"
              defaultValue={form.hostelId}
              onChange={(value) =>
                setForm({
                  ...form,
                  hostelId: value,
                })
              }
            />
          </div>

          <div>
            <Label>
              Floor Number
            </Label>
            <Input
              type="number"
              value={
                form.floorNumber
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  floorNumber:
                    e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label>
              Floor Name
            </Label>
            <Input
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label>
              Floor Capacity
            </Label>
            <Input
              type="number"
              value={
                form.totalCapacity
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  totalCapacity:
                    e.target.value,
                })
              }
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="h-11 w-full rounded-lg bg-brand-600 text-white"
          >
            {loading
              ? "Creating..."
              : "Create Floor"}
          </button>
        </Form>
      </div>
    </div>
  );
}
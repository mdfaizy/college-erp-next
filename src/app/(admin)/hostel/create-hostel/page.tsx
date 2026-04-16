// "use client";

// import { useState } from "react";
// import { createHostel } from "@/services/hostelService";

// import Input from "@/components/form/input/InputField";
// import Label from "@/components/form/Label";
// import Select from "@/components/form/Select";
// import TextArea from "@/components/form/input/TextArea";
// import Form from "@/components/form/Form";

// export default function CreateHostelPage() {
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     name: "",
//     code: "",
//     type: "",
//     address: "",
//   });

//   const hostelTypeOptions = [
//     {
//       label: "Boys Hostel",
//       value: "BOYS",
//     },
//     {
//       label: "Girls Hostel",
//       value: "GIRLS",
//     },
//   ];

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);

//       await createHostel(form);

//       alert("Hostel Created Successfully");

//       setForm({
//         name: "",
//         code: "",
//         type: "",
//         address: "",
//       });

//     } catch (err: any) {
//       alert(
//         err?.message ||
//           "Failed to create hostel"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-8">
//         <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
//           Create Hostel
//         </h1>

//         <Form
//           onSubmit={handleSubmit}
//           className="space-y-5"
//         >
//           <div>
//             <Label>Hostel Name</Label>
//             <Input
//               placeholder="Enter hostel name"
//               value={form.name}
//               onChange={(e) =>
//                 setForm({
//                   ...form,
//                   name: e.target.value,
//                 })
//               }
//             />
//           </div>

//           <div>
//             <Label>Hostel Code</Label>
//             <Input
//               placeholder="Enter hostel code"
//               value={form.code}
//               onChange={(e) =>
//                 setForm({
//                   ...form,
//                   code: e.target.value,
//                 })
//               }
//             />
//           </div>

//           <div>
//             <Label>Hostel Type</Label>
//             <Select
//               options={hostelTypeOptions}
//               placeholder="Select Hostel Type"
//               defaultValue={form.type}
//               onChange={(value) =>
//                 setForm({
//                   ...form,
//                   type: value,
//                 })
//               }
//             />
//           </div>

//           <div>
//             <Label>Address</Label>
//             <TextArea
//               placeholder="Enter hostel address"
//               rows={4}
//               value={form.address}
//               onChange={(value) =>
//                 setForm({
//                   ...form,
//                   address: value,
//                 })
//               }
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full h-11 rounded-lg bg-brand-600 text-white font-medium hover:bg-brand-700 transition disabled:opacity-50"
//           >
//             {loading
//               ? "Creating..."
//               : "Create Hostel"}
//           </button>
//         </Form>
//       </div>
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import { createHostel } from "@/services/hostelService";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import TextArea from "@/components/form/input/TextArea";
import Form from "@/components/form/Form";

export default function CreateHostelPage() {
  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    code: "",
    type: "",
    address: "",
    totalCapacity: "",
  });

  const hostelTypeOptions = [
    {
      label: "Boys Hostel",
      value: "BOYS",
    },
    {
      label: "Girls Hostel",
      value: "GIRLS",
    },
  ];

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await createHostel({
        ...form,
        totalCapacity: Number(
          form.totalCapacity
        ),
      });

      alert(
        "Hostel Created Successfully"
      );

      setForm({
        name: "",
        code: "",
        type: "",
        address: "",
        totalCapacity: "",
      });

    } catch (err: any) {
      alert(
        err?.message ||
          "Failed to create hostel"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="rounded-2xl border bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-2xl font-bold">
          Create Hostel
        </h1>

        <Form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <Label>
              Hostel Name
            </Label>
            <Input
              value={form.name}
              placeholder="Enter hostel name"
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
              Hostel Code
            </Label>
            <Input
              value={form.code}
              placeholder="Enter hostel code"
              onChange={(e) =>
                setForm({
                  ...form,
                  code: e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label>
              Hostel Type
            </Label>
            <Select
              options={
                hostelTypeOptions
              }
              placeholder="Select Hostel Type"
              defaultValue={form.type}
              onChange={(value) =>
                setForm({
                  ...form,
                  type: value,
                })
              }
            />
          </div>

          <div>
            <Label>
              Total Capacity
            </Label>
            <Input
              type="number"
              value={
                form.totalCapacity
              }
              placeholder="Enter hostel capacity"
              onChange={(e) =>
                setForm({
                  ...form,
                  totalCapacity:
                    e.target.value,
                })
              }
            />
          </div>

          <div>
            <Label>
              Address
            </Label>
            <TextArea
              rows={4}
              value={form.address}
              placeholder="Enter address"
              onChange={(value) =>
                setForm({
                  ...form,
                  address: value,
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
              : "Create Hostel"}
          </button>
        </Form>
      </div>
    </div>
  );
}
// interface Props {
//   month: number;
//   year: number;
//   setMonth: (v: number) => void;
//   setYear: (v: number) => void;
// }

// export default function AttendanceFilters({
//   month,
//   year,
//   setMonth,
//   setYear,
// }: Props) {
//   return (
//     <div className="flex gap-4 mb-6">
//       <input
//         type="number"
//         value={month}
//         onChange={(e) => setMonth(Number(e.target.value))}
//         className="border rounded-lg px-4 py-2"
//         placeholder="Month"
//       />

//       <input
//         type="number"
//         value={year}
//         onChange={(e) => setYear(Number(e.target.value))}
//         className="border rounded-lg px-4 py-2"
//         placeholder="Year"
//       />
//     </div>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";

// import Select from "@/components/form/Select";
// import Label from "@/components/form/Label";

// interface Props {
//   month: number;
//   year: number;
//   setMonth: (v: number) => void;
//   setYear: (v: number) => void;
// }

// export default function AttendanceFilters({
//   month,
//   year,
//   setMonth,
//   setYear,
// }: Props) {
//   const [months, setMonths] = useState<
//     { label: string; value: string }[]
//   >([]);

//   const [years, setYears] = useState<
//     { label: string; value: string }[]
//   >([]);

//   useEffect(() => {
//     setMonths([
//       { label: "January", value: "1" },
//       { label: "February", value: "2" },
//       { label: "March", value: "3" },
//       { label: "April", value: "4" },
//       { label: "May", value: "5" },
//       { label: "June", value: "6" },
//       { label: "July", value: "7" },
//       { label: "August", value: "8" },
//       { label: "September", value: "9" },
//       { label: "October", value: "10" },
//       { label: "November", value: "11" },
//       { label: "December", value: "12" },
//     ]);

//     const currentYear =
//       new Date().getFullYear();

//     const yearOptions = [];

//     for (
//       let i = currentYear - 5;
//       i <= currentYear + 2;
//       i++
//     ) {
//       yearOptions.push({
//         label: String(i),
//         value: String(i),
//       });
//     }

//     setYears(yearOptions);
//   }, []);

//   return (
//     <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mb-6">
//       <div>
//         <Label>Select Month</Label>
//         <Select
//           options={months}
//           placeholder="Choose Month"
//           defaultValue={String(month)}
//           onChange={(value) =>
//             setMonth(Number(value))
//           }
//         />
//       </div>

//       <div>
//         <Label>Select Year</Label>
//         <Select
//           options={years}
//           placeholder="Choose Year"
//           defaultValue={String(year)}
//           onChange={(value) =>
//             setYear(Number(value))
//           }
//         />
//       </div>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";

import Select from "@/components/form/Select";
import Label from "@/components/form/Label";

import {
  getSessions,
} from "@/services/sessionService";

import {
  getSemesters,
} from "@/services/semesterService";

interface Props {
  month: number;
  year: number;
  sessionId: number;
  semesterId: number;

  setMonth: (v: number) => void;
  setYear: (v: number) => void;
  setSessionId: (v: number) => void;
  setSemesterId: (v: number) => void;
}

export default function AttendanceFilters({
  month,
  year,
  sessionId,
  semesterId,
  setMonth,
  setYear,
  setSessionId,
  setSemesterId,
}: Props) {
  const [months, setMonths] = useState<any[]>(
    []
  );

  const [years, setYears] = useState<any[]>(
    []
  );

  const [sessions, setSessions] =
    useState<any[]>([]);

  const [semesters, setSemesters] =
    useState<any[]>([]);

  useEffect(() => {
    loadDropdowns();
  }, []);

  const loadDropdowns = async () => {
    try {
      const [sessionRes, semesterRes] =
        await Promise.all([
          getSessions(),
          getSemesters(),
        ]);

      setSessions(
        sessionRes.map(
          (item: any) => ({
            label: item.name,
            value: String(item.id),
          })
        )
      );

      setSemesters(
        semesterRes.map(
          (item: any) => ({
            label: item.name,
            value: String(item.id),
          })
        )
      );

      setMonths([
        { label: "January", value: "1" },
        { label: "February", value: "2" },
        { label: "March", value: "3" },
        { label: "April", value: "4" },
        { label: "May", value: "5" },
        { label: "June", value: "6" },
        { label: "July", value: "7" },
        { label: "August", value: "8" },
        { label: "September", value: "9" },
        { label: "October", value: "10" },
        { label: "November", value: "11" },
        { label: "December", value: "12" },
      ]);

      const currentYear =
        new Date().getFullYear();

      const yearOptions = [];

      for (
        let i = currentYear - 5;
        i <= currentYear + 2;
        i++
      ) {
        yearOptions.push({
          label: String(i),
          value: String(i),
        });
      }

      setYears(yearOptions);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-4 mb-6">
      <div>
        <Label>Session</Label>
        <Select
          options={sessions}
          defaultValue={String(sessionId)}
          placeholder="Choose Session"
          onChange={(value) =>
            setSessionId(Number(value))
          }
        />
      </div>

      <div>
        <Label>Semester</Label>
        <Select
          options={semesters}
          defaultValue={String(semesterId)}
          placeholder="Choose Semester"
          onChange={(value) =>
            setSemesterId(Number(value))
          }
        />
      </div>

      <div>
        <Label>Month</Label>
        <Select
          options={months}
          defaultValue={String(month)}
          placeholder="Choose Month"
          onChange={(value) =>
            setMonth(Number(value))
          }
        />
      </div>

      <div>
        <Label>Year</Label>
        <Select
          options={years}
          defaultValue={String(year)}
          placeholder="Choose Year"
          onChange={(value) =>
            setYear(Number(value))
          }
        />
      </div>
    </div>
  );
}
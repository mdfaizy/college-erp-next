// "use client";

// import { useEffect, useState } from "react";
// import { getCourses } from "@/services/courseService";
// import { getDepartments } from "@/services/departmentService";
// import { getSemesters } from "@/services/semesterService";
// import { getSessions } from "@/services/sessionService";

// interface Props {
//   filters: any;
//   setFilters: any;
// }

// export default function TeacherAttendanceFilters({
//   filters,
//   setFilters,
// }: Props) {
//   const [courses, setCourses] = useState<any[]>([]);
//   const [departments, setDepartments] = useState<any[]>([]);
//   const [semesters, setSemesters] = useState<any[]>([]);
//   const [sessions, setSessions] = useState<any[]>([]);

//   useEffect(() => {
//     loadInitialData();
//   }, []);

//   const loadInitialData = async () => {
//     const [courseData, sessionData] = await Promise.all([
//       getCourses(),
//       getSessions(),
//     ]);

//     setCourses(courseData);
//     setSessions(sessionData);
//   };

//   const handleCourseChange = async (courseId: number) => {
//     setFilters({
//       ...filters,
//       courseId,
//       departmentId: "",
//       semesterId: "",
//     });

//     setDepartments([]);
//     setSemesters([]);

//     const deps = await getDepartments(courseId);
//     setDepartments(deps);
//   };

//   const handleDepartmentChange = async (departmentId: number) => {
//     setFilters({
//       ...filters,
//       departmentId,
//       semesterId: "",
//     });

//     setSemesters([]);

//     const sems = await getSemesters(departmentId);
//     setSemesters(sems);
//   };

//   return (
//     <div className="grid md:grid-cols-4 gap-4 mb-6">
//       {/* Course */}
//       <select
//         onChange={(e) => handleCourseChange(Number(e.target.value))}
//         className="border rounded-lg p-3"
//       >
//         <option value="">Select Course</option>
//         {courses.map((c) => (
//           <option key={c.id} value={c.id}>
//             {c.name}
//           </option>
//         ))}
//       </select>

//       {/* Department */}
//       <select
//         disabled={!filters.courseId}
//         onChange={(e) =>
//           handleDepartmentChange(Number(e.target.value))
//         }
//         className="border rounded-lg p-3"
//       >
//         <option value="">Select Department</option>
//         {departments.map((d) => (
//           <option key={d.id} value={d.id}>
//             {d.name}
//           </option>
//         ))}
//       </select>

//       {/* Semester */}
//       <select
//         disabled={!filters.departmentId}
//         onChange={(e) =>
//           setFilters({
//             ...filters,
//             semesterId: Number(e.target.value),
//           })
//         }
//         className="border rounded-lg p-3"
//       >
//         <option value="">Select Semester</option>
//         {semesters.map((s) => (
//           <option key={s.id} value={s.id}>
//             Semester {s.number}
//           </option>
//         ))}
//       </select>

//       {/* Session */}
//       <select
//         onChange={(e) =>
//           setFilters({
//             ...filters,
//             sessionId: Number(e.target.value),
//           })
//         }
//         className="border rounded-lg p-3"
//       >
//         <option value="">Select Session</option>
//         {sessions.map((s) => (
//           <option key={s.id} value={s.id}>
//             {s.name}
//           </option>
//         ))}
//       </select>

//       {/* Period */}
//       <select
//         onChange={(e) =>
//           setFilters({
//             ...filters,
//             period: Number(e.target.value),
//           })
//         }
//         className="border rounded-lg p-3"
//       >
//         <option value="">Select Period</option>
//         {[1, 2, 3, 4, 5, 6, 7, 8].map((p) => (
//           <option key={p} value={p}>
//             Period {p}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import { getCourses } from "@/services/courseService";
// import { getDepartments } from "@/services/departmentService";
// import { getSemesters } from "@/services/semesterService";
// import { getSessions } from "@/services/sessionService";

// interface Props {
//   filters: any;
//   setFilters: any;
// }

// export default function TeacherAttendanceFilters({
//   filters,
//   setFilters,
// }: Props) {
//   const [courses, setCourses] = useState<any[]>([]);
//   const [departments, setDepartments] = useState<any[]>([]);
//   const [semesters, setSemesters] = useState<any[]>([]);
//   const [sessions, setSessions] = useState<any[]>([]);

//   useEffect(() => {
//     loadInitialData();
//   }, []);

//   const loadInitialData = async () => {
//     const [courseData, sessionData] = await Promise.all([
//       getCourses(),
//       getSessions(),
//     ]);

//     setCourses(courseData);
//     setSessions(sessionData);
//   };

//   const handleCourseChange = async (courseId: number) => {
//     setFilters({
//       ...filters,
//       courseId,
//       departmentId: "",
//       semesterId: "",
//     });

//     setDepartments([]);
//     setSemesters([]);

//     const deps = await getDepartments(courseId);
//     setDepartments(deps);
//   };

//   const handleDepartmentChange = async (
//     departmentId: number
//   ) => {
//     setFilters({
//       ...filters,
//       departmentId,
//       semesterId: "",
//     });

//     setSemesters([]);

//     const sems = await getSemesters(departmentId);
//     setSemesters(sems);
//   };

//   return (
//     <div className="rounded-2xl border border-stroke bg-white p-6 shadow-default dark:border-strokedark dark:bg-boxdark mb-6">
//       <div className="mb-5">
//         <h3 className="text-lg font-semibold text-black dark:text-white">
//           Attendance Filters
//         </h3>
//         <p className="text-sm text-body dark:text-bodydark">
//           Select academic details to load students
//         </p>
//       </div>

//       <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
//         {/* Course */}
//         <div>
//           <label className="mb-2 block text-sm font-medium text-black dark:text-white">
//             Course
//           </label>

//           <select
//             onChange={(e) =>
//               handleCourseChange(Number(e.target.value))
//             }
//             className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-black outline-none transition focus:border-primary dark:border-strokedark dark:bg-form-input dark:text-white"
//           >
//             <option value="">Select Course</option>
//             {courses.map((c) => (
//               <option key={c.id} value={c.id}>
//                 {c.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Department */}
//         <div>
//           <label className="mb-2 block text-sm font-medium text-black dark:text-white">
//             Department
//           </label>

//           <select
//             disabled={!filters.courseId}
//             onChange={(e) =>
//               handleDepartmentChange(
//                 Number(e.target.value)
//               )
//             }
//             className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-black outline-none transition focus:border-primary disabled:bg-gray-1 dark:border-strokedark dark:bg-form-input dark:text-white dark:disabled:bg-meta-4"
//           >
//             <option value="">Select Department</option>
//             {departments.map((d) => (
//               <option key={d.id} value={d.id}>
//                 {d.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Semester */}
//         <div>
//           <label className="mb-2 block text-sm font-medium text-black dark:text-white">
//             Semester
//           </label>

//           <select
//             disabled={!filters.departmentId}
//             onChange={(e) =>
//               setFilters({
//                 ...filters,
//                 semesterId: Number(e.target.value),
//               })
//             }
//             className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-black outline-none transition focus:border-primary disabled:bg-gray-1 dark:border-strokedark dark:bg-form-input dark:text-white dark:disabled:bg-meta-4"
//           >
//             <option value="">Select Semester</option>
//             {semesters.map((s) => (
//               <option key={s.id} value={s.id}>
//                 Semester {s.number}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Session */}
//         <div>
//           <label className="mb-2 block text-sm font-medium text-black dark:text-white">
//             Session
//           </label>

//           <select
//             onChange={(e) =>
//               setFilters({
//                 ...filters,
//                 sessionId: Number(e.target.value),
//               })
//             }
//             className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-black outline-none transition focus:border-primary dark:border-strokedark dark:bg-form-input dark:text-white"
//           >
//             <option value="">Select Session</option>
//             {sessions.map((s) => (
//               <option key={s.id} value={s.id}>
//                 {s.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Period */}
//         <div>
//           <label className="mb-2 block text-sm font-medium text-black dark:text-white">
//             Period
//           </label>

//           <select
//             onChange={(e) =>
//               setFilters({
//                 ...filters,
//                 period: Number(e.target.value),
//               })
//             }
//             className="w-full rounded-lg border border-stroke bg-transparent px-4 py-3 text-black outline-none transition focus:border-primary dark:border-strokedark dark:bg-form-input dark:text-white"
//           >
//             <option value="">Select Period</option>
//             {[1, 2, 3, 4, 5, 6, 7, 8].map((p) => (
//               <option key={p} value={p}>
//                 Period {p}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";

// import { getCourses } from "@/services/courseService";
// import { getDepartments } from "@/services/departmentService";
// import { getSemesters } from "@/services/semesterService";
// import { getSubjectsBySemester } from "@/services/subjectService";

// interface Props {
//   filters: any;
//   setFilters: any;
// }

// export default function TeacherAttendanceFilters({
//   filters,
//   setFilters,
// }: Props) {
//   const [courses, setCourses] = useState<any[]>([]);
//   const [departments, setDepartments] =
//     useState<any[]>([]);
//   const [semesters, setSemesters] =
//     useState<any[]>([]);
//   const [subjects, setSubjects] =
//     useState<any[]>([]);

//   useEffect(() => {
//     loadCourses();
//   }, []);

//   const loadCourses = async () => {
//     const data = await getCourses();
//     setCourses(data || []);
//   };

//   const handleCourseChange = async (
//     courseId: number
//   ) => {
//     setFilters({
//       ...filters,
//       courseId,
//       departmentId: "",
//       semesterId: "",
//       subjectId: "",
//     });

//     setDepartments([]);
//     setSemesters([]);
//     setSubjects([]);

//     const deps =
//       await getDepartments(courseId);

//     setDepartments(deps || []);
//   };

//   const handleDepartmentChange = async (
//     departmentId: number
//   ) => {
//     setFilters({
//       ...filters,
//       departmentId,
//       semesterId: "",
//       subjectId: "",
//     });

//     setSemesters([]);
//     setSubjects([]);

//     const sems =
//       await getSemesters(departmentId);

//     setSemesters(sems || []);
//   };

//   const handleSemesterChange = async (
//     semesterId: number
//   ) => {
//     setFilters({
//       ...filters,
//       semesterId,
//       subjectId: "",
//     });

//     const subs =
//       await getSubjectsBySemester(
//         semesterId
//       );
//       console.log(subs)


//     setSubjects(subs || []);
//   };

//   return (
//     <div className="grid gap-4 md:grid-cols-5">
//       {/* Course */}
//       <select
//         value={filters.courseId || ""}
//         onChange={(e) =>
//           handleCourseChange(
//             Number(e.target.value)
//           )
//         }
//         className="border rounded-lg p-3"
//       >
//         <option value="">
//           Select Course
//         </option>

//         {courses.map((course) => (
//           <option
//             key={course.id}
//             value={course.id}
//           >
//             {course.name}
//           </option>
//         ))}
//       </select>

//       {/* Department */}
//       <select
//         value={filters.departmentId || ""}
//         disabled={!filters.courseId}
//         onChange={(e) =>
//           handleDepartmentChange(
//             Number(e.target.value)
//           )
//         }
//         className="border rounded-lg p-3"
//       >
//         <option value="">
//           Select Department
//         </option>

//         {departments.map((dept) => (
//           <option
//             key={dept.id}
//             value={dept.id}
//           >
//             {dept.name}
//           </option>
//         ))}
//       </select>

//       {/* Semester */}
//       <select
//         value={filters.semesterId || ""}
//         disabled={!filters.departmentId}
//         onChange={(e) =>
//           handleSemesterChange(
//             Number(e.target.value)
//           )
//         }
//         className="border rounded-lg p-3"
//       >
//         <option value="">
//           Select Semester
//         </option>

//         {semesters.map((sem) => (
//           <option
//             key={sem.id}
//             value={sem.id}
//           >
//             Semester {sem.number}
//           </option>
//         ))}
//       </select>

//       {/* Subject */}
//       <select
//         value={filters.subjectId || ""}
//         disabled={!filters.semesterId}
//         onChange={(e) =>
//           setFilters({
//             ...filters,
//             subjectId: Number(
//               e.target.value
//             ),
//           })
//         }
//         className="border rounded-lg p-3"
//       >
//         <option value="">
//           Select Subject
//         </option>

//         {subjects.map((sub) => (
//           <option
//             key={sub.id}
//             value={sub.id}
//           >
//             {sub.name}
//           </option>
//         ))}
//       </select>

//       {/* Period */}
//       <select
//         value={filters.period || ""}
//         onChange={(e) =>
//           setFilters({
//             ...filters,
//             period: Number(
//               e.target.value
//             ),
//           })
//         }
//         className="border rounded-lg p-3"
//       >
//         <option value="">
//           Select Period
//         </option>

//         {[1, 2, 3, 4, 5, 6, 7, 8].map(
//           (period) => (
//             <option
//               key={period}
//               value={period}
//             >
//               Period {period}
//             </option>
//           )
//         )}
//       </select>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";

import { getCourses } from "@/services/courseService";
import { getDepartments } from "@/services/departmentService";
import { getSemesters } from "@/services/semesterService";
import { getSubjectsBySemester } from "@/services/subjectService";
import { getSessions } from "@/services/sessionService";

interface Props {
  filters: any;
  setFilters: any;
}

export default function TeacherAttendanceFilters({
  filters,
  setFilters,
}: Props) {
  const [courses, setCourses] = useState<any[]>([]);
  const [departments, setDepartments] =
    useState<any[]>([]);
  const [semesters, setSemesters] =
    useState<any[]>([]);
  const [subjects, setSubjects] =
    useState<any[]>([]);
  const [sessions, setSessions] =
    useState<any[]>([]);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    const [courseData, sessionData] =
      await Promise.all([
        getCourses(),
        getSessions(),
      ]);

    setCourses(courseData || []);
    setSessions(sessionData || []);
  };

  const handleCourseChange = async (
    courseId: number
  ) => {
    setFilters({
      ...filters,
      courseId,
      departmentId: "",
      semesterId: "",
      subjectId: "",
    });

    setDepartments([]);
    setSemesters([]);
    setSubjects([]);

    const deps =
      await getDepartments(courseId);

    setDepartments(deps || []);
  };

  const handleDepartmentChange =
    async (
      departmentId: number
    ) => {
      setFilters({
        ...filters,
        departmentId,
        semesterId: "",
        subjectId: "",
      });

      setSemesters([]);
      setSubjects([]);

      const sems =
        await getSemesters(
          departmentId
        );

      setSemesters(sems || []);
    };

  const handleSemesterChange =
    async (
      semesterId: number
    ) => {
      setFilters({
        ...filters,
        semesterId,
        subjectId: "",
      });

      setSubjects([]);

      const subs =
        await getSubjectsBySemester(
          semesterId
        );

      setSubjects(subs || []);
    };

  return (
    <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
      {/* Course */}
      <select
        value={filters.courseId || ""}
        onChange={(e) =>
          handleCourseChange(
            Number(
              e.target.value
            )
          )
        }
        className="rounded-lg border p-3"
      >
        <option value="">
          Select Course
        </option>

        {courses.map((c) => (
          <option
            key={c.id}
            value={c.id}
          >
            {c.name}
          </option>
        ))}
      </select>

      {/* Department */}
      <select
        value={
          filters.departmentId ||
          ""
        }
        disabled={!filters.courseId}
        onChange={(e) =>
          handleDepartmentChange(
            Number(
              e.target.value
            )
          )
        }
        className="rounded-lg border p-3"
      >
        <option value="">
          Select Department
        </option>

        {departments.map((d) => (
          <option
            key={d.id}
            value={d.id}
          >
            {d.name}
          </option>
        ))}
      </select>

      {/* Semester */}
      <select
        value={
          filters.semesterId || ""
        }
        disabled={
          !filters.departmentId
        }
        onChange={(e) =>
          handleSemesterChange(
            Number(
              e.target.value
            )
          )
        }
        className="rounded-lg border p-3"
      >
        <option value="">
          Select Semester
        </option>

        {semesters.map((s) => (
          <option
            key={s.id}
            value={s.id}
          >
            Semester {s.number}
          </option>
        ))}
      </select>

      {/* Subject */}
      <select
        value={filters.subjectId || ""}
        disabled={!filters.semesterId}
        onChange={(e) =>
          setFilters({
            ...filters,
            subjectId: Number(
              e.target.value
            ),
          })
        }
        className="rounded-lg border p-3"
      >
        <option value="">
          Select Subject
        </option>

        {subjects.map((s) => (
          <option
            key={s.id}
            value={s.id}
          >
            {s.name}
          </option>
        ))}
      </select>

      {/* Session */}
      <select
        value={filters.sessionId || ""}
        onChange={(e) =>
          setFilters({
            ...filters,
            sessionId: Number(
              e.target.value
            ),
          })
        }
        className="rounded-lg border p-3"
      >
        <option value="">
          Select Session
        </option>

        {sessions.map((s) => (
          <option
            key={s.id}
            value={s.id}
          >
            {s.name}
          </option>
        ))}
      </select>

      {/* Period */}
      <select
  value={filters.period || ""}
  onChange={(e) =>
    setFilters({
      ...filters,
      period: e.target.value
        ? Number(e.target.value)
        : "",
    })
  }
  className="rounded-lg border p-3"
>
  <option value="">
    Select Period
  </option>

  {[1, 2, 3, 4, 5, 6, 7, 8].map((p) => (
    <option key={p} value={p}>
      Period {p}
    </option>
  ))}
</select>       
    </div>
  );
}
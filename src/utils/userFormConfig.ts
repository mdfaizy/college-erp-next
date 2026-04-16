export const userFormConfig: Record<
    string,
    any[]
> = {
    STUDENT: [
        {
            name: "name",
            label: "Full Name",
            type: "text",
        },
        {
            name: "email",
            label: "Email",
            type: "email",
        },
        {
            name: "password",
            label: "Password",
            type: "password",
        },
        {
            name: "phone",
            label: "Phone Number",
            type: "text",
        },
        {
            name: "courseId",
            label: "Course",
            type: "select",
            optionsKey: "courses",
        },
        {
            name: "departmentId",
            label: "Department",
            type: "select",
            optionsKey: "departments",
        },
        {
            name: "sessionId",
            label: "Session",
            type: "select",
            optionsKey: "sessions",
        },
    ],

    TEACHERS: [
        {
            name: "name",
            label: "Full Name",
            type: "text",
        },
        {
            name: "email",
            label: "Email",
            type: "email",
        },
        {
            name: "password",
            label: "Password",
            type: "password",
        },
        {
            name: "phone",
            label: "Phone Number",
            type: "text",
        },
        {
            name: "designation",
            label: "Designation",
            type: "text",
        },
        {
            name: "qualification",
            label: "Qualification",
            type: "text",
        },
        {
            name: "departmentId",
            label: "Department",
            type: "select",
            optionsKey: "departments",
        },
    ],

    ACCOUNTANT: [
        {
            name: "name",
            label: "Full Name",
            type: "text",
        },
        {
            name: "email",
            label: "Email",
            type: "email",
        },
        {
            name: "password",
            label: "Password",
            type: "password",
        },
        {
            name: "phone",
            label: "Phone Number",
            type: "text",
        },
    ],


};
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface TeacherState {
//   loading: boolean;
//   error: string | null;
// }

// const initialState: TeacherState = {
//   loading: false,
//   error: null,
// };

// const teacherSlice = createSlice({
//   name: "teacher",
//   initialState,
//   reducers: {
//     setLoading: (state, action: PayloadAction<boolean>) => {
//       state.loading = action.payload;
//     },
//     setError: (state, action: PayloadAction<string | null>) => {
//       state.error = action.payload;
//     },
//   },
// });

// export const { setLoading, setError } = teacherSlice.actions;
// export default teacherSlice.reducer;





import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Teacher } from "@/types/teacher";
interface TeacherState {
  teachers: Teacher[];
  loading: boolean;
  error: string | null;
}

const initialState: TeacherState = {
  teachers: [],
  loading: false,
  error: null,
};

const teacherSlice = createSlice({
  name: "teacher",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setTeachers: (state, action: PayloadAction<Teacher[]>) => {
      state.teachers = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setTeachers, setError } = teacherSlice.actions;
export default teacherSlice.reducer;
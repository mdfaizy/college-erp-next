import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import teacherReducer from "./slices/teacherSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    teacher: teacherReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store; 
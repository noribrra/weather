import { configureStore } from "@reduxjs/toolkit";
import axiosreduser from "../features/apiweather/apiweather";
export const store = configureStore({
  reducer: { axiosreduser },
});

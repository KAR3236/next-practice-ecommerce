import { configureStore } from "@reduxjs/toolkit";
import loaderSlice from "./Slice/loaderSlice";
import userSlice from "./Slice/userSlice";

export default configureStore({
  reducer: {
    loader: loaderSlice,
    user: userSlice,
  },
});

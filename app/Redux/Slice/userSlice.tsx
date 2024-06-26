import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
  },
  reducers: {
    viewUserProfile: (state, action) => {
      return { ...state, data: action.payload };
    },
    listOfUserAddresses: (state, action) => {
      return { ...state, datas: action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { viewUserProfile, listOfUserAddresses } = userSlice.actions;

export default userSlice.reducer;

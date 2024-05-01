import { createSlice } from "@reduxjs/toolkit";


const initialmailState = {
    mails: [],
};

const authSlice = createSlice({
    name: "mail",
    initialState: initialmailState,
    reducers: {
      
    },
  });
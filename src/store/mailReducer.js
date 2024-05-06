
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0,
};

const mailSlice = createSlice({
  name: 'mail',
  initialState,
  reducers: {
    setCount: (state, action) => {
      state.count = action.payload;
    },
    
    
  },
});

export const { setCount } = mailSlice.actions;
export default mailSlice.reducer;

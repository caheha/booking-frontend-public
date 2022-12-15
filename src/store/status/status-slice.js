import { createSlice } from "@reduxjs/toolkit";

// initial state for a status
const statusObject =  { status: null, message: null }

// all statuses
const initialState = {
    signin: statusObject,
    signup: statusObject,
    uploadAvatar: statusObject,
    updateProfile: statusObject,
    createRoom: statusObject,
    editRoom: statusObject,
    booking: statusObject,
}

// State slice for statuses 
const statusSlice = createSlice({
    name: "status",
    initialState: initialState,
    reducers: {
        setStatus(state, action) {
            state[action.payload.type] = action.payload.status;
        },
        resetStatus : () => initialState,
    }
});

export const { setStatus, resetStatus } = statusSlice.actions;
export default statusSlice.reducer;
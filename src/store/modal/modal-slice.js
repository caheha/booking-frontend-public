import { createSlice } from "@reduxjs/toolkit";

// Modal state slice
const modalSlice = createSlice({
    name: "modal",
    initialState: { active: false, loginActive: false },
    reducers: {
        open(state) {
            state.active = true;
        },
        close(state) {
            state.active = false;
        },
        showLogin(state, action) {
            // Show login based on value given (true/false)
            state.loginActive = action.payload;
        }
    }
});

export const { open, close, showLogin } = modalSlice.actions;
export default modalSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const reservationSlice = createSlice({
    name: "reservation",
    initialState: { yourReservations: [], requests: [] },
    reducers: {
        updateYourReservations(state, action) {
            state.yourReservations = action.payload.reservations;
        },
        updateRequestedReservations(state, action) {
            state.requests = action.payload.reservations;
        },
        resetReservations(state) {
            state.yourReservations = [];
            state.requests = [];
        }
    }
});

export const { updateYourReservations, updateRequestedReservations, resetReservations } = reservationSlice.actions;
export default reservationSlice.reducer;
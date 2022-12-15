import { createSlice } from "@reduxjs/toolkit";

const roomsSlice = createSlice({
    name: "rooms",
    initialState: { rooms: [] },
    reducers: {
        updateRooms(state, action) {
            state.rooms = action.payload.rooms;
        },
        clearRooms(state) {
            state.rooms = [];
        }
    }
});

export const { updateRooms, clearRooms } = roomsSlice.actions;
export default roomsSlice.reducer;
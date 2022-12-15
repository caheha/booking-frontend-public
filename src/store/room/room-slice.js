import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
    name: "room",
    initialState: { rooms: [] },
    reducers: {
        updateUserRooms(state, action) {
            state.rooms = action.payload.rooms;
        },
        removeRoom(state, action) {
            state.rooms = state.rooms.filter(room => room.roomId !== action.payload.roomId)
        },
        resetRoom(state) {
            state.rooms = [];
        }
    }
});

export const { updateUserRooms, removeRoom, resetRoom } = roomSlice.actions;
export default roomSlice.reducer;
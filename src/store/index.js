import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modal/modal-slice";
import userSlice from "./user/user-slice";
import roomsSlice from "./rooms/rooms-slice";
import roomSlice from "./room/room-slice";
import categoriesSlice from "./categories/categories-slice";
import reservationSlice from "./reservation/reservation-slice";
import notificationSlice from "./notifications/notification-slice";
import statusSlice from "./status/status-slice";

// Storage
export const store = configureStore({
    reducer: {
        "user": userSlice,
        "modal": modalSlice,
        "rooms": roomsSlice,
        "room": roomSlice,
        "categories": categoriesSlice,
        "reservation": reservationSlice,
        "notifications": notificationSlice,
        "status": statusSlice,
    }
});

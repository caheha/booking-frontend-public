import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notifications",
    initialState: { notifications: [] },
    reducers: {
        updateNotifications(state, action) {
            state.notifications = action.payload.notifications;
        },
        removeNotificationFromList(state, action) {
            state.notifications = state.notifications.filter(notification => notification.id !== action.payload);
        },
        resetNotifications(state) {
            state.notifications = [];
        }
    }
});

export const { updateNotifications, removeNotificationFromList, resetNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
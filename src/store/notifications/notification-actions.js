import * as api from "../../api";
import { removeNotificationFromList, updateNotifications } from "./notification-slice";

// Fetch notifications, update state slice if successful 
export const fetchNotifications = () => async (dispatch) => {
    try {
        const { data } = await api.getNotifications();

        if (data.stats !== 'error' && data.notifications) {
            dispatch(updateNotifications(data));
        }
    } catch (error) {
        console.log(error);
    }
};

// Send update request, refetch notifcations if successful
export const notificationSeen = (req) => async (dispatch) => {
    try {
        const { data } = await api.updateNotification(req);

        if (data.stats !== 'error') {
            dispatch(fetchNotifications());
        }
    } catch (error) {
        console.log(error);
    }
}; 

// Send removal request, remove notification from state slice if successful
export const removeNotification = (req) => async (dispatch) => {
    try {
        const { data } = await api.removeNotification(req);

        if (data.stats !== 'error') {
            dispatch(removeNotificationFromList(req.id));
        }
    } catch (error) {
        console.log(error);
    }
}; 
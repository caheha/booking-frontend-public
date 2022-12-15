import * as api from "../../api";
import { clearRooms, updateRooms } from "./rooms-slice";

// Fetch list of rooms
export const fetchRoomList = (formData) => async (dispatch) => {
    try {
        const { data } = await api.fetchRooms(formData);

        if (data.rooms) {
            dispatch(updateRooms(data));
        } else {
            dispatch(clearRooms());
        }
    } catch (error) {
        console.log(error);
    }
};

// Fetch data for a single room
export const fetchRoomData = (req) => async (dispatch) => {
    try {
        const { data } = await api.fetchRoom(req);

        if (data.status !== 'error') {
           return data;
        }
    } catch (error) {
        console.log(error);
    }
};

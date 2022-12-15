import * as api from "../../api";
import { setStatus } from "../status/status-slice";
import { removeRoom, updateUserRooms } from "./room-slice";

// Send request to create a room, if successful, go to overview page, if not, show error
export const create = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.createRoom(formData);

        if (data.status !== 'error') {
            navigate('/udlejning');
        } else {
            dispatch(setStatus({ type: "createRoom", status: { status: data.status, message: data.message } } ));
        }
    } catch (error) {
        console.log(error);
    }
};

// Send request to update room post, show status of request
export const edit = (formData) => async (dispatch) => {
    try {
        const { data } = await api.edit(formData);

        dispatch(setStatus({ type: "editRoom", status: { status: data.status, message: data.message } } ));
    } catch (error) {
        console.log(error);
    }
};

// Send request to delete room, if successful, remove room from state slice
export const deleteRoom = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.deleteRoom(formData);

        if (data.status !== 'error') {
            dispatch(removeRoom({ roomId: formData.roomId}));
        }
    } catch (error) {
        console.log(error);
    }
};

// Fetch list your rooms
export const fetchRoomList = () => async (dispatch) => {
    try {
        const { data } = await api.fetchUserRooms();

        if (data.rooms) {
            dispatch(updateUserRooms(data));
        }
    } catch (error) {
        console.log(error);
    }
};

import * as api from "../../api";
import { resetStatus, setStatus } from "../status/status-slice";
import { close } from "../modal/modal-slice";
import { resetNotifications } from "../notifications/notification-slice";
import { resetReservations } from "../reservation/reservation-slice";
import { resetRoom } from "../room/room-slice";
import { login, updateUserData, updateUser, updateAvatar, logout } from "./user-slice";

// Send request to signin, if successful, login and close modal, if not, show error
export const signin = (formData) => async (dispatch) => {
    try {
        const { data } = await api.login(formData);

        if (data.status !== 'error') {
            dispatch(login(data));
            dispatch(close());
        } else {
            dispatch(setStatus({ type: "signin", status: { status: data.status, message: data.message } } ));
        }
    } catch (error) {
        console.log(error);
    }
};

// Send request to signup, if successful, login and close modal, if not, show error
export const signup = (formData) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        if (data.status !== 'error') {
            dispatch(login(data));
            dispatch(close());
        }
        else {
            dispatch(setStatus({ type: "signup", status: { status: data.status, message: data.message } } ));
        }
    } catch (error) {
        console.log(error);
    }
};

// Fetch user data
export const getUserData = (token) => async (dispatch) => {
    try {
        const { data } = await api.getUserData(token);

        dispatch(updateUserData(data));
    } catch (error) {
        console.log(error);
    }
};

// Send request to update user data, if successful, update state slice, if not, show error
export const update = (formData) => async (dispatch) => {
    try {
        const { data } = await api.updateUser(formData);

        if (data.status !== "error") {
            dispatch(updateUser(formData));
        }
        dispatch(setStatus({ type: "updateProfile", status: { status: data.status, message: data.message } } ));
    } catch (error) {
        console.log(error);
    }
};

// Send request to update user avatar, update state if succesful, if not, show error
export const avatarUpload = (formData) => async (dispatch) => {
    try {
        const { data } = await api.uploadUserAvatar(formData);

        if (data?.avatar) {
            dispatch(updateAvatar(data));
        }
        dispatch(setStatus({ type: "uploadAvatar", status: { status: data.status, message: data.message } } ));
    } catch (error) {
        console.log(error);
    }
};

// Send request to delete user avatar, if successful, update state slice, if not, show error
export const avatarDelete = () => async (dispatch) => {
    try {
        const { data } = await api.deleteUserAvatar();

        if (data?.status === "success") {
            let result = {
                avatar: null,
            };

            dispatch(updateAvatar(result));
        }
        dispatch(setStatus({ type: "uploadAvatar", status: { status: data.status, message: data.message } } ));
    } catch (error) {
        console.log(error);
    }
};

// Logout handler, reset state slices and navigate to home screen
export const Logout = (navigate) => async (dispatch) => {
    try {
        dispatch(resetNotifications());
        dispatch(resetReservations());
        dispatch(resetRoom());
        dispatch(resetStatus());
        dispatch(logout());
        navigate('/');
    } catch (error) {
        console.log(error);
    }
}
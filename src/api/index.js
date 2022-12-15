import axios from "axios";

// Create API instance
const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

// Intercept requests, add token as Authorization Bearer to requests if it exists
API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
        req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }

    return req;
})

// User endpoints
export const login = (formData) => API.post("user/login/", formData);
export const signUp = (formData) => API.post("user/sign-up/", formData);
export const getUserData = (token) => API.post("user/fetchData/", token);
export const updateUser = (formData) => API.post("user/update/", formData);
export const uploadUserAvatar = (formData) => API.post("user/uploadAvatar/", formData);
export const deleteUserAvatar = () => API.post("user/deleteAvatar/");

// Room endpoints
export const createRoom = (formData) => API.post("room/create/", formData);
export const edit = (formData) => API.post("room/edit/",formData);
export const deleteRoom = (formData) => API.post("room/delete/",formData);
export const fetchUserRooms = () => API.post("room/fetchUserRooms/");

// Rooms endpoints
export const fetchRooms = (formData) => API.post("room/fetchRooms/", formData);
export const fetchRoom = (req) => API.post("room/fetchRoomData/", req);

// Category endpoints
export const fetchCategories = () => API.post("categories/");

// Reservation ednpoints
export const createReservation = (formData) => API.post("reservations/create/", formData);
export const fetchReservationDates = (roomId) => API.post("reservations/dates/", roomId);
export const fetchYourReservation = () => API.post("reservations/your/");
export const fetchRequestedReservations = () => API.post("reservations/getRequested/");
export const updateReservationStatus = (formData) => API.post("reservations/update/", formData)

// Notifictions endpoints
export const getNotifications = () => API.post("notifications/getNotifications/");
export const updateNotification = (req) => API.post("notifications/updateNotification/", req);
export const removeNotification = (req) => API.post("notifications/removeNotification/", req);
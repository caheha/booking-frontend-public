import * as api from "../../api";
import { setStatus } from "../status/status-slice";
import { updateRequestedReservations, updateYourReservations} from "./reservation-slice";

// Create reservation request, set status to show user what has happened
export const createReservation = (formData) => async (dispatch) => {
    try {
        const { data } = await api.createReservation(formData);

        dispatch(setStatus({ type: "booking", status: { status: data.status, message: data.message } } ));
    } catch (error) {
        console.log(error);
    }
};

// Fetch dates where room is already booked
export const fetchReservationDates = (req) => async (dispatch) => {
    try {
        const { data } = await api.fetchReservationDates(req);

        if (data.status !== 'error') {
           return data;
        }
    } catch (error) {
        console.log(error);
    }
};

// Fetch list of your reservations
export const fetchYourReservation = () => async (dispatch) => {
    try {
        const { data } = await api.fetchYourReservation();

        if (data.reservations) {
            dispatch(updateYourReservations(data));
        }
    } catch (error) {
        console.log(error);
    }
};

// Fetch list of requested reservations for your rooms
export const getRequestedReservations = () => async (dispatch) => {
    try {
        const { data } = await api.fetchRequestedReservations();

        if (data.reservations) {
            dispatch(updateRequestedReservations(data));
        }
    } catch (error) {
        console.log(error)
    }
}

// Send request to update state of reservation
export const updateReservation = (formData) => async (dispatch) => {
    try {
        const { data } = await api.updateReservationStatus(formData);

        if (data.status !== 'error') {
            dispatch(getRequestedReservations());
            dispatch(fetchYourReservation());
        }
    } catch (error) {
        console.log(error)
    }
}
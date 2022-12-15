import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RequestCard } from "../../components";
import { getRequestedReservations } from "../../store/reservation/reservation-actions";

export default function Requests() {
    const dispatch = useDispatch();

    // State slice
    const reservations = useSelector(state => state.reservation.requests);

    // Fetch requested reservation
    useEffect(() => {
        dispatch(getRequestedReservations());
    }, [dispatch])

    // Seperate rooms based on request status
    const pendingRequests = reservations.filter(reservation => reservation.reservationStatus === 'pending')
    const acceptedRequests = reservations.filter(reservation => reservation.reservationStatus === 'accepted')
    const canceledRequests = reservations.filter(reservation => reservation.reservationStatus === 'canceled')

    return (
        <>
            <section className="container">
                <div className="heading-container">
                    <img alt="Ikon" src="/assets/icons/checklist.svg"/>
                    <h1>Anmodninger</h1>
                </div>
                <div>
                    {pendingRequests.length ? pendingRequests.map((reservation, index) => <RequestCard key={index} reservation={reservation} />) : <></>}
                </div>
                <div>
                    <h2>Godkendte anmodninger</h2>
                    {acceptedRequests.length ? acceptedRequests.map((reservation, index) => <RequestCard key={index}  reservation={reservation} />) : <></>}
                </div>
                <div>
                    <h2>Annulerede anmodninger</h2>
                    {canceledRequests.length ? canceledRequests.map((reservation, index) => <RequestCard key={index}  reservation={reservation} />) : <></>}
                </div>
            </section>
        </>
    );
}

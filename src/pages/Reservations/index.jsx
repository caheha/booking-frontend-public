import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchYourReservation } from "../../store/reservation/reservation-actions";
import { YourCard } from "../../components";
import './style.scss';
import moment from 'moment';

export default function Reservations() {
    const dispatch = useDispatch();

    // State slice
    const yourReservations = useSelector(state => state.reservation.yourReservations);

    // Fetch your reservations
    useEffect(() => {
        dispatch(fetchYourReservation());
    }, [dispatch]);

    // Seperate reservations based on status
    const now = moment.utc(new Date(), 'YYYY-MM-DD hh:mm').local().toDate();
    const incomingReservations = yourReservations.filter(reservation => moment.utc(reservation.startDate).local().toDate() > now && reservation.reservationStatus !== 'canceled')
    const activeReservations = yourReservations.filter(reservation => moment.utc(reservation.startDate).local().toDate() <= now && now <= moment.utc(reservation.endDate).local().toDate() && reservation.reservationStatus !== 'canceled')
    const expiredReservations = yourReservations.filter(reservation => moment.utc(reservation.startDate).local().toDate() < now && now > moment.utc(reservation.endDate).local().toDate() && reservation.reservationStatus !== 'canceled')
    const canceledReservations = yourReservations.filter(reservation => reservation.reservationStatus === 'canceled')

    return (
        <>
            <section className="container">
            <div className="heading-container">
                <img alt="Ikon" src="/assets/icons/calendar.svg"/>
                <h1>Reservationer</h1>
            </div>
            <div className="reservations-wrapper">
                { incomingReservations.length ? 
                    <div>
                        <h2>Kommende reservationer</h2>
                        {incomingReservations.map((reservation, index) => {
                            return (
                                <YourCard key={index} reservation = {reservation} />
                            )
                        })}
                    </div> : <></>
                }
                { activeReservations.length ? 
                    <div>
                        <h2>Aktive reservationer</h2>
                        {activeReservations.map((reservation, index) => {
                            return (
                                <YourCard key={index} reservation = {reservation} />
                            )})
                        }
                    </div> : <></>
                }
                { expiredReservations.length ? 
                    <div>
                        <h2>Tidligere reservationer</h2>
                        {expiredReservations.map((reservation, index) => {
                            return (
                                <YourCard key={index} reservation = {reservation} />
                            )})
                        }
                    </div> : <></>
                }
                { canceledReservations.length ? 
                    <div>
                        <h2>Afviste reservationer</h2>
                        {canceledReservations.map((reservation, index) => {
                            return (
                                <YourCard key={index} reservation = {reservation} />
                            )})
                        }
                    </div> : <></>
                }                   
            </div>
            </section>
        </>
    );
}

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateReservation } from "../../../store/reservation/reservation-actions";
import Button from "../../Button";
import moment from 'moment';

export default function RequestCard({reservation}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // onClick handler for updating reservation request
    const handleSubmit = (id, status) => {
        dispatch(updateReservation({ id: id, status: status}))
    }


    // Get duration of reservation and total price
    let duration = Math.ceil(moment.duration(moment(reservation.endDate).endOf('day').diff(moment(reservation.startDate).startOf('day'))).asDays());
    let total = duration * reservation.price;

    // If room is reserved hourly, get time in hours
    if (reservation.unitTime === 'hour'){
        duration = Math.ceil(moment.duration(moment(reservation.endDate).diff(moment(reservation.startDate))).asHours())
    }

    return (
        <div className="reservation-card request" >
            <img className={reservation.thumbnail ? 'thumbnail-image' : 'thumbnail-image blur '} src={reservation.thumbnail ? `${process.env.REACT_APP_IMAGE_PATH}${reservation.thumbnail}` : 'assets/images/thumbnail.png'} alt='thumbnail' onClick={() => navigate('/lokale/' + reservation.roomId)} />
            <div className="details">
                <div className="room-info">
                    <div className="reservation-title flex align-center wrap">
                        <div className="city fs-32 uppercase bold">{reservation.city+', '+reservation.zipcode}</div>
                        <div className={'status ' + reservation.reservationStatus}>{reservation.reservationStatus}</div>
                    </div>
                    <div className="address">{reservation.roomAddress}</div>
                    <div className="user-info flex bold align-center">
                        <img className="avatar" src={process.env.REACT_APP_IMAGE_PATH + reservation.avatar} alt="avatar" />
                        <p>{reservation.firstname + " " + reservation.lastname}</p>
                    </div>
                </div>
                <div className="time-info flex column justify-between">
                    <div className="from-to flex wrap">
                        <div className="from flex column">
                            <p className="fs-16 bold">Fra:</p>
                            <p className="fs-16">{reservation.timeUnit === 'day' ? moment(reservation.startDate).format("D. MMMM YYYY") : moment(reservation.startDate).format("D. MMMM YYYY hh:mm") }</p>
                        </div>
                        <div className="to flex column">
                            <p className="fs-16 bold">Til:</p>
                            <p className="fs-16">{reservation.timeUnit === 'day' ? moment(reservation.endDate).format("D. MMMM YYYY") : moment(reservation.endDate).format("D. MMMM YYYY hh:mm") }</p>
                        </div>
                    </div> 
                    <div className="price-info flex align-center wrap">
                        <div className="total fs-24 bold">{total} DKK</div>
                        <div className="calculation">({duration}x{reservation.price} DKK/{reservation.timeUnit === 'day' ? 'dag' : 'time'})</div>
                    </div> 
                </div>
                <div className="btn-container">
                    <Button title="Skriv til" color="secondary" onClick={() => navigate('/beskeder')} />
                    {reservation.reservationStatus === "pending" ?
                        <div className="flex buttons">
                            <Button title="Accepter" icon="/assets/icons/checkmark.svg" color="success" onClick={() => handleSubmit(reservation.id, "accepted")} />
                            <Button title="Afvis" icon="/assets/icons/cross-small.svg" color="warning" onClick={() => handleSubmit(reservation.id, "canceled")} />
                        </div>
                    : <></>}
                    <Button title="Se opslag" color="primary" onClick={() => navigate('/lokale/' + reservation.roomId)} />
                </div>
            </div>
        </div>
    )
}
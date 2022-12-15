import { useEffect, useState } from 'react';
import DatePicker, { registerLocale } from "react-datepicker";
import moment from 'moment';
import da from 'date-fns/locale/da';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import "react-datepicker/dist/react-datepicker.css";
import './style.scss';
import Button from '../Button';
import { createReservation, fetchReservationDates } from '../../store/reservation/reservation-actions';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

// Use 'danish' in datepicker
registerLocale("da", da);

// Form initialState
const initialState = { roomId: '', startDate: '', endDate: ''}

export default function Calendar({ room }) {
    const [formData, setFormData] = useState(initialState);
    const [excludedDates, setExcludedDates] = useState([]);
    const [startDateState, setStartDate] = useState(setHours(setMinutes(new Date(), room.startTime.split(':')[1]), room.startTime.split(':')[0]));
    const [endDateState, setEndDate] = useState(setHours(setMinutes(new Date(), room.endTime.split(':')[1]), room.endTime.split(':')[0]));
    const dispatch = useDispatch();
    const location = useLocation();
    const status = useSelector(state => state.status.booking);

    // Split timestamps
    const startTime = room.startTime.split(':');
    const endTime = room.endTime.split(':');

    // Fetch dates where room is reserved, used to generate excluded times in datepicker.
    useEffect(() => {
        dispatch(fetchReservationDates({ roomId: room.roomId}))
            .then((response) => {
                if (response.dates) {
                    if (room.timeUnit === 'day') {
                        let tmp = [];
    
                        for (const date of response.dates) {
                            let interval = {
                                start: moment.utc(date.startDate).local().startOf('day').toDate(),
                                end:  moment.utc(date.endDate).local().endOf('day').toDate(),
                            }
                            if (moment(interval.start).isValid() && moment(interval.end).isValid()) {
                                tmp.push(interval);
                            }
                        }
    
                        setExcludedDates(tmp);
                    } else {
                        setExcludedDates(response.dates);
                    }
                }    
            })
            .catch((error) => {
                console.log(error);
            })
    }, [location, dispatch, room.roomId, room.timeUnit])

    const excludedTimes = [];

    // If the room is reserved hourly, make excluded times based on timestamps instead of dates.
    if (room.timeUnit !== 'day') {
        for (const date of excludedDates) {
            let tempStart = moment.utc(date.startDate);
            let tempEnd = moment.utc(date.endDate);

            for (let i = tempStart; moment.duration(tempEnd.diff(tempStart)) >= 0; i.add(30, 'minutes')) {
                if (i.local().isSame(moment(startDateState), "day")) {
                    excludedTimes.push(i.local().toDate());
                }    
            }
        }

        let startMidnight = moment().startOf('day');
        let startTime = moment(room.startTime, 'HH:mm');
        let endTime = moment(room.endTime, 'HH:mm');
        let endMidnight = moment().endOf('day');

        for (let i = startMidnight; moment.duration(startTime.diff(startMidnight)) > 0; i.add(30, 'minutes')) {
            excludedTimes.push(i.local().toDate());  
        }

        for (let i = endTime, index = 0; moment.duration(endTime.diff(endMidnight)) < 0; i.add(30, 'minutes'), index++) {
            if (index) {
                excludedTimes.push(i.local().toDate());
            }
        }

    }

    
    useEffect(() => {
        setFormData(prev => { return { ...prev, roomId: room.roomId }});
    }, [room.roomId])

    useEffect(() => {
        setFormData(prev => { return { ...prev, startDate: startDateState }});
    }, [startDateState])

    useEffect(() => {
        setFormData(prev => { return { ...prev, endDate: endDateState }});
    }, [endDateState])

    // Click handler for submit
    const submit = () => {
        dispatch(createReservation(formData));
    }

    // Datepicker onchange handler
    const handleChange = (date) => {
        if (room.timeUnit === 'hour') {
            setStartDate(date);
            setEndDate(date);
        }else{
            setStartDate(setHours(setMinutes(date, startTime[1]), startTime[0]));
        }
    }

    return (
        <>
            <div className="booking-container">
                <div className="datepickers flex">
                    <label>
                    Fra
                    <DatePicker 
                        selected={startDateState}
                        onChange={(date) => handleChange(date)}
                        showTimeSelect={room.timeUnit === 'day' ? false : true}
                        dateFormat={room.timeUnit === 'day' ? moment(startDateState).format('DD-MM-YYYY HH:mm') : moment(startDateState).format('DD-MM-YYYY HH:mm')}
                        startDate={startDateState}
                        endDate={endDateState}
                        minDate={Date.now()}
                        locale={da}
                        excludeTimes={excludedTimes}
                        excludeDateIntervals={room.timeUnit === 'day' ? excludedDates : null}
                    />
                    </label>
                    <label>
                    Til
                    <DatePicker 
                        selected={endDateState}
                        onChange={(date) => {room.timeUnit === 'day' ? setEndDate(setHours(setMinutes(date, endTime[1]), endTime[0])) :  setEndDate(date)}}
                        showTimeSelect={room.timeUnit === 'day' ? false : true}
                        dateFormat={room.timeUnit === 'day' ? moment(endDateState).format('DD-MM-YYYY HH:mm') : moment(endDateState).format('DD-MM-YYYY HH:mm')}
                        startDate={startDateState}
                        endDate={endDateState}
                        minDate={startDateState}
                        maxDate={room.timeUnit === 'day' ? false : startDateState}
                        locale={da}
                        showTimeSelectOnly={room.timeUnit === 'day' ? false : true}
                        excludeTimes={excludedTimes}
                        excludeDateIntervals={room.timeUnit === 'day' ? excludedDates : null}
                    />
                    </label>
                </div>
                {status.message ? <div className={status.status === 'success' ? "status-message success" : "status-message error"}>{status.message}</div> : <></>}
                <Button 
                    onClick={() => submit()}
                    title="Book nu"
                    color="primary"
                />
            </div>
        </>
    )
}
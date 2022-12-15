import moment from "moment/min/moment-with-locales";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchNotifications, notificationSeen, removeNotification } from "../../store/notifications/notification-actions";
import Cross from '../../assets/images/icons/cross.svg';
import './style.scss';

// Use 'danish' locale for moments
moment.locale('da');

export default function Notifications(props) {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();

    // Refs
    const buttonRef = useRef();
    const dropdownRef = useRef();

    // State slices
    const user = useSelector(state => state.user);
    const notifications = useSelector(state => state.notifications.notifications);

    // Fetch notifications if user is logged in
    useEffect(() => {
        if (user.id) {
            dispatch(fetchNotifications());
        }
    }, [location, user, dispatch])

    // AddEventListener to close notifications when clicked outside of element
    useEffect(() => {
        const closeNotifications = (e) => {
            if (open && dropdownRef.current && !dropdownRef.current.contains(e.target) && buttonRef.current && !buttonRef.current.contains(e.target)) {
                setOpen(prev => !prev);
            }
        }

        document.addEventListener("click", closeNotifications);
        return () => document.removeEventListener("click", closeNotifications);
    }, [open])

    // Get amount of unread notifications, shown in badge
    let unread = notifications.filter(notification => notification.seen === '0').length;

    return (
        <div className="notifications-wrapper">
            <button ref={buttonRef} className="notifications" onClick={() => setOpen(prev => !prev)}><img alt="Ikon" src="/assets/icons/bell.svg"/>{unread ? <div className="count">{unread > 99 ? 99 : unread}</div> :<></>}</button>
            {open ? 
                <div className="notifications-container" ref={dropdownRef}>
                    {notifications.length ? notifications.map((notification, index) => {
                        return (
                            <Notification key={index} notification={notification} setOpen={setOpen} />
                        )
                    }) : <div className="empty">Ingen nye notifikationer</div>}
                </div>
            : 
                <></>
            }
        </div>
    )
    
}

// Single Notification 
function Notification({notification, setOpen}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // onClick handler, mark notification as seen and navigate to destination
    function handleClick(destination, id) {
        dispatch(notificationSeen({ id: id }))
        navigate(destination);
        setOpen(false);
    }

    // Remove handler, removes notification from table
    function handleRemove(id) {
        dispatch(removeNotification({ id: id }))
    }

    return (
        <>
            <div className={Number(notification.seen) ? `notification ${notification.noticeType}` : `notification new ${notification.noticeType}`} onClick={() => handleClick(notification.destination, notification.id)}>
                <div>
                    <div className="remove" onClick={() => handleRemove(notification.id)}><img src={Cross} alt="ikon" /></div>
                    <div className="title">{notification.title}</div>
                    <div className="flex justify-between">
                        <div className="note">{notification.note}</div>
                        <div className="timestamp">{moment(notification.createdAt).fromNow()}</div>
                    </div>
                </div>
            </div>
        </>
    )
}
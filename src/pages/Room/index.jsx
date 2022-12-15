import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchRoomData } from '../../store/rooms/rooms-actions';
import Area from '../../assets/images/icons/area.svg';
import Location from '../../assets/images/icons/location.svg';
import Thumbnail from '../../assets/images/thumbnail.png';
import Phone from '../../assets/images/icons/phone.svg'
import { Button, Calendar } from '../../components/';
import './style.scss';

export default function Room() {
    const [room, setRoom] = useState();
    const [loading, setLoading] = useState(true);
    const [showPhone, setShowPhone] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    // Ref
    const copyRef = useRef();

    // Fetch room data
    useEffect(() => {
        setLoading(true);
        setShowPhone(false);
        dispatch(fetchRoomData({ roomId: params?.id }))
            .then((response) => {
                setRoom(response.room);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }, [location, dispatch, params?.id])

    // onClick handler for copying link
    const copyLink = (e) => {
        navigator.clipboard.writeText(window.location.href);
        copyRef.current.innerHTML = "Kopieret!";

        const timer = setTimeout(() => {
            copyRef.current.innerHTML = "Kopier link";
            clearTimeout(timer);
        }, 1000);
    }

    // Prevent rendering when fetching room data
    if (loading) return;

    // If no room was fetched, show error
    if (!room) return 'Lokalet kunne ikke blive fundet';

    return (
        <>
            <div className='container room'>
                <div className='room-thumbnail'>
                    <img src={room.thumbnail ? `${process.env.REACT_APP_IMAGE_PATH}${room.thumbnail}` : Thumbnail} alt="thumbnail" />
                </div>
                <div className='flex details'>
                    <div className='room-details'>
                        <div className='flex justify-between'>
                            {room.categories &&
                                <div className='tags-wrapper'>
                                    {room.categories.type.map((item, index) => (
                                        <div key={index} className='tag'>
                                            <img src={'/assets/icons/'+item.categoryIcon} alt="ikon" />
                                            {item.categoryName}
                                        </div>
                                    ))}
                                </div>
                            }
                            <div>
                                <button className='btn primary' ref={copyRef}  onClick={e => copyLink(e)}>Kopier link</button>
                            </div>
                        </div>
                        {room.area &&
                            <div className='flex align-center area-wrapper'>
                                <img src={Area} alt="ikon" />
                                <span>{room.area} m²</span>
                            </div>
                        }
                        {room.roomAddress &&
                            <div className='flex align-center address-wrapper'>
                                <img src={Location} alt="ikon" />
                                <h1>{room.roomAddress}, {room.city}, {room.zipcode}</h1>
                            </div>
                        }
                        {room.roomDescription && 
                            <div className='description-wrapper'>
                                <h2>Beskrivelse</h2>
                                <p>{room.roomDescription}</p>
                            </div>
                        }
                    </div>
                    <div className='booking-container'>
                        <h2>Lej dette lokale</h2>
                        {room.price && room.timeUnit &&
                            <div className='blue-text fs-20'>{room.price} DKK / {room.timeUnit === "day" ? "dag" : "time"}</div>
                        }
                        <Calendar room={room} />
                    </div>
                </div>
                <div className="facilities">
                    {room.categories &&
                        <>
                        <div className="heading-container">
                            <h2>Faciliteter</h2>
                        </div>
                        <div className='tags-wrapper'>
                            {room.categories.facilities.map((item, index) => (
                                <div key={index} className='tag'>
                                    <img src={item.categoryIcon ? '/assets/icons/'+item.categoryIcon : '/assets/icons/box.svg'} alt="ikon" />
                                    {item.categoryName}
                                </div>
                            ))}
                        </div>
                        </>
                    }
                </div>
                <hr></hr>
                <div className='flex align-center justify-between'>
                    <div className='room-user flex align-center'>
                        {room?.avatar && <div className='avatar'><img src={`${process.env.REACT_APP_IMAGE_PATH}${room.avatar}`} alt="Profilbillede" /></div>}
                        {(room?.firstname || room?.lastname) &&
                            <div className='fs-20'>{`${room.firstname} ${room.lastname}`}</div>
                        }
                    </div>
                    <div className='flex buttons'>
                        <Button title="Åben chat" color="primary" onClick={() => navigate('/beskeder')} />
                        {room.phone ?
                            !showPhone ?
                                <Button title="Vis telefonnummer" color="primary" onClick={() => setShowPhone(prev => !prev)} />
                            :
                                <a href={`tel:${room.phone}`} className='phone flex align-center'>
                                    <img src={Phone} alt="ikon" />
                                    <span>{room.phone}</span>
                                </a>
                        : <></>}
                    </div>
                </div>
            </div>        
        </>
    )
}
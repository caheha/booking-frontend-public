import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import './style.scss';
import {deleteRoom, fetchRoomList} from "../../store/room/room-actions.js";
import { useDispatch } from 'react-redux';

export default function RoomCard({ roomId, city, zipcode, area, price, timeUnit, thumbnail, edit, categories }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Request room to be deleted, refetch room list
    const deleteSubmit = () => {
        dispatch(deleteRoom({ roomId: roomId }));
        dispatch(fetchRoomList());
    };

    // Show edit/delete buttons if room is owned by current user
    return (
        <>
            <div className="room-card hover" >
                <div onClick={() => navigate('/lokale/' + roomId)}>
                    <div className='thumbnail'>
                    <img className={thumbnail ? 'thumbnail-image' : 'thumbnail-image blur '} src={thumbnail ? `${process.env.REACT_APP_IMAGE_PATH}${thumbnail}` : 'assets/images/thumbnail.png'} alt='thumbnail' />
                    </div>
                    <div className='details'>
                        {categories &&
                            <div className='tags-wrapper'>
                                {categories.type.map((item, index) => (
                                    <div key={index} className='tag'>
                                        <img src={'/assets/icons/'+item.categoryIcon} alt="ikon" />
                                        {item.categoryName}
                                    </div>
                                ))}
                            </div>
                        }
                        <div>
                        </div>
                        <div className='fs-18 uppercase bold flex align-center location-wrapper'>
                            <img src='/assets/icons/location.svg' alt='Ikon' />
                            <span>{city}, {zipcode}</span>
                        </div>
                        <div className='flex-between'>
                            <div className='fs-20 bold blue-text'>{price} DKK / {timeUnit === 'day' ? 'dag' : 'time'}</div>
                            <div className='area-label'>{area} m²</div>
                        </div>
                    </div>
                </div>
                
                {edit && 
                        <div className='flex buttons'>
                            <Button icon="/assets/icons/edit-white.svg" title="Rediger" color="yellow" onClick={() => navigate("/udlejning/rediger/" + roomId)} />
                            <Button icon="/assets/icons/trash-white.svg" title="Slet" color="warning" onClick={() => deleteSubmit()} />
                        </div>
                    }
            </div>
        </>
    )
}
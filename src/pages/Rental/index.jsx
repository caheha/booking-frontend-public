import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, RoomCard } from "../../components";
import { fetchRoomList } from "../../store/room/room-actions";

// Overview of rooms you created
export default function Rental() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // State slice
    const rooms = useSelector(state => state.room.rooms);

    // Fetch rooms
    useEffect(() => {
        dispatch(fetchRoomList());
    }, [dispatch]);

    return (
        <>
            <section className="container">
                <div className="heading-container">
                    <img alt="Ikon" src="/assets/icons/box.svg"/>
                    <h1>Udlejning</h1>
                </div>
                <div className="flex justify-between">
                    <div>
                        <Button
                            title="Opret nyt lokale"
                            color="primary"
                            onClick={() => navigate('/udlejning/opret')}
                        />
                    </div>
                </div>
                <div className="rooms-wrapper">
                    { rooms.length ? rooms.map((room, index) => {
                        return (
                            <RoomCard key={index}
                                roomId = {room.roomId}
                                city = {room.city}
                                zipcode = {room.zipcode}
                                area = {room.area}
                                price = {room.price}
                                timeUnit = {room.timeUnit}
                                thumbnail = {room.thumbnail}
                                categories = {room.categories}
                                edit={true}
                            />
                        )
                    }) : <></>}
                </div>
            </section>
        </>
    );
}

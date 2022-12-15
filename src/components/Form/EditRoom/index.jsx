import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { edit } from "../../../store/room/room-actions";
import Button from "../../Button";
import './style.scss';
import { fetchRoomData } from '../../../store/rooms/rooms-actions';
import { fetchCategories } from '../../../store/categories/categories-actions';

const initialState = { description: '', address: '', zipcode: '', city: '', area: '', price: '', timeUnit: '', startTime: '', endTime: '', image: '', type: '', facilities: ''}

export default function EditRoom() {
    const [formData, setFormData] = useState(initialState);
    const [room, setRoom] = useState();
    const [checkedType, setCheckedType] = useState(initialState?.type ? initialState.type.split(',') : []);
    const [checkedFacilities, setCheckedFacilities] = useState(initialState?.facilities ? initialState.facilities.split(',') : []);
    const [dropdownOpen, setDropdownOpen] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    // State slice
    const status = useSelector(state => state.status.editRoom);
    const categories = useSelector((state) => state.categories);

    // Fetch categories
    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])

    // Fetch room data and update states with values
    useEffect(() => {
        dispatch(fetchRoomData({ roomId: params?.id }))
            .then((response) => {
                let roomData = response.room;
                setRoom(roomData);
                var categoryTypeId_arr = roomData.categories.type.map(function (el) { return el.categoryId; });
                var categoryFacilitiesId_arr = roomData.categories.facilities.map(function (el) { return el.categoryId; });
                let form = {
                    id: roomData.roomId,
                    description: roomData.roomDescription,
                    address: roomData.roomAddress,
                    zipcode: roomData.zipcode,
                    city: roomData.city,
                    area: roomData.area,
                    price: roomData.price,
                    timeUnit: roomData.timeUnit,
                    startTime: roomData.startTime,
                    endTime: roomData.endTime,
                    visible: true,
                    type: categoryTypeId_arr.join(','),
                    facilities: categoryFacilitiesId_arr.join(',')
                };
                setFormData(form);
                setCheckedType(categoryTypeId_arr);
                setCheckedFacilities(categoryFacilitiesId_arr);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [location, dispatch, params?.id])

    // onChange handler for inputs
    const handleChange = (e) => {
        setFormData(prev => { return { ...prev, [e.target.name]: e.target.value }});
    }

    // onChange handler for file upload
    const upload = (e) => {
        setFormData(prev => { return { ...prev, [e.target.name]: e.target.files[0] }});
    }

    // Click handler for form submission
    const submit = () => {
        dispatch(edit(formData, navigate));
    }

    // Add/Remove checked item from list
    const handleCheck = (event) => {
        if(event.target.name === 'type'){
            var updatedType = [...checkedType];
            if (event.target.checked) {
                updatedType = [...checkedType, event.target.value];
            } else {
                updatedType.splice(checkedType.indexOf(event.target.value), 1);
            }
            setCheckedType(updatedType);
            
        }else if(event.target.name === 'facilities'){
            var updatedFacilities = [...checkedFacilities];
            if (event.target.checked) {
                updatedFacilities = [...checkedFacilities, event.target.value];
            } else {
                updatedFacilities.splice(checkedFacilities.indexOf(event.target.value), 1);
            }
            setCheckedFacilities(updatedFacilities);
        };
    }

    // Toggle dropdown
    const toggleDropdown = (dropdown) => {
        if (dropdown !== dropdownOpen){
            setDropdownOpen(dropdown);
        } else {
            setDropdownOpen('');
        }
    }

    // Update formdata when categories are added/removed
    useEffect(() => {
        setFormData(prev => { return { ...prev, type: checkedType.join(','), facilities: checkedFacilities.join(',') }});
    }, [checkedType, checkedFacilities])

    // Prevent render while fetching room data
    if (!room) return;

    return (
        <>
            <div className="flex">
                <div className="form edit-room">
                    <label htmlFor="address">Adresse</label>
                    <input type="text" name="address" value={formData.address} onChange={(e) => handleChange(e)} />
                    <div className="input-container flex">
                        <div className="half-width">
                            <label htmlFor="zipcode">Postnummer</label>
                            <input type="number" name="zipcode" value={formData.zipcode} onChange={(e) => handleChange(e)} />
                        </div>
                        <div className="half-width">
                            <label htmlFor="city">By</label>
                            <input type="text" name="city" value={formData.city} onChange={(e) => handleChange(e)} />
                        </div>
                    </div> 
                    <label htmlFor="price">Pris</label>
                    <input type="number" name="price" value={formData.price} onChange={(e) => handleChange(e)} />
                    <label htmlFor="area">Areal m²</label>
                    <input type="number" name="area" value={formData.area} onChange={(e) => handleChange(e)} />
                    <div className="category-dropdowns">
                        <label>Vælg en eller flere lokale typer</label>
                        <Button outline={true} title='Lokale typer' count={checkedType.length} color={dropdownOpen === 'type' || formData.type ? "active" : "secondary"} icon="/assets/icons/box.svg" onClick={() => toggleDropdown('type')} />
                        {dropdownOpen === 'type' ?
                        <div className="checkboxes type" >
                            {categories.type.map((item, index) => (
                                <label className={checkedType.includes(item.id) ? "checkbox btn outline active" : "checkbox btn outline secondary"} key={index} htmlFor={item.categoryName}>
                                    <img src={item.categoryIcon ? '/assets/icons/'+item.categoryIcon : '/assets/icons/box.svg'} alt="ikon" />
                                    <input id={item.categoryName} type="checkbox" name={item.categoryType} onChange={(e) => handleCheck(e)} value={item.id} checked={checkedType.includes(item.id)} />{item.categoryName}
                                </label>
                            ))}
                        </div> 
                        : ''}
                        <label>Vælg en eller flere faciliteter</label>
                        <Button outline={true} title='Faciliteter' count={checkedFacilities.length} color={dropdownOpen === 'facilities' || formData.facilities ? "active" : "secondary"} icon="/assets/icons/box.svg" onClick={() => toggleDropdown('facilities')} />
                        {dropdownOpen === 'facilities' ?
                        <div className="checkboxes facilities">
                            {categories.facilities.map((item, index) => (
                                <label className={checkedFacilities.includes(item.id) ? "checkbox btn outline active" : "checkbox btn outline secondary"} key={index} htmlFor={item.categoryName}>
                                    <img src={item.categoryIcon ? '/assets/icons/'+item.categoryIcon : '/assets/icons/box.svg'} alt="ikon" />
                                    <input id={item.categoryName} type="checkbox" name={item.categoryType} onChange={(e) => handleCheck(e)} value={item.id} checked={checkedFacilities.includes(item.id)} />{item.categoryName}
                                </label>
                            ))}
                        </div>
                        : ''}
                    </div>
                    <label htmlFor="timeUnit">Tidsenhed</label>
                    <select name="timeUnit" value={formData.timeUnit} onChange={(e) => handleChange(e)}>
                        <option value> -- Vælg tidsenhed -- </option>
                        <option value="day">Dag</option>
                        <option value="hour">Time</option>
                    </select>
                    <div className="input-container flex">
                        <div className="half-width">
                            <label htmlFor="startTime">Start tid</label>
                            <input type="time" name="startTime" value={formData.startTime} onChange={(e) => handleChange(e)} />
                        </div>
                        <div className="half-width">
                            <label htmlFor="endTime">Slut tid</label>
                            <input type="time" name="endTime" value={formData.endTime} onChange={(e) => handleChange(e)} />
                        </div>
                    </div> 
                    <textarea name="description" value={formData.description} onChange={(e) => handleChange(e)}></textarea>
                    {status.message ? <div className={status.status === 'success' ? "status-message success" : "status-message error"}>{status.message}</div> : <></>}
                    <Button title='Gem ændringer' color='primary' onClick={() => submit()} />
                </div>
                <div className="form upload-wrapper">
                    <label htmlFor="image">Upload et billede</label>
                    <input onChange={upload} type='file' name="image"/>
                    { (room?.thumbnail || formData.image) &&
                        <div className="preview-wrapper">
                            <img src={formData.image ? URL.createObjectURL(formData.image) : process.env.REACT_APP_IMAGE_PATH + room.thumbnail } alt="Thumbnail preview" />
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
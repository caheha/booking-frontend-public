import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate} from 'react-router-dom';
import Button from '../Button';
import RoomCard from '../RoomCard';
import { fetchRoomList } from "../../store/rooms/rooms-actions";
import './style.scss';
import { fetchCategories } from '../../store/categories/categories-actions';

// Get search params, used to fill out filter options
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

const initialState = { search: params.search, type: params.type, facilities: params.facilities, order: params.order}

export default function Filter() {
    const [formData, setFormData] = useState(initialState);
    const [checkedType, setCheckedType] = useState(initialState?.type ? initialState.type.split(',') : []);
    const [checkedFacilities, setCheckedFacilities] = useState(initialState?.facilities ? initialState.facilities.split(',') : []);
    const [dropdownOpen, setDropdownOpen] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // State slices
    const categories = useSelector((state) => state.categories);
    const rooms = useSelector(state => state.rooms.rooms);

    // Fetch categories, populates dropdowns
    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])

    // Fetch rooms, populates overview
    useEffect(() => {
        dispatch(fetchRoomList(formData));
    }, [formData, dispatch]);

    // Handler for filter changes
    const handleChange = (e) => {
        setFormData(prev => { return { ...prev, [e.target.name]: e.target.value }});
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

    // Toggle dorpdown
    const toggleDropdown = (dropdown) => {
        if (dropdown !== dropdownOpen){
            setDropdownOpen(dropdown);
        } else {
            setDropdownOpen('');
        }
    }

    // Update formData when category is added/removed
    useEffect(() => {
        setFormData(prev => { return { ...prev, type: checkedType.join(','), facilities: checkedFacilities.join(',') }});
    }, [checkedType, checkedFacilities])

    useEffect(() => {
        // BUILD QUERY URL
        let query = '?';
        for (const [key, value] of Object.entries(formData)) {
            if(value){
                query += `${key}=${value}&`;
            }
        }
        
        query = encodeURI(query.slice(0, -1));
        navigate({search: query});        
    }, [formData, navigate])

    return (
        <>
            <div className="filter flex column">
                <div className="top">
                    <input type="search" name="search" className="search" onChange={(e) => handleChange(e)} value={formData.search} placeholder="Søg..."/>
                    <Button outline={true} title='Lokale typer' count={checkedType.length} color={dropdownOpen === 'type' || formData.type ? "active" : "secondary"} icon="assets/icons/box.svg" onClick={() => toggleDropdown('type')} />
                    <Button outline={true} title='Faciliteter' count={checkedFacilities.length} color={dropdownOpen === 'facilities' || formData.facilities ? "active" : "secondary"} icon="assets/icons/box.svg" onClick={() => toggleDropdown('facilities')} />
                    <select className="order" name="order" onChange={(e) => handleChange(e)} value={formData.order}>
                        <option value="">Nyeste først</option>
                        <option value="createdAt ASC">Ældste først</option>
                        <option value="price ASC">Billigste først</option>
                        <option value="price DESC">Dyreste Først</option>
                        <option value="zipcode">Postnummer</option>
                    </select>
                </div>
                <div className="bot">
                    {dropdownOpen === 'type' ?
                    <>
                    <label>Lokalet skal indholde mindst en af de valgte typer</label>
                    <div className="checkboxes type" >
                        {categories.type.map((item, index) => (
                            <label className={checkedType.includes(item.id) ? "checkbox btn outline active" : "checkbox btn outline secondary"} key={index} htmlFor={item.categoryName}>
                                <img src={item.categoryIcon ? '/assets/icons/'+item.categoryIcon : '/assets/icons/box.svg'} alt="ikon" />
                                <input id={item.categoryName} type="checkbox" name={item.categoryType} onChange={(e) => handleCheck(e)} value={item.id} checked={checkedType.includes(item.id)} />{item.categoryName}
                            </label>
                        ))}
                    </div> 
                    </>
                    : ''}
                    {dropdownOpen === 'facilities' ?
                    <>
                    <label>Lokalet skal indholde alle valgte faciliteter</label>
                    <div className="checkboxes facilities">
                        {categories.facilities.map((item, index) => (
                            <label className={checkedFacilities.includes(item.id) ? "checkbox btn outline active" : "checkbox btn outline secondary"} key={index} htmlFor={item.categoryName}>
                                <img src={item.categoryIcon ? '/assets/icons/'+item.categoryIcon : '/assets/icons/box.svg'} alt="ikon" />
                                <input id={item.categoryName} type="checkbox" name={item.categoryType} onChange={(e) => handleCheck(e)} value={item.id} checked={checkedFacilities.includes(item.id)} />{item.categoryName}
                            </label>
                        ))}
                    </div>
                    </>
                    : ''}
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
                        />
                    )
                }) : <h3>Ingen lokaler fundet</h3>}
            </div>
        </>
    )
}
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { create } from "../../../store/room/room-actions";
import Button from "../../Button";
import './style.scss';
import { fetchCategories } from '../../../store/categories/categories-actions';

const initialState = { description: '', address: '', zipcode: '', city: '', area: '', price: '', timeUnit: '', startTime: '', endTime: '', image: '', type: '', facilities: ''}

export default function CreateRoom() {
    const [formData, setFormData] = useState(initialState);
    const [checkedType, setCheckedType] = useState(initialState?.type ? initialState.type.split(',') : []);
    const [checkedFacilities, setCheckedFacilities] = useState(initialState?.facilities ? initialState.facilities.split(',') : []);
    const [dropdownOpen, setDropdownOpen] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // State slices
    const categories = useSelector((state) => state.categories);
    const status = useSelector(state => state.status.createRoom);

    // Fetch categories
    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])

    // onChange handler for input 
    const handleChange = (e) => {
        setFormData(prev => { return { ...prev, [e.target.name]: e.target.value }});
    }

    // onChange handler for image upload
    const upload = (e) => {
        setFormData(prev => { return { ...prev, [e.target.name]: e.target.files[0] }});
    }

    // Click handler for form submission
    const submit = () => {
        dispatch(create(formData, navigate));
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
            
        } else if (event.target.name === 'facilities'){
            var updatedFacilities = [...checkedFacilities];
            if (event.target.checked) {
                updatedFacilities = [...checkedFacilities, event.target.value];
            } else {
                updatedFacilities.splice(checkedFacilities.indexOf(event.target.value), 1);
            }
            setCheckedFacilities(updatedFacilities);
        };
    }

    // Toggle category dropdown
    const toggleDropdown = (dropdown) => {
        if (dropdown !== dropdownOpen){
            setDropdownOpen(dropdown);
        } else {
            setDropdownOpen('');
        }
    }

    // Update formData when categories are added/remove
    useEffect(() => {
        setFormData(prev => { return { ...prev, type: checkedType.join(','), facilities: checkedFacilities.join(',') }});
    }, [checkedType, checkedFacilities])

    return (
        <>
            <div className="flex">
                <div className="form create-room">
                    <label htmlFor="address">Adresse</label>
                    <input type="text" name="address" onChange={(e) => handleChange(e)} />
                    <div className="input-container flex">
                        <div className="half-width">
                            <label htmlFor="zipcode">Postnummer</label>
                            <input type="number" name="zipcode" onChange={(e) => handleChange(e)} />
                        </div>
                        <div className="half-width">
                            <label htmlFor="city">By</label>
                            <input type="text" name="city" onChange={(e) => handleChange(e)} />
                        </div>
                    </div> 
                    <label htmlFor="price">Pris</label>
                    <input type="number" name="price" min="0" onChange={(e) => handleChange(e)} />
                    <label htmlFor="area">Areal m²</label>
                    <input type="number" name="area" min="0" onChange={(e) => handleChange(e)} />
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
                    <select name="timeUnit" defaultValue={''} onChange={(e) => handleChange(e)}>
                        <option value> -- Vælg tidsenhed -- </option>
                        <option value="day">Dag</option>
                        <option value="hour">Time</option>
                    </select>
                    <div className="input-container flex">
                        <div className="half-width">
                            <label htmlFor="startTime">Start tid</label>
                            <input type="time" name="startTime" onChange={(e) => handleChange(e)} />
                        </div>
                        <div className="half-width">
                            <label htmlFor="endTime">Slut tid</label>
                            <input type="time" name="endTime" onChange={(e) => handleChange(e)} />
                        </div>
                    </div>
                    <label htmlFor="description">Beskrivelse</label>
                    <textarea name="description" onChange={(e) => handleChange(e)}></textarea>
                    {status.message ? <div className={status.status === 'success' ? "status-message success" : "status-message error"}>{status.message}</div> : <></>}
                    <Button title='Opret lokale' color='primary' onClick={() => submit()} />
                </div>
                <div className="form upload-wrapper">
                    <label htmlFor="image">Upload et billede</label>
                    <input onChange={upload} type='file' name="image" />
                    { formData.image &&
                        <div className="preview-wrapper">
                            <img src={URL.createObjectURL(formData.image)} alt="preview" />
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
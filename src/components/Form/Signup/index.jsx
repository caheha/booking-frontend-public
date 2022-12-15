import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../../store/user/user-actions";
import Button from "../../Button";

const initialState = { email: '', password: '', firstname: '', lastname: '', phone: '' }

export default function Signup() {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();

    // State slice
    const status = useSelector(state => state.status.signup);

    // onChange handler for inputs
    const handleChange = (e) => {
        setFormData(prev => { return { ...prev, [e.target.name]: e.target.value }});
    }

    // onClick handler for form submission
    const submit = () => {
        dispatch(signup(formData));
    }

    return (
        <>
          <div className="form">
                <label htmlFor="email">Email adresse</label>
                <input type="email" name="email" onChange={(e) => handleChange(e)} />
                <label htmlFor="password">Adgangskode</label>
                <input type="password" name="password" onChange={(e) => handleChange(e)} />
                <label htmlFor="firstname">Fornavn</label>
                <input type="text" name="firstname" onChange={(e) => handleChange(e)} />
                <label htmlFor="lastname">Efternavn</label>
                <input type="text" name="lastname" onChange={(e) => handleChange(e)} />
                <label htmlFor="phone">Telefonnummer</label>
                <input type="phone" name="phone" onChange={(e) => handleChange(e)} />
                {status.message ? <div className={status.status === 'success' ? "status-message success" : "status-message error"}>{status.message}</div> : <></>}
                <Button title='Opret bruger' color='primary' onClick={() => submit()} />
            </div>
        </>
    )
}
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../../store/user/user-actions";
import Button from "../../Button";

const loginInitialState = { email: '', password: '' }

export default function Login() {
    const [loginFormData, setLoginFormData] = useState(loginInitialState);
    const dispatch = useDispatch();

    // State slice
    const status = useSelector(state => state.status.signin);

    // onChange handler for inputs
    const handleLoginChange = (e) => {
        setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
    }

    // onClick handler for submission
    const loginSubmit = () => {
        dispatch(signin(loginFormData));
    }

    return (
        <>
            <div className="form">
                <label htmlFor="email">Email adresse</label>
                <input type="email" name="email" onChange={(e) => handleLoginChange(e)} />
                <label htmlFor="password">Adgangskode</label>
                <input type="password" name="password" onChange={(e) => handleLoginChange(e)} />
                {status.message ? <div className={status.status === 'success' ? "status-message success" : "status-message error"}>{status.message}</div> : <></>}
                <Button title='Log ind' color='primary' onClick={() => loginSubmit()} />
            </div>
        </>
    )
}
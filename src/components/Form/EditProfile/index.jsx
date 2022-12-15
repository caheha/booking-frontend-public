import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../../store/user/user-actions";
import Button from "../../Button";

const initialState = { firstname: "", lastname: "", phone: "", email: "" };

export default function EditProfile() {
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();

    // State slices
    const status = useSelector(state => state.status.updateProfile);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (user.id) {
            let form = {
                firstname: user.firstname,
                lastname: user.lastname,
                phone: user.phone,
                email: user.email,
            };

            setFormData(form);
        }
    }, [user]);
    
    const handleUpdate = (e) => {
        setFormData((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const updateSubmit = () => {
        dispatch(update(formData));
    };

    return (
        <>
            <div className="form formRezise">
                <label htmlFor="firstname">Fornavn</label>
                <input
                    value={formData.firstname}
                    type="text"
                    name="firstname"
                    onChange={(e) => handleUpdate(e)}
                />
                <label htmlFor="lastname">Efternavn</label>
                <input
                    value={formData.lastname}
                    type="text"
                    name="lastname"
                    onChange={(e) => handleUpdate(e)}
                />
                <label htmlFor="phone">Telefonnummer</label>
                <input
                    value={formData.phone}
                    type="phone"
                    name="phone"
                    onChange={(e) => handleUpdate(e)}
                />
                <label htmlFor="email">Email adresse</label>
                <input
                    value={formData.email}
                    type="email"
                    name="email"
                    onChange={(e) => handleUpdate(e)}
                />
                {status.message ? <div className={status.status === 'success' ? "status-message success" : "status-message error"}>{status.message}</div> : <></>}
                <Button
                    title="Gem ændringer"
                    color="primary"
                    onClick={() => updateSubmit()}
                />
                <h3>Slet din konto</h3>
                <Button
                    title="Slet konto"
                    color="warning"
                    onClick={() => updateSubmit()}
                />
            </div>
        </>
    );
}

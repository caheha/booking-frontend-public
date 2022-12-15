import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../components";
import { avatarDelete, avatarUpload } from "../../../store/user/user-actions";
import Placeholder from '../../../assets/images/avatar_placeholder.png';

export default function UpdateAvatar() {
    const dispatch = useDispatch();
    const [uploadImg, setUploadImg] = useState(null);

    // State slices
    const user = useSelector((state) => state.user);
    const status = useSelector(state => state.status.uploadAvatar);

    // Submit uploaded image handler
    const upload = () => {
        let file = uploadImg;

        let formData = {
            image: file,
        };

        dispatch(avatarUpload(formData));
        setUploadImg(null);
    };

    return (
        <>
            <div className="imgUpload">
                <div>
                    <img
                        className="resize"
                        src={
                            uploadImg ? 
                                URL.createObjectURL(uploadImg) 
                                : 
                                user.avatar ? 
                                    `${process.env.REACT_APP_IMAGE_PATH}${user.avatar}`
                                    :
                                    Placeholder
                        }
                        alt={`${user.firstname} ${user.lastname}`}
                    />
                </div>
                <div className="buttons-wrapper">
                    <div className="flex">
                        {!uploadImg ? (
                            <>
                                <label htmlFor="file" className="btn primary">
                                    Tilføj profilbillede
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    name="file"
                                    onChange={(e) =>
                                        setUploadImg(e.target.files[0])
                                    }
                                />
                            </>
                        ) : (
                            <Button
                                title="Annuller"
                                color="grey"
                                onClick={() => setUploadImg(null)}
                            />
                        )}
                        {uploadImg && (
                            <Button
                                title="Gem"
                                color="success"
                                onClick={() => upload()}
                            />
                        )}
                    </div>
                    <div>
                        <Button
                            title="Fjern profilbillede"
                            color="warning"
                            onClick={() => dispatch(avatarDelete())}
                        />
                    </div>
                    {status.message ? <div className={status.status === 'success' ? "status-message success" : "status-message error"}>{status.message}</div> : <></>}
                </div>
            </div>
        </>
    );
}

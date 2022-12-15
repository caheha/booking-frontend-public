import { EditProfile } from "../../components/Form";
import UpdateAvatar from "./UpdateAvatar";
import "./style.scss";

// Profile overview with Avatar upload and edit profile form
export default function Profile() {
    return (
        <>
            <section className="container profile">
                <div className="heading-container">
                    <img alt="Ikon" src="/assets/icons/profile.svg" />
                    <h1>Opdater din profil</h1>
                </div>
                <div className="flex space-around">
                    <UpdateAvatar />
                    <div className="form-wrapper">
                        <EditProfile />
                    </div>
                </div>
            </section>
        </>
    );
}

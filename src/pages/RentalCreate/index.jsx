import { useNavigate } from "react-router-dom";
import { CreateRoom } from "../../components/Form";

// Create new room page with form
export default function RentalCreate() {
    const navigate = useNavigate();

    return (
        <>
            <section className="container margin-bottom">
                <div className="heading-container">
                    <img className="hover" alt="Ikon" src="/assets/icons/chevron-left.svg" onClick={() => navigate('/udlejning')} />
                    <h1>Opret nyt lokale</h1>
                </div>
                <CreateRoom />
            </section>
        </>
    );
}

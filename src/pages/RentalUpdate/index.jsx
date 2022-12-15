import { useNavigate } from "react-router-dom";
import { EditRoom } from "../../components/Form";

// Edit room you created
export default function RentalUpdate() {
    const navigate = useNavigate();

    return (
        <>
            <section className="container">
                <div className="heading-container">
                    <img className="hover" alt="Ikon" src="/assets/icons/chevron-left.svg" onClick={() => navigate('/udlejning')} />
                    <h1>Rediger</h1>
                </div>
                <EditRoom />
            </section>
        </>
    );
}

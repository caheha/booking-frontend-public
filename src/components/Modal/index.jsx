import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"
import { close, showLogin } from "../../store/modal/modal-slice";
import { Login, Signup } from "../Form";
import './style.scss';

export default function Modal() {
    const dispatch = useDispatch();
    const modal = useSelector((state) => state.modal);

    // Refs
    const modalElement = useRef();
    const element = useRef();

    // AddEvenListener for closing modal when clicked outside of element
    useEffect(() => {
        const closeModal = (e) => {
            if (!element.current.contains(e.target)) {
                dispatch(close());
            }
        }

        if (modal.active) {
            modalElement.current.addEventListener('click', closeModal);
        }
    }, [modal, dispatch])

    // If modal isn't active, don't show it
    if (!modal.active) return;

    return (
        <>
            <div className="modal" ref={modalElement}>
                <div className="element" ref={element}>
                    <div className="form-select">
                        <div 
                            className={modal.loginActive ? 'form-title active' : 'form-title'}
                            onClick={() => dispatch(showLogin(true))}
                        >
                            Log ind
                        </div>
                        <div 
                            className={!modal.loginActive ? 'form-title active' : 'form-title'}
                            onClick={() => dispatch(showLogin(false))}
                        >
                            Opret bruger
                        </div>
                    </div>
                    {modal.loginActive ? <Login /> : <Signup />}
                </div>
            </div>
        </>
    )
}
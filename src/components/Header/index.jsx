import './style.scss';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { open, showLogin } from "../../store/modal/modal-slice";
import { useState, useRef, useEffect } from 'react';
import Logo from '../../assets/images/icons/logo.svg';
import Notifications from '../Notifications';
import { Logout } from '../../store/user/user-actions';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Refs
    const dropdownRef = useRef();
    const buttonRef = useRef();

    // State slice
    const user = useSelector((state) => state.user);

    // Open modal, toggle which form to show based on login = true/false
    function openModal(login) {
        dispatch(showLogin(login));
        dispatch(open());
    }

    // Logout handler
    function handleLogout() {
        dispatch(Logout(navigate));
        setMenuOpen(false);
    }

    // AddEventListener to close menu when clicked outside 
    useEffect(() => {
        const close = (e) => {
            if (menuOpen && dropdownRef.current && !dropdownRef.current.contains(e.target) && buttonRef.current && !buttonRef.current.contains(e.target)) {
                setMenuOpen(prev => !prev);
            }
        }

        document.addEventListener("click", close);
        return () => document.removeEventListener("click", close);
    }, [menuOpen])
   
    return (
        <>
            <header className="header">
                <div className="container flex-between align-center">
                <NavLink to="/" end><img src={Logo} alt="logo" /></NavLink>
                <div className="nav-btns flex align-center">
                    
                    <nav className="flex">
                        {user.id ? 
                        <>
                            <Notifications />
                            <button ref={buttonRef} className="menu-dropdown" onClick={() => setMenuOpen(prev => !prev)}><img alt="Ikon" src="/assets/icons/user-circle.svg"/></button>
                            {menuOpen && <ul className='dropdown' ref={dropdownRef}>
                                <li><NavLink to="/konto" ><img alt="Ikon" src="/assets/icons/profile.svg" />Konto</NavLink></li>
                                <li><NavLink to="/reservationer" ><img alt="Ikon" src="/assets/icons/calendar.svg" />Reservationer</NavLink></li>
                                <li><NavLink to="/beskeder" ><img alt="Ikon" src="/assets/icons/messages.svg" />Beskeder</NavLink></li>
                                <li className='divider'></li>
                                <li><NavLink to="/udlejning" ><img alt="Ikon" src="/assets/icons/box.svg" />Udlejning</NavLink></li>
                                <li><NavLink to="/anmodninger" ><img alt="Ikon" src="/assets/icons/checklist.svg" />Anmodninger</NavLink></li>
                                <li className='divider'></li>
                                <li><button className="logout" type='button' onClick={() => handleLogout()}><img alt="Ikon" src="/assets/icons/logout.svg" />Logout</button></li>
                            </ul>}
                        </> :
                        <>
                        <button onClick={() => openModal(true)}><img alt="Ikon" src="/assets/icons/login.svg" />Log ind</button>
                        <button onClick={() => openModal(false)}><img alt="Ikon" src="/assets/icons/user-plus.svg" />Opret bruger</button>
                        </>
                        } 
                    </nav>
                </div>
                </div>
            </header>
        </>
    )
}
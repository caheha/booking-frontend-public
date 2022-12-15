import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Footer, Header, Modal, Protected, Status} from './components';
import { Home, Profile, Room, Rental, RentalCreate, Reservations, Requests, Messages, RentalUpdate } from './pages';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserData } from './store/user/user-actions';

function App() {
    const dispatch = useDispatch();

    // State slice
    const user = useSelector((state) => state.user);

    // If token exists, and no user data exists, fetch user data
    useEffect(() => {
        if (localStorage.getItem('token') && !user.id) {
            dispatch(getUserData({ id: localStorage.getItem('token')}));
        }
    }, [user, dispatch])

    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' exact element={<Home />} />
                    <Route path='/konto' element={<Protected id={user.id}><Profile /></Protected>} />
                    <Route path='/reservationer' element={<Protected id={user.id}><Reservations /></Protected>} />
                    <Route path='/beskeder' element={<Protected id={user.id}><Messages /></Protected>} />
                    <Route path='/udlejning' element={<Protected id={user.id}><Rental /></Protected>} />
                    <Route path='/udlejning/opret' element={<Protected id={user.id}><RentalCreate /></Protected>} />
                    <Route path='/udlejning/rediger/:id' element={<Protected id={user.id}><RentalUpdate /></Protected>}/>
                    <Route path='/anmodninger' element={<Protected id={user.id}><Requests /></Protected>} />
                    <Route path='/lokale/:id' element={<Room />} />
                </Routes>
                <Modal />
                <Footer />
                <Status />
            </BrowserRouter>
        </>
    )
}

export default App;

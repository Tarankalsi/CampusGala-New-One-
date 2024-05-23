import React, { useState, useEffect } from 'react'
import "../css/HomeScreen.css";
import { PinkButton, TransparentButton } from '../../components/ui/Button';
// import Navbar from '../components/general/Navbar';
import Cover from '../../components/general/homescreen/Cover';
import UpcomingEvents from '../../components/general/homescreen/UpcomingEvents';
import LoginNavbar from '../../components/ui/LoginNavbar';
import { Route, Routes, useNavigate, BrowserRouter } from 'react-router-dom';
import Navbar from '../../components/ui/Navbar';

import axios from 'axios'
import { useRecoilState, useRecoilValue } from 'recoil';
import { eventsAtom } from '../../store/atoms/userAtom';
import DynamicNavbar from '../../components/ui/DynamicNavbar';




function HomeScreen() {

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    const [loggedIn, setLoggedIn] = useState(null)

    const [events, setEvents] = useRecoilState(eventsAtom)

    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    useEffect(() => {

        const fetchData = async () => {
            if (token) {
                setLoggedIn(true)

                try {

                    const response = await axios.get('http://localhost:3000/api/v1/user/details', {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    })
                    setUser(response.data.user)
                    setLoggedIn(true);

                }

                catch (error) {
                    console.error('Error fetching user details:', error);
                    setLoggedIn(false);
                }

            } else {
                setLoggedIn(false)
            }

        }


        fetchData();

    }, [token])

    useEffect(() => {
        setLoading(true)
        try {
            const fetchEvents = async () => {
                const eventResponse = await axios.get('http://localhost:3000/api/v1/user/events')
                setEvents(eventResponse.data.events)
            }
            fetchEvents()
        } catch (error) {
            console.error(error.message)
        } finally {
            setLoading(false)
        }
        console.log(events)
    }, [])


    if (loggedIn === null) {
        return null;
    }

    return (

        <div>
            <DynamicNavbar loggedIn={loggedIn} user={user} />

                <Routes>

                    <Route path="/" element={
                        <div>
                            <div className='text-center  bg-no-repeat  bg-image '>
                                <div className=' bg-gradient h-fit  bg-no-repeat pb-32 '>

                                    <Cover />
                                </div>
                            </div>
                            <div>
                                <UpcomingEvents />
                            </div>
                        </div>
                    } />

                </Routes>
 

        </div>

    );


}

export default HomeScreen

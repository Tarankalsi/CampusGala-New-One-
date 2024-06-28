import React, { useEffect, useState } from 'react'
import DynamicNavbar from '../../components/ui/DynamicNavbar'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Event from '../../components/general/eventpage/Event';
import { BACKEND_URL } from '../../../config';

function EventPage() {

    const { eventId } = useParams();
    const [user, setUser] = useState({})
    const [loggedIn, setLoggedIn] = useState(null)
    const token = localStorage.getItem('token')

    useEffect(() => {

        const fetchData = async () => {
            if (token) {
                setLoggedIn(true)

                try {

                    const response = await axios.get(`${BACKEND_URL}/api/v1/user/details`, {
                        headers: {
                            'Authorization': `Bearer ${token}`

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

    return (
        <div>
            <DynamicNavbar loggedIn={loggedIn} user={user} />
            <Event/>
        </div>
    )
}

export default EventPage

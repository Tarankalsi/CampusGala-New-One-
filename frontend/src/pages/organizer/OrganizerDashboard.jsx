import React, { useEffect, useState } from 'react'
import OrganizerSidebar from '../../components/general/organizer/dashboard/OrganizerSidebar'
import DashboardPage from '../../components/general/organizer/dashboard/DashboardPage'
import { useRecoilState } from 'recoil'
import { eventAtom } from '../../store/atoms/organizerAtom'
import axios from 'axios'
import Spinner from '../../components/ui/Spinner'
import { BACKEND_URL } from '../../../config'

function OrganizerDashboard() {
    const [loading, setLoading] = useState(false)
    const [event, setEvent] = useRecoilState(eventAtom)

    const [error, setError] = useState("")

    useEffect(() => {
        setLoading(true)
        try {
            const fetchEvent = async () => {
                const response = await axios.get(`${BACKEND_URL}/api/v1/organizer/event`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('organizerToken')}`
                    }
                })
                if (response.data.success) {
                    setEvent(response.data.event)
                }


            }

            fetchEvent()
        } catch (error) {
            console.error("Fetching Event Failed", error.message)
        } finally {
            setLoading(false)
        }
    }, [])


    return (
        <div>

            <OrganizerSidebar />

            {loading ? <Spinner /> : <DashboardPage />}

        </div>
    )
}

export default OrganizerDashboard

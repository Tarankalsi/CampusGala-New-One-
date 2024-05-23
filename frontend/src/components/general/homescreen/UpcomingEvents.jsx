import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark ,faIndianRupeeSign} from '@fortawesome/free-solid-svg-icons'
import EventCard from './EventCard'
import { eventsAtom } from '../../../store/atoms/userAtom'
import { useRecoilValue } from 'recoil'

function UpcomingEvents() {

    const events = useRecoilValue(eventsAtom)

    return (
        <div>
            <div className='text-center font-bold text-secondary text-3xl my-12'>
                <h3>Upcoming Events</h3>
            </div>
            <div className='flex flex-wrap justify-center gap-3  my-4'>
              
                {events.map(event => {
                        return   <EventCard key={event.eventId} event={event} />
                    })}


            </div>
        </div>
    )
}

export default UpcomingEvents

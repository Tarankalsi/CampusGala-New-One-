import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark ,faIndianRupeeSign} from '@fortawesome/free-solid-svg-icons'
import { formatDate } from '../../../utils/formatDate'
import { Link } from 'react-router-dom'

function EventCard( {event}) {
  return (
    <div>
      <div className="max-w-xs bg-white   rounded-lg  dark:bg-gray-800 dark:border-gray-700">
                    <Link to={`/home/event/${event.eventId}`} className=''>
                        <img className="rounded-t-3xl max-h-80 w-72" src={event.avatar} alt="" />
                        <h1 className='w-full bg-secondary rounded-b-3xl text-center h-10 py-2 text-white font-bold text-lg'>{ formatDate( event.eventDate)}</h1>
                    </Link>
                    <div className="p-5">
                        <Link href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{event.eventName}</h5>
                        </Link>
                        <p className=" font-normal text-gray-700 dark:text-gray-400">{event.collegeName}</p>
                        <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">Venue - {event.venue}</p>
                       
                        <Link to="#" className='text-white bg-secondary py-1.5 px-8 rounded-full border-white  hover:bg-white border-2 hover:border-secondary  hover:text-secondary'>
                            <FontAwesomeIcon icon={faIndianRupeeSign} className='mr-1 size-4'/>
                            {event.ticketPrice}
                        </Link>
                    </div>
                </div>
    </div>
  )
}

export default EventCard

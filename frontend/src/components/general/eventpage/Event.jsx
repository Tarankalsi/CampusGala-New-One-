import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { singleEventAtom } from '../../../store/atoms/userAtom';
import axios from 'axios';
import { capitalizeFirstLetters } from '../../../utils/strOperations';
import { formatDate } from '../../../utils/formatDate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons'
import { BACKEND_URL } from '../../../../config';

function Event() {


    const { eventId } = useParams();
    const [event, setEvent] = useRecoilState(singleEventAtom)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        const fetchEvent = async () => {

            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/user/events/${eventId}`)

                setEvent(response.data.event)
                console.log(response.data.event)
            } catch (error) {
                console.error(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchEvent()

    }, [eventId])

    return (
        <>  <div className='bg-gray-200'>
            <div className=' relative w-full h-56 sm:h-96 rounded-lg overflow-hidden'>
                <div
                    className='absolute inset-0 bg-cover bg-center  md:mx-20 lg:mx-28'
                    style={{ backgroundImage: `url(${event.coverImage})` }}
                ></div>

                <div className='absolute inset-0 backdrop-blur-md md:mx-20 lg:mx-28 '>
                    <div className='flex justify-center h-full'>
                        <img src={event.coverImage} s alt="" />
                    </div>
                </div>

            </div>
            <div className='md:mx-20 lg:mx-28  bg-white'>
                <div className=' px-14 flex justify-between items-center py-4'>
                    <div >
                        <div>
                            <h1 className='font-bold text-4xl tracking-wide'>{event.eventName}</h1>
                        </div>
                        <div>
                            <span className='text-gray-900 tracking-wide'>{event.eventType} | {event.collegeName} | {event.duration} hr</span>
                        </div>
                    </div>
                    <div>
                        <button className='bg-primary px-12 py-2.5 rounded font-semibold hover:bg-pink-600 text-white text-lg'>Book</button>
                    </div>
                </div>
                <hr className='border-2  md:mx-14 lg:mx-20 ' />
                <div className='flex justify-around my-2 text-gray-900 '>
                    <span className='font-semibold'>{formatDate(event.eventDate)}</span>
                    <div className='flex items-center gap-2 font-semibold'>
                        <FontAwesomeIcon icon={faLocationDot} className='ml-2 size-6 flex mt-1 text-yellow-400' />
                        <span>{event.venue}</span>
                    </div>
                    <div className='flex items-center font-semibold'>
                        <FontAwesomeIcon icon={faIndianRupeeSign} className='ml-2 size-4 flex mt-1' />
                        <span>{event.ticketPrice} onwards</span>
                    </div>

                </div>
            </div>

        </div>

        </>
    )
}

export default Event

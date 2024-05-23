import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons'
import TermsAndConditions from '../../event/TermsAndCondition'
import TicketTable from './TicketTable'
import { useRecoilState, useRecoilValue } from 'recoil'
import { eventAtom } from '../../../../store/atoms/organizerAtom'
import { capitalizeFirstLetters } from '../../../../utils/strOperations'
import { formatDate } from '../../../../utils/formatDate'
import axios from 'axios'
import Spinner from '../../../ui/Spinner'

function DashboardPage() {

    const [event, setEvent] = useRecoilState(eventAtom)
    const [loading, setLoading] = useState(false)

    const generateCode = async () => {
        setLoading(true)
        try {
            const response = await axios.post('http://localhost:3000/api/v1/organizer/generate-event-code', {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('organizerToken')}`
                }
            })
         window.location.reload()
            
        } catch (error) {
            console.log(error.message)
        }finally{setLoading(false)}





    }
    return (
        <div>
            <div className="p-3 sm:ml-64">

                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    <div className="flex justify-center gap-4 mb-4 border-2  p-0.5 border-secondary">
                        <img className='w-screen lg:h-96  ' src={event.coverImage} alt="" />
                    </div>




                    <div className="grid grid-cols-3  mb-4">
                        <div className="flex items-center justify-center rounded  mt-4  ">
                            <div className=' border-4 p-0.5  w-42 h-36 lg:w-64 lg:h-60'>
                                <img className=' w-full h-full object-cover' src={event.avatar} alt="Profile Picture" />
                            </div>
                        </div>
                        <div className="  flex items-center md:col-span-2 ">
                            <div className=''>
                                <div className=''>
                                    <h1 className='font-extrabold text-2xl md:text-4xl mt-2'>{event.eventName}</h1>
                                    <h3 className=' text-sm font-semibold text-gray-600 mt-1'>{event.collegeName} | {event.eventType} Event  | {event.duration}hr </h3>
                                </div>
                                <div className='mt-14 flex items-center mx-2 gap-5 '>



                                    <span htmlFor="eventCode text" className='col-span-1'>Volunteer Code -</span>
                                    <input name='eventCode' type="text" className='border-2 rounded-lg border-gray-400  py-1.5 text-center' disabled value={event.eventCode} />


                                    <button
                                        onClick={generateCode}
                                        className='bg-primary  rounded-lg px-8 py-1.5 font-semibold hover:bg-pink-600 text-white '>{loading ? <Spinner/> : "Generate" }</button>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div>
                        <hr className='border-2' />
                        <div className='flex justify-evenly'>
                            <h3>{formatDate(event.eventDate)}</h3>
                            <div className='flex items-center gap-1'>
                                <FontAwesomeIcon icon={faLocationDot} className='ml-2 size-4 flex mt-1' />
                                <h3>{event.venue}</h3>
                            </div>
                            <div className='flex items-center gap-1'>
                                <FontAwesomeIcon icon={faIndianRupeeSign} className='ml-2 size-3 flex mt-1' />
                                <h3>{event.ticketPrice} onwards</h3>
                            </div>
                        </div>
                        <hr className='border-2' />
                    </div>

                    <div className="flex items-center justify-center my-14 mb-4 rounded">
                        <div className=''>
                            <h1 className=' text-center text-2xl font-bold my-2'>About</h1>
                            <p className=' mx-36 shadow-sm whitespace-pre-wrap'>
                                {event.eventDescription}
                            </p>
                        </div>

                    </div>
                    <div className='flex  justify-center'>
                        <button className='bg-primary  rounded-lg px-8 py-1.5 font-semibold hover:bg-pink-600 text-white ' >Edit Event</button>
                    </div>
                    <hr className='border-2 my-4' />

                    <div className="flex items-center justify-center my-14 mb-4 rounded">
                        <div className=''>
                            <h1 className=' text-center text-2xl font-bold my-2'>Tickets</h1>
                            <div className='my-4'>
                                <TicketTable />
                            </div >

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage

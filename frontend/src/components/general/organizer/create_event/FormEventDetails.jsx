import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { coverImageUrlAtom, eventDetailsAtom, profileImageUrlAtom } from '../../../../store/atoms/organizerAtom'
import { PinkButton } from '../../../ui/Button'

function FormEventDetails() {
    

    const profile = useRecoilValue(profileImageUrlAtom)
    const cover = useRecoilValue(coverImageUrlAtom)
    
    const [event, setEvent] = useRecoilState(eventDetailsAtom)
    const [submit, setSubmit] = useState(false)
    const [loading, setLoading] = useState(false)
    const submitCall = (e) =>{
        e.preventDefault()
   
        setEvent({...event ,avatar : profile ,coverImage : cover})
        setSubmit(true)
        
    }

    return (
        <div>
            <section className="bg-white dark:bg-gray-900">
                <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
                    <h2 className="mb-4 text-xl text-center font-bold text-gray-900 dark:text-white">Event Details</h2>
                    <form action="#">
                        <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                            <div className="sm:col-span-2">
                                <label htmlFor="eventName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Name</label>
                                <input
                                    onChange={(e) => setEvent({ ...event, eventName: e.target.value })}
                                    ype="text" name="eventName" id="eventName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="" />
                            </div>
                            <div className="w-full">
                                <label htmlFor="collegeName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">College Name</label>
                                <input
                                    onChange={(e) => setEvent({ ...event, collegeName: e.target.value })}
                                    type="text" name="collegeName" id="collegeName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Product brand" required="" />
                            </div>
                            <div className="w-full">
                                <label htmlFor="ticketPrice" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ticket Price</label>
                                <input
                                    onChange={(e) => setEvent({ ...event, ticketPrice: e.target.value })}
                                    type="number" name="ticketPrice" id="ticketPrice" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$299" required="" />
                            </div>
                            <div>
                                <label htmlFor="eventType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Type</label>
                                <select onChange={(e) => setEvent({ ...event, eventType: e.target.value })} id="eventType" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option defaultValue="cultural" value="cultural" >Cultural Events</option>
                                    <option value="academic">Academic Events</option>
                                    <option value="social">Social Events</option>
                                    <option value="sports">Sports Events</option>
                                    <option value="performing arts">Performing Arts Events</option>
                                    <option value="career development">Career Development Events</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="duration" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Duration (Hours)</label>
                                <input
                                    onChange={(e) => setEvent({ ...event, duration: e.target.value })}
                                    type="number" name="duration" id="duration" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ex. 12" required="" />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="eventDescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <textarea
                                    onChange={(e) => setEvent({ ...event, eventDescription: e.target.value })}
                                    id="eventDescription" rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Write a event description here..."></textarea>
                            </div>
                            <div>
                                <label htmlFor="eventDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Date</label>
                                <input
                                    onChange={(e) => setEvent({ ...event, eventDate: e.target.value })}
                                    type="date" name="eventDate" id="eventDate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ex. 12" required="" />
                            </div>
                            <div>
                                <label htmlFor="venue" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Venue</label>
                                <input 
                                onChange={(e) => setEvent({ ...event, venue: e.target.value })}
                                type="text" name="venue" id="venue" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ex. 12" required="" />
                            </div>
                            <div>
                                <label htmlFor="mobileNumber1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile Number 1</label>
                                <input 
                                onChange={(e) => setEvent({ ...event, phoneNumber1: e.target.value })}
                                type="text" name="mobileNumber1" id="mobileNumber1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ex. 12" required="" />
                            </div>
                            <div>
                                <label htmlFor="mobileNumber2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile Number 2 (optional)</label>
                                <input 
                                onChange={(e) => setEvent({ ...event, phoneNumber2: e.target.value })}
                                type="text" name="mobileNumber2" id="mobileNumber2" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ex. 12" required="" />
                            </div>
                            <div>
                                <label htmlFor="startTime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Start Timings</label>
                                <input 
                                onChange={(e) => setEvent({ ...event, startTime: e.target.value })}
                                type="text" name="startTime" id="startTime" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ex. 12" required="" />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="termsAndConditions" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Terms And Conditions</label>
                                <textarea 
                                onChange={(e) => setEvent({ ...event, eventTermsAndCondition: e.target.value })}
                                id="termsAndConditions" rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Write a product description here..."></textarea>
                            </div>
                        </div>
                        <div className='text-center'>
                        {submit &&   <span className='text-sm text-green-600'>Submitted Successfully</span>}
                        </div>
                     
                         <div className='flex justify-center my-8'>
                <button
                    onClick={(e)=>{
                        submitCall(e)
                    }}
                    className='bg-primary px-6 py-2 text-white rounded font-bold text-center hover:bg-pink-600'
                >
                    {loading ? <Spinner /> : "Submit"}
                </button>
            </div>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default FormEventDetails

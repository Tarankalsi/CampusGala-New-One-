import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { createEventStepAtom, eventDetailsAtom } from '../../../../store/atoms/organizerAtom'
import axios from 'axios'

import { faAnchor, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Spinner from '../../../ui/Spinner'
import { useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../../../../../config'

function CreateButton() {

    const event = useRecoilValue(eventDetailsAtom)
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useRecoilState(createEventStepAtom)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    console.log(step)

    const onCreate = async () => {
        setLoading(true)
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/organizer/create-event`,
                {
                    eventName: event.eventName,
                    eventType: event.eventType,
                    avatar: event.avatar,
                    coverImage: event.coverImage,
                    collegeName: event.collegeName,
                    ticketPrice: parseFloat(event.ticketPrice),
                    eventDescription: event.eventDescription,
                    eventDate:  event.eventDate,
                    venue: event.venue,
                    phoneNumber1: event.phoneNumber1,
                    phoneNumber2: event.phoneNumber2,
                    duration: parseFloat(event.duration),
                    startTime: event.startTime,
                    eventTermsAndCondition: event.eventTermsAndCondition
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('organizerToken')}`,
                        "Content-Type": "application/json"
                    }
                }
            )
            console.log(response.data)
            if (response.data.success === true) {
                navigate('/organizer/dashboard')
            }

        } catch (error) {
            // setError(error.response.data.message)
            console.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    const onBack = () => {
        if (step > 1) {
            setStep(step - 1)
        }

    }
    return (

        <div>
            <div className='text-center mb-14'>
                {error && <span className=' text-sm text-red-600'>{error}</span>}
            </div>
            <div className="flex justify-around mt-8">
                <button onClick={onBack} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                    <FontAwesomeIcon icon={faArrowLeft} className='mr-2 size-4 flex mt-1' />
                    Back
                </button>

                <button onClick={onCreate} className="bg-indigo-800 hover:bg-secondary text-white font-bold py-2 px-4 rounded inline-flex items-center">
                    {loading ? <Spinner /> : "Create Event"}

                </button>
            </div>
        </div>

    )
}


export default CreateButton

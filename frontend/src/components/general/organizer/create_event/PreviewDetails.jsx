import React from 'react'
import { useRecoilValue } from 'recoil'
import { eventDetailsAtom } from '../../../../store/atoms/organizerAtom'
import { capitalizeFirstLetters } from '../../../../utils/strOperations'

function PreviewDetails() {

    const event = useRecoilValue(eventDetailsAtom)
    

    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">

                <h2 className="mb-4 text-3xl text-center font-extrabold text-secondary dark:text-white">Event Preview</h2>


                <CoverPhoto src={event.coverImage}/>

                <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">


                    <ProfilePhoto  src={event.avatar}/>





                    <LongDiv label={"Event Name"} data={capitalizeFirstLetters(event.eventName) } />




                    <ShortDiv label={"College Name"} data={ capitalizeFirstLetters(event.collegeName) } />
                    <ShortDiv label={"Ticket Price"} data={event.ticketPrice} />
                    <ShortDiv label={"Event Type"} data={capitalizeFirstLetters(event.eventType)} />
                    <ShortDiv label={"Duration (Hours)"} data={event.duration} />

                    <LongDiv label={"Description"} data={event.eventDescription} />


                    <ShortDiv label={"Event Date"} data={event.eventDate} />
                    <ShortDiv label={"Venue"} data={capitalizeFirstLetters(event.venue)} />
                    <ShortDiv label={"Mobile Number 1"} data={event.phoneNumber1} />
                    <ShortDiv label={"Mobile Number 2 (optional)"} data={event.phoneNumber2} />
                    <ShortDiv label={"Event Start Timings"} data={event.startTime} />

                    <LongDiv label={"Terms And Conditions"} data={event.eventTermsAndCondition} />
                </div>
            </div>
        </div>

    )
}



function LongDiv({ label, data }) {
    return (
        <div className="sm:col-span-2 text-center">
            <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{label}</h3>
            <p className="bg-gray-50 text-gray-700 dark:bg-gray-700 dark:text-white p-4 rounded-lg shadow-sm">{data}</p>
        </div>
    )
}

function ShortDiv({ label, data }) {
    return (
        <div className='text-center'>
            <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">{label}</h3>
            <p className="bg-gray-50 text-gray-700 dark:bg-gray-700 dark:text-white p-4 rounded-lg shadow-sm">{data}</p>
        </div>
    )
}


function CoverPhoto({ src }) {
    return (
        <div>
            <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white text-center">Cover Photo</h3>
            <div className='border-2 rounded-lg p-3'>
                <div
                    className='bg-cover bg-center w-full h-36 sm:h-72 rounded-lg'
                    style={{ backgroundImage: `url(${src})` }}
                >

                </div>
            </div>
        </div>
    )
}


function ProfilePhoto({ src }) {
    return (
        <div className='sm:col-span-2 flex justify-center py-5'>

            <div className=''> {/* Adjust width and height as needed */}
                <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white text-center">Profile</h3>
                <div className='rounded-lg border-2 p-2 w-36 h-36 sm:w-64 sm:h-64'>
                    <img className='rounded-lg w-full h-full object-cover' src={src} alt="Profile Picture" />
                </div>

            </div>
        </div>
    )
}




export default PreviewDetails

import React, { useState } from 'react'
import { formatDate } from '../../../utils/formatDate'
import axios from 'axios'

function TableRow({ application }) {
    const [loading, setLoading] = useState(false)


    const approveHandle = async () => {
        setLoading(true)
        try {
            console.log(`http://localhost:3000/api/v1/admin/event-application/${application.applicationId}/approved`)
            await axios.post(`http://localhost:3000/api/v1/admin/event-application/${application.applicationId}/approved`, {},
            {
             headers: {
                Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
            },
            })
        window.location.reload();

    } catch (error) {
        console.error('Application Approving Process Failed ', error.message)
    } finally {
        setLoading(false)
    }
}

const rejectHandle = async () => {
    setLoading(true)
    try {

        await axios.post(`http://localhost:3000/api/v1/admin/event-application/${application.applicationId}/rejected`, 
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
            },
        })
        window.location.reload();

    } catch (error) {
        console.error('Application Approving Process Failed ', error.data.message)
    } finally {
        setLoading(false)
    }
}
return (
    <>
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {application.eventName}
            </th>
            <td className="px-6 py-4">
                {application.eventDescription}
            </td>
            <td className="px-6 py-4">
                {application.eventType}
            </td>
            <td className="px-6 py-4">
                {application.mobileNumber}
            </td>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {application.email}
            </th>
            <td className="px-6 py-4">
                {application.expectedAudience}
            </td>
            <td className="px-6 py-4">
                {application.venue}
            </td>
            <td className="px-6 py-4">
                {formatDate(application.proposedDate)}
            </td>
            <td className="px-6 py-4 text-right">
                {/* <button className='bg-green-600 text-white px-4 py-1 rounded-md hover:bg-green-800 font-semibold'>Approve</button> */}
                <Modal requestAction={approveHandle} color={"green"} label={"Approve"} />
            </td>
            <td className="px-6 py-4 text-right">
                <Modal requestAction={rejectHandle} color={"rose"} label={"Reject"} />
            </td>
        </tr>
    </>

)
}

export default TableRow


function Modal({ requestAction, color, label }) {
    const [isModalOpen, setIsModalOpen] = useState(false);



    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleAction = async () => {
        await requestAction();
        closeModal(); // Close modal after action
    };

    return (
        <div>

            {color === "green" && <ApproveButton label={label} openModal={openModal} />}
            {color === "rose" && <Rejectbutton label={label} openModal={openModal} />}

            {isModalOpen && (
                <div
                    id="popup-modal"
                    tabIndex="-1"
                    className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-800 bg-opacity-50"
                >
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button
                                type="button"
                                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={closeModal}
                            >
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>

                            </button>
                            <div className="p-4 md:p-5 text-center">
                                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to {color === 'green' ? 'Approved' : 'Reject'}?</h3>
                                <button
                                    onClick={handleAction}
                                    type="button"
                                    className={`text-white bg-${color}-600 hover:bg-${color}-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center`}
                                >
                                    Yes, I'm sure
                                </button>
                                <button
                                    onClick={closeModal}
                                    type="button"
                                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                >
                                    No, cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}




function ApproveButton({ label, openModal }) {
    return (
        <button
            onClick={openModal}
            className="bg-green-600 text-white px-4 py-1.5 rounded-md hover:bg-green-800 font-semibold   text-sm  text-center "
            type="button"
        >
            {label}
        </button>
    )
}

function Rejectbutton({ label, openModal }) {
    return (
        <button
            onClick={openModal}
            className=" bg-rose-600 text-white px-4 py-1.5 rounded-md hover:bg-rose-800 font-semibold   text-sm  text-center "
            type="button"
        >
            {label}
        </button>
    )
}
import React from 'react'
import { useRecoilValue } from 'recoil'
import { eventAtom } from '../../../../store/atoms/organizerAtom'

function TicketTable() {


    const event = useRecoilValue(eventAtom)
    return (
        <div>


            <div className="relative  shadow-md sm:rounded-lg ">
                <table className="w-full text-center  text-sm  rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs  text-gray-700 uppercase dark:text-gray-400">
                        <tr className=''>
                            <th scope="col" className="px-16 py-3 bg-gray-50 dark:bg-gray-800">
                                Total Tickets
                            </th>
                            <th scope="col" className="px-16 py-3">
                                Sold Tickets
                            </th>
                            <th scope="col" className="px-16 py-3 bg-gray-50 dark:bg-gray-800">
                                Remaining Tickets
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                            {event.totalTickets ?  event.totalTickets : "Unlimited"}
                            </th>
                            <td className="px-6 py-4">
                                {event.soldTickets}
                            </td>
                            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                                {event.remainingTickets ?  event.remainingTickets : "Unlimited"}
                            </td>
                           
                        </tr>



                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default TicketTable



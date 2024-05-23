import React, { useState } from 'react'
import TableHeading from './TableHeading'
import TableRow from './TableRow'
import { useRecoilValue } from 'recoil'
import { applicationAtom } from '../../../store/atoms/adminAtoms'

function ApplicationTable() {
    const applications = useRecoilValue(applicationAtom)
    console.log(applications)


    return (


        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-14">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <TableHeading />
                <tbody>
                    {applications
                        .filter(application => application.status === "pending")
                        .map(application => (
                            <TableRow key={application.applicationId} application={application} />
                        ))}

                </tbody>
            </table>
        </div>

    )
}

export default ApplicationTable

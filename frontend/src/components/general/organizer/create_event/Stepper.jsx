import React from 'react'
import { useRecoilState } from 'recoil';
import { createEventStepAtom } from '../../../../store/atoms/organizerAtom';

function Stepper() {

    const [step, setStep] = useRecoilState(createEventStepAtom)
    
    return (
        <div className='mt-14 mx-36'>
            <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
                <li className={`flex md:w-full items-center ${step === 1 ? 'text-primary' : 'text-gray-400'} dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-2 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}>
                    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                        <span className="mr-2">1</span>
                        Upload <span className="hidden sm:inline-flex sm:ml-2">Images</span>
                    </span>
                </li>
                <li className={`flex md:w-full ${step === 2 ? 'text-primary' : 'text-gray-400'} items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-2 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}>
                    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                        <span className="mr-2">2</span>
                        Event <span className="hidden sm:inline-flex sm:ml-2">Details</span>
                    </span>
                </li>
                <li className={`flex items-center ${step === 3 ? 'text-primary' : 'text-gray-400'}`}>
                    <span className="mr-2">3</span>
                    Create<span className="sm:inline-flex sm:ml-2">Event</span>
                </li>
            </ol>
        </div>
    );
}


export default Stepper

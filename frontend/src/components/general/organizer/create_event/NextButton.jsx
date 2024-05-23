import { faAnchor, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import React from 'react'
import { useRecoilState } from 'recoil'
import { createEventStepAtom } from '../../../../store/atoms/organizerAtom'


function NextButton() {
  

    const [step, setStep] = useRecoilState(createEventStepAtom)
    console.log(step)
    const onNext = ()=>{
        if (step < 3) {
            setStep(step+1)
        }
        
    }
    const onBack = ()=>{
        if (step > 1) {
            setStep(step-1)
        }
        
    }
    return (
        <div className="flex justify-around mt-8">
            <button onClick={onBack} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
            <FontAwesomeIcon icon={faArrowLeft} className='mr-2 size-4 flex mt-1'/>
                Back
            </button>
            <button onClick={onNext} className="bg-indigo-800 hover:bg-secondary text-white font-bold py-2 px-4 rounded inline-flex items-center">
                {(step < 3 ? 'Next' : 'Create Event' )}
                {(step < 3 ?  <FontAwesomeIcon icon={faArrowRight} className='ml-2 size-4 flex mt-1'/> : '' )}
               
            </button>
        </div>
    )
}

export default NextButton

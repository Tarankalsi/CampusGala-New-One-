import React from 'react'
import Stepper from '../../components/general/organizer/create_event/Stepper'
import { useState } from 'react'
import NextButton from '../../components/general/organizer/create_event/NextButton'
import {  useRecoilValue } from 'recoil'
import { createEventStepAtom } from '../../store/atoms/organizerAtom'
import ImageUpload from '../../components/general/organizer/create_event/ImageUpload'
import FormEventDetails from '../../components/general/organizer/create_event/FormEventDetails'
import PreviewDetails from '../../components/general/organizer/create_event/PreviewDetails'
import CreateButton from '../../components/general/organizer/create_event/CreateButton'



function CreateEvent() {

    const step = useRecoilValue(createEventStepAtom)
  return (
    <div>
        <div  className='mb-28'>
        <Stepper />
            {step === 1 && <ImageUpload/>}
            {step === 2 && <FormEventDetails/>}
            {step === 3 && <PreviewDetails/>}
        {step < 3 && <NextButton/>}
        {step ===3 && <CreateButton/>}
        </div>
   
    </div>
  )
}

export default CreateEvent

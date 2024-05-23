import React from 'react'
import { PinkButton, TransparentButton } from '../../ui/Button'



function Cover() {
    return (
        <div className='flex md:flex-row flex-col justify-evenly items-center pt-8 '>

            <div className='size-5/12 hidden md:flex ' >
                <img className='shadow-2xl' src="https://res.cloudinary.com/daygfelat/image/upload/v1715673012/pngguru_2_cw56ms.png" alt="" />
            </div>
            <div className='flex flex-col text-left items-center md:basis-3 '>

                <div className='flex flex-col gap-2 items-center sm:items-start lg:items-center mx-14'>
                    <h1 className=' md:text-7xl  text-5xl font-extrabold text-white '><span className='text-primary'>Campus</span>Gala</h1>
                    <h5 className='text-white font-semibold text-lg'>College Events Ticket Platform</h5>
                    <p className='text-white text-md mt-6 text-justify'>CampusGala: Your ultimate college events ticket platform. Organize, manage, and purchase tickets hassle-free for all campus events.</p>
                </div>


                <div className='flex mt-10 gap-2'>
                    <PinkButton label={"Events"} />
                    <TransparentButton label={"Create Event"} />
                </div>


            </div>
        </div>
    )
}

export default Cover

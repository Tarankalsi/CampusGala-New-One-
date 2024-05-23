import React, { useState } from 'react'
import { PinkButton, TransparentButton, NavItem } from './Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


function Navbar() {
    const [openMenu, setOpenMenu] = useState("hidden")
    const handleMenu = () => {
        if (openMenu === "hidden") {
            setOpenMenu("")
        } else {
            setOpenMenu("hidden")
        }
    }

    return (


        <div className='p-3 flex justify-between items-center md:px-14 px-8  lg:px-28 shadow'>

            <Link to={'/home'} id='brand' className='flex items-center'>
                <span className='text-white text-2xl font-bold'>CampusGala</span>
            </Link>

            <div id='nav-menu' className='hidden md:flex items-center md:gap-8 lg:gap-12'>
                <NavItem label={"Events"} />
                <NavItem label={"List Your Event"} to={'/application'}/>
                <NavItem label={"Ticket"} />
                <NavItem label={"Contact"} />
                <TransparentButton label={"Sign in"} to={'/signin'}/> 
            </div>



            <button className='text-white  flex items-center p-2 md:hidden' onClick={handleMenu}>
                <FontAwesomeIcon icon={faBars} />
            </button>

            <div className={`${openMenu} md:hidden fixed inset-0 bg-image bg-no-repeat `}>
                <div className='bg-gradient fixed inset-0 bg-no-repeat'>
                    <div className='p-3 flex justify-between px-8 shadow'>
                        <Link to={'/home'} id='brand' className='flex items-center'>
                            <span className='text-white text-2xl font-bold'>CampusGala</span>
                        </Link>


                        <button className='text-white  flex items-center p-2 md:hidden' onClick={handleMenu}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>

                    <div className='flex flex-col'>
                        <Link className='cursor-pointer text-white hover:text-gray-200  hover:underline font-semibold  text-md  transition duration-300 my-6'>
                            Events
                        </Link>
                        <Link to={'/application'} className='cursor-pointer text-white hover:text-gray-200  hover:underline font-semibold  text-md  transition duration-300 my-6'>
                            List Your Event
                        </Link>
                        <Link className='cursor-pointer text-white hover:text-gray-200  hover:underline font-semibold  text-md  transition duration-300 my-6'>
                            Ticket
                        </Link>
                        <Link className='cursor-pointer text-white hover:text-gray-200  hover:underline font-semibold  text-md  transition duration-300 my-6'>
                            Contact
                        </Link>
                        <hr className='w-3/4 m-auto my-8 opacity-50' />
                        <div className=' flex justify-center gap-7'> 
                        <TransparentButton label={"Sign in"} to={'/signin'} />
                        <TransparentButton label={"Sign Up"}  to={'/signup'}/>
                        </div>

                    </div>
                </div>

            </div>
        </div>

    )
}

export default Navbar

import React, { useState } from 'react'
import { PinkButton, TransparentButton, NavItem } from './Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


function LoginNavbar({ user }) {
    

    const [profileMenuOpen, setProfileMenuOpen] = useState(false)

    const [openMenu, setOpenMenu] = useState("hidden")
    const handleMenu = () => {
        if (openMenu === "hidden") {
            setOpenMenu("")
        } else {
            setOpenMenu("hidden")
        }
    }


    const profileDropdown = () => {
        if (profileMenuOpen === false) {
            setProfileMenuOpen(true);
        } else {
            setProfileMenuOpen(false);
        }

    };

    const logOutHandle = () => {
        localStorage.removeItem('token')
        window.location.reload();
    }



    return (


        <div className='p-3 flex justify-between items-center md:px-14 px-8  lg:px-28 shadow'>

            <Link to={'/home'} id='brand' className='flex items-center'>
                <span className='text-white text-2xl font-bold'>CampusGala</span>
            </Link>

            <div id='nav-menu' className='hidden md:flex items-center md:gap-8 lg:gap-12'>
                <NavItem label={"Events"} />
                <NavItem label={"List Your Event"} to={'/application'} />
                <NavItem label={"Ticket"} />
                <NavItem label={"Contact"} />
                <div className=' relative flex justify-center items-center gap-3'>

                    <span className='text-white text-md font-bold cursor-pointer hover:underline '  onClick={profileDropdown}>Hi, {user.firstName}</span>
                    <img src="https://res.cloudinary.com/daygfelat/image/upload/default_icon_twt_by_me_aqxhsh.jpg" alt="" className='size-10 rounded-full' />

                    {profileMenuOpen && (
                        <div className='absolute right-0 top-full bg-white border border-gray-200 rounded-md mt-1 shadow-lg'>
                            <ul>
                                <li className='py-2 px-4 hover:bg-gray-200 cursor-pointer '>Your Profile</li>
                                <li className='py-2 px-4 hover:bg-gray-200 cursor-pointer 'onClick={logOutHandle}>Logout</li>
                            </ul>
                        </div>
                    )}


                </div>
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
                            Your Profile
                        </Link>
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
                            <Link className='cursor-pointer text-white hover:text-gray-200  hover:underline font-semibold  text-md  transition duration-300 my-6' onClick={logOutHandle}>
                                Log Out
                            </Link>
                        </div>

                    </div>
                </div>

            </div>
        </div>

    )
}

export default LoginNavbar

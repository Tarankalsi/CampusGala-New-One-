import React from 'react';
import LoginNavbar from './LoginNavbar';
import Navbar from './Navbar';

const DynamicNavbar = ({ loggedIn, user }) => {
  return (
    <div>
         <div className='text-center  bg-no-repeat  bg-image'>
                            <div className=' bg-gradient h-fit  bg-no-repeat'>
                            {loggedIn ? <LoginNavbar user={user} /> : <Navbar />}
                            </div>
                        </div>

    </div>
  );s
};

export default DynamicNavbar;

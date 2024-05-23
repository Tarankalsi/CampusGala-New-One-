import React from 'react'
import { Link } from 'react-router-dom'

function TransparentButton({label , to}) {
  return (
    <div>
      <Link to={to} type='button' className='cursor-pointer text-white bg-transparent hover:bg-primary  font-semibold border-2 border-white rounded-full hover:border-primary text-sm px-8 py-2 transition duration-300'>
            {label}
      </Link>
    </div>
  )
}

function PinkButton({label , to}) {
    return (
      <div>
        <Link to={to} type='button' className='cursor-pointer text-white bg-primary hover:bg-white hover:text-primary font-semibold border-2  border-primary rounded-full hover:border-white text-sm px-8 py-2  transition duration-300'>
              {label}
        </Link>
      </div>
    )
  }

  function NavItem({label , to}) {
    return (
      <div>
        <Link to={to} className='cursor-pointer text-white hover:text-gray-200  hover:underline font-semibold  text-sm transition duration-300'>
              {label}
        </Link>
      </div>
    )
  }




export { TransparentButton , PinkButton , NavItem}

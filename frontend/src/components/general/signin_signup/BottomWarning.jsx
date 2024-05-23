import React from 'react'
import { Link } from "react-router-dom";

export default function BottomWarning({label , ButtonText  , to}) {
  return (
    <div className='flex justify-center py-2 text-sm text-white font-semibold'>
        <div>
            {label}
        </div>
      <Link to={to} className='pointer underline pl-1 cursor-pointer'>
      {ButtonText}
      </Link>
    </div>
  )
}

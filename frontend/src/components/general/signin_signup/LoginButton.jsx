import React from 'react'

export default function LoginButton({label , onClick}) {
  return (
    <button onClick={onClick} type="button" className=" w-full text-white bg-primary  hover:bg-pink-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300 font-semibold rounded-lg text-sm px-5 py-2.5 me-2 mb-2">{label}</button>
  )
}

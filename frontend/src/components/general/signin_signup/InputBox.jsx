import React from 'react'

function InputBox({label , placeholder , onChange , type}) {
  return (
    <div className='py-1 '>
      <div className='font-semibold text-l text-left py-2 text-white' >{label}</div>
      <input onChange={onChange}  type={type} placeholder={placeholder} className='w-full px-2 py-1 border rounded border-slate-200'/>
    </div>
  )
}

export default InputBox

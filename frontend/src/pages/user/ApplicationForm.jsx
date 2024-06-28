import React, { useState, useEffect } from 'react'
import LoginButton from '../../components/general/signin_signup/LoginButton'
import ApplicationInput from '../../components/general/application/ApplicationInput'


import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { loggedInAtom } from '../../store/atoms/userAtom'
import { useRecoilValue } from 'recoil'
import { Link, useNavigate } from 'react-router-dom'
import useAuthentication from '../../hooks/useAuthentication '
import axios from 'axios'
import { BACKEND_URL } from '../../../config'


function ApplicationForm() {

    const [submit, setSubmit] = useState(false)
    const [error, setError] = useState("")

    //Later Task :
    // -> Set error messages for invalid or empty input 
    // -> set reloading problem -> after reloading form page it will navigate to home , but we don't want to
    

    const [formData, setFormData] = useState({
        eventName: "",
        eventDescription: "",
        eventType: "",
        mobileNumber: "",
        email: "",
        expectedAudience: 0,
        venue: "",
        proposedDate: ""
    })


    const navigate = useNavigate()

    useAuthentication()
    const loggedIn = useRecoilValue(loggedInAtom)

    useEffect(() => {

        if (loggedIn === false) {
            navigate('/signin')
        }
    }, [loggedIn])

    const formSubmitHandle = async () => {

        setError("");

        for(const key in formData){
            console.log(`${key} :  ${formData[key]}  -> ${typeof(formData[key])}`)
        }
      
        try {

            await axios.post(`${BACKEND_URL}/api/v1/user/event-application`, {
                eventName : formData.eventName,
                eventDescription : formData.eventDescription,
                eventType : formData.eventType,
                mobileNumber : formData.mobileNumber,
                email : formData.email,
                expectedAudience : parseInt(formData.expectedAudience),
                venue : formData.venue,
                proposedDate : formData.proposedDate
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`

                }
            })
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError('Verification Failed. Please try again later')
            }
            console.error('Verification Failed : ', error.message);
        }
        setSubmit(true)

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }


    return (
        <div className='mx-14'>
            <div className='text-center my-14'>
                <h1 className='text-secondary font-extrabold md:text-5xl text-3xl '>Application form</h1>
                <h5 className='text-primary font-semibold text-md'>List Your Show in CampusGala</h5>
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            {(submit === false) && <form className="max-w-md mx-auto">

                <ApplicationInput type={"text"} label={"Event Name"} name={"eventName"} onChange={handleChange} />
                <ApplicationInput type={"text"} label={"Event Description"} name={"eventDescription"} onChange={handleChange} />
                <ApplicationInput type={"text"} label={"Event Type"} name={"eventType"} onChange={handleChange} />

                <div className='py-5 relative z-1 group'>
                    <div htmlFor="mobileNumber" className=' peer-focus:font-medium absolute    duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] text-sm font-semibold  text-left py-2 text-gray-500'>Mobile Number</div>
                    <PhoneInput
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        defaultCountry='IN'
                        onChange={(value) => {
                            setFormData({ ...formData, mobileNumber: value })
                        }}
                        className=' flex w-full px-2 py-1.5 border-0 border-b-2 rounded border-gray-300 appearance-none focus:outline-none  bg-white'
                        aria-label="Mobile Number"
                    />
                </div>
                <ApplicationInput type={"email"} label={"Email"} name={"email"} onChange={handleChange} />
                <ApplicationInput type={"number"} label={"Expected Audience"} name={"expectedAudience"} onChange={handleChange} />
                <ApplicationInput type={"text"} label={"Venue Address"} name={"venue"} onChange={handleChange} />
                <hr className='my-3 opacity-0' />
                <ApplicationInput type={"date"} label={"Proposed Date"} name={"proposedDate"} onChange={handleChange} />


                <LoginButton label={"submit"} onClick={formSubmitHandle} />
            </form>}

            {(submit === true) && <div className='text-center font-bold'>
                <h5 className='text-primary'>Your Event Application form is Submitted</h5>
                <h5 className='text-primary'>Application is in review process</h5>
                <h5 className='text-sm text-secondary'>You'll get login credentials in your provided mobile number</h5>
                <h5 className='text-primary text-4xl mt-10'>Thank You</h5>
                <Link to={'/home'} className='text-sm underline text-blue-600'> go to home page </Link>
            </div>}

        </div>
    )
}

export default ApplicationForm




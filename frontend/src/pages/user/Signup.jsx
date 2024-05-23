import React, { useState } from 'react'
import Heading from '../../components/general/signin_signup/Heading'
import SubHeading from '../../components/general/signin_signup/SubHeading'
import InputBox from '../../components/general/signin_signup/InputBox'
import LoginButton from '../../components/general/signin_signup/LoginButton'
import BottomWarning from '../../components/general/signin_signup/BottomWarning'

import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'

import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { firstNameAtom, lastNameAtom, mobileNumberAtom, passwordAtom } from '../../store/atoms/userAtom'


function Signup() {

    const [firstName, setFirstName] = useRecoilState(firstNameAtom)
    const [lastName, setLastName] = useRecoilState(lastNameAtom)
    const [mobileNumber, setMobileNumber] = useRecoilState(mobileNumberAtom)
    const [password, setPassword] = useRecoilState(passwordAtom)
    const [confirmPassword, setConfirmPassword] = useState('')

    const [passwordMatchError, setPasswordMatchError] = useState(false); // State to manage password match error
    const [mobileNumberError, setMobileNumberError] = useState(false); // State to manage mobile number validation error

    const [errorMessage, setErrorMessage] = useState("")

    const navigate = useNavigate()


    const signupCall = async () => {
        try {

            setMobileNumberError(false);
            setPasswordMatchError(false);
            setErrorMessage("");
            if (!mobileNumber || !isValidPhoneNumber(mobileNumber)) {
                setMobileNumberError(true);
                return;
            }
            if (!password || password !== confirmPassword) {
                setPasswordMatchError(true)
                return;
            }

            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                firstName: firstName,
                lastName: lastName,
                mobileNumber: mobileNumber,
                password: password
            })
            console.log(response.data.success)

            localStorage.setItem('token',response.data.token)

            navigate("/otp-verification")

        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } 
            console.error("Signup failed:", error.message);
            
        }

    }
    return (
        <div>
            <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-20 bg-no-repeat bg-cover flex justify-center'>
                <div className='flex flex-col '>
                    <div className='rounded-lg bg-secondary max-w-94  mx-94 text-center  p-2 h-max px-12'>
                        <Heading label={"Sign Up"} />
                        <SubHeading label={"Enter your information To create an account"} />
                        {passwordMatchError && <p className="text-red-500 text-sm">Passwords do not match!</p>}
                        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                        <InputBox label={"First Name"} placeholder={"John"} onChange={e => {
                            setFirstName(e.target.value)
                        }} />
                        <InputBox label={"Last Name"} placeholder={"Doe"} onChange={e => {
                            setLastName(e.target.value)
                        }} />

                        <div className='py-1 '>
                            <div className='font-semibold text-l text-left py-2 text-white' >Mobile Number</div>
                            <PhoneInput placeholder="95xxxxxxxx" value={mobileNumber} defaultCountry='IN' onChange={setMobileNumber} className='w-full px-2 py-1.5 border rounded border-slate-200 bg-white' />

                        </div>
                        {mobileNumberError && <p className="text-red-500 text-sm">Please enter a valid mobile number!</p>}
                        <InputBox label={"Password"} placeholder={"Your Password"} onChange={e => {
                            setPassword(e.target.value)
                        }} />
                        <InputBox label={"Confirm Password"} placeholder={"Your Password"} onChange={e => {
                            setConfirmPassword(e.target.value)
                        }} />
                        <div className="pt-4">
                            <LoginButton label={"Sign up"} onClick={signupCall} />
                        </div>
                        <BottomWarning label={"Already have an account?"} ButtonText={"Sign in"} to={"/signin"} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup

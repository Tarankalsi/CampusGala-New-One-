import React, { useState, useEffect } from 'react'
import Heading from '../../components/general/signin_signup/Heading'
import SubHeading from '../../components/general/signin_signup/SubHeading'
import InputBox from '../../components/general/signin_signup/InputBox'
import LoginButton from '../../components/general/signin_signup/LoginButton'
import { useRecoilState } from 'recoil'
import { otpAtom } from '../../store/atoms/userAtom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../../../config'


function LoginOtpVerification() {

    useEffect(() => {
      if (!localStorage.getItem('token')) {
        navigate('/signin')
      }

    }, [])
    

    const [otp, setOtp] = useRecoilState(otpAtom)

    const [otpError, setOtpError] = useState(false)
    const [error, setError] = useState("")

    const navigate = useNavigate()


    useEffect(() => {
        const handleBeforeUnload = () => {
            if (!otp || error !== false) {
                localStorage.removeItem('token');
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const VerificationCall = async () => {
        try {


            if (!otp) {
                setOtpError(true);
                return;
            }
        
            console.log(otp)

            const response = await axios.post(`${BACKEND_URL}/api/v1/user/otp-verification`, {
                otp: otp
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            localStorage.setItem('token', response.data.token);
            navigate('/home')
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            }else{
                setError('Verification Failed. Please try again later')
            }
            console.error('Verification Failed : ', error.message);
        }
    }

    return (
        <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  h-screen  bg-cover bg-no-repeat flex justify-center'>
            <div className='flex flex-col mt-20'>
                <div className='rounded-lg bg-secondary w-96 text-center p-2 h-max px-8'>
                    <Heading label={"OTP Verification"} />
                    <SubHeading label={`OTP is sent`} />
                    {otpError && <p className="text-red-500 text-sm">OTP cannot be empty</p>}
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <InputBox label={"One-time password"} placeholder={"Enter OTP"} onChange={(e) => {
                        setOtp(e.target.value)
                    }} />

                    <button className='text-white underline mt-5'>Resend Otp</button>


                    <div className="pt-4">
                        <LoginButton label={"Verify"} onClick={VerificationCall} />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default LoginOtpVerification

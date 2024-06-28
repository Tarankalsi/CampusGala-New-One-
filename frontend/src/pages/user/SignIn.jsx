

import React, { useState, useEffect } from 'react';
import Heading from '../../components/general/signin_signup/Heading';
import SubHeading from '../../components/general/signin_signup/SubHeading';
import InputBox from '../../components/general/signin_signup/InputBox';
import LoginButton from '../../components/general/signin_signup/LoginButton';
import BottomWarning from '../../components/general/signin_signup/BottomWarning';

import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import { mobileNumberAtom, passwordAtom } from '../../store/atoms/userAtom';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../../config';

function SignIn() {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useRecoilState(mobileNumberAtom);
  const [password, setPassword] = useRecoilState(passwordAtom);
  const [error, setError] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  const SigninCall = async () => {
    setLoading(true);
    try {
      setMobileNumberError(false);
      setError("");

      if (!mobileNumber || !isValidPhoneNumber(mobileNumber)) {
        setMobileNumberError(true);
        setLoading(false);
        return;
      }

      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
        mobileNumber,
        password
      });

      if (response.data.verification === "pending") {
        localStorage.setItem('token', response.data.token);
        navigate("/otp-verification");
      } else if (response.data.verification === "resolved") {
        localStorage.setItem('token', response.data.token);
        navigate('/home');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('Signin Failed. Please try again later');
      }
      console.error('Signin Failed:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-screen bg-cover bg-no-repeat flex justify-center'>
      <div className='flex flex-col mt-20'>
        <div className='rounded-lg bg-secondary w-96 text-center p-2 h-max px-8'>
          <Heading label="Sign In" />
          <SubHeading label="Enter your credentials to access your account" />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className='py-1'>
            <div className='font-semibold text-l text-left py-2 text-white'>Mobile Number</div>
            <PhoneInput
              placeholder="95xxxxxxxx"
              value={mobileNumber}
              defaultCountry='IN'
              onChange={setMobileNumber}
              className='w-full px-2 py-1.5 border rounded border-slate-200 bg-white'
              aria-label="Mobile Number"
            />
          </div>
          {mobileNumberError && <p className="text-red-500 text-sm">Please enter a valid mobile number!</p>}
          <InputBox
            label="Password"
            placeholder="Your Password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            aria-label="Password"
          />
          <div className="pt-4">
            <LoginButton label={loading ? "Signing In..." : "Sign In"} onClick={SigninCall} disabled={loading} />
          </div>
          <BottomWarning label="Create Account?" ButtonText="Sign up" to="/signup" />
        </div>
      </div>
    </div>
  );
}

export default SignIn;

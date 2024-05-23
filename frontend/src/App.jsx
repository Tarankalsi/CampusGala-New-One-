import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from './pages/user/HomeScreen'
import Signup from './pages/user/Signup';
import SignIn from './pages/user/SignIn';
import ApplicationForm from './pages/user/ApplicationForm';
import LoginOtpVerification from './pages/user/LoginOtpVerification';
import { RecoilRoot } from 'recoil';
import Dashboard from './pages/admin/Dashboard';
import AdminLogin from './pages/admin/AdminLogin';
import OrganizerLogin from './pages/organizer/OrganizerLogin';
import CreateEvent from './pages/organizer/CreateEvent';
import OrganizerDashboard from './pages/organizer/OrganizerDashboard';
import EventPage from './pages/user/EventPage';


function App() {


  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/home/event/:eventId" element={<EventPage/>} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/application' element={<ApplicationForm />} />
          <Route path='/otp-verification' element={<LoginOtpVerification />} />


          <Route path='/admin' element={<AdminLogin/>} />
          <Route path='/admin/dashboard' element={<Dashboard />} />

          <Route path='/organizer' element={<OrganizerLogin/>} />
          <Route path='/organizer/event' element={<CreateEvent/>} />
          <Route path='/organizer/dashboard' element={<OrganizerDashboard/>} />

        </Routes>
      </BrowserRouter>
    </RecoilRoot>

  )
}

export default App

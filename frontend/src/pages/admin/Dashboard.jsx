import React, { useEffect, useState } from 'react'
import AdminNavbar from '../../components/general/admin/AdminNavbar'
import ApplicationTable from '../../components/general/admin/ApplicationTable'
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/ui/Spinner';
import { useRecoilState } from 'recoil';
import { applicationAtom } from '../../store/atoms/adminAtoms';
import axios from 'axios';
import { BACKEND_URL } from '../../../config';


function Dashboard() {

  const [loading, setLoading] = useState(false)
  const [applications, setApplications] = useRecoilState(applicationAtom)

  useEffect(() => {
    const fetchApplication = async () =>{
      setLoading(true)
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/admin/event-application/applications`,{
          headers : {
            Authorization : `Bearer ${localStorage.getItem('adminToken')}`
          }
        })

        setApplications(response.data.applications)
      } catch (error) {
        console.error(error.message)
      }finally{
        setLoading(false)
      }
    }

    fetchApplication()


  }, [])
  
  return (
    <div>
      <AdminNavbar />
      {loading ? <Spinner/> :<ApplicationTable />}
    </div>
  )
}

export default Dashboard

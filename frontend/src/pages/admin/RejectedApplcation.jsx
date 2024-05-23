import React from 'react'
import AdminNavbar from '../../components/general/admin/AdminNavbar'
import TableHeading from '../../components/general/admin/TableHeading'

function RejectedApplcation() {
    const [applications, setApplications] = useRecoilState(applicationAtom)
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin')
      return
    }

    const fetchApplication = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/admin/event-application/applications', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        });

      
        setApplications(response.data.applications)

      } catch (error) {
        console.error('Error Fetching Application', error);
      } finally {
        setLoading(false)
      }
    }
   fetchApplication();
  
    

  }, [navigate]);

 
  return (
    <div>
      <AdminNavbar/>
      <TableHeading status={true}/>
    </div>
  )
}

export default RejectedApplcation

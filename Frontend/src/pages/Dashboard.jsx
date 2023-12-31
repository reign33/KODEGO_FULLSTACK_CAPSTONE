import React from 'react'
import Sidebar from './Sidebar'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = ({user, setUser}) => {
const navigate = useNavigate();

useEffect(()=>{
  if(!user){
    navigate('/login');
  }
}, [user, navigate]);

const handleLogout = () => {
  window.localStorage.removeItem("loggedNotesUser");
  setUser(null);
}

  return (
    <div className='flex flex-wrap justify-start'>
      <Sidebar/>
      <div className='flex flex-col ...'>
        Dashboard
        <button className='bg-green-400 text-[20px]' onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Dashboard

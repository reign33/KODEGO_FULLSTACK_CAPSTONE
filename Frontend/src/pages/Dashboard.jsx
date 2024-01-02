import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavbarSignIn from './navbarSignIn';

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
    <div className='flex flex-col flex-wrap justify-start w-full p-4'>
        <p>Dashboard</p>
        <p className='font-bold text-[16px] text-[green]'>{user?.username} is logged in{" "}</p>
      </div>
  )
}

export default Dashboard

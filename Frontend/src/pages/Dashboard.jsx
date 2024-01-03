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

  return (
    <div className='flex flex-col flex-wrap justify-start w-full p-4'>
        <p>Dashboard</p>
      </div>
  )
}

export default Dashboard

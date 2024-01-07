import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';


const Reports = ({user}) => {
  const navigate = useNavigate();

  useEffect(()=>{
    if(!user){
      navigate('/signup');
    }
  }, [user, navigate]);

  return (
        <div className='flex justify-start w-full p-4'>
        Reports 
        </div>
  )
}

export default Reports
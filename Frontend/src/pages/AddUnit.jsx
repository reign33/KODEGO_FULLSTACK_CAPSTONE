import React, {useEffect, useState} from 'react'
import LoadingSpinner from '../components/LoadingSpinner';
import unitService from '../services/unitService';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

const AddUnit = ({user, isLoading, setIsLoading}) => {
  const [newUnit, setNewUnit] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const addnewUnit = { content: newUnit };

    console.log('Request Payload', addnewUnit);
    
    unitService
    .createUnit(addnewUnit)
    .then((res) => {
        setNewUnit("");
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  useEffect(()=>{
    if(!user){
      navigate('/signup');
    }
  }, [user, navigate]);

  if (isLoading === true) {
    return (
      <div className="flex flex-col justify-center items-center h-screen p-4">
        <LoadingSpinner />
      </div>
    );
  }

  return (
      <div className='flex flex-wrap justify-start w-full p-4'>
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Add Products Unit
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            use this form to add product unit to database.
          </Typography>
          <form 
          onSubmit={handleSubmit}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Product Unit
              </Typography>
              <Input
              type='text'
              value={newUnit}
              onChange={(e)=>setNewUnit(e.target.value)}
                size="lg"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <Button type='submit' className="mt-6" fullWidth>
              Add Product Unit
            </Button>
          </form>
        </Card>
      </div>
  )
}

export default AddUnit;

import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";

const AddUnit = ({user}) => {
  const navigate = useNavigate();

  useEffect(()=>{
    if(!user){
      navigate('/login');
    }
  }, [user, navigate]);

  return (
      <div className='flex flex-wrap justify-start w-full p-4'>
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Add Products Unit
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            use this form to add product unit to database.
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Product Unit
              </Typography>
              <Input
                size="lg"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <Button className="mt-6" fullWidth>
              Add Product Unit
            </Button>
          </form>
        </Card>
      </div>
  )
}

export default AddUnit

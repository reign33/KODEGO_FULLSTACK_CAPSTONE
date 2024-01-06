import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from 'axios';


const AddCategory = ({user}) => {
  const navigate = useNavigate();

  useEffect(()=>{
    if(!user){
      navigate('/login');
    }
  }, [user, navigate]);

  const [category, setCategory] = useState()

  const Submit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/addcategory", { category })
    .then(result => {
      console.log(result)
      navigate('/')
    })
    .catch(err => console.log(err))
  }

  return (
      <div className='flex flex-wrap justify-start w-full p-4'>
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Add Products Category
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            use this form to add product category to database.
          </Typography>
          <form onSubmit={Submit}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Product Category
              </Typography>
              <Input
                size="lg"
                placeholder="Add Product Category"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <Button type='submit' className="mt-6" fullWidth>
              Add Product Category
            </Button>
          </form>
        </Card>
      </div>
  )
}

export default AddCategory

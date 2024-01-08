import React, {useEffect, useState} from 'react'
// import CategoryList from '../components/CategoryList';
import categoryService from '../services/categoryService';
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";


const AddCategory = ({user, isLoading, setIsLoading}) => {
  const [category, setCategory] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  // const [newFile, setNewFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    setIsLoading(true);
  
    const categoryFormData = new FormData();
    // categoryFormData.append("image", newFile);
    categoryFormData.append("content", newCategory);
  
    categoryService
      .createCategory(categoryFormData)
      .then((res) => {
        setCategory(category.concat(res));
        // setNewFile(null);
        setNewCategory("");
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
            Add Products Category
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            use this form to add product category to database.
          </Typography>
          <form 
          onSubmit={handleSubmit}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Product Category
              </Typography>

            {/* <div>
              <input
              type="file"
              accept="image/*"
              onChange={(e) => setNewFile(e.target.files[0])}
              />
            </div> */}

              <Input
                type='text'
                value={newCategory}
                onChange={(e)=>setNewCategory(e.target.value)}
                size="lg"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <Button type='submit' className="mt-6" fullWidth>
              Add Product Category
            </Button>
          </form>

          {/* {user && (
        <CategoryList
          category={category}
          setCategory={setCategory}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )} */}
        </Card>
      </div>
  )
}

export default AddCategory

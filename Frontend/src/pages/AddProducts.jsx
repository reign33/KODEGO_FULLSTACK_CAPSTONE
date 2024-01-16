import React, {useEffect, useState} from 'react'
import productService from '../services/productService';
import categoryService from '../services/categoryService';
import unitService from '../services/unitService';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  Card,
  Input,
  Checkbox,
  Button, 
  Typography,
} from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";

const AddProducts = ({user, isLoading, setIsLoading}) => {
  const [unit, setUnit] = useState([]);
  const [cat, setCat] = useState([]);
  const [product, setProduct] = useState({
    name: '', category: null, quantity: 0, unit: null, price: 0 });

  
  const navigate = useNavigate();

  useEffect(()=>{
    if(!user){
      navigate('/signup');
    }
  }, [user, navigate]);

  useEffect(() => {
    categoryService.getCategories().then((res) => {
      setCat(res);
    });
    unitService.getUnits().then((res) => {
      setUnit(res);
  });
  }, []);

  const handleAddProduct = (e) =>{
    e.preventDefault();
    setIsLoading(true);
  const newlyAddedProduct = { 
    name: product.name,
    category: product.category,
    quantity: product.quantity,
    unit: product.unit,
    price: product.price,
  };
console.log(newlyAddedProduct);
    productService
      .createProduct(newlyAddedProduct)
      .then((res) => {
        setProduct({
          name: '', category: null, quantity: 0, unit: null, price: 0 });
          navigate('/manageproducts')
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));

  } 

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
            Add Products
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            use this form to add product to database.
          </Typography>
          <form onSubmit={handleAddProduct} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Product Name
              </Typography>
              <Input
                size="lg"
                placeholder="Product name"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                type='text'
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Category
              </Typography>
              <div>
                <Select 
                onChange={(value)=>setProduct({...product, category: value})}
                size="lg" className=" !border-t-blue-gray-200 focus:!border-t-gray-900" labelProps={{ className: "before:content-none after:content-none", }}>
                  {cat.map((data)=>(<Option key={data.id} value={data.content}>{data.content}</Option>))}
                </Select>
              </div>
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Quantity
              </Typography>
              <Input
                size="lg"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                type="Number"
                value={product.quantity}
                onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Unit
              </Typography>
              <div>
                <Select
                onChange={(value)=>setProduct({...product, unit: value})}
                size="lg" className=" !border-t-blue-gray-200 focus:!border-t-gray-900" labelProps={{ className: "before:content-none after:content-none", }}>
                {unit.map((data)=>(<Option key={data.id} value={data.content}>{data.content}</Option>))}
                </Select>
              </div>
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Price
              </Typography>
              <Input
                size="lg"
                placeholder="₱ 0.00"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                type="Number"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: e.target.value })}
              />
            </div>
            <Button type='submit' className="mt-6" fullWidth>
              Add Product
            </Button>
          </form>
        </Card>
      </div>
  )
}

export default AddProducts
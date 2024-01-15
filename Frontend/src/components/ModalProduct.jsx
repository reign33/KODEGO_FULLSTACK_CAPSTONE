import React, { useState, useEffect } from 'react'
import productService from '../services/productService';
import LoadingSpinner from './LoadingSpinner';
import categoryService from '../services/categoryService';
import unitService from '../services/unitService';
// dialog edit
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import { Select, Option } from "@material-tailwind/react";


const ModalProduct = ({ 
  open, 
  setOpen, 
  product, 
  setProduct, 
  isLoading, 
  setIsLoading, 
  selectProd, 
  setSelectProd, 
  handleOpen,
  newEdit,
  setNewEdit,
}) => {
    const [catdata, setCatdata] = useState([]); //for display sa category select
    const [unitdata, setUnitdata] = useState([]); //for display sa unit select

    useEffect(() => {
        productService.getProducts().then((res)=>{
          setProduct(res);
        });
        unitService.getUnits().then((res)=>{
        setUnitdata(res); 
        });
        categoryService.getCategories().then((res)=>{
        setCatdata(res); 
        });
      }, []);

    const handleChange = (id, value) => {
      setSelectProd((prev) => ({ ...prev, [id]: value }));
      };

      const handleEdit = (id) => {
        setIsLoading(true);
      

        const newlyEdit = {
        "name": selectProd.name,
        "category": selectProd.category,
        "quantity": selectProd.quantity,
        "unit": selectProd.unit,
        "price": selectProd.price,
        }
        productService
          .editProduct(id, newlyEdit)
          .then((res) => {
          setProduct(product.concat(res));
          setNewEdit({
          name: '',
          category: null,
          quantity: 0,
          unit: null,
          price: 0,
          });
           
          })
          .catch((error) => console.log(error))
          .finally(() =>{
            setOpen(false);
            setIsLoading(false);
          });
      };
    
      if (isLoading === true) {
        return (
          <div className="flex justify-center items-center">
            <LoadingSpinner />
          </div>
        );
      }

  return (
    <div>

<Dialog open={open} size="xs" handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            {" "}
            <Typography className="mb-1" variant="h4">
              Edit Product
            </Typography>
          </DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={()=>setOpen(false)}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogBody>
          <Typography className="mb-10 -mt-7 " color="gray" variant="lead">
            Edit Product and then click save button.
          </Typography>
          <div className="grid gap-6">
            <Input 
              type="text"
              value={selectProd.name}
              onChange={(e) => handleChange('name', e.target.value)}
              label={newEdit.name}
              />

            <Select 
              onChange={(value) => handleChange('category', value)}
              label={newEdit.category}>
              {catdata?.map((data)=>(
              <Option key={data.id} value={data.content}>{data.content}</Option>))}            
            </Select>

            <Input 
              type="number"
              onChange={(e) => handleChange('quantity', e.target.value)}
              label={newEdit.quantity} />

            <Select  
               onChange={(value) => handleChange('unit', value)}
              label={newEdit.unit}>
              {unitdata?.map((data)=>(<Option key={data.id} value={data.content}>{data.content}</Option>))}
            </Select>

            <Input 
              type="number"
              onChange={(e) => handleChange('price', e.target.value)}
              placeholder="₱ 0.00" step="0.01" label={`Price ${newEdit.price}`} />

          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
        <Button variant="gradient" color="gray" onClick={()=>handleEdit(selectProd.id)}>
            Save
          </Button>
          <Button variant="text" color="gray" onClick={()=>setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>

    </div>
  )
}

export default ModalProduct
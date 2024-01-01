import React from 'react'
import Sidebar from './Sidebar'
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";

const AddProducts = () => {
  return (
    // <div className="flex">
    //       <Sidebar />
      <div className='flex flex-wrap justify-start w-full p-4'>
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Add Products
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            use this form to add product to database.
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Product Name
              </Typography>
              <Input
                size="lg"
                placeholder="name@mail.com"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Category
              </Typography>
              <div>
                <Select size="lg" className=" !border-t-blue-gray-200 focus:!border-t-gray-900" labelProps={{ className: "before:content-none after:content-none", }}>
                  <Option>Mobile phones</Option>
                  <Option>Skin Care</Option>
                  <Option>Alcoholic Drinks</Option>
                  <Option>Food</Option>
                  <Option>Furniture</Option>
                </Select>
              </div>
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Quantity
              </Typography>
              <Input
                type="Number"
                size="lg"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Unit
              </Typography>
              <div>
                <Select size="lg" className=" !border-t-blue-gray-200 focus:!border-t-gray-900" labelProps={{ className: "before:content-none after:content-none", }}>
                  <Option>pcs</Option>
                  <Option>kg</Option>
                  <Option>metre</Option>
                  <Option>gram</Option>
                  <Option>litre</Option>
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
              />
            </div>
            <Button className="mt-6" fullWidth>
              Add Product
            </Button>
          </form>
        </Card>
      </div>
    //</div>
  )
}

export default AddProducts

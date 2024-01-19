import React, {useEffect, useState} from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import productService from '../services/productService';
import ModalProduct from '../components/ModalProduct';
import { useNavigate } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Tooltip,
} from "@material-tailwind/react";


 
const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Monitored",
    value: "monitored",
  },
  {
    label: "Unmonitored",
    value: "unmonitored",
  },
];
 
const TABLE_HEAD = ["Product Name", "Category", "Quantity", "Units", "Price", "Action"];
 

const ManageProducts = ({user, isLoading, setIsLoading}) => {
  const [open, setOpen] = useState(false); //for modal toggle switch
  const [selectProd, setSelectProd] = useState([]); //need pass to modal
  const [product, setProduct] = useState([]); //to display
  const [newEdit, setNewEdit] = useState([]); //capture selected product
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    const lowerCaseQuery = query.toLowerCase();
  
    // Check if there is a query
    if (query.trim() === "") {
      // If no query, set the data back to the original full list
      productService.getProducts().then((res) => {
        setProduct(res);
      });
    } else {
      // If there is a query, filter the data based on the query
      const searchResults = product.filter((data) =>
        Object.values(data).some((value) => {
          if (typeof value === "string") {
            return value.toLowerCase().includes(lowerCaseQuery);
          } else if (typeof value === "number") {
            // Convert number to string for comparison
            return value.toString().includes(lowerCaseQuery);
          }
          return false;
        })
      );
      setProduct(searchResults);
    }
  };
  


  useEffect(()=>{
    if(!user){
      navigate('/signup');
    }
  }, [user, navigate]);

  useEffect(() => {
    productService.getProducts().then((res)=>{
      setProduct(res); 
    });
  }, []);

  const navigateTo = () => {
    navigate('/addproducts');
  };

  const handleDelete = (id) => {
    setIsLoading(true);
    productService
      .deleteProduct(id)
      .then((_) => {
        setProduct((PrevCat)=>PrevCat.filter((prod) => prod.id !== id));
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  if (isLoading === true) {
    return (
      <div className="flex flex-col justify-center items-center h-screen p-4">
        <LoadingSpinner />
      </div>
    );
  }

   const handleOpen = (data) => {
    setOpen(!open);
    setSelectProd(data);
    setNewEdit(data);
  }


  return (
    <div className='flex flex-wrap justify-start w-full p-4'>
      <Card className="h-full w-full p-5">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Product list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all products
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button className="flex items-center gap-3" size="sm" onClick={navigateTo}>
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Products
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* <div className="flex gap-2 items-center">
              <span className="text-sm">Show</span>
                <select
                  className="w-12 rounded-md border-0">
                  <option>10</option>
                  <option>25</option>
                  <option>100</option>
                </select>
              <span className="text-sm">entries</span>
            </div> */}
          <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head, index) => (
                    <th
                      key={head}
                      className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                      >
                        {head}{" "}
                        {index !== TABLE_HEAD.length - 1 && (
                          <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                        )}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
              {product.map((data, index) => {
                const isLast = index === product.length - 1;
                const classes = isLast
                  ? "p-4 "
                  : "p-4 border-b border-blue-gray-50";
                return (
                      <tr key={data?.id}>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            {/* <Avatar src={img} alt={productname} size="sm" /> */}
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {data && data.name}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {data && data.category}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {data && data.quantity}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {data && data.unit}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {data && data.price}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex gap-4">
                            <Tooltip content="Edit Product">
                              <Button className="flex gap-1" color="deep-purple"
                               onClick={()=>handleOpen(data)}>
                                <PencilIcon className="h-4 w-4" />
                              </Button>
                            </Tooltip>
                            <Tooltip content="Delete Product">
                              <Button 
                              onClick={() =>handleDelete(data.id)}
                              className="flex gap-1" color="red">
                                <TrashIcon className="h-4 w-4" />
                              </Button>
                            </Tooltip>
                          </div>
                        </td>
                        </tr>
                );
              })}
            </tbody>
            </table>
          </CardBody>
      {/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter> */}
    </Card>

<ModalProduct 
open={open}
setOpen={setOpen}
product={product}
setProduct={setProduct}
selectProd={selectProd}
setSelectProd={setSelectProd}
isLoading={isLoading}
setIsLoading={setIsLoading}
handleOpen={handleOpen}
newEdit={newEdit}
setNewEdit={setNewEdit}
/>
    </div>
  )
}

export default ManageProducts
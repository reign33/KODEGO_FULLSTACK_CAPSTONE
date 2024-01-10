import React, {useEffect} from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
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

// dialog edit
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";
 
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
 
const TABLE_ROWS = [
  {
    productname: "Ariel Powder",
    category: "Skin Care",
    quantity: "1345",
    units: "pcs",
    price: "₱ 75",

  },
  {
    productname: "Tide Bar",
    category: "Skin Care",
    quantity: "1565",
    units: "pcs",
    price: "₱ 76",

  },
  {
    productname: "Chlorine",
    category: "Skin Care",
    quantity: "34",
    units: "pcs",
    price: "₱ 10",

  },
  {
    productname: "Red Horse",
    category: "Energy Drink",
    quantity: "1000105",
    units: "pcs",
    price: "₱ 20",

  },
  {
    productname: "Balot",
    category: "Magic Beans",
    quantity: "5",
    units: "pcs",
    price: "₱ 15",
  },
];

const ManageProducts = ({user, isLoading, setIsLoading}) => {

  const navigate = useNavigate();
  const navigateTo = () => {
    navigate('/addproducts');
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

    // dialog edit
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);


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
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
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
                {TABLE_ROWS.map(
                  ({ productname, category, quantity, units, price }, index) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={productname}>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            {/* <Avatar src={img} alt={productname} size="sm" /> */}
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {productname}
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
                              {quantity}
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
                              {quantity}
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
                              {units}
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
                              {price}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex gap-4">
                            <Tooltip content="Edit Product">
                              <Button className="flex gap-1" color="blue" onClick={handleOpen}>
                                <PencilIcon className="h-4 w-4" />
                                  Edit
                              </Button>
                            </Tooltip>
                            <Tooltip content="Delete Product">
                              <Button className="flex gap-1" color="red">
                                <TrashIcon className="h-4 w-4" />
                                Delete
                              </Button>
                            </Tooltip>
                          </div>
                        </td>
                      </tr>
                    );
                  },
                )}
              </tbody>
            </table>
          </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
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
      </CardFooter>
    </Card>

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
            onClick={handleOpen}
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
            Edit Product Category and then click save button.
          </Typography>
          <div className="grid gap-6">
            <Input label="Product Name" />
            <Select label="Product Category">
              <Option>Mobile phones</Option>
              <Option>Skin Care</Option>
              <Option>Alcoholic Drinks</Option>
              <Option>Food</Option>
              <Option>Furniture</Option>
            </Select>
            <Input type="Number" label="Quantity" />
            <Select label="Product Unit">
            <Option>pcs</Option>
              <Option>kg</Option>
              <Option>metre</Option>
              <Option>gram</Option>
              <Option>litre</Option>
            </Select>
            <Input placeholder="₱ 0.00" type="number" step="0.01" label="Price" />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
        <Button variant="gradient" color="gray" onClick={handleOpen}>
            Save
          </Button>
          <Button variant="text" color="gray" onClick={handleOpen}>
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}

export default ManageProducts
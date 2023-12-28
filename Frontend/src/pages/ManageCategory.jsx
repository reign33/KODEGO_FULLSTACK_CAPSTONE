import React from 'react'
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'
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
 
const TABLE_HEAD = ["Product Category"];
 
const TABLE_ROWS = [
  {
    category: "skin Care",
  },
  {
    category: "Drinks",
  },
  {
    category: "Food",
  },
  {
    category: "furniture",
  },
  {
    category: "Textile",
  },
];

const ManageCategory = () => {

  const navigate = useNavigate();
  const navigateTo = () => {
    navigate('/addcategory');
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className='flex flex-wrap justify-start w-full p-8'>
        <Card className="h-full w-full p-5">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Product Category list
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  See information about all products category
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                
                <Button className="flex items-center gap-3" size="sm" onClick={navigateTo}>
                  <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Category
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
                  {TABLE_ROWS.map(({ category }, index) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                          <tr key={category}>
                            <td className={classes}>
                              <div className="flex items-center gap-3">
                                {/* <Avatar src={img} alt={productname} size="sm" /> */}
                                <div className="flex flex-col">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                  >
                                    {category}
                                  </Typography>
                                </div>
                              </div>
                            </td>
                            <td className={classes}>
                              <div className="flex gap-4">
                                <Tooltip content="Edit Product">
                                  <Button className="flex gap-1" color="blue">
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
      </div>
    </div>
  )
}

export default ManageCategory
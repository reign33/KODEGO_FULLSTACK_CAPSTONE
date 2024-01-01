import React from 'react'
import Sidebar from './Sidebar'
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
  Chip,
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
 
const TABLE_HEAD = ["No.", "Units", "Action"];
 
const TABLE_ROWS = [
  {
    Number: "1",
    units: "pcs",
  },
  {
    Number: "2",
    units: "pcs",
  },
  {
    Number: "3",
    units: "pcs",
  },
  {
    Number: "4",
    units: "pcs",
  },
  {
    Number: "5",
    units: "pcs",
  },
];

const ManageUnit = () => {

  const navigate = useNavigate();
  const navigateTo = () => {
    navigate('/addunit');
  };


  return (
    // <div className="flex bg-gray-50">
    //   <Sidebar />
      <div className='flex flex-wrap justify-start w-full p-4'>
        <Card className="h-full w-full p-5">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Product Units list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all products units
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button className="flex items-center gap-3" size="sm" onClick={navigateTo}>
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Unit
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
                    ({ Number, units }, index) => {
                      const isLast = index === TABLE_ROWS.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={Number}>
                           <td className={classes}>
                        <div className="flex items-center gap-3 pr-60">
                          <div className="flex flex-col text-center">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {Number}
                            </Typography>
                          </div>
                        </div>
                      </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {units}
                            </Typography>
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
   // </div>
  )
}

export default ManageUnit
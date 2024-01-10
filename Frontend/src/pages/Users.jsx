import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon,TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
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
  Avatar,
  IconButton,
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
 
const TABLE_HEAD = ["No.", "Email", "Action"];
 
const TABLE_ROWS = [
  {
    Number: "1",
    email: "email@baskog.com",
  },
  {
    Number: "2",
    email: "email@baskog.com",
  },
  {
    Number: "3",
    email: "email@baskog.com",
  },
  {
    Number: "4",
    email: "email@baskog.com",
  },
  {
    Number: "5",
    email: "email@baskog.com",
  },
];

const Users = ({user}) => {

  const navigate = useNavigate();
  const navigateTo = () => {
    navigate('/addcategory');
  };

  useEffect(()=>{
    if(!user){
      navigate('/signup');
    }
  }, [user, navigate]);

  return (
      <div className='flex flex-wrap justify-start w-full p-4'>
        <Card className="h-full w-full p-5">

        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map(
                ({ Number, email }, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4 "
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
                        <div className="flex items-center gap-3 pr-60">
                          <div className="flex flex-col text-center">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex gap-3">
                          <Tooltip content="Delete Product">
                            <Button className="flex gap-1" color="red">
                              <PencilIcon className="h-4 w-4" />
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
  )
}

export default Users
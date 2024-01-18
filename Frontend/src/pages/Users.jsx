import React, {useEffect, useState} from 'react';
import userService from '../services/userService';
import { useNavigate } from 'react-router-dom';
import { TrashIcon, UsersIcon } from "@heroicons/react/24/solid";
import LoadingSpinner from '../components/LoadingSpinner';

import {
  Card,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Tooltip,
} from "@material-tailwind/react";

 
const TABLE_HEAD = ["No.", "Email", "Action"];
 

const Users = ({user, isLoading, setIsLoading}) => {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(()=>{
    if(!user){
      navigate('/signup');
    }
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const res = await userService.getUsers();
      setUsers(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    setIsLoading(true);

    userService
      .deleteUser(id)
      .then((_) => {
        setUsers(users.filter((cat) => cat.id !== id));
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  if (isLoading === true) {
    return (
      <div className="flex justify-center items-center h-screen p-4">
        <LoadingSpinner />
      </div>
    );
  }

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
            {/* Array.isArray(users) && */}
              {users.map(
                (data, index) => {
                  const isLast = index === users.length - 1;
                const classes = isLast
                  ? "p-4 "
                  : "p-4 border-b border-blue-gray-50";
                return (
                    <tr key={data.id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3 pr-60">
                          <div className="flex flex-col text-center">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {index + 1}
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
                              {data.username}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex gap-3">
                          <Tooltip content="Delete Product">
                            <Button onClick={() => handleDelete(data.id)} className="flex gap-1" color="red">
                              <TrashIcon className="h-4 w-4" />
                                Delete
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
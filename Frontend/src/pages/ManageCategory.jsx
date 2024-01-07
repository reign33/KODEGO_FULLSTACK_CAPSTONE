import React, {useEffect, useState} from 'react'
import LoadingSpinner from '../components/LoadingSpinner';
import categoryService from '../services/categoryService';
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
 
const TABLE_HEAD = ["No.", "Category", "Action"];
 

const ManageCategory = ({user, isLoading, setIsLoading}) => {

  const [cat, setCat] = useState([]);
  const navigate = useNavigate();

   const generateID = () => {
    const maxId = cat.length > 0 ? Math.max(...cat.map(n =>n.id)) : 0;
    return maxId + 1;
 };

  const navigateTo = () => {
    navigate('/addcategory');
  };

  useEffect(()=>{
    if(!user){
      navigate('/signup');
    }
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      const res = await categoryService.getCategories();
      setCat(res);
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

    categoryService
      .deleteCategory(id)
      .then((_) => {
        setCat(cat.filter((cat) => cat.id !== id));
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
              {Array.isArray(cat) && cat.map(
                (data) => {
                  
                  const isLast = cat.length > 0? Math.max(...cat.map(n=>n.id))+1:0;
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
                              {String(generateID())}
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
                              {data.content}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex gap-3">
                          <Tooltip content="Edit Product">
                            <Button className="flex gap-1" color="blue">
                              <PencilIcon className="h-4 w-4" />
                                Edit
                            </Button>
                          </Tooltip>
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

export default ManageCategory
import React, {useEffect, useState} from 'react'
import ModalUnit from '../components/ModalUnit';
import LoadingSpinner from '../components/LoadingSpinner';
import unitService from '../services/unitService';
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
  Select,
  Option,
  Tabs,
  TabsHeader,
  Tab,
  Tooltip,
} from "@material-tailwind/react";
 
const TABLE_HEAD = ["No.", "Units", "Action"];
 

const ManageUnit = ({user, isLoading, setIsLoading}) => {
  const [open, setOpen] = useState(false);
  const [selectCat, setSelectCat] = useState([]); //need pass to modal
  const [cat, setCat] = useState([]); //storage of database
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
    const lowerCaseQuery = query.toLowerCase();

    // Check if there is a query
    if (query.trim() === "") {
      // If no query, set the data back to the original full list
      unitService.getUnits().then((res) => {
        setCat(res);
      });
    } else {
      // If there is a query, filter the data based on the query
      const searchResults = cat.filter((data) =>
        Object.values(data).some(
          (value) =>
            typeof value === "string" && value.toLowerCase().includes(lowerCaseQuery)
        )
      );
      setCat(searchResults);
    }
  };

  const handleSearchChange = (e) => {
    handleSearch(e.target.value);
  };

  useEffect(()=>{
    if(!user){
      navigate('/signup');
    }
  }, [user, navigate]);

  useEffect(() => {
    unitService.getUnits().then((res) => {
      setCat(res);
    });
  }, []);

  const navigateTo = () => {
    navigate('/addunit');
  };

  const handleDelete = (id) => {
    setIsLoading(true);
    unitService
      .deleteUnit(id)
      .then((_) => {
        setCat((PrevCat)=>PrevCat.filter((cat) => cat.id !== id));
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

  const handleOpen = (id, content) => {
    setOpen(!open);
    setSelectCat({id, content});
  }

  return (
      <div className='flex justify-start w-full p-4'>
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
            <div className="flex gap-2 items-center">
              <span className="text-sm">Show</span>
                <select
                  className="w-12 rounded-md border-0">
                  <option>10</option>
                  <option>25</option>
                  <option>100</option>
                </select>
              <span className="text-sm">entries</span>
            </div>
            <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              value={searchQuery}
              onChange={handleSearchChange}
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
                {cat.map((data, index) => {
                        const isLast = index === cat.length - 1;
                        const classes = isLast ? "p-4 " : "p-4 border-b border-blue-gray-50";
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
                                  {data.content}
                                </Typography>
                              </div>
                            </div>

                          </td>
                          <td className={classes}>
                            <div className="flex gap-4">
                              <Tooltip content="Edit Product">
                              <Button className="flex gap-1" color="deep-purple"
                              onClick={()=>handleOpen(data.id, data.content)}
                              >
                              <PencilIcon className="h-4 w-4" />
                              </Button>
                              </Tooltip>
                              <Tooltip content="Delete Product">
                                <Button onClick={() =>handleDelete(data.id)} 
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

      <ModalUnit 
        open={open}
        setOpen ={setOpen} 
        handleOpen ={handleOpen}
        selectCat={selectCat}
        cat={cat}
        setCat={setCat}
        setSelectCat={setSelectCat}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        />

      </div>
  )
}

export default ManageUnit
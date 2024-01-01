import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

const Sidebar = ({setUser}) => {
  const [open, setOpen] = React.useState(0);
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
    navigate('/login');
  }

    const handleOpen = (value) => {
      setOpen(open === value ? 0 : value);
    };

  return (
    <div className='flex p-4'>
    <Card className="sticky top-4 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-2 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
        <Typography variant="h6" color="blue-gray">
            Inventory Management System
        </Typography>
        </div>
        <List>
            <NavLink to="/">
            <ListItem>
                <ListItemPrefix>
                    <PresentationChartBarIcon className="h-5 w-5" />
                </ListItemPrefix>
                Dashboard
            </ListItem>
            </NavLink>
            <Accordion
                open={open === 1}
                icon={
                <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                />
                }
            >
                <ListItem className="p-0" selected={open === 1}>
                <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                    <ListItemPrefix>
                    <ShoppingBagIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="mr-auto font-normal">
                    Category
                    </Typography>
                </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-1">
                <List className="p-0">
                    <NavLink to="/addcategory">
                        <ListItem>
                        <ListItemPrefix>
                            <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                        </ListItemPrefix>
                        Add Category
                        </ListItem>
                    </NavLink>
                    <NavLink to="/managecategory">
                    <ListItem>
                    <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Manage Category
                    </ListItem>
                    </NavLink>
                </List>
                </AccordionBody>
            </Accordion>
            <Accordion
                open={open === 2}
                icon={
                <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
                />
                }
            >
                <ListItem className="p-0" selected={open === 2}>
                <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                    <ListItemPrefix>
                    <ShoppingBagIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="mr-auto font-normal">
                    Units
                    </Typography>
                </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-1">
                <List className="p-0">
                <NavLink to="/addunit">
                    <ListItem>
                    <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Add Units
                    </ListItem>
                    </NavLink>
                    <NavLink to="/manageunit">
                    <ListItem>
                    <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Manage Units
                    </ListItem>
                    </NavLink>
                </List>
                </AccordionBody>
            </Accordion>
            <Accordion
                open={open === 3}
                icon={
                <ChevronDownIcon
                    strokeWidth={2.5}
                    className={`mx-auto h-4 w-4 transition-transform ${open === 3 ? "rotate-180" : ""}`}
                />
                }
            >
                <ListItem className="p-0" selected={open === 3}>
                <AccordionHeader onClick={() => handleOpen(3)} className="border-b-0 p-3">
                    <ListItemPrefix>
                    <ShoppingBagIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="mr-auto font-normal">
                    Products
                    </Typography>
                </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-1">
                <List className="p-0">
                <NavLink to="/addproducts">
                    <ListItem>
                    <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Add Products
                    </ListItem>
                    </NavLink>
                    <NavLink to="/manageproducts">
                    <ListItem>
                    <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Manage Products
                    </ListItem>
                    </NavLink>
                </List>
                </AccordionBody>
            </Accordion>
            <NavLink to="/manageusers">
            <ListItem>
                <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
                </ListItemPrefix>
                Users Management
            </ListItem>
            </NavLink>
            <NavLink to="/reports">
            <ListItem>
                <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
                </ListItemPrefix>
                Reports
            </ListItem>
            </NavLink>
            <ListItem>
                <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
                </ListItemPrefix>
                Settings
            </ListItem>

            
                <ListItem onClick={handleLogout}>
                    <ListItemPrefix>
                        <PowerIcon className="h-5 w-5" />
                    </ListItemPrefix>
                Log Out
                </ListItem>
        
        </List>
    </Card>
    </div>
  )
}

export default Sidebar

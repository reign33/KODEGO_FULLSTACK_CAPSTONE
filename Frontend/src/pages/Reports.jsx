import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronUpDownIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
} from "@material-tailwind/react";
import ReactToPrint from 'react-to-print';

 
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
 
const TABLE_HEAD = ["Product Name", "Category", "Quantity", "Units", "Price"];
 
const TABLE_ROWS = [
  {
    name: "Michael Levi",
    category: "Fruits",
    quantity: "100",
    units: "Kg",
    price: "20",
  },
  {
    name: "Michael Levi",
    category: "Fruits",
    quantity: "100",
    units: "Kg",
    price: "20",
  },
  {
    name: "Michael Levi",
    category: "Fruits",
    quantity: "100",
    units: "Kg",
    price: "20",
  },
  {
    name: "Michael Levi",
    category: "Fruits",
    quantity: "100",
    units: "Kg",
    price: "20",
  },
  {
    name: "Michael Levi",
    category: "Fruits",
    quantity: "100",
    units: "Kg",
    price: "20",
  },
];
const PrintContent = () => (
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
                ({ name, category, quantity, units, price }, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
   
                  return (
                    <tr key={name}>
                     <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {name}
                        </Typography>
                      </td>
                            
                            <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {category}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {quantity}
                        </Typography>
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
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {price}
                        </Typography>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
);
const Reports = ({user}) => {
  const navigate = useNavigate();
  const componentRef = useRef();


  useEffect(()=>{
    if(!user){
      navigate('/signup');
    }
  }, [user, navigate]);
    return (
      <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <ReactToPrint
              trigger={() => (
                <Button className="flex items-center gap-3" size="sm">
                  <PrinterIcon strokeWidth={2} className="h-4 w-4" /> Print
                </Button>
              )}
              content={() => componentRef.current}
              documentTitle='new document'
              pageStyle="print"
            />
          </div>
        </div>
      </CardHeader>
        <CardBody className="overflow-scroll px-0">
        <div ref={componentRef}>
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
                ({ name, category, quantity, units, price }, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
   
                  return (
                    <tr key={name}>
                     <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {name}
                        </Typography>
                      </td>
                            
                            <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {category}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {quantity}
                        </Typography>
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
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {price}
                        </Typography>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
          </div>
        </CardBody>
      </Card>
    );
  }
export default Reports

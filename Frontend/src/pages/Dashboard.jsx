import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import categoryService from '../services/categoryService';
import unitService from '../services/unitService';
import productService from '../services/productService';
import userService from '../services/userService';
import StatsCard from '../components/StatsCard';
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

const Dashboard = ({user}) => {
  const [category, setCategory ] = useState([]);
  const [unit, setUnit] = useState([]);
  const [userData, setUserData] = useState([]);
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

useEffect(()=>{
  if(!user){
    navigate('/signup');
  }
}, [user, navigate]);


useEffect(()=>{

  userService.getUsers().then((res)=>{
    setUserData(res);
  });
  categoryService.getCategories().then((res)=>{
    setCategory(res);
  });
  unitService.getUnits().then((res)=>{
    setUnit(res);
  });
  productService.getProducts().then((res)=>{
    setProduct(res);
  });

}, []);

// Calculate data for pie chart
const pieChartData = [
  userData.length || 0,
  product.length || 0,
  unit.length || 0,
  category.length || 0,
];

const chartConfig = {
  type: "pie",
  width: 400,
  height: 400,
  series: pieChartData,
  options: {
    chart: {
      toolbar: {
        show: false,
      },
    },
    title: {
      show: "",
    },
    dataLabels: {
      enabled: true,
      labels: ["Users", "Products", "Units", "Categories"],
    },
    colors: [ "#FF9800", "#4CAF50", "#2196F3", "#009688"],
    legend: {
      show: false,
    },
  },
};


  return (
    <div className='flex flex-col flex-wrap justify-start w-full p-4'>

      <StatsCard 
      category={category} 
      unit={unit}
      product={product}
      userData={userData}
      />

    <Card>
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
      >
        <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
          <Square3Stack3DIcon className="h-6 w-6" />
        </div>
        <div>
          <Typography variant="h6" color="blue-gray">
            Pie Chart
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="max-w-sm font-normal"
          >
            Visualize your data in a simple way using the
            pie chart.
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="mt-4 grid place-items-center px-2">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>

    </div>
  )
}
export default Dashboard



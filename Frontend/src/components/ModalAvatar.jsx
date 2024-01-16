import React from 'react'
import LoadingSpinner from './LoadingSpinner';
import { useState, useEffect } from 'react';
import {
  Input,
  Button,
  Dialog,
  Typography,
  DialogHeader,
  DialogBody,
  DialogFooter,
  } from "@material-tailwind/react";

const ModalAvatar = ({open, setOpen, handleOpen}) => {
    const [newEdit, setNewEdit] = useState("");

//     useEffect(() => {
//         categoryService.getCategories().then((res) => {
//           setCat(res); 
//         });
//       }, []);

//   const handleEdit = (id) => {
//     setIsLoading(true);
//     const newlyEdit = {"content": newEdit}
//     categoryService
//       .editCategory(id, newlyEdit)
//       .then((res) => {
//         setCat(cat.concat(res));
//         setNewEdit("");
//         setSelectCat(id, newlyEdit);
//       })
//       .catch((error) => console.log(error))
//       .finally(() =>{
//         setOpen(false);
//         setIsLoading(false);
//       })
//   };

//   if (isLoading === true) {
//     return (
//       <div className="flex justify-center items-center">
//         <LoadingSpinner />
//       </div>
//     );
//   }

  return (
   
<Dialog open={open} size="xs" handler={handleOpen}>
  <div className="flex items-center justify-between">
    <DialogHeader className="flex flex-col items-start">
      {" "}
      <Typography className="mb-1" variant="h4">
      User Settings
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
    Change your Avatar
    </Typography>
    <div className="grid gap-6">
   
    <div>
        <input
        type="file"
        accept="image/*"
        />
    </div>

    <Typography className="-mb-1" color="blue-gray" variant="h6">
      Name
    </Typography>
    <Input type="text" label='Your name here'/>
    </div>
    </DialogBody>
    <DialogFooter className="space-x-2">
    <Button variant="gradient" color="gray">
    <div>Save</div>
    </Button>
    <Button variant="text" color="gray" onClick={handleOpen}>
    Cancel
    </Button>
  </DialogFooter>
</Dialog>

  )
}

export default ModalAvatar;
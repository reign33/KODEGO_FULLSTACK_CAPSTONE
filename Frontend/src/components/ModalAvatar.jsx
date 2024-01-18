import React from 'react'
import { useState, } from 'react';
import {
  Input,
  Button,
  Dialog,
  Typography,
  DialogHeader,
  DialogBody,
  DialogFooter,
  isLoading
  } from "@material-tailwind/react";
import profileService from '../services/profileService';

const ModalAvatar = ({
  open,  
  handleOpen, 
  profile, 
  setProfile, 
  setIsLoading,

}) => {

  const [newFile, setNewFile] = useState(null);
  const [fileId, setFileId] = useState(null);

    const handleSubmit = (e) => {
      e.preventDefault();

      if (profile._id) {
        profileService
          .deleteProfile(profile.id.toString())
          .then((_) => {
            setFileId(null);// Reset fileId after successful deletion
          })
          .catch((error) => console.log(error));
      }

        const profileformData = new FormData();
        profileformData.append("image", newFile);
  
        profileService
          .createProfile(profileformData)
          .then((res) => {
            setProfile(profile.concat(res));
            setNewFile(null);
          })
          .catch((error) => console.log(error))
          .finally(() =>{
            setOpen(false);
            setIsLoading(false);
          })
    };

    if (isLoading === true) {
      return (
        <div className="flex justify-center items-center">
          <LoadingSpinner />
        </div>
      );
    }
  
  
  return (
   
<Dialog open={open} size="xs" handler={handleOpen}>
<form onSubmit={handleSubmit}>
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
    Profile Settings
    </Typography>

    <div className="grid gap-6">
      <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewFile(e.target.files[0])}
          />
           <p>Update Your Avatar.</p>
      </div>

      <Typography className="-mb-1" color="blue-gray" variant="h6">
        {/* {profile.length>0
        ? `Update your Name "${Array.isArray(profile) && profile.map(data=>data.name)}" ?` 
        : "Add Name"} */}
        Add Name
      </Typography>
  </DialogBody>


      <DialogFooter className="space-x-2">

      <Button type='submit' onClick={handleOpen} variant="gradient" color="gray">
      <div>Save</div>
      </Button>

      <Button variant="text" color="gray" onClick={handleOpen}>
      Cancel
      </Button>
  </DialogFooter>
  </form>
  
</Dialog>

  )
}

export default ModalAvatar;
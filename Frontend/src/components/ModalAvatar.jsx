import React, { useEffect } from 'react';
import { useState, } from 'react';
import LoadingSpinner from './LoadingSpinner';
import {
  Input,
  Button,
  Dialog,
  Typography,
  DialogHeader,
  DialogBody,
  DialogFooter,
  } from "@material-tailwind/react";
import profileService from '../services/profileService';
import userService from '../services/userService';
import { useNavigate } from 'react-router-dom';

const ModalAvatar = ({
  user,
  setUser,
  open,  
  setOpen,
  handleOpen, 
  profile, 
  setProfile,
  loading2,
  setLoading2,

}) => {

  const [newFile, setNewFile] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [userName, setUserName] = useState("");
  const [loading3, setLoading3] = useState(false);
  const [compare, setCompare]=useState([]);
  const [getcompare, setGetCompare] =useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    userService.getUsers().then((res)=>{
      setCompare(res);
    });

  }, []);

  const UpdateUserName = () =>{

    compare.find((data)=>{
      if(data.name === user.name || data.username === user.username){
    setLoading3(true);
    setGetCompare(data);
    const newName = { name: userName };
      userService
        .updateUserName(data.id, newName)
        .then((res) => {
          setUserName("");

        })
        .catch((error) => console.log(error))
        .finally(() =>  setLoading3(false));
        }else{
          console.log("username list", data.username);
        }})
    };

   
    const handleSubmit = (e) => {
      e.preventDefault();
      setLoading2(true);

      if (profile) {
        profile.map((data)=>{

        profileService
          .deleteProfile(data.id)
          .then((_) => {
            setFileId(null);// Reset fileId after successful deletion
            setLoading2(false);
          })
          .catch((error) => console.log(error));})
      }

        const profileformData = new FormData();
        profileformData.append("image", newFile);
  
        // if(!newFile){
        profileService
          .createProfile(profileformData)
          .then((res) => {
            setProfile(profile.concat(res));
            setNewFile(null);
            setLoading2(false);
          })
          .catch((error) => console.log(error))
          .finally(() =>{
            setOpen(false);
          })
        // } else {navigate('/');}
    };

    
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
    Update Your Profile Photo.
    </Typography>

    <div className="grid gap-6">
      <input
        className='mb-[25px]'
          type="file"
          accept="image/*"
          onChange={(e) => setNewFile(e.target.files[0])}
          />
      </div>
        <div className="grid gap-6 mb-[10px]">
        {loading3 === true
        ? <div className="flex justify-center items-center">
          <LoadingSpinner />
          </div>
        : <Input 
          type='text'
          label= {
            !getcompare? "Your Name: " + user?.name + "." 
            : "Your Name Changed Successfully!, Appear in your next login Thanks"}
          value={userName}
          onChange={(e)=>{setUserName(e.target.value)}}
          className="text-[green] font-medium"
       />}
        </div>
  
      <Button onClick={UpdateUserName} 
      variant="gradient" color="gray">Update Name</Button>
      
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
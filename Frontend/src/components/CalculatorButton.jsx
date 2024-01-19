import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Calculator from './Calculator'
 
export function CalculatorButton() {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);
 
  return (
    <>
      <Button className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium' onClick={handleOpen} variant="gradient">
       Calculator
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Calculator</DialogHeader>
        <DialogBody>
          <Calculator/>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Close</span>
          </Button>
          {/* <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button> */}
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default CalculatorButton
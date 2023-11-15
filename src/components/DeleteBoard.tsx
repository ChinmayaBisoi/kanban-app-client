import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import Popup from "./common/Popup";

const DeleteBoard = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  function open() {
    setShow(true);
  }

  function close() {
    setShow(false);
  }

  function handleDeleteBoard() {
    if (!email) {
      toast({ title: "Email is required !", variant: "destructive" });
      return;
    }

    // api to ccreate list
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={open}
        className="flex gap-1 items-center hover:bg-red-500 hover:text-white w-full"
      >
        {/* <span>-</span> */}
        <span>Delete Board</span>
      </Button>
      <Popup wrapperCss="min-w-[400px]" show={show} close={close}>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">Add Member</h2>
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="outline-none border w-full px-3 py-2 rounded-lg"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
          </div>
          <Button onClick={handleDeleteBoard}>Add</Button>
        </div>
      </Popup>
    </div>
  );
};

export default DeleteBoard;

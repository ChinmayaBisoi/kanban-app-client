import React, { useState } from "react";
import { Button } from "./ui/button";
import Overlay from "./common/Overlay";
import Popup from "./common/Popup";
import { toast } from "./ui/use-toast";

const CreateBoard = () => {
  const [show, setShow] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  function open() {
    setShow(true);
  }

  function close() {
    setShow(false);
  }

  function isValidCreateBoardRequest() {
    if (!title) {
      return "Title is required !";
    } else if (!description) {
      return "Description is required !";
    }
  }

  function handleCreateBoard() {
    const errMsg = isValidCreateBoardRequest();
    if (!errMsg) {
      toast({ title: errMsg, variant: "destructive" });
      return;
    }

    //  call api to create board
  }

  return (
    <div className="relative">
      <Button onClick={open} className="flex gap-1 items-center">
        <span>+</span>
        <span>Create Board</span>
      </Button>
      <Popup wrapperCss="min-w-[400px]" show={show} close={close}>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Create Board</h2>
          <div className="flex flex-col">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="outline-none border w-full px-3 py-2 rounded-lg"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="outline-none border w-full px-3 py-2 rounded-lg"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <Button onClick={handleCreateBoard} className="mt-4">
            Create
          </Button>
        </div>
      </Popup>
    </div>
  );
};

export default CreateBoard;

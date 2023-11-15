import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import Popup from "./common/Popup";

const CreateList = () => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  function open() {
    setShow(true);
  }

  function close() {
    setShow(false);
  }

  function handleCreateList() {
    if (!title) {
      toast({ title: "Title is required !", variant: "destructive" });
      return;
    }

    // api to ccreate list
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={open}
        className="flex gap-1 items-center w-52"
      >
        <span>+</span>
        <span>Create List</span>
      </Button>
      <Popup wrapperCss="min-w-[400px]" show={show} close={close}>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">Create List</h2>
          <div className="flex flex-col">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="outline-none border w-full px-3 py-2 rounded-lg"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
            />
          </div>
          <Button onClick={handleCreateList}>Create</Button>
        </div>
      </Popup>
    </div>
  );
};

export default CreateList;

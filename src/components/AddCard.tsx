import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import Popup from "./common/Popup";

const AddCard = () => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function open() {
    setShow(true);
  }

  function close() {
    setShow(false);
  }

  function handleAddCard() {
    if (!title) {
      toast({ title: "Title is required !", variant: "destructive" });
      return;
    }

    // api to ccreate list
  }

  return (
    <div className="relative">
      <Button
        onClick={open}
        className="flex gap-1 items-center w-full text-sm h-fit"
      >
        <span>+</span>
        <span>Add Card</span>
      </Button>
      <Popup wrapperCss="min-w-[400px]" show={show} close={close}>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">Add Card</h2>
          <h2>List : List Name !!</h2>
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
          <div className="flex flex-col">
            <label htmlFor="description">Description</label>
            <textarea
              className="outline-none border w-full px-3 py-2 rounded-lg"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              value={description}
            />
          </div>
          <Button onClick={handleAddCard}>Add</Button>
        </div>
      </Popup>
    </div>
  );
};

export default AddCard;

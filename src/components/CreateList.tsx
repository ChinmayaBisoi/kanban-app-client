import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import Popup from "./common/Popup";
import addList from "@/pages/api/columns/add-list";
import { Column } from "@/types/board";

const CreateList = ({
  boardId = "",
  addNewColumnToBoard,
}: {
  boardId?: string;
  addNewColumnToBoard: (x: Column) => void;
}) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");

  const [loading, setLoading] = useState(false);

  function open() {
    setShow(true);
  }

  function close() {
    setShow(false);
  }

  function errorAlert(err: string = "") {
    toast({
      title: "Unexpected Error",
      description: err,
      variant: "destructive",
    });
  }

  async function handleCreateList() {
    if (!boardId) {
      toast({ title: "Board Id is missing !", variant: "destructive" });
      return;
    }
    if (!title) {
      toast({ title: "Title is required !", variant: "destructive" });
      return;
    }

    setLoading(true);
    await addList({ title, boardId })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          addNewColumnToBoard(res.column);
          toast({ title: "List added successfullt" });
          close();
        } else {
          errorAlert();
        }
      })
      .catch((err) => {
        errorAlert(err.message);
      });
    setLoading(false);
  }

  return (
    <div className="relative mr-8">
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
          <Button loading={loading} onClick={handleCreateList}>
            Create
          </Button>
        </div>
      </Popup>
    </div>
  );
};

export default CreateList;

import deleteListById from "@/pages/api/columns/delete-list";
import { useState } from "react";
import Popup from "./common/Popup";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { Column } from "@/types/board";

const DeleteList = ({
  title = "",
  listId = "",
  removeColumnFromBoard,
}: {
  title?: string;
  listId?: string;
  removeColumnFromBoard: (x: Column) => void;
}) => {
  const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(false);

  function open() {
    setShow(true);
  }

  function close() {
    setShow(false);
  }

  async function handledeleteList() {
    setLoading(true);
    await deleteListById({ listId })
      .then((res) => {
        if (res.ok) {
          toast({
            title: "List deleted",
          });
          removeColumnFromBoard(res.column);
          close();
        } else {
          toast({
            title: "Error deleting List",
            variant: "destructive",
          });
        }
      })
      .catch((err) => {
        toast({
          title: "Error deleting list",
          description: err.message || "",
          variant: "destructive",
        });
      });
    setLoading(false);
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={open}
        className="flex gap-1 items-center hover:bg-red-500 hover:text-white w-full"
      >
        {/* <span>-</span> */}
        <span>Delete List</span>
      </Button>
      <Popup wrapperCss="min-w-[400px]" show={show} close={close}>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">
            Delete List <span className="underline">{title}</span> ?
          </h2>

          <Button
            variant="destructive"
            loading={loading}
            onClick={handledeleteList}
          >
            Delete List
          </Button>
        </div>
      </Popup>
    </div>
  );
};

export default DeleteList;

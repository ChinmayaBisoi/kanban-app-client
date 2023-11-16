import updateBoard from "@/pages/api/boards/update-board";
import { useState } from "react";
import Popup from "./common/Popup";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import updateList from "@/pages/api/columns/update-list";

const EditList = ({
  title = "",

  listId = "",
  updateListInfo,
}: {
  title?: string;
  listId?: string;
  updateListInfo: (x: string, y: string) => void;
}) => {
  const [show, setShow] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const [loading, setLoading] = useState(false);

  function open() {
    setShow(true);
    setNewTitle(newTitle);
  }

  function close() {
    setShow(false);
  }

  async function handleUpdateList() {
    if (!newTitle) {
      toast({ title: "New Title is required !", variant: "destructive" });
      return;
    }

    setLoading(true);
    await updateList({
      title: newTitle,
      id: listId,
    })
      .then((res) => {
        if (res.ok) {
          toast({
            title: "Updated List Info",
          });
          updateListInfo(newTitle, listId);
          close();
        } else {
          toast({
            title: "Error updating list info",
            variant: "destructive",
          });
        }
      })
      .catch((err) => {
        toast({
          title: "Error updating list info",
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
        className="flex gap-1 items-center w-full"
      >
        {/* <span>-</span> */}
        <span>Edit List</span>
      </Button>
      <Popup wrapperCss="min-w-[400px]" show={show} close={close}>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">
            Edit List <span className="underline">{title}</span>
          </h2>
          <div className="flex flex-col">
            <input
              id="title"
              type="text"
              placeholder={"New Title"}
              className="outline-none border w-full px-3 py-2 rounded-lg"
              onChange={(e) => {
                setNewTitle(e.target.value);
              }}
              value={newTitle}
            />
          </div>

          <Button loading={loading} onClick={handleUpdateList}>
            Save
          </Button>
        </div>
      </Popup>
    </div>
  );
};

export default EditList;

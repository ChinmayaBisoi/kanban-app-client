import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import Popup from "./common/Popup";
import deleteBoardById from "@/pages/api/boards/delete-board";
import { useRouter } from "next/router";
import updateBoard from "@/pages/api/boards/update-todo";

const EditBoard = ({
  title = "",
  description = "",
  boardId = "",
  updateBoardInfo,
}: {
  title?: string;
  description?: string;
  boardId?: string;
  updateBoardInfo?: (id: string, title: string, description: string) => void;
}) => {
  const [show, setShow] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  function open() {
    setShow(true);
    setNewTitle(newTitle);
    setNewDescription(newDescription);
  }

  function close() {
    setShow(false);
  }

  async function handleUpdateBoard() {
    if (!newTitle) {
      toast({ title: "New Title is required !", variant: "destructive" });
      return;
    }
    if (!newDescription) {
      toast({ title: "New Description is required !", variant: "destructive" });
      return;
    }

    setLoading(true);
    await updateBoard({
      title: newTitle,
      description: newDescription,
      id: boardId,
    })
      .then((res) => {
        if (res.ok) {
          toast({
            title: "Updated Board Info",
          });
          //
          router.push("/");
        } else {
          toast({
            title: "Error updating board info",
            variant: "destructive",
          });
        }
      })
      .catch((err) => {
        toast({
          title: "Error updating board info",
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
        <span>Edit Board</span>
      </Button>
      <Popup wrapperCss="min-w-[400px]" show={show} close={close}>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">
            Edit Board <span className="underline">{title}</span>
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
          <div className="flex flex-col">
            <input
              id="title"
              type="text"
              placeholder={title}
              className="outline-none border w-full px-3 py-2 rounded-lg"
              onChange={(e) => {
                setNewDescription(e.target.value);
              }}
              value={newDescription}
            />
          </div>
          <Button loading={loading} onClick={handleUpdateBoard}>
            Save
          </Button>
        </div>
      </Popup>
    </div>
  );
};

export default EditBoard;

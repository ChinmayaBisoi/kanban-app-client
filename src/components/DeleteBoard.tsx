import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import Popup from "./common/Popup";
import deleteBoardById from "@/pages/api/boards/delete-board";
import { useRouter } from "next/router";

const DeleteBoard = ({
  title = "",
  boardId = "",
}: {
  title?: string;
  boardId?: string;
}) => {
  const [show, setShow] = useState(false);
  const [userEnteredTitle, setUserEnteredTitle] = useState("");

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  function open() {
    setShow(true);
  }

  function close() {
    setShow(false);
  }

  async function handleDeleteBoard() {
    if (!userEnteredTitle) {
      toast({ title: "Title is required !", variant: "destructive" });
      return;
    }

    setLoading(true);
    await deleteBoardById({ boardId })
      .then((res) => {
        if (res.ok) {
          toast({
            title: "Board deleted",
            description: "Redirecting to homepage",
          });
          router.push("/");
        } else {
          toast({
            title: "Error deleting board",
            variant: "destructive",
          });
        }
      })
      .catch((err) => {
        toast({
          title: "Error deleting board",
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
        <span>Delete Board</span>
      </Button>
      <Popup wrapperCss="min-w-[400px]" show={show} close={close}>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-medium">
            Delete Board <span className="underline">{title}</span> ?
          </h2>
          <div className="flex flex-col">
            <input
              id="title"
              type="text"
              placeholder={title}
              className="outline-none border w-full px-3 py-2 rounded-lg"
              onChange={(e) => {
                setUserEnteredTitle(e.target.value);
              }}
              value={userEnteredTitle}
            />
          </div>
          <Button
            variant="destructive"
            disabled={userEnteredTitle.trim() !== title.trim()}
            loading={loading}
            onClick={handleDeleteBoard}
          >
            Delete Board
          </Button>
        </div>
      </Popup>
    </div>
  );
};

export default DeleteBoard;

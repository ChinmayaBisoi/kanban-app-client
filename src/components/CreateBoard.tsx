import { useState } from "react";
import Popup from "./common/Popup";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import addBoard from "@/pages/api/boards/add-board";
import { Board } from "@/types/board";

const CreateBoard = ({
  isLoggedIn,
  addNewBoard,
}: {
  isLoggedIn: boolean;
  addNewBoard: (board: Board) => void;
}) => {
  const [show, setShow] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [loading, setLoading] = useState(false);

  function open() {
    setShow(true);
  }

  function close() {
    setShow(false);
  }

  function isValidCreateBoardRequest() {
    if (!isLoggedIn) {
      return "Login to create boards !";
    } else if (!title) {
      return "Title is required !";
    } else if (!description) {
      return "Description is required !";
    }
  }

  async function handleCreateBoard() {
    const errMsg = isValidCreateBoardRequest();
    if (errMsg) {
      toast({ title: errMsg, variant: "destructive" });
      return;
    }

    setLoading(true);
    await addBoard({ title, description })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          toast({
            title: "Board Created !",
          });
          addNewBoard({ ...res.board, id: res.board._id });
          close();
        } else {
          toast({
            title: "Unexpected error",
            description: res.message,
            variant: "destructive",
          });
        }
      })
      .catch((err) => {
        toast({
          title: "Error trying to register",
          description: err,
          variant: "destructive",
        });
      });
    setLoading(false);
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
          <Button
            loading={loading}
            onClick={handleCreateBoard}
            className="mt-4"
          >
            Create
          </Button>
        </div>
      </Popup>
    </div>
  );
};

export default CreateBoard;

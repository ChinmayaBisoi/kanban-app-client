import addCard from "@/pages/api/cards/add-card";
import { useState } from "react";
import CardWrapper from "./CardWrapper";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import { Card } from "@/types/board";

const AddCard = ({
  columnTitle,
  columnId,
  addCardToList,
}: {
  columnTitle: string;
  columnId: string;
  addCardToList: (x: Card) => void;
}) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  function open() {
    setShow(true);
  }

  function close() {
    setShow(false);
    setTitle("");
    setDescription("");
    setDate("");
  }

  async function handleAddCard() {
    if (!title) {
      toast({ title: "Title is required !", variant: "destructive" });
      return;
    }
    if (!description) {
      toast({ title: "Description is required !", variant: "destructive" });
      return;
    }

    setLoading(true);
    await addCard({ columnId, title, description, dueDate: date })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          toast({ title: "Card Added !" });
          addCardToList(res.card);
          close();
        } else {
          toast({
            title: "Unexpected error adding card !",
            description: res.message || "",
            variant: "destructive",
          });
        }
      })
      .catch((err) => {
        toast({
          title: "Error trying to add card !",
          description: err,
          variant: "destructive",
        });
      });
    setLoading(false);
  }

  return (
    <CardWrapper
      date={date}
      setDate={setDate}
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      onClickBtn={handleAddCard}
      btnTitle={"Add"}
      show={show}
      close={close}
      columnTitle={columnTitle}
      btnLoading={loading}
    >
      <Button
        onClick={open}
        className="flex gap-1 items-center w-full text-sm h-fit"
      >
        <span>+</span>
        <span>Add Card</span>
      </Button>
    </CardWrapper>
  );
};

export default AddCard;

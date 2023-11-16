import updateCard from "@/pages/api/cards/edit-card";
import { Card } from "@/types/board";
import { useState } from "react";
import CardWrapper from "./CardWrapper";
import Cross from "./icons/Cross";
import { toast } from "./ui/use-toast";
import Popup from "./common/Popup";
import { Button } from "./ui/button";
import deleteCard from "@/pages/api/cards/delete-card";

const ColumnCard = ({
  card,
  columnTitle,
  columnId,
  updateCardsInList,
  removeCardFromList,
}: {
  card: Card;
  columnTitle: string;
  columnId: string;
  updateCardsInList: (x: Card) => void;
  removeCardFromList: (x: Card) => void;
}) => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const [date, setDate] = useState(card.dueDate);
  const [loading, setLoading] = useState(false);

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteBtnLoading, setDeleteBtnLoading] = useState(false);

  function showConfirmDeletePopup() {
    setShowDeletePopup(true);
  }

  function closeConfirmDeletePopup() {
    setShowDeletePopup(false);
  }

  function open() {
    setShow(true);
    setTitle(card.title);
    setDescription(card.description);
    setDate(card.dueDate);
  }

  function close() {
    setShow(false);
  }

  async function handleAddCard() {
    if (!card.id) {
      toast({ title: "Card Id is required here !", variant: "destructive" });
      return;
    }
    if (!title) {
      toast({ title: "Title is required !", variant: "destructive" });
      return;
    }
    if (!description) {
      toast({ title: "Description is required !", variant: "destructive" });
      return;
    }

    setLoading(true);
    await updateCard({ id: card.id, title, description, dueDate: date })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          toast({ title: "Card Added !" });
          updateCardsInList(res.card);
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

  async function handleDeleteCard() {
    if (!card.id) {
      toast({ title: "Card Id is missing here !", variant: "destructive" });
      return;
    }

    setDeleteBtnLoading(true);
    await deleteCard({ cardId: card.id })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          toast({ title: "Card Deleted successfullt!" });
          removeCardFromList(res.card);
          closeConfirmDeletePopup();
        } else {
          toast({
            title: "Unexpected error deleting card !",
            description: res.message || "",
            variant: "destructive",
          });
        }
      })
      .catch((err) => {
        toast({
          title: "Error trying to delete card !",
          description: err,
          variant: "destructive",
        });
      });
    setDeleteBtnLoading(false);
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
      btnTitle={"Edit"}
      show={show}
      close={close}
      columnTitle={columnTitle}
      btnLoading={loading}
    >
      <div className="flex gap-1 justify-between hover:bg-gray-300 cursor-pointer rounded-md p-2 pr-1 bg-gray-200">
        <div onClick={open}>{card.title}</div>
        <div className="relative">
          <Cross
            onClick={showConfirmDeletePopup}
            iconCss="w-4 h-4"
            wrapperCss="h-fit p-[0px] rounded-none hover:text-white hover:bg-destructive"
          />
          <Popup
            wrapperCss="min-w-[360px]"
            show={showDeletePopup}
            close={closeConfirmDeletePopup}
          >
            <div className="flex flex-col gap-6">
              <div>Are you sure you wish to delete the card ?</div>
              <div>
                <p className="text-sm font-semibold">Card Title</p>{" "}
                <p>{card.title}</p>
              </div>
              <div>
                <p className="text-sm font-semibold"> Card Description</p>{" "}
                <p> {card.description}</p>
              </div>
              <div className="flex justify-end gap-4">
                <Button onClick={closeConfirmDeletePopup} variant="secondary">
                  Cancel
                </Button>
                <Button
                  loading={deleteBtnLoading}
                  onClick={handleDeleteCard}
                  variant="destructive"
                >
                  Delete
                </Button>
              </div>
            </div>
          </Popup>
        </div>
      </div>
    </CardWrapper>
  );
};

export default ColumnCard;

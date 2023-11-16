import { useDrag, useDrop } from "react-dnd";
import BoardColumnOptions from "./BoardColumnOptions";
import AddCard from "./AddCard";
import { Card, Column } from "@/types/board";
import ColumnCard from "./ColumnCard";

export default function BoardColumn({
  column,
  index,
  moveColumn,
  removeColumnFromBoard,
  addCardToList,
  updateCardsInList,
  removeCardFromList,
}: {
  column: Column;
  index: number;
  moveColumn: (fromIndex: number, toIndex: number) => void;
  removeColumnFromBoard: (x: Column) => void;
  addCardToList: (x: Card) => void;
  updateCardsInList: (x: Card) => void;
  removeCardFromList: (x: Card) => void;
}) {
  const id = column.id;

  const [, ref] = useDrag({
    type: "COLUMN",
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: "COLUMN",
    hover: (draggedItem: any) => {
      if (draggedItem.index !== index) {
        moveColumn(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => ref(drop(node))}
      className="border min-w-[208px] overflow-y-scroll rounded-lg w-52 p-2 flex flex-col shadow gap-4"
    >
      <div className="flex justify-between items-center mb-2 gap-4">
        <p className="ml-2 font-semibold text-sm">{column.title}</p>
        <BoardColumnOptions
          column={column}
          removeColumnFromBoard={removeColumnFromBoard}
        />
      </div>
      {column.cards.length > 0 &&
        column.cards.map((card: Card) => {
          return (
            <ColumnCard
              key={card.id}
              card={card}
              removeCardFromList={removeCardFromList}
              updateCardsInList={updateCardsInList}
              columnTitle={column.title}
              columnId={column.id}
            />
          );
        })}
      <AddCard
        addCardToList={addCardToList}
        columnTitle={column.title}
        columnId={column.id}
      />
    </div>
  );
}

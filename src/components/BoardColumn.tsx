import { DndProvider, useDrag, useDrop } from "react-dnd";
import BoardColumnOptions from "./BoardColumnOptions";
import AddCard from "./AddCard";
import { Card, Column } from "@/types/board";
import ColumnCard from "./ColumnCard";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function BoardColumn({
  column,
  removeColumnFromBoard,
  addCardToList,
  updateCardsInList,
  removeCardFromList,
  updateListInfo,
  updateCardOrder,
}: {
  column: Column;

  removeColumnFromBoard: (x: Column) => void;
  addCardToList: (x: Card) => void;
  updateCardsInList: (x: Card) => void;
  removeCardFromList: (x: Card) => void;
  updateListInfo: (x: string, y: string) => void;
  updateCardOrder: any;
}) {
  const id = column.id;

  return (
    <div className="border min-w-[208px] overflow-y-scroll rounded-lg w-52 p-2 flex flex-col shadow gap-4">
      <div className="flex justify-between items-center mb-2 gap-4">
        <p className="ml-2 font-semibold text-sm">{column.title}</p>
        <BoardColumnOptions
          column={column}
          updateListInfo={updateListInfo}
          removeColumnFromBoard={removeColumnFromBoard}
        />
      </div>
      {column.cards.length > 0 && (
        <>
          <DndProvider backend={HTML5Backend}>
            {column.cards.map((card: Card) => {
              return (
                <ColumnCard
                  key={card.id}
                  card={card}
                  updateCardOrder={updateCardOrder}
                  removeCardFromList={removeCardFromList}
                  updateCardsInList={updateCardsInList}
                  columnTitle={column.title}
                  columnId={column.id}
                />
              );
            })}
          </DndProvider>
        </>
      )}
      <AddCard
        addCardToList={addCardToList}
        columnTitle={column.title}
        columnId={column.id}
      />
    </div>
  );
}

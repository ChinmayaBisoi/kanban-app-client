import { useDrag, useDrop } from "react-dnd";
import BoardColumnOptions from "./BoardColumnOptions";
import AddCard from "./AddCard";

export default function BoardColumn({
  id,
  label,
  index,
  moveColumn,
}: {
  id: number;
  label: string;
  index: number;
  moveColumn: (fromIndex: number, toIndex: number) => void;
}) {
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
      className="border min-w-[208px] rounded-lg w-52 p-2 flex flex-col gap-2"
    >
      <div className="flex justify-between gap-4">
        <p>{label}</p>
        <BoardColumnOptions />
      </div>
      <AddCard />
    </div>
  );
}

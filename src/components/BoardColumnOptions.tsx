import { useOnOutsideClick } from "@/hooks/useOnOutsideClick";
import { Column } from "@/types/board";
import { useRef, useState } from "react";
import DeleteList from "./DeleteList";
import Dropdown from "./common/Dropdown";
import VerticalDots from "./icons/VerticalDots";

const BoardColumnOptions = ({
  column,
  removeColumnFromBoard,
}: {
  column: Column;
  removeColumnFromBoard: (x: Column) => void;
}) => {
  const [show, setShow] = useState(false);
  const colOptionsRef = useRef<HTMLDivElement>(null);
  useOnOutsideClick(colOptionsRef, close);

  function handleDeleteList() {}

  function close() {
    setShow(false);
  }

  function toggle() {
    setShow((prev) => !prev);
  }
  return (
    <div ref={colOptionsRef} className="relative">
      <VerticalDots
        wrapperCss="hover:bg-gray-200"
        onClick={toggle}
        iconCss=""
      />
      <Dropdown wrapperCss="right-0 p-0" show={show} close={close}>
        <div className="flex flex-col gap-1">
          {/* <AddMember /> */}
          <DeleteList
            title={column.title}
            listId={column.id}
            removeColumnFromBoard={removeColumnFromBoard}
          />
        </div>
      </Dropdown>
    </div>
  );
};

export default BoardColumnOptions;

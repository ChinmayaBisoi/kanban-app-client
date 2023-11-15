import { useOnOutsideClick } from "@/hooks/useOnOutsideClick";
import { useRef, useState } from "react";
import Dropdown from "./common/Dropdown";
import VerticalDots from "./icons/VerticalDots";
import { Button } from "./ui/button";
import { Column } from "@/types/board";

const BoardColumnOptions = ({ column }: { column: Column }) => {
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
          <Button onClick={handleDeleteList} variant="destructive">
            Delete List
          </Button>
        </div>
      </Dropdown>
    </div>
  );
};

export default BoardColumnOptions;

import { useOnOutsideClick } from "@/hooks/useOnOutsideClick";
import { useRef, useState } from "react";
import Dropdown from "./common/Dropdown";
import VerticalDots from "./icons/VerticalDots";
import CreateList from "./CreateList";
import AddMember from "./AddMember";
import DeleteBoard from "./DeleteBoard";

const BoardOptions = () => {
  const [show, setShow] = useState(false);
  const colOptionsRef = useRef<HTMLDivElement>(null);
  useOnOutsideClick(colOptionsRef, close);

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
      <Dropdown wrapperCss="right-0" show={show} close={close}>
        <div className="flex flex-col gap-1">
          <AddMember />
          <DeleteBoard />
        </div>
      </Dropdown>
    </div>
  );
};

export default BoardOptions;

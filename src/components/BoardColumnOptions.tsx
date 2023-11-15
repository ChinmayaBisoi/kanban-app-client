import React, { useEffect, useRef, useState } from "react";
import VerticalDots from "./icons/VerticalDots";
import Dropdown from "./common/Dropdown";
import { useOnOutsideClick } from "@/hooks/useOnOutsideClick";

const BoardColumnOptions = () => {
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
        iconCss="w-4 h-4"
      />
      <Dropdown wrapperCss="right-0" show={show} close={close}>
        Hi from Dropdown
      </Dropdown>
    </div>
  );
};

export default BoardColumnOptions;

import React from "react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { Button } from "../ui/button";
import Dropdown from "./Dropdown";
import { useState, useRef } from "react";
import { useOnOutsideClick } from "@/hooks/useOnOutsideClick";
import Cross from "../icons/Cross";

const DatePicker = ({ date, setDate }: { date: any; setDate: any }) => {
  const [show, setShow] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);
  useOnOutsideClick(datePickerRef, close);

  function close() {
    setShow(false);
  }

  function toggle() {
    setShow((prev) => !prev);
  }

  function clearDate() {
    setDate("");
  }
  return (
    <div ref={datePickerRef}>
      <div className="flex items-center shadow rounded-md">
        <Button variant="ghost" className="rounded-md" onClick={toggle}>
          {date ? format(new Date(date), "dd MMM yyyy") : "Select Date"}
        </Button>
        <Button variant="ghost" className="px-1 rounded-md" onClick={clearDate}>
          <Cross wrapperCss="hover:bg-transparent" />
        </Button>
      </div>
      <div className="relative">
        <Dropdown wrapperCss="left-0" show={show} close={close}>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(e) => {
              setDate(e);
              close();
            }}
            initialFocus
          />
        </Dropdown>
      </div>
    </div>
  );
};

export default DatePicker;

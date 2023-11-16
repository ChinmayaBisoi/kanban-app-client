import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";
import Popup from "./common/Popup";
import Asterik from "./common/Asterik";
import DatePicker from "./common/DatePicker";

const CardWrapper = ({
  columnTitle,
  children,
  date,
  setDate,
  title,
  setTitle,
  description,
  setDescription,
  onClickBtn,
  btnTitle,
  show,
  close,
  btnLoading,
}: {
  columnTitle: string;
  children: React.ReactNode;
  date: any;
  setDate: any;
  title: string;
  setTitle: (x: string) => void;
  description: string;
  setDescription: (x: string) => void;
  onClickBtn: () => void;
  btnTitle: string;
  show: boolean;
  close: () => void;
  btnLoading: boolean;
}) => {
  return (
    <div className={`relative ${btnTitle === "Add" ? "mb-40" : ""}`}>
      {children}
      <Popup
        wrapperCss="max-w-[550px] grow md:px-8 shadow-lg font-semibold"
        show={show}
        close={close}
      >
        <div className="flex flex-col gap-4">
          <h2 className="text-lg ">{btnTitle} Card</h2>
          <h2 className="">
            List Name : <span className="underline ">{columnTitle}</span>
          </h2>
          <div className="flex items-center gap-4">
            <div className="">Due Date</div>
            <DatePicker date={date} setDate={setDate} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="title">
              Title
              <Asterik />
            </label>
            <input
              type="text"
              className="outline-none border w-full px-3 py-2 rounded-lg"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description">
              Description
              <Asterik />
            </label>
            <textarea
              className="outline-none border w-full px-3 py-2 rounded-lg"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              rows={5}
              value={description}
            />
          </div>
          <Button loading={btnLoading} onClick={onClickBtn}>
            {btnTitle === "Edit" ? "Save" : btnTitle}
          </Button>
        </div>
      </Popup>
    </div>
  );
};

export default CardWrapper;

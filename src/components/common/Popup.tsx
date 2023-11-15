import React, { useRef } from "react";
import Overlay from "./Overlay";
import { useOnOutsideClick } from "@/hooks/useOnOutsideClick";
import Cross from "../icons/Cross";

const Popup = ({
  show = false,
  close = () => {},
  wrapperCss = "",
  children,
}: {
  show: boolean;
  close: () => void;
  wrapperCss?: string;
  children: React.ReactNode;
}) => {
  const popupRef = useRef<HTMLDivElement>(null);
  useOnOutsideClick(popupRef, close);
  if (!show) return null;
  return (
    <Overlay>
      <div className="flex h-full items-center justify-center">
        <div
          ref={popupRef}
          className={`mb-20 shadow border p-4 relative rounded-md bg-white ${wrapperCss}`}
        >
          <Cross
            onClick={close}
            wrapperCss="rounded-none ml-auto w-fit absolute top-0 right-0"
          />
          {children}
        </div>
      </div>
    </Overlay>
  );
};

export default Popup;

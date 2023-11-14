import React from "react";
import Overlay from "./Overlay";

const Popup = ({ children }: { children: React.ReactNode }) => {
  return <Overlay>{children}</Overlay>;
};

export default Popup;

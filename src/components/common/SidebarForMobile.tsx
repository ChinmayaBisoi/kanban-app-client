import { useOnOutsideClick } from "@/hooks/useOnOutsideClick";
import { useRef, useState } from "react";
import Cross from "../icons/Cross";
import Hamburger from "../icons/Hamburger";
import Overlay from "./Overlay";
import Sidenav from "./Sidenav";

export function SideBarForMobile() {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  useOnOutsideClick(sidebarRef, close);

  function show() {
    setShowSidebar(true);
  }

  function close() {
    setShowSidebar(false);
  }

  return (
    <div>
      <div onClick={show}>
        <Hamburger wrapperCss="flex md:hidden p-1" />
      </div>
      {showSidebar && (
        <Overlay>
          <div
            ref={sidebarRef}
            className="w-64 p-4 bg-white h-screen shadow-xl"
          >
            <Cross onClick={close} wrapperCss="ml-auto w-fit" />
            <Sidenav isMob={true} />
          </div>
        </Overlay>
      )}
    </div>
  );
}

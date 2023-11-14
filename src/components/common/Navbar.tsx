import Link from "next/link";
import Logo from "../icons/Logo";
import Login from "./Login";
import { SideBarForMobile } from "./SidebarForMobile";

const Navbar = () => {
  return (
    <nav className="self-stretch sticky top-0 backdrop-saturate-200 backdrop-blur-sm z-[100] flex items-center justify-between py-3 px-4 md:px-8 bg-white/80 shadow-lg">
      <div className="flex items-center gap-3">
        <Logo wrapperCss="hidden md:flex" />
        <SideBarForMobile />

        <Link href={"/"}>
          <h1 className="font-semibold">Kanban App</h1>
        </Link>
      </div>
      <Login />
    </nav>
  );
};

export default Navbar;

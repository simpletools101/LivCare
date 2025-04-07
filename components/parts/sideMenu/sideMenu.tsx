import { History, House, LogOut, Rat } from "lucide-react";
import SideMenuItem from "./sideMenuItem";
import SideMenuItem2 from "./sideMenuItem2";

export default function SideMenu() {
  return (
    <div className="p-2 flex flex-col justify-between h-full">
      <div>
        <SideMenuItem content="Home" link="/">
          <House />
        </SideMenuItem>
        <SideMenuItem content="History" link="/history">
          <History />
        </SideMenuItem>
      </div>
      <div className="mb-8">
        <SideMenuItem2 content="Logo out">
          <LogOut />
        </SideMenuItem2>
      </div>
    </div>
  );
}

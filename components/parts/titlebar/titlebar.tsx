import ProductLogo from "@/components/common/product-logo";
import UserAccountItem from "@/components/common/user-account";
import { AlignJustify } from "lucide-react";

export default function Titlebar() {
  return (
    <div className="h-[80px] flex justify-between items-center">
      <div className="flex items-center space-x-5 ml-3">
        <button className="icon-container p-2 rounded-3xl ml-3 cursor-pointer flex items-center justify-center hover:bg-neutral-800">
          <AlignJustify />
        </button>
        <ProductLogo />
      </div>
      <div className="mr-6">
        <UserAccountItem />
      </div>
    </div>
  );
}

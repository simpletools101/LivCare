import Image from "next/image";
import productImage from "../../assets/android-chrome-512x512.png";
import Link from "next/link";

export default function ProductLogo() {
  return (
    <Link href={"/"} className="flex items-center">
      <span className="text-lg font-bold text-[#FF0]">LivCare</span>
    </Link>
  );
}

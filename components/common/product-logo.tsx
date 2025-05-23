import Image from "next/image";
import productImage from "../../assets/android-chrome-512x512.png";
import Link from "next/link";

export default function ProductLogo() {
  return (
    <Link href={"/"} className="flex items-center">
      <div>
        <Image src={productImage} className="rounded-md" alt="Product Image" width={35} height={35}/>
      </div>
      <span className="max-[730px]:text-lg text-xl font-light ml-5">LivCare</span>
    </Link>
  );
}

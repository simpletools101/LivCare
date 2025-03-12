import Link from "next/link";

type SideMenuItemProps = {
  children: React.ReactNode;
  content: string;
};

export default function SideMenuItem2({
  children,
  content,
}: SideMenuItemProps) {
  return (
    <button className="flex  h-[50px] items-center p-5 hover:bg-neutral-700  active:bg-neutral-600 space-x-5  rounded-2xl">
      <div className="icon-container">{children}</div>
      <span>{content}</span>
    </button>
  );
}

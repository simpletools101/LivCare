import Toon from "../toon";
import local from "next/font/local";

export default function WelcomeUI() {
  return (
    <div className=" flex flex-col items-center justify-center mt-12">
      <div className=" flex items-center flex-col justify-center">
        <div className="">
          <Toon />
        </div>
        <h2 className={`mt-4 text-4xl w-[800px] text-center`}>
          Hey there! Got a cow in trouble? Tell me what's up,
        </h2>
      </div>
      <div></div>
    </div>
  );
}

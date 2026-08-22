// import { idImageMapping } from "@assets";
import { idImageMapping } from "../assets";

// I got lazy and just specified it. It's possible it would go badly with Vite anyway. 
//import { pokeball } from "@assets";
import { pokeball } from "../assets";

export default function ({
  id,
  name,
  img,
}: {
  id: number;
  name: string;
  img: string;
}) {
  return (
    <div
      className={`shadow-sm border w-34 h-34 rounded-md flex flex-col justify-between pb-2 mx-2 my-2 
        bg-base-200 bg-[url(src/assets/pokeball.png)] bg-size-[80%] bg-center bg-no-repeat`}
    >
      <p className="text-sm p-1 font-silk opacity-50">#{id}</p>
      <div className="p-1 text-xs flex justify-center">
        <img
          className="w-14 h-14 animate-hover"
          src={idImageMapping[img]}
          alt=""
        />
      </div>
      <div className="w-full flex items-center justify-center">
        <p className="font-silk text-center">{name.toUpperCase()}</p>
      </div>
    </div>
  );
}

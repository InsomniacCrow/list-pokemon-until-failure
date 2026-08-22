// function getImageUrl(name: string): URL {
//   // change URL here, so doesn't die in production
//   console.log(name);
//   const thing = new URL(`./../assets/pkmn_images/${name}`, import.meta.url)
//     .href;
//   console.log(thing);
//   console.log(gallery);
//   return new URL(`./../assets/pkmn_images/${name}`, import.meta.url).href;
// }
import { idImageMapping } from "../assets";
// import { idImageMapping } from "@assets";

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
    <div className="border w-34 h-34 rounded-md flex flex-col justify-between pb-2 mx-2 my-2 bg-base-200">
      <p className="text-sm p-1 font-silk opacity-50">#{id}</p>
      <div className="p-1 text-xs flex justify-center">
        <img
          className="w-14 h-14 animate-hover"
          src={idImageMapping[img]}
          alt=""
        />
      </div>
      <div className="w-full flex items-center justify-center">
        <p className="font-silk">{name.toUpperCase()}</p>
      </div>
    </div>
  );
}

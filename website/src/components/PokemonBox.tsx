export default function ({ number, name }: { number: string; name: string }) {
  return (
    <div className="border w-34 h-34 rounded-md flex flex-col justify-between pb-2 mx-2 my-2 bg-base-200">
      <p className="text-sm p-1 font-silk opacity-50">#{number}</p>
      <div className="p-1 text-xs flex justify-center">
        <img
          className="w-14 h-14"
          src="https://www.serebii.net/pokedex-sv/icon/new/432.png"
          alt=""
        />
      </div>
      <div className="w-full flex items-center justify-center">
        <p className="font-silk">{name.toUpperCase()}</p>
      </div>
    </div>
  );
}

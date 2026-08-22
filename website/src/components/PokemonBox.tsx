export default function ({ number, name }: { number: string; name: string }) {
  return (
    <div className="px-2 py-2">
      <div className="border w-32 h-32 rounded-md flex flex-col justify-between pb-4">
        <p className="text-sm p-2 font-silk opacity-50">#{number}</p>
        <div className="p-2 text-xs">placeholder img</div>
        <div className="w-full flex items-center justify-center">
          <p className="">{name.toUpperCase()}</p>
        </div>
      </div>
    </div>
  );
}

export default function({name}: {name: string}) {
  return (
      <div className="px-2 py-2">
        <div className="border w-30 h-30 rounded-md">
          <p className="text-sm p-2">{name}</p>
        </div>
      </div>
  )
}
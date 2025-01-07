function PulseBox() {
  return (
    <li>
      <div className=" flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-white/10">
        <div className="relative w-16 h-16 bg-gray-950 rounded-full animate-pulse"></div>
        <div className="flex flex-col gap-3 flex-grow">
          <div className="flex justify-between items-center">
            <div className="animate-pulse bg-gray-950 w-20 h-4 rounded-full"></div>
            <div className="animate-pulse bg-gray-950 w-12 h-4 rounded-full"></div>
          </div>
          <div className="animate-pulse bg-gray-950 w-32 h-4 rounded-full"></div>
        </div>
      </div>
    </li>
  );
}

export default PulseBox;

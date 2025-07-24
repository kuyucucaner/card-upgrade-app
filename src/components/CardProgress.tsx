export default function CardProgress({ progress }: { progress: number }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 relative">
      <div
        className="bg-green-500 h-4 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
      <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-white">
        %{progress}
      </span>
    </div>
  );
}

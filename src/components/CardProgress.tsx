export default function CardProgress({ progress }: { progress: number }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        className="bg-green-500 h-4 rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

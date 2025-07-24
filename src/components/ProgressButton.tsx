export default function ProgressButton({
  onClick,
  disabled,
  energy,
  progress, 
}: {
  onClick: (amount: number) => void;
  disabled: boolean;
  energy: number;
  progress: number; 
}) {
  return (
    <div className="flex gap-2 mt-4 ">
      <button
        onClick={() => onClick(1)}
        disabled={disabled || energy < 1 || progress >= 100}
        className={`p-2 text-white rounded hover:cursor-pointer ${
          disabled || energy < 1 || progress >= 100
            ? "bg-green-300 cursor-not-allowed"
            : "bg-green-500"
        }`}
      >
        +2% (1 click)
      </button>
      <button
        onClick={() => onClick(5)}
        disabled={disabled || energy < 5 || progress > 95}
        className={`p-2 text-white rounded hover:cursor-pointer ${
          disabled || energy < 5 || progress > 95
            ? "bg-green-300 cursor-not-allowed"
            : "bg-green-500"
        }`}
      >
        +10% (5 clicks)
      </button>
      <button
        onClick={() => onClick(10)}
        disabled={disabled || energy < 10 || progress > 80}
        className={`p-2 text-white rounded hover:cursor-pointer ${
          disabled || energy < 10 || progress > 80
            ? "bg-green-300 cursor-not-allowed"
            : "bg-green-500"
        }`}
      >
        +20% (10 clicks)
      </button>
    </div>
  );
}

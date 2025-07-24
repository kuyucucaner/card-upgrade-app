export default function LevelUpButton({
  onLevelUp,
  disabled,
}: {
  onLevelUp: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onLevelUp}
      disabled={disabled}
      className="mt-4 p-2 bg-blue-500 text-white rounded hover:cursor-pointer"
    >
      Level Up
    </button>
  );
}

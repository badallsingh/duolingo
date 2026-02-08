export default function LessonNode({ completed, locked, onClick }) {
  let bg = "bg-gray-600";
  let icon = "🔒";

  if (completed) {
    bg = "bg-green-500";
    icon = "✔";
  } else if (!locked) {
    bg = "bg-green-400";
    icon = "📘";
  }

  return (
    <button
      disabled={locked}
      onClick={onClick}
      className={`w-14 h-14 rounded-full flex items-center justify-center text-xl ${bg}`}
    >
      {icon}
    </button>
  );
}

export default function ProgressBar({ current, total }) {
  const percent = (current / total) * 100;

  return (
    <div className="w-full bg-gray-700 h-2 rounded-full mb-4">
      <div
        className="bg-green-500 h-2 rounded-full transition-all"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

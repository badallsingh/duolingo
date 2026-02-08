export default function QuestionCard({
  question,
  onAnswer,
  selected,
  showFeedback,
}) {
  return (
    <div className="bg-[#0f172a] p-4 rounded-xl">
      <h2 className="text-lg mb-4">{question.text}</h2>

      {question.options.map((opt) => {
        let style = "bg-[#020617]";

        if (showFeedback) {
          if (opt === question.answer) style = "bg-green-500";
          else if (opt === selected) style = "bg-red-500";
        }

        return (
          <button
            key={opt}
            disabled={showFeedback}
            onClick={() => onAnswer(opt)}
            className={`w-full p-3 rounded mb-2 ${style}`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

export default function QuestionCard({ question, selected, showFeedback, onAnswer }) {

return ( <div className="mt-6">
`
  <h2 className="text-lg font-semibold mb-4">
    {question.text}
  </h2>

  {question.options.map((opt, i) => {

    let style = "block w-full bg-gray-800 p-3 mb-2 rounded";

    if (showFeedback) {
      if (opt === question.answer) {
        style = "block w-full bg-green-600 p-3 mb-2 rounded";
      } else if (opt === selected) {
        style = "block w-full bg-red-600 p-3 mb-2 rounded";
      }
    }

    return (
      <button
        key={i}
        onClick={() => onAnswer(opt)}
        className={style}
        disabled={showFeedback}
      >
        {opt}
      </button>
    );

  })}

</div>

);
}

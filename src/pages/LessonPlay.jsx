import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";

export default function LessonPlay() {

const navigate = useNavigate();
const { level, lessonId } = useParams();

const token = localStorage.getItem("token");
const language = "english";

const [question, setQuestion] = useState(null);
const [questionId, setQuestionId] = useState(1);
const [selected, setSelected] = useState(null);
const [correct, setCorrect] = useState(0);
const [showFeedback, setShowFeedback] = useState(false);
const [finished, setFinished] = useState(false);
const [result, setResult] = useState(null);


// ==========================
// LOAD QUESTION
// ==========================
useEffect(() => {

const loadQuestion = async () => {

  try {

    const res = await fetch(
      `http://127.0.0.1:8000/language/${language}/question/${questionId}`
    );

    if (!res.ok) {
      console.error("Question API error:", res.status);
      return;
    }

    const data = await res.json();

    const formattedQuestion = {
      id: data.id,
      text: data.question_text,
      options: [
        data.option_a,
        data.option_b,
        data.option_c,
        data.option_d
      ].filter(Boolean),
      answer: data.correct_answer
    };

    setQuestion(formattedQuestion);

  } catch (err) {
    console.error("Question fetch error:", err);
  }

};

loadQuestion();

}, [questionId]);


// ==========================
// SUBMIT ANSWER
// ==========================
const answerQuestion = async (option) => {

if (!question) return;

setSelected(option);

try {

const res = await fetch(
  `http://127.0.0.1:8000/language/${language}/submit`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      question_id: question.id,
      user_answer: option
    })
  }
);

if (!res.ok) {
  const text = await res.text();
  console.error("Submit API error:", text);
  return;
}

const data = await res.json();

setResult(data);

if (data.correct) {
  setCorrect((c) => c + 1);
}

setShowFeedback(true);

} catch (err) {
  console.error("Submit error:", err);
}

};


// ==========================
// COMPLETE LESSON
// ==========================
const submitLesson = async () => {

const score = Math.round((correct / 10) * 100);

try {

await fetch("http://127.0.0.1:8000/lesson/complete", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  },
  body: JSON.stringify({
    level: Number(level),
    lesson_id: Number(lessonId),
    score: score
  })
});

} catch (err) {
  console.error("Lesson submit error:", err);
}

};


// ==========================
// NEXT QUESTION
// ==========================
const next = () => {

setSelected(null);
setShowFeedback(false);
setResult(null);

if (questionId >= 10) {

  submitLesson();
  setFinished(true);

} else {

  setQuestionId((id) => id + 1);

}

};


// ==========================
// FINISHED SCREEN
// ==========================
if (finished) {

return (
  <div className="min-h-screen bg-[#020617] text-white p-6 text-center">

    <h1 className="text-2xl font-bold">
      Lesson Complete 🎉
    </h1>

    <p className="mt-4">
      Correct answers: {correct}
    </p>

    <button
      onClick={() => navigate("/lessons")}
      className="mt-6 bg-green-500 px-6 py-2 rounded"
    >
      Continue
    </button>

  </div>
);

}


// ==========================
// MAIN UI
// ==========================
return (

<div className="min-h-screen bg-[#020617] text-white p-4">

  <ProgressBar current={questionId} total={10} />

  {question && (
    <QuestionCard
      question={question}
      selected={selected}
      showFeedback={showFeedback}
      onAnswer={answerQuestion}
    />
  )}

  {showFeedback && result && (
    <div className="mt-4 text-center">

      {result.correct ? (
        <p className="text-green-400 font-bold">
          ✅ Correct!
        </p>
      ) : (
        <p className="text-red-400 font-bold">
          ❌ Wrong. Correct answer: {result.correct_answer}
        </p>
      )}

    </div>
  )}

  {showFeedback && (
    <button
      onClick={next}
      className="mt-4 bg-green-500 px-6 py-2 rounded"
    >
      Next
    </button>
  )}

</div>

);

}
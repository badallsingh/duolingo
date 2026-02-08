import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";

export default function LessonPlay() {
  const navigate = useNavigate();
  const { level, lessonId } = useParams();
  const email = localStorage.getItem("email");

  const questions = [
    {
      id: 1,
      text: "What is the meaning of 'Apple'?",
      options: ["सेब", "केला", "आम"],
      answer: "सेब",
    },
    {
      id: 2,
      text: "What is the meaning of 'Dog'?",
      options: ["बिल्ली", "कुत्ता", "घोड़ा"],
      answer: "कुत्ता",
    },
    {
      id: 3,
      text: "What is the meaning of 'Water'?",
      options: ["दूध", "पानी", "चाय"],
      answer: "पानी",
    },
  ];

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);

  const current = questions[index];

  // ⏱ TIMER
  useEffect(() => {
    if (showFeedback || finished) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t === 1) {
          clearInterval(timer);
          setShowFeedback(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showFeedback, finished]);

  const answerQuestion = (opt) => {
    setSelected(opt);
    setShowFeedback(true);
    if (opt === current.answer) setCorrect((c) => c + 1);
  };

  const next = () => {
    setShowFeedback(false);
    setSelected(null);
    setTimeLeft(15);

    if (index + 1 === questions.length) {
      setFinished(true);
      submitLesson();
    } else {
      setIndex((i) => i + 1);
    }
  };

  // 🔥 BACKEND SYNC
  const submitLesson = async () => {
    const score = Math.round((correct / questions.length) * 100);

    await fetch("http://127.0.0.1:8000/lesson/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        level: Number(level),
        lesson_id: Number(lessonId),
        score,
      }),
    });
  };

  if (finished) {
    const score = Math.round((correct / questions.length) * 100);

    return (
      <div className="min-h-screen bg-[#020617] text-white p-6 text-center">
        <h1 className="text-2xl font-bold">Lesson Complete 🎉</h1>
        <p className="mt-4">Score: {score}%</p>

        <button
          onClick={() => navigate("/lessons")}
          className="mt-6 bg-green-500 px-6 py-2 rounded"
        >
          Continue
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white p-4">
      <p className="text-right text-sm text-gray-400">⏱ {timeLeft}s</p>

      <ProgressBar current={index + 1} total={questions.length} />

      <QuestionCard
        question={current}
        selected={selected}
        showFeedback={showFeedback}
        onAnswer={answerQuestion}
      />

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

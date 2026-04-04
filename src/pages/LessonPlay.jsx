import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";

export default function LessonPlay() {

  const navigate = useNavigate();
  const { level, lessonId } = useParams();

  const language = "english";

  const [question, setQuestion] = useState(null);
  const [questionId, setQuestionId] = useState(1);
  const [selected, setSelected] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [finished, setFinished] = useState(false);
  const [result, setResult] = useState(null);

  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  // ==========================
  // VALIDATE PARAMS
  // ==========================
  useEffect(() => {
    if (!level || !lessonId) {
      console.error("Invalid route params:", level, lessonId);
      navigate("/dashboard");
    }
  }, [level, lessonId, navigate]);

  // ==========================
  // LOAD SESSION
  // ==========================
  useEffect(() => {

    const storedUserId = localStorage.getItem("user_id");
    const storedToken = localStorage.getItem("token");

    if (!storedUserId || !storedToken) {
      alert("Session expired. Please login again.");
      navigate("/login");
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUserId(parseInt(storedUserId));
    setToken(storedToken);

  }, [navigate]);

  // ==========================
  // LOAD QUESTION
  // ==========================
  useEffect(() => {

    if (!token) return;

    const loadQuestion = async () => {

      try {

        const res = await fetch(
          `http://127.0.0.1:8000/language/${language}/question/${questionId}`
        );

        if (!res.ok) {
          if (res.status === 401) {
            alert("Session expired. Please login again.");
            navigate("/login");
          }
          return;
        }

        const data = await res.json();

        setQuestion({
          id: data.id,
          text: data.question_text,
          options: [
            data.option_a,
            data.option_b,
            data.option_c,
            data.option_d
          ].filter(Boolean),
          answer: data.correct_answer
        });

      } catch (err) {
        console.error("Question fetch error:", err);
      }

    };

    loadQuestion();

  }, [questionId, token, navigate]);

  // ==========================
  // SUBMIT ANSWER
  // ==========================
  const answerQuestion = async (option) => {

    if (!question || !userId || !token) return;

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
            user_id: userId,
            question_id: question.id,
            user_answer: option
          })
        }
      );

      if (!res.ok) {
        if (res.status === 401) {
          alert("Session expired. Please login again.");
          navigate("/login");
        }
        return;
      }

      const data = await res.json();

      setResult(data);

      if (data.correct) {
        setCorrect((prev) => prev + 1);
      }

      setShowFeedback(true);

    } catch (err) {
      console.error("Submit error:", err);
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
      setFinished(true); // ❌ removed backend call (not exists)
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
          Correct answers: {correct} / 10
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 bg-green-500 px-6 py-2 rounded"
        >
          Back to Dashboard
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
            <p className="text-green-400 font-bold">✅ Correct!</p>
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
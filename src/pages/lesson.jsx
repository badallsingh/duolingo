import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Lesson() {
  const { level, lessonId } = useParams();
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const [score, setScore] = useState(80); // demo score

  const finishLesson = async () => {
    await fetch("http://127.0.0.1:8000/lesson/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        level: Number(level),
        lesson_id: Number(lessonId),
        score
      }),
    });

    navigate("/dashboard"); // refresh XP & streak
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6">
      <h1 className="text-xl font-bold">
        Lesson {lessonId} (Level {level})
      </h1>

      <p className="text-gray-400 mt-2">
        Demo lesson content here...
      </p>

      {/* Fake score selector (for now) */}
      <div className="mt-6">
        <label>Score:</label>
        <select
          className="ml-2 text-black"
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
        >
          <option value={90}>90%</option>
          <option value={75}>75%</option>
          <option value={50}>50%</option>
        </select>
      </div>

      <button
        onClick={finishLesson}
        className="mt-6 bg-green-500 px-6 py-2 rounded font-semibold"
      >
        Finish Lesson
      </button>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LevelCard from "../components/LevelCard";
import BottomNav from "../components/BottomNav";

export default function Lessons() {
  const [levels, setLevels] = useState([]);
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  useEffect(() => {
    if (!email) return; // ✅ guard

    fetch(`http://127.0.0.1:8000/user/lessons/${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setLevels(data);
        } else {
          setLevels([]); // ✅ avoid crash
        }
      })
      .catch((err) => {
        console.error("Lessons fetch error", err);
        setLevels([]);
      });
  }, [email]);

  const startLesson = (level, lessonId) => {
    navigate(`/lesson/${level}/${lessonId}`);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-4 pb-20">
      <h1 className="text-xl font-bold mb-4">Your Learning Path</h1>

      {levels.length === 0 ? (
        <p className="text-gray-400">No lessons available</p>
      ) : (
        levels.map((lvl) => (
          <LevelCard
            key={lvl.level}
            level={lvl}
            onLessonClick={startLesson}
          />
        ))
      )}

      <BottomNav />
    </div>
  );
}

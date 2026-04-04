import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LevelCard from "../components/LevelCard";
import Loader from "../components/Loader";
import BottomNav from "../components/BottomNav";

export default function Lessons() {

  const navigate = useNavigate();
  const [levels, setLevels] = useState(null);

  useEffect(() => {

    const email = localStorage.getItem("email");
    const token = localStorage.getItem("token");

    if (!email || !token) {
      navigate("/login");
      return;
    }

    const loadLessons = async () => {
      const res = await fetch(
        `http://127.0.0.1:8000/user/lessons/${email}`
      );

      const data = await res.json();

      let unlocked = false;

      const updated = data.map((lvl) => ({
        ...lvl,
        lessons: lvl.lessons.map((lesson) => {

          if (!unlocked) {
            unlocked = true;
            return { ...lesson, locked: false };
          }

          return { ...lesson, locked: true };

        })
      }));

      setLevels(updated);
    };

    loadLessons();

  }, [navigate]);

  if (!levels) return <Loader />;

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 pb-20">

      <h1 className="text-2xl font-bold mb-6">Learn 🚀</h1>

      {levels.map((lvl) => (
        <LevelCard
          key={lvl.level}
          level={lvl}
          onLessonClick={(level, lessonId) =>
            navigate(`/lessonplay/${level}/${lessonId}`)
          }
        />
      ))}

      <BottomNav />

    </div>
  );
}
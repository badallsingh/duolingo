import { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";

export default function Dashboard() {
  const email = localStorage.getItem("email");

  const [data, setData] = useState(null);
  const [league, setLeague] = useState(null);
  const [nextLesson, setNextLesson] = useState(null);

  useEffect(() => {
    if (!email) return;

    // 🔹 Dashboard data (xp, level, streak)
    fetch(`http://127.0.0.1:8000/user/dashboard/${email}`)
      .then((res) => res.json())
      .then(setData);

    // 🔹 League badge
    fetch(`http://127.0.0.1:8000/league/leaderboard`)
      .then((res) => res.json())
      .then((list) => {
        const me = list.find((u) => u.name);
        if (me) setLeague(me.league);
      });

    // 🔹 Next unlocked lesson
    fetch(`http://127.0.0.1:8000/user/lessons/${email}`)
      .then((res) => res.json())
      .then((levels) => {
        for (let lvl of levels) {
          for (let lesson of lvl.lessons) {
            if (!lesson.completed && !lesson.locked) {
              setNextLesson({ level: lvl.level, id: lesson.id });
              return;
            }
          }
        }
      });
  }, [email]);

  if (!data) return <div className="text-white p-6">Loading...</div>;

  // const progress = data.xp % 100;

  return (
    <div className="min-h-screen bg-[#020617] text-white pb-20">

      {/* HEADER */}
      <div className="p-6">
        <h1 className="text-2xl font-bold">Welcome back 👋</h1>
        <p className="text-gray-400">Keep learning every day!</p>
      </div>

      {/* 🏆 LEAGUE BADGE */}
      <div className="mx-6 bg-purple-600 rounded-2xl p-5 text-center shadow-lg">
        <h2 className="text-lg font-bold">🏆 {league || "Bronze"} League</h2>
      </div>

      {/* XP CARD */}
      {/* <div className="mx-6 mt-6 bg-[#0f172a] rounded-2xl p-6 shadow-lg">
        <div className="flex justify-between mb-3">
          <span>Level {data.level}</span>
          <span>{data.xp} XP</span>
        </div>

        <div className="w-full bg-gray-700 rounded-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div> */}

      {/* 📅 STREAK CALENDAR */}
      <div className="mx-6 mt-6 bg-orange-500 rounded-2xl p-6 shadow-lg">
        <h2 className="text-lg font-bold">🔥 {data.streak} Day Streak</h2>

        <div className="flex gap-2 mt-3 justify-center">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className={`w-6 h-6 rounded-full ${
                i < data.streak % 7 ? "bg-white" : "bg-orange-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* 🎯 NEXT LESSON CARD */}
      {nextLesson && (
        <div className="mx-6 mt-6 bg-green-600 rounded-2xl p-8 text-center shadow-lg">
          <h2 className="text-xl font-bold">Next Lesson Unlocked 🎯</h2>
          <p className="text-sm mt-2">
            Level {nextLesson.level} • Lesson {nextLesson.id}
          </p>

          <button
            onClick={() =>
              (window.location.href = `/lesson/${nextLesson.level}/${nextLesson.id}`)
            }
            className="mt-4 bg-white text-green-600 px-8 py-2 rounded-full font-semibold"
          >
            Start Lesson
          </button>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

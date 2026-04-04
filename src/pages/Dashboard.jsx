import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

export default function Dashboard() {

  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [league, setLeague] = useState("Bronze");
  const [nextLesson, setNextLesson] = useState(null);

  useEffect(() => {

    const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email"); // ✅ REQUIRED

    // 🔐 Redirect if not logged in
    if (!userId || !token) {
      navigate("/login");
      return;
    }

    // ==========================
    // DASHBOARD (FAKE FOR NOW)
    // ==========================
const loadDashboard = async () => {
  try {

    const res = await fetch(
      `http://127.0.0.1:8000/user/dashboard/${userId}`
    );

    const result = await res.json();

    setData(result);

  } catch (err) {
    console.error(err);
  }
};

    // ==========================
    // LEADERBOARD
    // ==========================
    const loadLeague = async () => {
      try {

        const res = await fetch(
          "http://127.0.0.1:8000/league/leaderboard"
        );

        if (!res.ok) return;

        const list = await res.json();

        const me = list.find((u) => u.user_id == userId);

        if (me && me.league) {
          setLeague(me.league);
        }

      } catch (err) {
        console.error("League error:", err);
      }
    };


    // ==========================
    // NEXT LESSON
    // ==========================
    const loadLessons = async () => {

      try {

        const res = await fetch(
          `http://127.0.0.1:8000/user/lessons/${email}`, // ✅ FIXED
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (!res.ok) {
          console.error("Lessons API error:", res.status);
          return;
        }

        const levels = await res.json();

        for (const lvl of levels) {

          for (const lesson of lvl.lessons) {

            // ✅ backend has NO locked field
            if (!lesson.completed) {

              setNextLesson({
                level: lvl.level,
                id: lesson.lesson_id // ✅ FIXED
              });

              return;
            }
          }
        }

      } catch (err) {
        console.error("Lessons fetch error:", err);
      }

    };

    loadDashboard();
    loadLeague();
    loadLessons();

  }, [navigate]);


  if (!data) {
    return (
      <div className="text-white p-6">
        Loading dashboard...
      </div>
    );
  }

  const progress = data.xp % 100;

  return (

    <div className="min-h-screen bg-[#020617] text-white pb-20">

      {/* HEADER */}
      <div className="p-6">
        <h1 className="text-2xl font-bold">
          Welcome back 👋
        </h1>
        <p className="text-gray-400">
          Keep learning every day!
        </p>
      </div>

      {/* LEAGUE */}
      <div className="mx-6 bg-purple-600 rounded-2xl p-5 text-center shadow-lg">
        <h2 className="text-lg font-bold">
          🏆 {league} League
        </h2>
      </div>

      {/* XP CARD */}
      <div className="mx-6 mt-6 bg-[#0f172a] rounded-2xl p-6 shadow-lg">

        <div className="flex justify-between mb-3">
          <span>Level {data.level}</span>
          <span>{data.xp} XP</span>
        </div>

        <div className="w-full bg-gray-700 rounded-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

      </div>

      {/* STREAK */}
      <div className="mx-6 mt-6 bg-orange-500 rounded-2xl p-6 shadow-lg">
        <h2 className="text-lg font-bold">
          🔥 {data.streak} Day Streak
        </h2>
      </div>

      {/* NEXT LESSON */}
      {nextLesson && (

        <div className="mx-6 mt-6 bg-green-600 rounded-2xl p-8 text-center shadow-lg">

          <h2 className="text-xl font-bold">
            Next Lesson Unlocked 🎯
          </h2>

          <p className="text-sm mt-2">
            Level {nextLesson.level} • Lesson {nextLesson.id}
          </p>

      <button
  onClick={() =>
    navigate(`/lessonplay/${nextLesson.level}/${nextLesson.id}`)
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
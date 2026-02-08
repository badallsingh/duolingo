import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

export default function Profile() {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  useEffect(() => {
    if (!email) return;

    fetch(`http://127.0.0.1:8000/user/profile/${email}`)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.error("Profile fetch error", err));
  }, [email]);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white p-4 pb-20">
      <h1 className="text-xl font-bold">{data.name}</h1>
      <p className="text-gray-400">Learning {data.learning_language}</p>

      <div className="mt-4 space-y-2">
        <p>XP: {data.xp}</p>
        <p>Level: {data.level}</p>
        <p>Streak: {data.streak} 🔥</p>
        <p>Language: {data.ui_language}</p>
      </div>

      <button
        onClick={logout}
        className="mt-6 bg-red-500 px-4 py-2 rounded"
      >
        Logout
      </button>

      <BottomNav />
    </div>
  );
}

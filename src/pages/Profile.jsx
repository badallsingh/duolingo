import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

export default function Profile() {

  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-4 pb-20">

      <h1 className="text-xl font-bold">{email}</h1>

      <p className="text-gray-400">Learning English</p>

      <div className="mt-4">
        <p>XP: 40</p>
        <p>Level: 1</p>
        <p>Streak: 3 🔥</p>
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
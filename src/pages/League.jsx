import { useEffect, useState } from "react";
import axios from "axios";
import BottomNav from "../components/BottomNav";

export default function League() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/league/leaderboard")
      .then((res) => {
        setUsers(res.data || []);
      })
      .catch((err) => {
        console.error("League error:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 pb-20">

      <h1 className="text-2xl font-bold mb-6 text-center">
        🏆 Weekly League
      </h1>

      <div className="bg-[#0f172a] rounded-xl p-4 shadow">

        {/* LOADING */}
        {loading && (
          <p className="text-center text-gray-400">
            Loading leaderboard...
          </p>
        )}

        {/* EMPTY STATE */}
        {!loading && users.length === 0 && (
          <p className="text-center text-gray-400">
            No players yet 🚀
          </p>
        )}

        {/* TABLE */}
        {!loading && users.length > 0 && (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-400 border-b border-gray-700">
                <th className="p-2 text-left">Rank</th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">League</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.user_id}
                  className="border-b border-gray-800 text-center"
                >
                  <td className="p-2 font-bold">
                    {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}
                  </td>

                  <td className="p-2">{user.name}</td>

                  <td className="p-2 font-semibold text-yellow-400">
                    {user.league}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>

      <BottomNav />

    </div>
  );
}
import { useEffect, useState } from "react";
import axios from "axios";

export default function League() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/league/leaderboard")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">
        🏆 Weekly League
      </h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Rank</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">XP</th>
            <th className="p-2 border">League</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.rank} className="text-center">
              <td className="p-2 border">{user.rank}</td>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.xp}</td>
              <td className="p-2 border font-semibold">
                {user.league}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

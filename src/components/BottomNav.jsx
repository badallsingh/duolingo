import { NavLink } from "react-router-dom";

export default function BottomNav() {

  const navItem = "flex flex-col items-center text-xs";
  const inactive = "text-gray-400";
  const active = "text-green-500 scale-110";

  return (
    <div className="fixed bottom-0 w-full bg-[#0f172a] border-t border-gray-700 flex justify-around py-2 z-50">

      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `${navItem} ${isActive ? active : inactive}`
        }
      >
        <span className="text-lg">🏠</span>
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/lessons"
        className={({ isActive }) =>
          `${navItem} ${isActive ? active : inactive}`
        }
      >
        <span className="text-lg">📘</span>
        <span>Learn</span>
      </NavLink>

      <NavLink
        to="/league"
        className={({ isActive }) =>
          `${navItem} ${isActive ? active : inactive}`
        }
      >
        <span className="text-lg">🔥</span>
        <span>League</span>
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `${navItem} ${isActive ? active : inactive}`
        }
      >
        <span className="text-lg">👤</span>
        <span>Profile</span>
      </NavLink>

    </div>
  );
}
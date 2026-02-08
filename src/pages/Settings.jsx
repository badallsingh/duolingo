import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import BottomNav from "../components/BottomNav";

export default function Settings() {
  const { language, changeLanguage } = useContext(LanguageContext);

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 pb-20">
      <h1 className="text-xl font-bold mb-6">Settings</h1>

      {/* UI Language */}
      <div className="mb-6">
        <label className="block mb-2">UI Language</label>
        <select
          value={language}
          onChange={(e) => changeLanguage(e.target.value)}
          className="w-full p-3 rounded bg-[#0f172a]"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="es">Spanish</option>
        </select>
      </div>

      {/* Learning Language */}
      <div className="mb-6">
        <label className="block mb-2">Learning Language</label>
        <select className="w-full p-3 rounded bg-[#0f172a]">
          <option>English</option>
          <option>French</option>
          <option>German</option>
        </select>
      </div>

      {/* Logout */}
      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
        className="w-full bg-red-500 py-3 rounded font-semibold"
      >
        Logout
      </button>

      <BottomNav />
    </div>
  );
}

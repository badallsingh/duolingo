import { useContext, useState } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const { t, setLang } = useContext(LanguageContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    ui_language: "",
    learning_language: "",
  });

  const handleSignup = async (e) => {
    e.preventDefault(); // 🔴 REQUIRED

    try {
      await axios.post(
        "http://127.0.0.1:8000/auth/signup",
        form
      );

      alert("Signup successful");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  return (
    <form
      onSubmit={handleSignup} // 🔴 REQUIRED
      className="max-w-md mx-auto mt-10"
    >
      <h1 className="text-2xl font-bold text-center">
        {t.createAccount}
      </h1>

      <input
        className="input"
        placeholder={t.name}
        required
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        className="input"
        type="email"
        placeholder={t.email}
        required
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        className="input"
        type="password"
        placeholder={t.password}
        required
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <select
        className="input"
        onChange={(e) => {
          setLang(e.target.value);
          setForm({ ...form, ui_language: e.target.value });
        }}
      >
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="es">Spanish</option>
      </select>

      <select
        className="input"
        required
        onChange={(e) =>
          setForm({ ...form, learning_language: e.target.value })
        }
      >
        <option value="">{t.learningLanguage}</option>
        <option value="english">English</option>
        <option value="french">French</option>
        <option value="german">German</option>
      </select>

      <button type="submit" className="btn w-full">
        {t.signUp}
      </button>

      <p className="text-center mt-4">
        {t.alreadyAccount} <Link to="/login">{t.login}</Link>
      </p>
    </form>
  );
}

import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { LanguageContext } from "../context/LanguageContext";

export default function Login() {

const navigate = useNavigate();
const { t } = useContext(LanguageContext);

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleLogin = async (e) => {
  e.preventDefault();

  try {

    const res = await axios.post(
      "http://127.0.0.1:8000/login",
      {
        email: email,
        password: password
      }
    );

    console.log("Login response:", res.data);

    // ✅ STORE USER DATA
    localStorage.setItem("user_id", res.data.user_id);
    localStorage.setItem("token", res.data.access_token);

    // redirect
    navigate("/dashboard");

  } catch (err) {

    console.error("Login error:", err.response?.data || err.message);
    alert("Invalid email or password");

  }
};

return (

<form
  onSubmit={handleLogin}
  className="bg-white p-8 rounded-xl w-96 mx-auto mt-20"
>

<h2 className="text-2xl font-bold text-center mb-6">
  {t.login}
</h2>

<input
  className="input"
  type="email"
  placeholder={t.email}
  required
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

<input
  className="input"
  type="password"
  placeholder={t.password}
  required
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

<button type="submit" className="btn w-full">
  {t.login}
</button>

<p className="text-center mt-4 text-sm">
  {t.alreadyAccount}{" "}
  <Link to="/signup" className="text-blue-600">
    {t.signUp}
  </Link>
</p>

</form>

);

}

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
native_language: "english",
learning_language: "english",
});

// handle input change
const handleChange = (e) => {
setForm({
...form,
[e.target.name]: e.target.value
});
};

// signup request
const handleSignup = async (e) => {
e.preventDefault();


console.log("Signup payload 👉", form);

try {

  const response = await axios.post(
    "http://127.0.0.1:8000/signup",
    {
      name: form.name,
      email: form.email,
      password: form.password,
      signup_method: "email",
      native_language: form.native_language,
      learning_language: form.learning_language
    }
  );

  console.log("Signup success:", response.data);

  alert("Signup successful!");
  navigate("/login");

} catch (error) {

  console.error("Signup error:", error.response?.data || error.message);
  alert("Signup failed. Please try again.");
}


};

return ( <form
   onSubmit={handleSignup}
   className="max-w-md mx-auto mt-10"
 >

```
  <h1 className="text-2xl font-bold text-center">
    {t.createAccount}
  </h1>

  <input
    className="input"
    name="name"
    placeholder={t.name}
    required
    onChange={handleChange}
  />

  <input
    className="input"
    type="email"
    name="email"
    placeholder={t.email}
    required
    onChange={handleChange}
  />

  <input
    className="input"
    type="password"
    name="password"
    placeholder={t.password}
    required
    onChange={handleChange}
  />

  <select
    className="input"
    name="native_language"
    onChange={(e) => {
      setLang(e.target.value);
      handleChange(e);
    }}
  >
    <option value="english">English</option>
    <option value="hindi">Hindi</option>
    <option value="spanish">Spanish</option>
  </select>

  <select
    className="input"
    name="learning_language"
    required
    onChange={handleChange}
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

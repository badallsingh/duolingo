import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Lessons from "./pages/Lessons";
import LessonPlay from "./pages/LessonPlay";
import League from "./pages/League";
import Lesson from "./pages/lesson";
import ProtectedRoute from "./components/ProtectedRoute";
import LanguageProvider from "./context/LanguageProvider";

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* PROTECTED ROUTES */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/lessons"
            element={
              <ProtectedRoute>
                <Lessons />
              </ProtectedRoute>
            }
          />

          <Route
            path="/lesson/:id"
            element={
              <ProtectedRoute>
                <LessonPlay />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lesson/:level/:lessonId"
            element={
              <ProtectedRoute>

                <Lesson />
              </ProtectedRoute>
            }
          />

          <Route
            path="/league"
            element={
              <ProtectedRoute>
                <League />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

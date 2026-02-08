import { Navigate } from "react-router-dom";

// Blocks access if user is not logged in
export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
}

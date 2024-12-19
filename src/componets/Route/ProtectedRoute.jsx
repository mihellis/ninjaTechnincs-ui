import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
export default function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.user.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

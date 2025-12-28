import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  adminOnly?: boolean;
}

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/profile", {
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) {
          navigate("/login");
          return;
        }

        const data = await res.json();

        // If this route requires admin but user is student
        if (adminOnly && data.user.role !== "admin") {
          navigate("/dashboard");
          return;
        }

        // If user is admin but trying to access student dashboard
        if (!adminOnly && data.user.role === "admin") {
          navigate("/admin");
          return;
        }

        setLoading(false);
      })
      .catch(() => navigate("/login"));
  }, [navigate, adminOnly]);

  if (loading) return <div>Loading...</div>;

  return children;
};

export default ProtectedRoute;
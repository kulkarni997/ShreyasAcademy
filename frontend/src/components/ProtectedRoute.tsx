import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  adminOnly?: boolean;
}

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("🔍 Checking authentication...");
        console.log("📍 Current path:", location.pathname);
        console.log("🎭 Admin only route?", adminOnly);
        
        const res = await fetch("http://localhost:5000/profile", {
          credentials: "include",
        });

        console.log("📡 Response status:", res.status);

        if (!res.ok) {
          console.log("❌ Not authenticated, redirecting to login");
          navigate("/login", { replace: true });
          return;
        }

        const data = await res.json();
        console.log("✅ User data:", data);
        console.log("👤 User role:", data.user.role);

        // If this route requires admin but user is student
        if (adminOnly && data.user.role !== "admin") {
          console.log("⚠️ Admin required, user is student, redirecting to student dashboard");
          navigate("/dashboard", { replace: true });
          return;
        }

        // If user is admin but trying to access student dashboard
        // ONLY redirect if they're NOT already on the admin page
        if (!adminOnly && data.user.role === "admin" && location.pathname !== "/admin") {
          console.log("⚠️ User is admin, redirecting to admin dashboard");
          navigate("/admin", { replace: true });
          return;
        }

        console.log("✅ Authorization successful, rendering page");
        setLoading(false);
      } catch (err) {
        console.error("❌ Auth error:", err);
        setError("Failed to verify authentication. Please check if the server is running.");
        
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 2000);
      }
    };

    checkAuth();
  }, [navigate, adminOnly, location.pathname]);

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        padding: '20px',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#dc2626', marginBottom: '10px' }}>⚠️ Connection Error</h2>
        <p style={{ color: '#666' }}>{error}</p>
        <p style={{ color: '#666', marginTop: '10px' }}>Redirecting to login...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh' 
      }}>
        <div style={{ 
          fontSize: '20px', 
          fontWeight: 'bold',
          marginBottom: '10px'
        }}>
          Loading...
        </div>
        <div style={{ 
          fontSize: '14px', 
          color: '#666' 
        }}>
          Verifying authentication
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
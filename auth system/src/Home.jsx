import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { authDB } from "./Firebase";


export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authDB, (loggedInUser) => {
      if (loggedInUser) {
        setUser(loggedInUser);
      } else {
        localStorage.removeItem("user");
        navigate("/"); 
      }
    });

    return () => unsubscribe(); 
  }, [navigate]);

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(authDB);
      localStorage.removeItem("user");
      navigate("/"); 
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Welcome!</h2>
        {user ? (
          <>
            <p className="text-gray-700">You are logged in as <strong>{user.email}</strong></p>
            <button
              onClick={handleLogout}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <p className="text-gray-500">Checking authentication...</p>
        )}
      </div>
    </div>
  );
}

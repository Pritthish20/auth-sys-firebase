import { useState } from "react";
import { toast } from "react-toastify";
import { authDB, firebaseDB, googleAuthDB } from "../Firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Handle Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.email === "" || formData.password === "") {
      toast.error("All fields are required");
      setLoading(false);
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(authDB, formData.email, formData.password);
      localStorage.setItem("user", JSON.stringify(result.user));
      toast.success("Signed in successfully!");
      navigate("/home");
    } catch (error) {
      toast.error("Sign-in failed. Please check your credentials.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle Google Sign-In
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(authDB, googleAuthDB);

      const user = {
        name: result.user.displayName,
        email: result.user.email,
        uid: result.user.uid,
      };

      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Google Sign-in Successful!");
      navigate("/home");
    } catch (error) {
      console.error("Google Login Failed:", error.message);
      toast.error("Google Login Failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

        {/* Email & Password Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        {/* Google Sign-In Button */}
        <div className="mt-4 text-center">
          <p className="text-gray-500">or</p>
          <button
            onClick={signInWithGoogle}
            className="w-full mt-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition flex justify-center items-center"
          >
            Sign in with Google
          </button>
        </div>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

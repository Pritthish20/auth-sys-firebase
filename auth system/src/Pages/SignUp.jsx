import { useState } from "react";
import { toast } from "react-toastify";
import { authDB, firebaseDB, googleAuthDB } from "../Firebase";
import { Timestamp, addDoc, collection, doc, getDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(authDB, googleAuthDB);
      
      const user = {
        name: result.user.displayName,
        email: result.user.email,
        uid: result.user.uid,
        createdAt: Timestamp.now(), 
      };

      // Check if user already exists in Firestore
      const userRef = doc(firebaseDB, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await addDoc(collection(firebaseDB, "users"), user);
        toast.success("Google Signup Successful!");
      } else {
        toast.info("User already exists. Logging in...");
      }

      localStorage.setItem("user", JSON.stringify(user));
      navigate("/"); // Redirect to Home page
    } catch (error) {
      console.error("Google Login Failed:", error.message);
      toast.error("Google Login Failed");
    }
  };

  // 🔹 Handle Manual Signup with Email & Password
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (formData.name === "" || formData.email === "" || formData.password === "") {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const newUser = await createUserWithEmailAndPassword(authDB, formData.email, formData.password);

      const user = {
        name: formData.name,
        uid: newUser.user.uid,
        email: newUser.user.email,
        time: Timestamp.now(),
      };

      const userRef = collection(firebaseDB, "users");
      await addDoc(userRef, user);

      toast.success("Signup Successful!");
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Signup Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign Up</h2>
        
        {/* Email & Password Signup Form */}
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
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
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Google Sign-In Button */}
        <div className="mt-4 text-center">
          <p className="text-gray-500">or</p>
          <button
            onClick={signInWithGoogle}
            className="w-full mt-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition flex justify-center items-center"
          >
           
            Sign in with Google
          </button>
        </div>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="/" className="text-orange-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Firebase listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser || null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Register
  const createUser = async (name, email, password, image) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(result.user, { displayName: name, photoURL: image || "" });

    // Save to backend
    await axios.post("https://local-sethi-server.vercel.app/users", {
      name,
      email,
      image: image || "",
      role: "user",
      status: "active",
      chefId: null,
      createdAt: new Date() 
    });

    setUser(result.user);
    return result.user;
  };

  // Login
  const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password);

  // Logout
  const logoutUser = () => signOut(auth).then(() => setUser(null));

  return (
    <AuthContext.Provider value={{ user, loading, createUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;




























